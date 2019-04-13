import * as React from 'react'
import { Graph } from 'react-d3-graph'
import { Subscribe } from 'unstated'
import { SearchContainer } from '../SearchPage'
import { VocabularyContainer } from '../Vocabulary'
import { Dictionary } from '../../../model'
import { flatten, values, uniq, uniqBy, compact } from 'lodash'
import { getGraphDataForCompoundWord, filterUniqueLinks } from './lib'
import GraphInstructions from './components/GraphInstructions'
import SavedWordsView from './components/SavedWordsView'

const config = {
  automaticRearrangeAfterDropNode: true,
  collapsible: false,
  focusZoom: 1,
  height: 600,
  highlightDegree: 1,
  highlightOpacity: 0.7,
  linkHighlightBehavior: true,
  maxZoom: 8,
  minZoom: 0.1,
  nodeHighlightBehavior: true,
  panAndZoom: false,
  staticGraph: false,
  width: 600,
  d3: {
    alphaTarget: 0.1,
    gravity: -1000,
    linkLength: 50,
    linkStrength: 1,
  },
  node: {
    color: '#d3d3d3',
    fontColor: 'black',
    fontSize: 16,
    fontWeight: 'normal',
    highlightColor: 'gray',
    highlightFontSize: 16,
    highlightFontWeight: 'bold',
    highlightStrokeColor: 'SAME',
    highlightStrokeWidth: 1.5,
    labelProperty: 'name',
    mouseCursor: 'pointer',
    opacity: 1,
    renderLabel: true,
    size: 800,
    strokeColor: 'none',
    strokeWidth: 1.5,
    svg: '',
    symbolType: 'circle',
  },
  link: {
    color: '#d3d3d3',
    fontColor: 'black',
    fontSize: 10,
    fontWeight: 'normal',
    highlightColor: 'purple',
    highlightFontSize: 12,
    highlightFontWeight: 'bold',
    labelProperty: 'label',
    mouseCursor: 'pointer',
    opacity: 1,
    renderLabel: true,
    semanticStrokeWidth: false,
    strokeWidth: 4,
  },
}

export interface GraphLink {
  source: string
  target: string
}

interface GraphNode {
  id: string
  hiddenAdjacentNodes?: string[]
}

export interface GraphData {
  links: GraphLink[]
  nodes: GraphNode[]
}

type GraphMode = 'Single' | 'All'
interface IState {
  mode: GraphMode
  graphDataForWordsInVocabulary: {
    [word: string]: GraphData
  }

  dataToRender?: GraphData
}
interface IProps {
  wordsWithoutSpacesMappedToCompoundWords: { [key: string]: string[] }
  savedWords: string[]
  selectWord: (word: string) => void
  dictionary: Dictionary
  selectedWord?: string
}

class WordGraph extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.state = {
      mode: 'All',
      graphDataForWordsInVocabulary: this.calculateGraphData(),
    }
  }

  componentDidMount = () => this.switchMode('Single')
  calculateGraphData = () => {
    const { savedWords, wordsWithoutSpacesMappedToCompoundWords } = this.props

    const graphDataForWordsInVocabulary = savedWords.reduce(
      (acc, savedWord: string) => {
        acc[savedWord] = getGraphDataForCompoundWord(
          savedWord,
          wordsWithoutSpacesMappedToCompoundWords,
        )

        return acc
      },
      {},
    )
    return graphDataForWordsInVocabulary
  }

  switchMode = (
    modeForThisButton: GraphMode,
    newSelectedWord?: string,
  ): void => {
    this.setState({ mode: modeForThisButton })
    const { graphDataForWordsInVocabulary } = this.state
    const { wordsWithoutSpacesMappedToCompoundWords } = this.props

    let dataToRender: GraphData
    if (modeForThisButton === 'Single') {
      const selectedWord = newSelectedWord || 'méo xệch'

      dataToRender =
        (graphDataForWordsInVocabulary &&
          graphDataForWordsInVocabulary[selectedWord]) ||
        getGraphDataForCompoundWord(
          selectedWord,
          wordsWithoutSpacesMappedToCompoundWords,
        )
    } else {
      const allData: GraphData[] = values(this.calculateGraphData())
      dataToRender = {
        nodes: flatten(allData.map(({ nodes }) => nodes)),
        links: flatten(allData.map(({ links }) => links)),
      }
    }

    this.setState({ dataToRender })
  }
  onClickNode = (idOfNodeClicked: string) => {
    const { wordsWithoutSpacesMappedToCompoundWords } = this.props
    const { dataToRender } = this.state
    const dataToAdd = compact(
      idOfNodeClicked.split(' ').map((subword) => {
        const neighbors = wordsWithoutSpacesMappedToCompoundWords[subword]
        if (neighbors) {
          if (subword !== idOfNodeClicked) {
            return {
              nodes: [{ id: subword, color: 'magenta' }],
              links: [
                {
                  source: idOfNodeClicked,
                  target: subword,
                },
              ],
            }
          } else {
            const nodes = neighbors.map((id) => ({ id, color: 'green' }))
            const links = neighbors.map((id) => ({
              source: id,
              target: subword,
            }))
            return { nodes, links }
          }
        }
        return undefined
      }),
    )
    const nodesToAdd: GraphNode[] = flatten(dataToAdd.map(({ nodes }) => nodes))
    const linksToAdd: GraphLink[] = flatten(dataToAdd.map(({ links }) => links))

    if (dataToRender) {
      const nodes = uniqBy(
        dataToRender.nodes.concat(nodesToAdd),
        ({ id }) => id,
      ).slice(0, dataToRender.nodes.length + 1)
      const links = filterUniqueLinks(
        dataToRender.links.concat(linksToAdd),
      ).slice(0, dataToRender.links.length + 1)

      this.setState({ dataToRender: { nodes, links } })
    }
  }
  render() {
    const { mode, dataToRender } = this.state
    const { dictionary, savedWords, selectWord, selectedWord } = this.props
    const { onClickNode } = this
    return (
      <div className={'container'}>
        <div className={'fill row '}>
          <div className={'col-md-3 '}>
            {dictionary && savedWords ? (
              <SavedWordsView
                selectWord={(v) => {
                  selectWord(v)
                  this.switchMode('Single', v)
                }}
                selectedWord={selectedWord || ''}
                dictionary={dictionary}
                savedWords={savedWords}
              />
            ) : null}
          </div>

          <div
            className={`col-md-9`}
            style={{
              borderLeft: 'solid 1px rgb(222, 226, 230)',
              paddingTop: 5,
            }}
          >
            <div className="btn-group" role="group" aria-label="Basic example">
              {['Single', 'All'].map((modeForThisButton, i: number) => (
                <button
                  key={i}
                  onClick={() => this.switchMode(modeForThisButton)}
                  type="button"
                  className={`btn ${
                    mode === modeForThisButton ? 'btn-primary' : 'btn-secondary'
                  }`}
                >
                  {modeForThisButton}
                </button>
              ))}
            </div>
            <GraphInstructions />
            <div
              style={{ border: 'solid 1px rgb(222, 226, 230)', marginTop: 10 }}
            >
              {dataToRender && dataToRender.nodes.length ? (
                <Graph
                  onClickNode={onClickNode}
                  key={selectedWord + mode}
                  id="graph-id"
                  data={dataToRender}
                  config={{ ...config }}
                />
              ) : null}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const GraphWithContainers = () => (
  <Subscribe to={[SearchContainer, VocabularyContainer]}>
    {(
      { state }: SearchContainer,
      { state: vocabularyState, selectWord }: VocabularyContainer,
    ) => {
      const { dictionary, wordsWithoutSpacesMappedToCompoundWords } = state

      const { savedWords, selectedWord } = vocabularyState

      if (dictionary && wordsWithoutSpacesMappedToCompoundWords) {
        return (
          <WordGraph
            selectedWord={selectedWord}
            dictionary={dictionary}
            wordsWithoutSpacesMappedToCompoundWords={
              wordsWithoutSpacesMappedToCompoundWords
            }
            savedWords={savedWords}
            selectWord={selectWord}
          />
        )
      } else {
        return null
      }
    }}
  </Subscribe>
)

export default GraphWithContainers

import * as React from 'react'
import { Graph, Node } from 'react-d3-graph'
import { Subscribe } from 'unstated'
import { SearchContainer } from '../SearchPage'
import { VocabularyContainer } from '../Vocabulary'
import { Dictionary } from '../../../model'
import { flatten, values, compact, orderBy } from 'lodash'
import {
  getGraphDataForCompoundWord,
  filterUniqueLinks,
  getHiddenAdjacentWords,
} from './lib'
import GraphInstructions from './components/GraphInstructions'
import SavedWordsView from './components/SavedWordsView'
import withSizes from 'react-sizes'
import { IReactD3Config } from './model'
import GraphNode, { IGraphNode } from './components/GraphNode'

const config: IReactD3Config = {
  automaticRearrangeAfterDropNode: true,
  collapsible: false,
  directed: true,
  focusZoom: 1,
  height: 600,
  highlightDegree: 1,
  highlightOpacity: 0.7,
  linkHighlightBehavior: true,
  maxZoom: 8,
  minZoom: 0.1,
  nodeHighlightBehavior: true,
  staticGraph: false,
  width: 600,
  d3: {
    alphaTarget: 0.05,
    gravity: -250,
    linkLength: 120,
    linkStrength: 2,
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
    mouseCursor: 'pointer',
    opacity: 1,
    renderLabel: true,
    size: 1000,
    strokeColor: 'none',
    strokeWidth: 1.5,
    svg: '',
    symbolType: 'circle',
    viewGenerator: GraphNode,
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

export interface IGraphLink {
  source: string
  target: string
}

export interface GraphData {
  links: IGraphLink[]
  nodes: IGraphNode[]
}

type GraphMode = 'Single' | 'All'
interface IState {
  mode: GraphMode
  dataToRender?: GraphData
  lastClicked?: { x: number; y: number }
}
interface IProps {
  wordsWithoutSpacesMappedToCompoundWords: { [key: string]: string[] }
  savedWords: string[]
  selectWord: (word: string) => void
  dictionary: Dictionary
  selectedWord?: string
  height: number
  width: number
}

class WordGraph extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.state = {
      mode: 'All',
    }
  }

  componentDidMount = () => {
    setTimeout(() => this.switchMode('Single'), 1000)
  }
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
    const { wordsWithoutSpacesMappedToCompoundWords } = this.props

    let dataToRender: GraphData
    if (modeForThisButton === 'Single') {
      const selectedWord = newSelectedWord || 'méo xệch'

      dataToRender = getGraphDataForCompoundWord(
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
    const { dataToRender, lastClicked } = this.state
    const dataToAdd = compact(
      idOfNodeClicked
        .split(' ')
        .filter((v) => v)
        .map((subword) => {
          const neighbors = wordsWithoutSpacesMappedToCompoundWords[subword]
          if (neighbors) {
            if (subword !== idOfNodeClicked) {
              return {
                nodes: [
                  {
                    id: subword,
                    color: 'magenta',
                  },
                ],
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
    const nodesToAdd: IGraphNode[] = flatten(
      dataToAdd.map(({ nodes }) => nodes),
    )
    const linksToAdd: IGraphLink[] = flatten(
      dataToAdd.map(({ links }) => links),
    )

    if (dataToRender) {
      const [uniqueNodeToAdd] = orderBy(
        nodesToAdd.filter(
          ({ id }) =>
            !dataToRender.nodes.some(
              ({ id: idAlreadyPresent }) => idAlreadyPresent === id,
            ),
        ),
        ({ id }) =>
          -1 *
          dataToRender.nodes.filter(({ id: idAlreadyPresent }) =>
            id.split(' ').some((sub) => idAlreadyPresent.includes(sub)),
          ).length,
      )

      if (uniqueNodeToAdd) {
        const nodes = dataToRender.nodes.concat([
          { ...uniqueNodeToAdd, ...lastClicked },
        ])

        const nodesWithHiddenAdjacent = nodes.map(({ id, ...rest }) => ({
          ...rest,
          id,
          hiddenAdjacentNodes: getHiddenAdjacentWords(
            id,
            wordsWithoutSpacesMappedToCompoundWords,
            nodes.map(({ id }) => id),
          ),
        }))

        const links = filterUniqueLinks(
          dataToRender.links
            .concat(linksToAdd)
            .filter(
              ({ source, target }) =>
                nodes.some(({ id }) => source === id) &&
                nodes.some(({ id }) => target === id),
            ),
        )

        this.setState({
          dataToRender: { nodes: nodesWithHiddenAdjacent, links },
        })
      }
    }
  }

  render() {
    const { mode, dataToRender } = this.state
    const {
      dictionary,
      savedWords,
      selectWord,
      selectedWord,
      height,
      width,
    } = this.props
    const { onClickNode } = this
    return (
      <div>
        <div
          style={{
            position: 'absolute',
            left: 0,
          }}
          onClick={(e) =>
            this.setState({ lastClicked: { x: e.clientX, y: e.clientY } })
          }
        >
          {dataToRender && dataToRender.nodes.length ? (
            <Graph
              onClickNode={onClickNode}
              key={selectedWord + mode + JSON.stringify(savedWords)}
              id="graph-id"
              data={dataToRender}
              config={{ ...config, height: height - 73, width: width - 10 }}
            />
          ) : null}
        </div>
        <div className={'container-fluid'}>
          <div className={'row '}>
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
              ) : null}{' '}
              {savedWords.length ? (
                <div
                  className="btn-group"
                  role="group"
                  aria-label="Basic example"
                  style={{ paddingTop: 5 }}
                >
                  {['Single', 'All'].map((modeForThisButton, i: number) => (
                    <button
                      key={i}
                      onClick={() => this.switchMode(modeForThisButton)}
                      type="button"
                      className={`btn ${
                        mode === modeForThisButton
                          ? 'btn-primary'
                          : 'btn-secondary'
                      }`}
                    >
                      {modeForThisButton}
                    </button>
                  ))}
                </div>
              ) : null}
            </div>

            <div
              className={`col-md-9`}
              style={{
                paddingTop: 5,
                pointerEvents: 'none',
              }}
            >
              <GraphInstructions />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapSizesToProps = (sizes: any) => sizes

const WordGraphWithDimensions = withSizes(mapSizesToProps)(WordGraph)

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
          <WordGraphWithDimensions
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

import * as React from 'react'
import { Graph } from 'react-d3-graph'
import { Subscribe } from 'unstated'
import { SearchContainer } from '../SearchPage'
import { VocabularyContainer } from '../Vocabulary'
import { Dictionary } from '../../../model'
import { getGraphDataWithNextNodeAdded } from './lib'
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

interface IState {
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
  componentDidMount = () => {
    setTimeout(this.addInitialNodesForWord, 1000)
  }
  state: IState = {}
  addInitialNodesForWord = (newSelectedWord?: string): void => {
    const selectedWord = newSelectedWord || 'méo xệch'

    const { wordsWithoutSpacesMappedToCompoundWords } = this.props
    const { lastClicked } = this.state

    const isCompoundWord = selectedWord.includes(' ')

    const initialGraphData = {
      nodes: [
        { color: isCompoundWord ? 'green' : 'magenta', id: selectedWord },
      ],
      links: [{ source: selectedWord, target: selectedWord }],
    }

    const dataToRender = getGraphDataWithNextNodeAdded(
      selectedWord,
      initialGraphData,
      wordsWithoutSpacesMappedToCompoundWords,
      lastClicked,
    )

    this.setState({
      dataToRender: this.populateGraphDataWithDefinitions(dataToRender),
    })
  }

  populateGraphDataWithDefinitions = (graphData: GraphData): GraphData => {
    const { dictionary } = this.props

    graphData.nodes = graphData.nodes.map(({ id, ...rest }) => ({
      definitions: dictionary[id],
      id,
      ...rest,
    }))

    return graphData
  }

  onClickNode = (idOfNodeClicked: string) => {
    const { wordsWithoutSpacesMappedToCompoundWords } = this.props
    const { dataToRender: previousData, lastClicked } = this.state

    const nextDataToRender = getGraphDataWithNextNodeAdded(
      idOfNodeClicked,
      previousData,
      wordsWithoutSpacesMappedToCompoundWords,
      lastClicked,
    )
    if (previousData) {
      this.setState({
        dataToRender: this.populateGraphDataWithDefinitions(nextDataToRender),
      })
    }
  }

  render() {
    const { dataToRender } = this.state
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
            cursor: 'grab',
          }}
          onClick={(e) =>
            this.setState({ lastClicked: { x: e.clientX, y: e.clientY } })
          }
        >
          {dataToRender && dataToRender.nodes.length ? (
            <Graph
              onClickNode={onClickNode}
              key={selectedWord + JSON.stringify(savedWords)}
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
                  selectWord={(nextSelectedWord) => {
                    selectWord(nextSelectedWord)
                    this.addInitialNodesForWord(nextSelectedWord)
                  }}
                  selectedWord={selectedWord || ''}
                  dictionary={dictionary}
                  savedWords={savedWords}
                />
              ) : null}{' '}
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

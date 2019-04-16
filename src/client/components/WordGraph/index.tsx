import * as React from 'react'
import { Graph } from 'react-d3-graph'
import { Subscribe } from 'unstated'
import Search, { AppContainer } from '../SearchPage'
import { VocabularyContainer } from '../Vocabulary'
import { Dictionary } from '../../../model'
import {
  getGraphDataWithNextNodeAdded,
  mergeGraphDatas,
  removeNodeFromGraphData,
} from './lib'
import GraphInstructions from './components/GraphInstructions'
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

export interface IGraphData {
  links: IGraphLink[]
  nodes: IGraphNode[]
}

interface IState {
  dataToRender?: IGraphData
  lastClicked?: { x: number; y: number }
}
interface IProps {
  wordsWithoutSpacesMappedToCompoundWords: { [key: string]: string[] }
  savedWords: string[]
  onChange: (word: string) => void
  selectWord: (word: string) => void
  selectedWord?: string
  dictionary: Dictionary
  height: number
  width: number
}
class WordGraph extends React.Component<IProps, IState> {
  componentDidMount = () => {
    setTimeout(this.initializeWordsInVocabulary, 1000)
  }
  state: IState = {}
  initializeWordsInVocabulary = () => {
    const { savedWords } = this.props
    savedWords.forEach((word, i) =>
      setTimeout(() => this.addInitialNodesForWord(word), 250 * i),
    )
  }
  componentWillReceiveProps = ({ savedWords: nextSavedWords }: IProps) => {
    const { savedWords } = this.props
    if (nextSavedWords.length > savedWords.length) {
      const addedWord = nextSavedWords.find((v) => !savedWords.includes(v))
      if (addedWord) {
        this.addInitialNodesForWord(addedWord)
      }
    } else if (nextSavedWords.length < this.props.savedWords.length) {
      const removedWord = savedWords.find((v) => !nextSavedWords.includes(v))
      if (removedWord) {
        this.removeNode(removedWord)
      }
    }
  }

  removeNode = (id: string) => {
    const { dataToRender } = this.state
    if (dataToRender) {
      const nextData = removeNodeFromGraphData(id, dataToRender)
      this.setState({ dataToRender: nextData })
    }
  }
  addInitialNodesForWord = (word: string): void => {
    const { dataToRender: previousDataToRender } = this.state

    const { wordsWithoutSpacesMappedToCompoundWords } = this.props
    const { lastClicked } = this.state

    const initialGraphData = {
      nodes: [{ id: word }],
      links: [],
    }

    const graphDataMergedWithPrevious = previousDataToRender
      ? mergeGraphDatas(previousDataToRender, initialGraphData)
      : initialGraphData

    const dataToRender = getGraphDataWithNextNodeAdded(
      word,
      graphDataMergedWithPrevious,
      wordsWithoutSpacesMappedToCompoundWords,
      lastClicked,
    )

    dataToRender.nodes = this.addColorToNodes(dataToRender.nodes)
    this.setState({
      dataToRender: this.populateGraphDataWithDefinitions(dataToRender),
    })
  }

  populateGraphDataWithDefinitions = (graphData: IGraphData): IGraphData => {
    const { dictionary } = this.props

    graphData.nodes = graphData.nodes.map(({ id, ...rest }) => ({
      definitions: dictionary[id],
      id,
      ...rest,
    }))

    return graphData
  }

  addColorToNodes = (nodes: IGraphNode[]): IGraphNode[] => {
    const { savedWords } = this.props
    return nodes.map(({ id, ...rest }) => ({
      id,
      ...rest,
      color: savedWords.includes(id) ? '#28a745' : '#ffc107',
    }))
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

    const dataWithDefinitions = this.populateGraphDataWithDefinitions(
      nextDataToRender,
    )

    dataWithDefinitions.nodes = this.addColorToNodes(dataWithDefinitions.nodes)
    if (previousData) {
      this.setState({
        dataToRender: dataWithDefinitions,
      })
    }
  }

  render() {
    const { dataToRender } = this.state
    const { height, width, onChange, selectWord, selectedWord } = this.props
    const { onClickNode } = this
    if (dataToRender) {
      dataToRender.nodes = this.addColorToNodes(dataToRender.nodes)
    }

    config.node.viewGenerator = (props: IGraphNode) => (
      <GraphNode {...props} removeself={this.removeNode} />
    )
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
              onClickNode={async (id: string) => {
                if (selectedWord === id) {
                  onClickNode(id)
                } else {
                  await onChange(id)
                  selectWord(id)
                }
              }}
              id="graph-id"
              data={dataToRender}
              config={{
                ...config,
                height: height - 73,
                width: width - 10,
              }}
            />
          ) : null}
        </div>
        <div
          className={'container-fluid'}
          style={{ height: '100%', overflow: 'hidden' }}
        >
          <div className={'row '}>
            <div className={'col-md-4 '} style={{ overflowY: 'auto' }}>
              <Search />
            </div>

            <div
              className={`col-md-8`}
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
  <Subscribe to={[AppContainer, VocabularyContainer]}>
    {(
      { state, onChange }: AppContainer,
      { state: vocabularyState, selectWord }: VocabularyContainer,
    ) => {
      const { dictionary, wordsWithoutSpacesMappedToCompoundWords } = state

      const { savedWords, selectedWord } = vocabularyState

      if (dictionary && wordsWithoutSpacesMappedToCompoundWords) {
        return (
          <WordGraphWithDimensions
            dictionary={dictionary}
            wordsWithoutSpacesMappedToCompoundWords={
              wordsWithoutSpacesMappedToCompoundWords
            }
            savedWords={savedWords}
            selectWord={selectWord}
            onChange={onChange}
            selectedWord={selectedWord}
          />
        )
      } else {
        return null
      }
    }}
  </Subscribe>
)

export default GraphWithContainers

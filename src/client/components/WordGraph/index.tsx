import * as React from 'react'
import { Graph, IGraphData, IReactD3Config, IGraphNode } from 'react-d3-graph'
import { Subscribe } from 'unstated'
import { AppContainer } from '../SearchPage'
import { Dictionary } from '../../../model'
import {
  getGraphDataWithNextNodeAdded,
  mergeGraphDatas,
  removeNodeFromGraphData,
} from '../../lib'
import withSizes from 'react-sizes'
import GraphNode from '../GraphNode'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import SavedWordsSearchTabs from '../SavedWordsSearchTabs'
import Button from 'react-bootstrap/Button'
import Tab from 'react-bootstrap/Tab'

const config: IReactD3Config = {
  panAndZoom: true,
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

interface IState {
  dataToRender?: IGraphData
  lastClicked?: { x: number; y: number }
  lastClickedPrettify: number
  prettifyIsDisabled: boolean
}

interface IPropsFromUnstated {
  wordsWithoutSpacesMappedToCompoundWords: { [key: string]: string[] }
  savedWords: string[]
  onChange: (word: string) => void
  selectWord: (word: string) => void
  selectedWord?: string
  dictionary: Dictionary
}
type IProps = IPropsFromUnstated & {
  height: number
  width: number
}
class WordGraph extends React.Component<IProps, IState> {
  componentDidMount = () => {
    setTimeout(this.initializeSavedWords, 1000)
  }
  state: IState = {
    lastClickedPrettify: new Date().getTime(),
    prettifyIsDisabled: false,
  }
  initializeSavedWords = () => {
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

  onClickPrettify = () => {
    this.setState({
      lastClickedPrettify: new Date().getTime(),
      prettifyIsDisabled: true,
    })

    setTimeout(() => this.setState({ prettifyIsDisabled: false }), 1000)
  }

  removeNode = (id: string) => {
    const { dataToRender } = this.state
    if (dataToRender) {
      const nextData = removeNodeFromGraphData(id, dataToRender)
      this.setDataToRender(nextData)
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

    const dataWithDefinitions = this.populateGraphDataWithDefinitions(
      dataToRender,
    )

    this.setDataToRender(dataWithDefinitions)
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

  setDataToRender = (dataToRender: IGraphData) => {
    this.setState({ dataToRender: { ...dataToRender } })
  }

  onClickNode = (idOfNodeClicked: string) => {
    const { wordsWithoutSpacesMappedToCompoundWords } = this.props
    const { dataToRender: previousData, lastClicked } = this.state
    if (previousData) {
      const nextDataToRender = getGraphDataWithNextNodeAdded(
        idOfNodeClicked,
        previousData,
        wordsWithoutSpacesMappedToCompoundWords,
        lastClicked,
      )

      const dataWithDefinitions = this.populateGraphDataWithDefinitions(
        nextDataToRender,
      )

      this.setDataToRender(dataWithDefinitions)
    }
  }
  render() {
    const { dataToRender, lastClickedPrettify, prettifyIsDisabled } = this.state
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
              key={lastClickedPrettify}
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
        <Container fluid={false} style={{ marginTop: 15 }}>
          <Row noGutters>
            <Col lg={5} className={'d-none d-lg-block'}>
              <SavedWordsSearchTabs>
                <Tab
                  style={{ flex: 1, width: '100%', textAlign: 'center' }}
                  disabled={prettifyIsDisabled}
                  variant={'success'}
                  title={<div onClick={this.onClickPrettify}>{'Prettify'}</div>}
                />
              </SavedWordsSearchTabs>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

const mapSizesToProps = (sizes: any) => sizes

const WordGraphWithDimensions = withSizes(mapSizesToProps)(WordGraph)

const GraphWithContainers = () => (
  <Subscribe to={[AppContainer]}>
    {({ state, changeSearchQuery, selectWord }: AppContainer) => {
      const {
        dictionary,
        wordsWithoutSpacesMappedToCompoundWords,
        checkedWords,
        savedWords,
        selectedWord,
      } = state

      if (dictionary && wordsWithoutSpacesMappedToCompoundWords) {
        const props: IPropsFromUnstated = {
          wordsWithoutSpacesMappedToCompoundWords,
          dictionary,
          savedWords: checkedWords.filter((v) => savedWords.includes(v)),
          selectWord,
          selectedWord,
          onChange: changeSearchQuery,
        }
        return <WordGraphWithDimensions {...props} />
      } else {
        return null
      }
    }}
  </Subscribe>
)

export default GraphWithContainers

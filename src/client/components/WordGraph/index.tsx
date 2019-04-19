import * as React from 'react'
import { Graph, IGraphData, IReactD3Config, IGraphNode } from 'react-d3-graph'
import { AppContainer } from '../SearchBar'
import { Dictionary } from '../../../model'
import connect from 'unstated-connect2'

import {
  getGraphDataWithNextNodeAdded,
  mergeGraphDatas,
  removeNodeFromGraphData,
} from '../../lib'
import GraphNode from '../GraphNode'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import SavedWordsSearchTabs from '../SavedWordsSearchTabs'
import ContainerDimensions from 'react-container-dimensions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import Button from 'react-bootstrap/Button'
import { library } from '@fortawesome/fontawesome-svg-core'
import { shuffle, orderBy } from 'lodash'
import {
  faRedoAlt,
  faPlusCircle,
  faMinusCircle,
} from '@fortawesome/free-solid-svg-icons'
library.add(faRedoAlt, faPlusCircle, faMinusCircle)

const config: IReactD3Config = {
  panAndZoom: false,
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
    linkLength: 200,
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
    renderLabel: false,
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

interface IProps {
  wordsWithoutSpacesMappedToCompoundWords?: { [key: string]: string[] }
  savedWords: string[]
  onChange: (word: string) => void
  selectWord: (word: string) => void
  selectedWord?: string
  dictionary?: Dictionary
}

class WordGraph extends React.Component<IProps, IState> {
  state: IState = {
    lastClickedPrettify: new Date().getTime(),
    prettifyIsDisabled: false,
  }
  componentDidMount = () => {
    setTimeout(this.initializeSavedWords, 1000)
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
    if (wordsWithoutSpacesMappedToCompoundWords) {
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
  }

  populateGraphDataWithDefinitions = (graphData: IGraphData): IGraphData => {
    const { dictionary } = this.props

    if (dictionary) {
      graphData.nodes = graphData.nodes.map(({ id, ...rest }) => ({
        definitions: dictionary[id],
        id,
        ...rest,
      }))
    }

    return graphData
  }

  setDataToRender = (dataToRender: IGraphData) => {
    this.setState({ dataToRender: { ...dataToRender } })
  }

  onClickNode = (idOfNodeClicked: string) => {
    const { wordsWithoutSpacesMappedToCompoundWords } = this.props
    const { dataToRender: previousData, lastClicked } = this.state
    if (previousData && wordsWithoutSpacesMappedToCompoundWords) {
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
  addRandomNode = () => {
    const { dataToRender } = this.state
    if (dataToRender) {
      const { nodes } = dataToRender
      const nodeWithAdjacents = shuffle(nodes).find(({ hiddenAdjacentNodes }) =>
        hiddenAdjacentNodes ? hiddenAdjacentNodes.length > 0 : false,
      )
      if (nodeWithAdjacents) {
        this.onClickNode(nodeWithAdjacents.id)
      }
    }
  }
  removeRandomNode = () => {
    const { dataToRender } = this.state
    if (dataToRender) {
      const { nodes, links } = dataToRender
      const [leastConnectedNode] = orderBy(nodes, ({ id }) =>
        links.filter(({ source, target }) => source === id || target === id),
      )
      if (leastConnectedNode) {
        this.removeNode(leastConnectedNode.id)
      }
    }
  }
  render() {
    const { dataToRender, lastClickedPrettify, prettifyIsDisabled } = this.state
    const { onChange, selectWord, selectedWord } = this.props
    const { onClickNode } = this
    config.node.viewGenerator = (props: IGraphNode) => <GraphNode {...props} />
    return (
      <Container fluid={false} style={{ marginTop: 15 }}>
        <Row>
          <Col lg={5} className={'d-none d-lg-block'}>
            <SavedWordsSearchTabs />
          </Col>
          <Col lg={7}>
            <div
              style={{
                cursor: 'grab',
                width: '100%',
                height: '100%',
                minHeight: 'calc(100vh - 87px)',
                border: 'solid 1px #dee2e6',
              }}
              onClick={(e) =>
                this.setState({ lastClicked: { x: e.clientX, y: e.clientY } })
              }
            >
              <div style={{ position: 'absolute' }}>
                <OverlayTrigger
                  placement={'bottom'}
                  overlay={
                    <Tooltip
                      id={`tooltip-${'bottom'}`}
                    >{`Add Random Word`}</Tooltip>
                  }
                >
                  <Button
                    onClick={this.addRandomNode}
                    style={{ marginLeft: 10, marginTop: 10 }}
                    variant={'warning'}
                  >
                    <FontAwesomeIcon icon={'plus-circle'} />
                  </Button>
                </OverlayTrigger>
                <OverlayTrigger
                  placement={'bottom'}
                  overlay={
                    <Tooltip
                      id={`tooltip-${'bottom'}`}
                    >{`Remove Random Word`}</Tooltip>
                  }
                >
                  <Button
                    onClick={this.removeRandomNode}
                    style={{ marginLeft: 10, marginTop: 10 }}
                    variant={'warning'}
                  >
                    <FontAwesomeIcon icon={'minus-circle'} />
                  </Button>
                </OverlayTrigger>
                <OverlayTrigger
                  placement={'bottom'}
                  overlay={
                    <Tooltip id={`tooltip-${'bottom'}`}>
                      {prettifyIsDisabled ? `Rendering...` : `Re-render`}
                    </Tooltip>
                  }
                >
                  <Button
                    disabled={prettifyIsDisabled}
                    onClick={this.onClickPrettify}
                    variant={'secondary'}
                    style={{ marginLeft: 10, marginTop: 10 }}
                  >
                    <FontAwesomeIcon
                      icon={'redo-alt'}
                      spin={prettifyIsDisabled}
                    />
                  </Button>
                </OverlayTrigger>
              </div>
              <ContainerDimensions>
                {({ height, width }) =>
                  dataToRender && dataToRender.nodes.length ? (
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
                        height: height - 5,
                        width: width - 5,
                      }}
                    />
                  ) : null
                }
              </ContainerDimensions>
            </div>
          </Col>
        </Row>
      </Container>
    )
  }
}

const GraphWithContainers = connect({
  container: AppContainer,
  selector: ({ container }: { container: AppContainer }): IProps => {
    const { selectWord, changeSearchQuery } = container
    const {
      dictionary,
      wordsWithoutSpacesMappedToCompoundWords,
      checkedWords,
      savedWords,
      selectedWord,
    } = container.state
    return {
      wordsWithoutSpacesMappedToCompoundWords,
      dictionary,
      savedWords: checkedWords.filter((v) => savedWords.includes(v)),
      selectWord,
      selectedWord,
      onChange: changeSearchQuery,
    }
  },
})(WordGraph)

export default GraphWithContainers

import * as React from 'react'
import { Graph } from 'react-d3-graph'
import { Subscribe, Container } from 'unstated'
import { SearchContainer } from '../SearchPage'
import { VocabularyContainer } from '../Vocabulary'
import { Dictionary } from '../../../model'
import { flatten, uniqBy, uniq, values } from 'lodash'

const SavedWordsView = ({
  savedWords,
  dictionary,
  selectedWord,
  selectWord,
}: {
  savedWords: string[]
  dictionary: Dictionary
  selectedWord: string
  selectWord: (word: string) => void
}) => {
  return (
    <React.Fragment>
      {savedWords
        .slice(0, 15)
        .reverse()
        .map((v) => ({ text: v, definitions: dictionary[v] }))
        .map(({ text, definitions }) => (
          <div
            key={text}
            className={'suggestion'}
            style={{
              cursor: 'pointer',
              paddingBottom: 4,
              paddingTop: 3,
            }}
            onClick={() => selectWord(text)}
          >
            <div
              style={{
                display: 'flex',
                marginBottom: 4,
                marginTop: 4,
                justifyContent: 'space-between',
              }}
            >
              <h5
                style={{
                  marginTop: 5,
                  marginBottom: 5,
                  marginRight: 10,
                }}
              >
                {text}
              </h5>
              <em>{definitions[0].definition}</em>
              {text === selectedWord && (
                <button disabled className={'btn-sm btn-success'}>
                  Selected
                </button>
              )}
            </div>
          </div>
        ))}
    </React.Fragment>
  )
}

const config = {
  automaticRearrangeAfterDropNode: true,
  collapsible: false,
  //focusAnimationDuration: 0.75,
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
    alphaTarget: 0.05,
    gravity: -450,
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

const getAdjacentWords = (
  wordWithNoSpaces: string,
  subWordMappedToCompoundWords: { [key: string]: string[] },
) => {
  let adjacentWords = subWordMappedToCompoundWords[wordWithNoSpaces] || []
  return uniq([...adjacentWords, wordWithNoSpaces])
}

interface GraphLink {
  source: string
  target: string
}

interface GraphNode {
  id: string
}
const filterUniqueLinks = (links: GraphLink[]) => {
  const alreadySeen: { [key: string]: boolean } = {}

  return uniqBy(links, ({ source, target }) => source + target).filter(
    ({ source, target }) => {
      const key = source + target
      const reverse = target + source
      if (alreadySeen[key] || alreadySeen[reverse]) {
        return false
      } else {
        alreadySeen[key] = true
        alreadySeen[reverse] = true
        return true
      }
    },
  )
}

const getMagentaNode = (id: string) => ({
  id,
  color: 'magenta',
})

const getGreenNode = (id: string) => ({
  id,
  color: 'green',
})

const generateLinksAndNodes = (words: string[]) => {
  let links: GraphLink[] = []
  const nodes = words.map((v) =>
    v.split(' ').length === 1 ? getMagentaNode(v) : getGreenNode(v),
  )

  words.forEach((word) => {
    const subwords = word.split(' ')

    const otherWordsSharingSubwords = flatten(
      subwords.map((sub) => {
        const otherWordsWithSub: string[] = words.filter(
          (target) => target === sub,
        )
        return otherWordsWithSub.map((otherWord) => ({
          source: word,
          target: otherWord,
        }))
      }),
    ).filter(({ source, target }) => source !== target)
    links = links.concat(otherWordsSharingSubwords)
  })
  const uniqueLinks = filterUniqueLinks(links)

  return { links: uniqueLinks, nodes }
}

interface GraphData {
  links: GraphLink[]
  nodes: GraphNode[]
}

type GraphMode = 'Single' | 'All'

const getGraphData = (
  compoundWord: string,
  wordsWithoutSpacesMappedToCompoundWords: { [key: string]: string[] },
): GraphData => {
  const adjacentWords = flatten(
    compoundWord
      .split(' ')
      .map((x) => getAdjacentWords(x, wordsWithoutSpacesMappedToCompoundWords)),
  )
  return generateLinksAndNodes(adjacentWords)
}
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
      mode: 'Single',
      graphDataForWordsInVocabulary: this.calculateGraphData(),
    }
    this.calculateGraphDataForAllWords()
  }

  componentDidMount = () => this.switchMode('Single')
  calculateGraphData = () => {
    const { savedWords, wordsWithoutSpacesMappedToCompoundWords } = this.props

    const graphDataForWordsInVocabulary = savedWords.reduce(
      (acc, savedWord: string) => {
        acc[savedWord] = getGraphData(
          savedWord,
          wordsWithoutSpacesMappedToCompoundWords,
        )

        return acc
      },
      {},
    )
    return graphDataForWordsInVocabulary
  }
  calculateGraphDataForAllWords = async () =>
    new Promise((resolve) => {
      const { wordsWithoutSpacesMappedToCompoundWords } = this.props

      const magentaNodes = Object.keys(
        wordsWithoutSpacesMappedToCompoundWords,
      ).map(getMagentaNode)
      const greenNodes = uniq(
        flatten(values(wordsWithoutSpacesMappedToCompoundWords)),
      ).map(getGreenNode)
      const links = flatten(
        Object.keys(wordsWithoutSpacesMappedToCompoundWords).map((subword) =>
          wordsWithoutSpacesMappedToCompoundWords[subword].map(
            (compoundWord) => ({
              source: subword,
              target: compoundWord,
            }),
          ),
        ),
      )
      const data = {
        nodes: [...magentaNodes, ...greenNodes],
        links,
      }
      resolve('resolved!')
    })

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
        getGraphData(selectedWord, wordsWithoutSpacesMappedToCompoundWords)
    } else {
      const allData: GraphData[] = values(this.calculateGraphData())
      dataToRender = {
        nodes: flatten(allData.map(({ nodes }) => nodes)),
        links: flatten(allData.map(({ links }) => links)),
      }
    }

    this.setState({ dataToRender })
  }
  render() {
    const { mode, dataToRender } = this.state
    const { dictionary, savedWords, selectWord, selectedWord } = this.props

    return (
      <div className={'fill row '}>
        <div className={'col-md-5 '}>
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
          className={`col-md-7`}
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
          <div>
            {dataToRender && dataToRender.nodes.length ? (
              <Graph
                key={selectedWord + mode}
                id="graph-id"
                data={dataToRender}
                config={{ ...config }}
              />
            ) : null}
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

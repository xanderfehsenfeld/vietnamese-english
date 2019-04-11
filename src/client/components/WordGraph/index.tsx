import * as React from 'react'
import { Graph } from 'react-d3-graph'
import { Subscribe, Container } from 'unstated'
import { SearchContainer } from '../SearchPage'
import { VocabularyContainer } from '../Vocabulary'
import { Dictionary } from '../../../model'
import { flatten, uniqBy, uniq } from 'lodash'

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
  collapsible: true,
  focusAnimationDuration: 0.75,
  focusZoom: 1,
  height: 600,
  highlightDegree: 1,
  highlightOpacity: 0.2,
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
  allWords: string[],
  depth = 0,
) => {
  let adjacentWords = allWords.filter((w) =>
    w.split(' ').includes(wordWithNoSpaces),
  )
  if (depth !== 0) {
    adjacentWords = adjacentWords.concat(
      flatten(
        adjacentWords.map((v) => getAdjacentWords(v, allWords, depth - 1)),
      ),
    )
  }

  return uniq(adjacentWords)
}

interface GraphLink {
  source: string
  target: string
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

const generateLinksAndNodes = (words: string[]) => {
  let links: GraphLink[] = []
  const nodes = words.map((v) => ({
    id: v,
    color: v.split(' ').length === 1 ? 'magenta' : 'green',
  }))

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

interface IState {
  mode: 'Shallow' | 'Deep'
}

const WordGraph = () => {
  return (
    <Subscribe to={[SearchContainer, VocabularyContainer]}>
      {(
        { state }: SearchContainer,
        { state: vocabularyState, selectWord }: VocabularyContainer,
      ) => {
        const { dictionary } = state
        const { savedWords } = vocabularyState
        if (dictionary) {
          const selectedWord = vocabularyState.selectedWord || 'méo xệch'

          const allWords = Object.keys(dictionary)

          const adjacentWords = flatten(
            selectedWord
              .split(' ')
              .map((x) => getAdjacentWords(x, allWords, 2)),
          )
          const data = generateLinksAndNodes(adjacentWords)

          return (
            <div className={'fill row '}>
              <div className={'col-md-5 '}>
                {dictionary && savedWords && (
                  <SavedWordsView
                    selectWord={selectWord}
                    selectedWord={selectedWord}
                    dictionary={dictionary}
                    savedWords={savedWords}
                  />
                )}
              </div>
              <div
                className={'col-md-7 '}
                style={{
                  borderLeft: 'solid 1px rgb(222, 226, 230)',
                  paddingTop: 5,
                }}
              >
                <div
                  className="btn-group"
                  role="group"
                  aria-label="Basic example"
                />
                <Graph
                  key={selectedWord}
                  id="graph-id"
                  data={data}
                  config={config}
                />
              </div>
            </div>
          )
        } else {
          return null
        }
      }}
    </Subscribe>
  )
}

export default WordGraph

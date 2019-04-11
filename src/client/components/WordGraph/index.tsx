import * as React from 'react'
import { Graph } from 'react-d3-graph'
import { Subscribe } from 'unstated'
import { SearchContainer } from '../SearchPage'
import { VocabularyContainer } from '../Vocabulary'
import { Dictionary } from '../../../model'
import { flatten } from 'lodash'

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

const getConnectedNodesForWord = (
  subword: string,
  words: string[],
  depth = 1,
): { nodes: { id: string }[]; links: { source: string; target: string }[] } => {
  const releventWords = words.filter(
    (v) => v !== subword && v.split(' ').includes(subword),
  )

  // let deeperNodes = []
  // let deeperLinks = []
  // if (depth !== 0) {
  //   const x = releventWords.map((v) => {
  //     return {
  //       id: v,
  //       // ...v
  //       //   .split(' ')
  //       //   .map((v) => getConnectedNodesForWord(v, words, depth - 1)),
  //     }
  //   })
  //   console.log(x)
  // }

  const nodes = releventWords.map((id) => ({ id, color: 'green' }))

  const links = releventWords.map((id) => ({
    source: subword,
    target: id,
    renderLabel: true,
    label: subword,
    labelProperty: 'label',
  }))

  return {
    nodes,
    links,
  }
}

const generateDataForWord = (selectedWord: string, allWords: string[]) => {
  const subwords = selectedWord.split(' ')
  const neighborWords = subwords.map((word) => ({
    id: word,
    size: 900,
    color: 'magenta',
    symbolType: 'square',
    highlightColor: 'forestgreen',
  }))

  const links = neighborWords
    .map(({ id }, i) => {
      const next = neighborWords[i + 1]
      if (next) {
        return {
          source: id,
          target: next.id,
        }
      } else {
        return undefined
      }
    })
    .filter((v) => v)

  const connectedWordsData = subwords.map((w) =>
    getConnectedNodesForWord(w, allWords),
  )

  const data = {
    nodes: [
      ...neighborWords,
      ...flatten(connectedWordsData.map(({ nodes }) => nodes)),
    ],
    links: [...links, ...flatten(connectedWordsData.map(({ links }) => links))],
  }

  return data
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
          const data = generateDataForWord(
            selectedWord,
            Object.keys(dictionary),
          )

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
                style={{ borderLeft: 'solid 1px rgb(222, 226, 230)' }}
              >
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

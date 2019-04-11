import * as React from 'react'
import { Graph } from 'react-d3-graph'
import { Subscribe } from 'unstated'
import { SearchContainer } from '../SearchPage'
import { VocabularyContainer } from '../Vocabulary'

const config = {
  automaticRearrangeAfterDropNode: true,
  collapsible: false,
  directed: false,
  focusAnimationDuration: 0.75,
  focusZoom: 1,
  height: 400,
  highlightDegree: 1,
  highlightOpacity: 0.2,
  linkHighlightBehavior: true,
  maxZoom: 8,
  minZoom: 0.1,
  nodeHighlightBehavior: true,
  panAndZoom: false,
  staticGraph: false,
  width: 400,
  d3: {
    alphaTarget: 0.05,
    gravity: -100,
    linkLength: 100,
    linkStrength: 1,
  },
  node: {
    color: '#d3d3d3',
    fontColor: 'black',
    fontSize: 12,
    fontWeight: 'normal',
    highlightColor: 'gray',
    highlightFontSize: 12,
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
    fontSize: 8,
    fontWeight: 'normal',
    highlightColor: 'blue',
    highlightFontSize: 8,
    highlightFontWeight: 'normal',
    labelProperty: 'label',
    mouseCursor: 'pointer',
    opacity: 1,
    renderLabel: false,
    semanticStrokeWidth: false,
    strokeWidth: 4,
  },
}

const data = {
  nodes: [{ id: 'Harry' }, { id: 'Sally' }, { id: 'Alice' }],
  links: [
    { source: 'Harry', target: 'Sally' },
    { source: 'Harry', target: 'Alice' },
  ],
}

const WordGraph = () => {
  return (
    <Subscribe to={[SearchContainer, VocabularyContainer]}>
      {(
        { state }: SearchContainer,
        { state: vocabularyState }: VocabularyContainer,
      ) => {
        const { dictionary } = state

        if (dictionary) {
          const allWords = Object.keys(dictionary)

          const exampleWord = vocabularyState.selectedWord || 'xệch'

          const neighborWords = allWords.filter(
            (v) =>
              v.split(' ').includes(exampleWord) && v.split(' ').length > 1,
          )
          console.log(neighborWords)
          return (
            <Graph
              id="graph-id"
              data={{
                nodes: [
                  { id: exampleWord },
                  ...neighborWords.map((word) => ({ id: word })),
                ],
                links: neighborWords.map((word) => ({
                  source: exampleWord,
                  target: word,
                })),
              }}
              config={config}
            />
          )
        } else {
          return null
        }
      }}
    </Subscribe>
  )
}

export default WordGraph

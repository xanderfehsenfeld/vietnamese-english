import { GraphData, GraphLink } from '..'
import { flatten, uniqBy, uniq } from 'lodash'

export const filterUniqueLinks = (links: GraphLink[]) => {
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

const getAdjacentWords = (
  wordWithNoSpaces: string,
  subWordMappedToCompoundWords: { [key: string]: string[] },
) => {
  let adjacentWords = subWordMappedToCompoundWords[wordWithNoSpaces]
  if (adjacentWords) {
    return uniq([...adjacentWords, wordWithNoSpaces])
  } else {
    return []
  }
}

export const getGraphDataForCompoundWord = (
  compoundWord: string,
  wordsWithoutSpacesMappedToCompoundWords: { [key: string]: string[] },
): GraphData => {
  const adjacentWords = [
    ...flatten(
      compoundWord
        .split(' ')
        .map((x) =>
          getAdjacentWords(x, wordsWithoutSpacesMappedToCompoundWords),
        ),
    ),
    compoundWord,
  ]

  const compoundWords = adjacentWords.filter(
    (wordText) => wordText.split(' ').length !== 1,
  )
  const singularWords = adjacentWords.filter(
    (wordText) => wordText.split(' ').length === 1,
  )
  const compoundNodes = compoundWords.map((wordText) => {
    const hiddenAdjacentNodes = flatten(
      wordText
        .split(' ')
        .map((v) =>
          getAdjacentWords(v, wordsWithoutSpacesMappedToCompoundWords).filter(
            (adj) => !adjacentWords.includes(adj),
          ),
        ),
    )
    if (hiddenAdjacentNodes.length) {
      return { ...getGreenNode(wordText), hiddenAdjacentNodes, color: 'orange' }
    } else {
      return { ...getGreenNode(wordText), hiddenAdjacentNodes }
    }
  })

  const nodes = uniqBy(
    [...singularWords.map(getMagentaNode), ...compoundNodes],
    ({ id }) => id,
  )

  const links: GraphLink[] = filterUniqueLinks(
    flatten(
      singularWords.map((singularWord) => {
        const adjacents: undefined | string[] =
          wordsWithoutSpacesMappedToCompoundWords[singularWord]

        if (adjacents) {
          return adjacents.map((otherWord) => ({
            source: otherWord,
            target: singularWord,
          }))
        } else {
          return []
        }
      }),
    ),
  )
  return { links, nodes }
}

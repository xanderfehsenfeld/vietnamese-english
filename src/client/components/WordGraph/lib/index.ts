import { GraphData, IGraphLink } from '..'
import { flatten, uniqBy, uniq } from 'lodash'

export const filterUniqueLinks = (links: IGraphLink[]) => {
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
    return uniq([wordWithNoSpaces])
  } else {
    return []
  }
}

export const getHiddenAdjacentWords = (
  word: string,
  wordsWithoutSpacesMappedToCompoundWords: { [key: string]: string[] },
  alreadyDisplayedWords: string[],
) => {
  const wordHasSpaces = word.includes(' ')
  if (!wordHasSpaces) {
    const isAWord = wordsWithoutSpacesMappedToCompoundWords[word]
    const hiddenAdjacents =
      isAWord &&
      wordsWithoutSpacesMappedToCompoundWords[word].filter(
        (adjacentWord) =>
          !alreadyDisplayedWords.includes(adjacentWord) &&
          adjacentWord !== word,
      )
    return hiddenAdjacents
  } else {
    return word.split(' ').filter((singularWord) => {
      const isAWord = wordsWithoutSpacesMappedToCompoundWords[singularWord]

      return (
        isAWord &&
        singularWord !== word &&
        !alreadyDisplayedWords.includes(singularWord)
      )
    })
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
    return {
      ...getGreenNode(wordText),
      hiddenAdjacentNodes: getHiddenAdjacentWords(
        wordText,
        wordsWithoutSpacesMappedToCompoundWords,
        adjacentWords,
      ),
    }
  })

  const singularNodes = singularWords
    .map(getMagentaNode)
    .map(({ id, ...rest }) => ({
      id,
      ...rest,
      hiddenAdjacentNodes: getHiddenAdjacentWords(
        id,
        wordsWithoutSpacesMappedToCompoundWords,
        adjacentWords,
      ),
    }))

  const nodes = uniqBy([...singularNodes, ...compoundNodes], ({ id }) => id)

  const links: IGraphLink[] = filterUniqueLinks(
    singularWords.map((singularWord) => ({
      target: singularWord,
      source: compoundWord,
    })),
  )
  return { links, nodes }
}

import { IGraphLink, IGraphData } from '..'
import { uniqBy, compact, flatten, orderBy } from 'lodash'
import { IGraphNode } from '../components/GraphNode'

const filterUniqueLinks = (links: IGraphLink[]) => {
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

const getHiddenAdjacentWords = (
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
export const removeNodeFromGraphData = (
  toRemove: string,
  graphData: IGraphData,
): IGraphData => {
  const nodesWhichAreNotToRemove = graphData.nodes.filter(
    ({ id }) => id !== toRemove,
  )
  const links = graphData.links.filter(
    ({ source, target }) => source !== toRemove && target !== toRemove,
  )

  const nodesToRemove = graphData.links
    .filter(({ source, target }) => source === toRemove || target === toRemove)
    .map(({ source, target }) => (source === toRemove ? target : source))
    .filter(
      (id) =>
        !links.some(({ source, target }) => id === source || id === target) &&
        graphData.nodes.find(({ id: idOfNode }) => idOfNode === id).color !==
          'green',
    )

  const nodes = nodesWhichAreNotToRemove.filter(
    ({ id }) => !nodesToRemove.includes(id),
  )

  return { nodes, links: links }
}
export const mergeGraphDatas = (a: IGraphData, b: IGraphData): IGraphData => {
  const nodes = uniqBy(a.nodes.concat(b.nodes), ({ id }) => id)

  const links = filterUniqueLinks(
    a.links
      .concat(b.links)
      .filter(
        ({ source, target }) =>
          nodes.some(({ id }) => source === id) &&
          nodes.some(({ id }) => target === id),
      ),
  )

  return {
    nodes,
    links: links.filter(
      ({ source, target }) =>
        nodes.some(({ id }) => source === id) &&
        nodes.some(({ id }) => target === id),
    ),
  }
}

export const getGraphDataWithNextNodeAdded = (
  idOfNodeClicked: string,
  currentGraphState: IGraphData,
  wordsWithoutSpacesMappedToCompoundWords: {
    [key: string]: string[]
  },
  lastClicked?: {
    x: number
    y: number
  },
): IGraphData => {
  const dataToAdd = compact(
    idOfNodeClicked
      .split(' ')
      .filter((v) => v)
      .map((subword) => {
        const neighbors = wordsWithoutSpacesMappedToCompoundWords[subword]
        if (neighbors) {
          if (subword !== idOfNodeClicked) {
            return {
              nodes: [
                {
                  id: subword,
                },
              ],
              links: [
                {
                  source: idOfNodeClicked,
                  target: subword,
                },
              ],
            }
          } else {
            const nodes = neighbors.map((id) => ({ id }))
            const links = neighbors.map((id) => ({
              source: id,
              target: subword,
            }))
            return { nodes, links }
          }
        }
        return undefined
      }),
  )
  const nodesToAdd: IGraphNode[] = flatten(dataToAdd.map(({ nodes }) => nodes))
  const linksToAdd: IGraphLink[] = flatten(dataToAdd.map(({ links }) => links))

  const [uniqueNodeToAdd] = orderBy(
    nodesToAdd.filter(
      ({ id }) =>
        !currentGraphState.nodes.some(
          ({ id: idAlreadyPresent }) => idAlreadyPresent === id,
        ),
    ),
    ({ id }) =>
      -1 *
      currentGraphState.nodes.filter(({ id: idAlreadyPresent }) =>
        id.split(' ').some((sub) => idAlreadyPresent.includes(sub)),
      ).length,
  )

  if (uniqueNodeToAdd) {
    const nodes = currentGraphState.nodes.concat([
      { ...uniqueNodeToAdd, ...lastClicked },
    ])

    const nodesWithHiddenAdjacent = nodes.map(({ id, ...rest }) => ({
      ...rest,
      id,
      hiddenAdjacentNodes: getHiddenAdjacentWords(
        id,
        wordsWithoutSpacesMappedToCompoundWords,
        nodes.map(({ id }) => id),
      ),
    }))

    const links = filterUniqueLinks(
      currentGraphState.links
        .concat(linksToAdd)
        .filter(
          ({ source, target }) =>
            nodes.some(({ id }) => source === id) &&
            nodes.some(({ id }) => target === id),
        ),
    )

    return { nodes: nodesWithHiddenAdjacent, links }
  }
  return currentGraphState
}

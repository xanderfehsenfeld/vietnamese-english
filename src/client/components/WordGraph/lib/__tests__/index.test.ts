import { getGraphDataForCompoundWord } from '..'

describe(getGraphDataForCompoundWord.name, () => {
  const { nodes, links } = getGraphDataForCompoundWord('rest room', {
    rest: ['rest easy', 'rest happily', 'rest room'],
    happily: ['happily married', 'rest happily'],
  })

  it('returns expected nodes', () => {
    const wordsInNodes = nodes.map(({ id }) => id)

    const expectedItems = ['rest room', 'rest easy', 'rest happily', 'rest']
    expectedItems.forEach((expectedItem) =>
      expect(wordsInNodes).toContain(expectedItem),
    )

    const notExpected = ['room', 'happily married', 'happily']

    notExpected.forEach((notExpectedItem) =>
      expect(wordsInNodes).not.toContain(notExpectedItem),
    )
  })

  it('includes hidden adjacent nodes if there are any', () => {
    const restHappilyNode = nodes.find((v) => v.id === 'rest happily')
    expect(restHappilyNode).toMatchObject({
      id: 'rest happily',
      hiddenAdjacentNodes: ['happily married', 'happily'],
      color: 'green',
    })
  })

  it('returns expected links', () => {
    const link = links.find(
      (v) => v.source === 'rest room' && v.target === 'rest',
    )
    expect(link).toBeDefined()
  })
})

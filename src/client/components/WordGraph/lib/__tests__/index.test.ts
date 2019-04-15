import { getGraphDataForCompoundWord } from '..'

describe(getGraphDataForCompoundWord.name, () => {
  const { nodes, links } = getGraphDataForCompoundWord('rest room', {
    rest: ['rest easy', 'rest happily', 'rest room'],
    happily: ['happily married', 'rest happily'],
  })

  it('returns expected nodes', () => {
    const wordsInNodes = nodes.map(({ id }) => id)

    const expectedItems = ['rest room', 'rest']
    expectedItems.forEach((expectedItem) =>
      expect(wordsInNodes).toContain(expectedItem),
    )

    const notExpected = [
      'room',
      'happily married',
      'happily',
      'rest easy',
      'rest happily',
    ]

    notExpected.forEach((notExpectedItem) =>
      expect(wordsInNodes).not.toContain(notExpectedItem),
    )
  })

  it('does not include links to nonexistent nodes', () => {
    const linksToNonexistentNodes = links.filter(
      ({ source, target }) =>
        !nodes.some(({ id }) => source === id) ||
        !nodes.some(({ id }) => target === id),
    )
    expect(linksToNonexistentNodes).toHaveLength(0)
  })

  it('returns expected links', () => {
    const link = links.find(
      (v) => v.source === 'rest room' && v.target === 'rest',
    )
    expect(link).toBeDefined()
  })
})

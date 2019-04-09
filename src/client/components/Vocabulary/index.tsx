import { Subscribe } from 'unstated'
import React from 'react'
import DefinitionPage from '../DefinitionPage'
import { SearchContainer as VocabularyContainer } from '../SearchPage'

const Vocabulary = () => (
  <Subscribe to={[VocabularyContainer]}>
    {({ state, fetchDictionary }: VocabularyContainer) => {
      if (!state.isFetching && !state.dictionary) {
        fetchDictionary()
      }
      const { savedWords, dictionary } = state
      return (
        <div className={'container'}>
          <h3>Vocabulary</h3>
          <div>
            {dictionary &&
              savedWords &&
              savedWords
                .slice(0, 15)
                .map((v) => ({ text: v, definitions: dictionary[v] }))

                .map((v) => (
                  <div
                    key={v.text}
                    className={'suggestion'}
                    style={{
                      cursor: 'pointer',
                      paddingBottom: 4,
                      paddingTop: 3,
                    }}
                  >
                    <DefinitionPage definitions={v.definitions} text={v.text}>
                      {v.text}
                    </DefinitionPage>
                  </div>
                ))}
            {dictionary && savedWords.length === 0 && (
              <h4>You have no saved words in your vocabulary</h4>
            )}
          </div>
        </div>
      )
    }}
  </Subscribe>
)

export default Vocabulary

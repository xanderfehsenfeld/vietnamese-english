import { Subscribe } from 'unstated'
import * as React from 'react'
import DefinitionPage from '../DefinitionPage'
import { AppContainer } from '../SearchPage'
import { Link, Switch, Route } from 'react-router-dom'

const SavedWords = ({ style }: { style?: React.CSSProperties }) => (
  <Subscribe to={[AppContainer]}>
    {({ state, fetchTranslations, selectWord }: AppContainer) => {
      const {
        savedWords,
        isFetchingSavedWords,
        didInitialFetch,
        selectedWord,
      } = state

      if (!isFetchingSavedWords && !didInitialFetch) {
        return null
      } else if (isFetchingSavedWords) {
        return (
          <div style={{ height: '100%' }}>
            <span>Fetching...</span>
          </div>
        )
      } else if (savedWords) {
        const {
          dictionary,
          translationVietnameseEnglish,
          isFetchingTranslations,
          checkedWords,
        } = state

        const savedWordsInOrder = savedWords.slice(0, 15).reverse()

        const savedWordsWithoutTranslations = savedWords.filter(
          (w) => !translationVietnameseEnglish[w],
        )

        if (savedWordsWithoutTranslations.length && !isFetchingTranslations) {
          fetchTranslations(savedWordsWithoutTranslations)
        }
        return (
          <div style={style}>
            <div>
              {dictionary &&
                savedWordsInOrder

                  .map((v) => ({ text: v, definitions: dictionary[v] }))
                  .map(({ text, definitions }) => {
                    const isChecked = checkedWords.includes(text)
                    return (
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
                        <DefinitionPage
                          isChecked={isChecked}
                          translation={translationVietnameseEnglish[text]}
                          definitions={definitions}
                          text={text}
                          isSelected={selectedWord === text}
                        >
                          {text}
                        </DefinitionPage>
                      </div>
                    )
                  })}
              {dictionary && savedWords.length === 0 && (
                <h6>
                  Nothing here. Add words using the{' '}
                  <Switch>
                    <Route path={'/'} exact render={() => 'Search pane.'} />
                    <Route
                      render={() => <Link to={'/'}>{'Search pane.'}</Link>}
                    />
                  </Switch>
                </h6>
              )}
            </div>
          </div>
        )
      }
    }}
  </Subscribe>
)

export default SavedWords

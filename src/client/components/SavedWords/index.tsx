import { Subscribe, Container } from 'unstated'
import * as React from 'react'
import DefinitionPage from '../DefinitionPage'
import { AppContainer } from '../SearchPage'
import axios from 'axios'
import { Link, Switch, Route } from 'react-router-dom'
import SavedWordsBadge from '../SavedWordsBadge'
import { orderBy } from 'lodash'

interface IState {
  savedWords: string[]
  isFetchingSavedWords: boolean
  didInitialFetch: boolean
  selectedWord?: string
}
export class SavedWordsContainer extends Container<IState> {
  state: IState = {
    savedWords: [],
    isFetchingSavedWords: false,
    didInitialFetch: false,
  }
  selectWord = (word: string) => {
    this.setState({ selectedWord: word })
  }
  persistSavedWords = async (state: any) => await axios.post('state', state)
  fetchSavedWords = async () => {
    this.setState({ isFetchingSavedWords: true })
    try {
      const state = (await axios.get('state')).data
      this.setState({
        savedWords: state,
        isFetchingSavedWords: false,
        didInitialFetch: true,
      })
    } catch (e) {
      console.error(e)
    }

    this.setState({
      isFetchingSavedWords: false,
      didInitialFetch: true,
    })
  }

  addWordToSavedWords = async (word: string) => {
    const newSavedWords = this.state.savedWords.concat([word])
    this.setState({ savedWords: newSavedWords })
    await this.persistSavedWords(newSavedWords)
  }

  removeWordFromSavedWords = async (word: string) => {
    const newSavedWords = this.state.savedWords.filter((w) => w !== word)
    this.setState({ savedWords: newSavedWords })
    await this.persistSavedWords(newSavedWords)
  }
}

const SavedWords = ({
  style,
}: {
  style?: React.HTMLAttributes<HTMLDivElement>
}) => (
  <Subscribe to={[SavedWordsContainer, AppContainer]}>
    {(
      { state, selectWord }: SavedWordsContainer,
      { state: stateWithDictionary, fetchTranslations }: AppContainer,
    ) => {
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
        } = stateWithDictionary

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

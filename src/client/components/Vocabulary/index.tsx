import { Subscribe, Container } from 'unstated'
import * as React from 'react'
import DefinitionPage from '../DefinitionPage'
import { AppContainer } from '../SearchPage'
import axios from 'axios'
import { Link, Switch, Route } from 'react-router-dom'
import VocabularyBadge from '../VocabularyBadge'
import { orderBy } from 'lodash'

interface IState {
  savedWords: string[]
  isFetchingVocabulary: boolean
  didInitialFetch: boolean
  selectedWord?: string
}
export class VocabularyContainer extends Container<IState> {
  state: IState = {
    savedWords: [],
    isFetchingVocabulary: false,
    didInitialFetch: false,
  }
  selectWord = (word: string) => {
    this.setState({ selectedWord: word })
  }
  persistVocabulary = async (state: any) => await axios.post('state', state)
  fetchVocabulary = async () => {
    this.setState({ isFetchingVocabulary: true })
    try {
      const state = (await axios.get('state')).data
      this.setState({
        savedWords: state,
        isFetchingVocabulary: false,
        didInitialFetch: true,
      })
    } catch (e) {
      console.error(e)
    }

    this.setState({
      isFetchingVocabulary: false,
      didInitialFetch: true,
    })
  }

  addWordToSavedWords = async (word: string) => {
    const newSavedWords = this.state.savedWords.concat([word])
    this.setState({ savedWords: newSavedWords })
    await this.persistVocabulary(newSavedWords)
  }

  removeWordFromVocabulary = async (word: string) => {
    const newSavedWords = this.state.savedWords.filter((w) => w !== word)
    this.setState({ savedWords: newSavedWords })
    await this.persistVocabulary(newSavedWords)
  }
}

const Vocabulary = ({
  style,
}: {
  style?: React.HTMLAttributes<HTMLDivElement>
}) => (
  <Subscribe to={[VocabularyContainer, AppContainer]}>
    {(
      { state, selectWord }: VocabularyContainer,
      { state: stateWithDictionary, fetchTranslations }: AppContainer,
    ) => {
      const {
        savedWords,
        isFetchingVocabulary,
        didInitialFetch,
        selectedWord,
      } = state

      if (!isFetchingVocabulary && !didInitialFetch) {
        return null
      } else if (isFetchingVocabulary) {
        return (
          <div style={{ height: '100%' }}>
            <h3>Vocabulary</h3>

            <span>Fetching...</span>
          </div>
        )
      } else if (savedWords) {
        const {
          dictionary,
          translationVietnameseEnglish,
          isFetchingTranslations,
        } = stateWithDictionary

        const savedWordsInOrder = orderBy(
          savedWords.slice(0, 15).reverse(),
          (w) => !(w === selectedWord),
        )

        const savedWordsWithoutTranslations = savedWords.filter(
          (w) => !translationVietnameseEnglish[w],
        )

        if (savedWordsWithoutTranslations.length && !isFetchingTranslations) {
          fetchTranslations(savedWordsWithoutTranslations)
        }
        return (
          <div style={style}>
            <h3>
              Vocabulary <VocabularyBadge />
            </h3>
            <div>
              {dictionary &&
                savedWordsInOrder

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
                      onClick={() => selectWord(v.text)}
                    >
                      <DefinitionPage
                        translation={translationVietnameseEnglish[v.text]}
                        definitions={v.definitions}
                        text={v.text}
                        isSelected={selectedWord === v.text}
                      >
                        {v.text}
                      </DefinitionPage>
                    </div>
                  ))}
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

export default Vocabulary

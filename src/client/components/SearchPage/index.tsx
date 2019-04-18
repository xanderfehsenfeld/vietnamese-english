import * as React from 'react'
import { Subscribe, Container } from 'unstated'
import './index.scss'
import axios from 'axios'
import { Dictionary, Definition, Translation } from 'model'
import { pickBy, map, orderBy, uniqBy, uniq, throttle, once } from 'lodash'
import DefinitionPage from '../DefinitionPage'

interface ISuggestion {
  text: string
  translation?: string
  definitions: Definition[]
  start: number
}

interface ISavedWordsState {
  savedWords: string[]
  isFetchingSavedWords: boolean
  didInitialFetch: boolean
  selectedWord?: string
}

type IState = ISavedWordsState & {
  query: string
  suggestions?: ISuggestion[]
  wordsWithoutSpacesMappedToCompoundWords?: { [key: string]: string[] }
  showExample: boolean
  isFetching: boolean
  dictionary?: Dictionary
  selectedWord?: string
  translationVietnameseEnglish: { [key: string]: string }
  isFetchingTranslations: boolean
  checkedWords: string[]
}

type SubType<Base> = { [Key in keyof Base]?: Base[Key] }

const removeAccents = (str: string) =>
  str.normalize('NFD').replace(/[\u0300-\u036f]/g, '')

export class AppContainer extends Container<IState> {
  state: IState = {
    query: '',
    isFetching: false,
    showExample: true,
    translationVietnameseEnglish: {},
    isFetchingTranslations: false,
    checkedWords: [],
    savedWords: [],
    isFetchingSavedWords: false,
    didInitialFetch: false,
  }

  toggleWordFromCheckedWords = (word: string) => {
    const { checkedWords } = this.state
    let newCheckedWords
    if (checkedWords.includes(word)) {
      newCheckedWords = checkedWords.filter((v) => v !== word)
    } else {
      newCheckedWords = checkedWords.concat([word])
    }
    this.setState({ checkedWords: newCheckedWords })
    this.persistState({ checkedWords: newCheckedWords })
  }

  toggleShowExample = () => {
    this.setState({ showExample: !this.state.showExample })
  }
  changeSearchQuery = (changedQuery: string) => {
    const formattedQuery = changedQuery.toLowerCase()
    const {
      dictionary,
      translationVietnameseEnglish,
      isFetchingTranslations,
    } = this.state
    if (dictionary && formattedQuery) {
      const dictionaryFilteredByQuery = pickBy(
        dictionary,
        (value, key) =>
          key.toLowerCase().includes(formattedQuery) ||
          removeAccents(key.toLowerCase()).includes(formattedQuery),
      )

      const suggestions = map(
        dictionaryFilteredByQuery,
        (value, key): ISuggestion => ({
          text: key,
          definitions: value,
          start: Math.max(
            key
              .toLowerCase()
              .normalize('NFD')
              .replace(/[\u0300-\u036f]/g, '')
              .indexOf(formattedQuery),
            key.toLowerCase().indexOf(formattedQuery),
          ),
        }),
      ).slice(0, 20)

      const wordsWithoutTranslation = suggestions
        .filter(({ text }) => !translationVietnameseEnglish[text])
        .map(({ text }) => text)
      if (!isFetchingTranslations && wordsWithoutTranslation.length) {
        this.fetchTranslations(wordsWithoutTranslation)
      }

      const orderedSuggestions = uniqBy(
        orderBy(suggestions, ({ text }) => text.length),
        ({ text }) => text.toLowerCase(),
      )

      this.setState({
        suggestions: orderedSuggestions,
      })
    } else if (changedQuery === '') {
      this.setState({ suggestions: [] })
    }

    this.setState({ query: changedQuery, selectedWord: undefined })
  }
  fetchTranslations = async (wordsToTranslate: string[]) => {
    const { isFetchingTranslations, translationVietnameseEnglish } = this.state

    if (isFetchingTranslations) {
    } else if (wordsToTranslate.length) {
      const wordsWithoutTranslation = uniq(
        wordsToTranslate.filter((text) => !translationVietnameseEnglish[text]),
      )

      if (wordsWithoutTranslation.length) {
        this.setState({ isFetchingTranslations: true })

        const query = wordsWithoutTranslation.map((v) => `q=${v}`).join('&')
        try {
          const response: Translation[] = (await axios.get(
            `translation?${query}`,
          )).data

          const { translationVietnameseEnglish } = this.state
          const withAddedTranslations = { ...translationVietnameseEnglish }

          response.forEach((translation) => {
            withAddedTranslations[translation.vietnamese] = translation.english
          })

          this.setState({ translationVietnameseEnglish: withAddedTranslations })
        } catch (e) {
          console.log(e)
        }

        this.setState({ isFetchingTranslations: false })
      }
    }
  }

  fetchDictionary = async () => {
    this.setState({ isFetching: true })

    const response: {
      definitions: Dictionary
      wordsWithoutSpacesMappedToCompoundWords: { [key: string]: string[] }
    } = (await axios.get('definitions.json')).data

    const { wordsWithoutSpacesMappedToCompoundWords, definitions } = response

    this.setState({
      dictionary: definitions,
      wordsWithoutSpacesMappedToCompoundWords,
      isFetching: false,
    })
  }

  selectWord = (word: string) => {
    this.setState({ selectedWord: word })
  }
  persistState = throttle(async (state: SubType<IState>) => {
    const {
      translationVietnameseEnglish,
      savedWords,
      checkedWords,
    } = this.state

    await axios.post('state', {
      translationVietnameseEnglish,
      savedWords,
      checkedWords,
      ...state,
    })
  }, 5000)
  fetchState = once(async () => {
    this.setState({ isFetchingSavedWords: true })
    try {
      const state: SubType<IState> = (await axios.get('state')).data
      this.setState({
        ...state,
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
  })

  addWordToSavedWords = async (word: string) => {
    const { savedWords } = this.state
    const newSavedWords = savedWords.concat([word])
    this.setState({ savedWords: newSavedWords })
    await this.persistState({
      savedWords: newSavedWords,
    })
  }

  removeWordFromSavedWords = async (word: string) => {
    const { savedWords } = this.state
    const newSavedWords = savedWords.filter((w) => w !== word)
    this.setState({ savedWords: newSavedWords })
    await this.persistState({
      savedWords: newSavedWords,
    })
  }
}

const Search = () => (
  <Subscribe to={[AppContainer]}>
    {({
      state,
      changeSearchQuery,
      toggleShowExample,
      selectWord,
    }: AppContainer) => {
      const {
        showExample,
        query,
        isFetching,
        suggestions,
        translationVietnameseEnglish,
        selectedWord,
        savedWords,
      } = state

      return (
        <React.Fragment>
          <div
            className="md-form mt-0"
            style={{
              paddingRight: 14,
              paddingLeft: 14,
              paddingTop: 3,
              paddingBottom: 3,
            }}
          >
            <input
              className="form-control"
              type="text"
              disabled={isFetching}
              placeholder={
                isFetching ? 'Fetching...' : 'Search to add words...'
              }
              aria-label="Search"
              onChange={(e) => changeSearchQuery(e.target.value)}
              value={query}
            />
          </div>
          {suggestions && suggestions.length !== 0 ? (
            <React.Fragment>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginRight: 14,
                  marginLeft: 14,
                  borderBottom: 'solid 1px rgb(222, 226, 230)',
                }}
              >
                <h5 style={{ color: 'gray', marginTop: 5, marginBottom: 0 }}>
                  {suggestions.slice(0, 15).length + ' results'}
                </h5>
                <div>
                  <input
                    style={{ marginTop: 10 }}
                    checked={showExample}
                    data-id={'t'}
                    onChange={toggleShowExample}
                    type={'checkbox'}
                  />

                  <label data-for={'t'} style={{ margin: 5 }}>
                    show example
                  </label>
                </div>
              </div>

              <div
                style={{
                  height: '90%',
                  overflowY: 'auto',
                  padding: 14,
                }}
              >
                {suggestions &&
                  suggestions.slice(0, 15).map((suggestion) => (
                    <div
                      key={suggestion.text}
                      className={'suggestion'}
                      style={{
                        cursor: 'pointer',
                        paddingBottom: 4,
                        paddingTop: 3,
                      }}
                      onClick={() => {
                        changeSearchQuery(suggestion.text)
                        if (savedWords.includes(suggestion.text)) {
                          selectWord(suggestion.text)
                        }
                      }}
                      title={'click to refine search'}
                    >
                      <DefinitionPage
                        definitions={suggestion.definitions}
                        text={suggestion.text}
                        translation={
                          translationVietnameseEnglish[suggestion.text] || '...'
                        }
                        showExample={showExample}
                        isSelected={suggestion.text === selectedWord}
                      >
                        {suggestion.text.substring(0, suggestion.start)}
                        <strong>
                          {suggestion.text.substring(
                            suggestion.start,
                            suggestion.start + query.length,
                          )}
                        </strong>
                        {suggestion.text.substring(
                          suggestion.start + query.length,
                        )}
                      </DefinitionPage>
                    </div>
                  ))}
              </div>
            </React.Fragment>
          ) : null}
        </React.Fragment>
      )
    }}
  </Subscribe>
)

export default Search

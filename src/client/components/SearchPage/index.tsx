import * as React from 'react'
import { Subscribe, Container } from 'unstated'
import './index.scss'
import axios from 'axios'
import { Dictionary, Definition } from 'model'
import { pickBy, map, orderBy, uniqBy } from 'lodash'
import DefinitionPage from '../DefinitionPage'
import { VocabularyContainer } from '../Vocabulary'

interface IState {
  query: string
  subwordSuggestions?: {
    text: string

    definitions: Definition[]
    start: number
  }[]
  wordsWithoutSpacesMappedToCompoundWords?: { [key: string]: string[] }
  showExample: boolean
  isFetching: boolean
  dictionary?: Dictionary
  selectedWord?: string
}

const removeAccents = (str: string) =>
  str.normalize('NFD').replace(/[\u0300-\u036f]/g, '')

export class AppContainer extends Container<IState> {
  state: IState = {
    query: '',
    isFetching: false,
    showExample: true,
  }

  toggleShowExample = () => {
    this.setState({ showExample: !this.state.showExample })
  }

  onChange = (changedQuery: string) => {
    const formattedQuery = changedQuery.toLowerCase()
    const { dictionary } = this.state
    if (dictionary && formattedQuery) {
      const dictionaryFilteredByQuery = pickBy(
        dictionary,
        (value, key) =>
          key.toLowerCase().includes(formattedQuery) ||
          removeAccents(key.toLowerCase()).includes(formattedQuery),
      )

      const suggestions = map(dictionaryFilteredByQuery, (value, key) => ({
        text: key,
        definitions: value,
        start: Math.max(
          key
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .indexOf(formattedQuery),
          key
            .toLowerCase()

            .indexOf(formattedQuery),
        ),
      }))
      const orderedSuggestions = uniqBy(
        orderBy(suggestions, ({ text }) => text.length),
        ({ text }) => text.toLowerCase(),
      )

      this.setState({
        subwordSuggestions: orderedSuggestions,
      })
    } else if (changedQuery === '') {
      this.setState({ subwordSuggestions: [] })
    }

    this.setState({ query: changedQuery, selectedWord: undefined })
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
}

const Search = () => (
  <Subscribe to={[AppContainer, VocabularyContainer]}>
    {(
      { state, onChange, toggleShowExample }: AppContainer,
      { state: vocabularyState, selectWord }: VocabularyContainer,
    ) => {
      const { showExample, query, isFetching, subwordSuggestions } = state
      const { selectedWord, savedWords } = vocabularyState

      let suggestions = subwordSuggestions

      return (
        <div
          style={{
            height: '100%',
            overflowY: 'hidden',
            maxHeight: 'calc(100vh - 10px) ',
          }}
        >
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
              onChange={(e) => onChange(e.target.value)}
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
                        onChange(suggestion.text)
                        if (savedWords.includes(suggestion.text)) {
                          selectWord(suggestion.text)
                        }
                      }}
                      title={'click to refine search'}
                    >
                      <DefinitionPage
                        definitions={suggestion.definitions}
                        text={suggestion.text}
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
        </div>
      )
    }}
  </Subscribe>
)

export default Search

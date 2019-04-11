import React from 'react'
import { Subscribe, Container } from 'unstated'
import './index.scss'
import axios from 'axios'
import { Dictionary, Definition } from 'model'
import { pickBy, map, orderBy, uniqBy } from 'lodash'
import DefinitionPage from '../DefinitionPage'
import { VocabularyContainer } from '../Vocabulary'

interface IState {
  query: string
  suggestions?: {
    text: string

    definitions: Definition[]
    start: number
  }[]
  isFetching: boolean
  dictionary?: Dictionary
  selectedWord?: string
}

const removeAccents = (str: string) =>
  str.normalize('NFD').replace(/[\u0300-\u036f]/g, '')

export class SearchContainer extends Container<IState> {
  state: IState = { query: '', isFetching: false }
  persistState = async (state: any) =>
    await axios.post('/persistClientState', state)
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
        suggestions: orderedSuggestions,
      })
    } else if (changedQuery === '') {
      this.setState({ suggestions: [] })
    }

    this.setState({ query: changedQuery, selectedWord: undefined })
  }
  fetchDictionary = async () => {
    this.setState({ isFetching: true })

    const dictionary: Dictionary = (await axios.get('/definitions.json')).data
    this.setState({ dictionary, isFetching: false })
  }
}

const Search = () => (
  <Subscribe to={[SearchContainer, VocabularyContainer]}>
    {(
      { state, onChange, fetchDictionary }: SearchContainer,
      {
        state: vocabState,
        toggleShowDefinition,
        toggleShowExample,
      }: VocabularyContainer,
    ) => {
      const { savedWords, showDefinition, showExample } = vocabState
      if (!state.isFetching && !state.dictionary) {
        fetchDictionary()
      }
      return (
        <div>
          <h3>Search</h3>

          <div className="md-form mt-0">
            <input
              className="form-control"
              type="text"
              disabled={state.isFetching}
              placeholder={
                state.isFetching ? 'Fetching...' : 'Search vietnamese words...'
              }
              aria-label="Search"
              onChange={(e) => onChange(e.target.value)}
              value={state.query}
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <input
              style={{ marginTop: 10 }}
              checked={showDefinition}
              data-id={'t'}
              onChange={toggleShowDefinition}
              type={'checkbox'}
            />
            <label data-for={'t'} style={{ margin: 5 }}>
              show definition
            </label>
            <input
              onChange={toggleShowExample}
              style={{ marginTop: 10, marginLeft: 20 }}
              type={'checkbox'}
              data-checked={showExample}
              data-id={'t'}
            />
            <label data-for={'t'} style={{ margin: 5 }}>
              show example
            </label>
          </div>
          <div>
            {!state.selectedWord &&
              state.suggestions &&
              state.suggestions
                .filter((v) => !savedWords.includes(v.text))
                .slice(0, 15)
                .map((v) => (
                  <div
                    key={v.text}
                    className={'suggestion'}
                    style={{
                      cursor: 'pointer',
                      paddingBottom: 4,
                      paddingTop: 3,
                    }}
                    onClick={() => {
                      onChange(v.text)
                    }}
                  >
                    <DefinitionPage definitions={v.definitions} text={v.text}>
                      {v.text.substring(0, v.start)}
                      <strong>
                        {v.text.substring(
                          v.start,
                          v.start + state.query.length,
                        )}
                      </strong>
                      {v.text.substring(v.start + state.query.length)}
                    </DefinitionPage>
                  </div>
                ))}
          </div>
        </div>
      )
    }}
  </Subscribe>
)

export default Search

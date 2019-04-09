import React from 'react'
import { Subscribe, Container } from 'unstated'
import './index.scss'
import axios from 'axios'
import { Dictionary, Definition } from 'model'
import { pickBy, map, orderBy, uniqBy } from 'lodash'
import DefinitionPage from '../DefinitionPage'

interface IState {
  query: string
  savedWords: string[]
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
  state: IState = { query: '', isFetching: false, savedWords: [] }
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

  addWordToSavedWords = async (word: string) => {
    const newSavedWords = this.state.savedWords.concat([word])
    this.setState({ savedWords: newSavedWords })
    await this.persistState(newSavedWords)
  }
}

const Search = () => (
  <Subscribe to={[SearchContainer]}>
    {({
      state,
      onChange,
      fetchDictionary,
      addWordToSavedWords,
    }: SearchContainer) => {
      if (!state.isFetching && !state.dictionary) {
        fetchDictionary()
      }
      return (
        <div className={'container'}>
          <h3>Search</h3>

          <div className="md-form mt-0">
            <input
              className="form-control"
              type="text"
              placeholder="Search vietnamese words..."
              aria-label="Search"
              onChange={(e) => onChange(e.target.value)}
              value={state.query}
            />
          </div>
          <div>
            {!state.selectedWord &&
              state.suggestions &&
              state.suggestions.slice(0, 15).map((v) => (
                <div
                  key={v.text}
                  className={'suggestion'}
                  style={{ cursor: 'pointer', paddingBottom: 4, paddingTop: 3 }}
                  onClick={() => {
                    onChange(v.text)
                    addWordToSavedWords(v.text)
                  }}
                >
                  <DefinitionPage definitions={v.definitions} text={v.text}>
                    {v.text.substring(0, v.start)}
                    <strong>
                      {v.text.substring(v.start, v.start + state.query.length)}
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

import React from 'react'
import { Subscribe, Container } from 'unstated'
import './index.scss'
import axios from 'axios'
import { Dictionary, Definition } from 'model'
import { pickBy, map, orderBy, uniqBy } from 'lodash'
import DefinitionPage from '../DefinitionPage'

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

class SearchContainer extends Container<IState> {
  state: IState = { query: '', isFetching: false }
  onChange = (changedQuery: string) => {
    const { dictionary } = this.state
    if (dictionary && changedQuery) {
      const dictionaryFilteredByQuery = pickBy(dictionary, (value, key) =>
        key.toLowerCase().includes(changedQuery.toLowerCase()),
      )

      const suggestions = map(dictionaryFilteredByQuery, (value, key) => ({
        text: key,
        definitions: value,
        start: key.toLowerCase().indexOf(changedQuery.toLowerCase()),
      }))
      const orderedSuggestions = uniqBy(
        orderBy(suggestions, ({ text }) => text),
        ({ text }) => text,
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
  <Subscribe to={[SearchContainer]}>
    {({ state, onChange, fetchDictionary }: SearchContainer) => {
      if (!state.isFetching && !state.dictionary) {
        fetchDictionary()
      }
      return (
        <div className={'container'}>
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
                  onClick={() => onChange(v.text)}
                >
                  <DefinitionPage definitions={v.definitions} text={v.text}>
                    {v.text.substring(0, v.start)}
                    <strong>{state.query}</strong>
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

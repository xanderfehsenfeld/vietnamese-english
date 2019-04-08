import React from 'react'
import { Subscribe, Container } from 'unstated'
import './index.scss'
import axios from 'axios'
import { Dictionary } from 'model'
import { pickBy, map, orderBy } from 'lodash'
import DefinitionPage from '../DefinitionPage'

interface IState {
  query: string
  suggestions?: { text: string; example: string; definition: string }[]
  isFetching: boolean
  dictionary?: Dictionary
}

class SearchContainer extends Container<IState> {
  state: IState = { query: '', isFetching: false }
  onChange = (changedQuery: string) => {
    const { dictionary } = this.state
    if (dictionary && changedQuery) {
      const dictionaryFilteredByQuery = pickBy(dictionary, (value, key) =>
        key.toLowerCase().startsWith(changedQuery.toLowerCase()),
      )

      const suggestions = orderBy(
        map(dictionaryFilteredByQuery, (value, key) => ({
          text: key,
          example: value[0].example,
          definition: value[0].definition,
        })),
        ({ text }) => text,
      )
      this.setState({
        suggestions,
      })
    } else if (changedQuery === '') {
      this.setState({ suggestions: [] })
    }

    this.setState({ query: changedQuery })
  }
  fetchDictionary = async () => {
    this.setState({ isFetching: true })

    const dictionary: Dictionary = (await axios.get('/dictionary')).data
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
            {state.suggestions &&
              state.suggestions.length > 1 &&
              state.suggestions.slice(0, 15).map((v) => (
                <div
                  title={v.example}
                  key={v.text}
                  className={'suggestion'}
                  style={{ cursor: 'pointer', paddingBottom: 4, paddingTop: 3 }}
                  onClick={() => onChange(v.text)}
                >
                  <strong>{state.query}</strong>
                  {v.text.slice(state.query.length)}
                  {' : '}
                  <em>{v.definition}</em>
                </div>
              ))}
            {state.suggestions &&
              state.dictionary &&
              state.suggestions.length === 1 &&
              state.suggestions.map(({ text }) => (
                <DefinitionPage
                  definitions={state.dictionary[text]}
                  text={text}
                />
              ))}
          </div>
        </div>
      )
    }}
  </Subscribe>
)

export default Search

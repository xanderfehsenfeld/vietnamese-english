import * as React from 'react'
import { Subscribe, Container } from 'unstated'
import './index.scss'
import axios from 'axios'
import { Dictionary, Definition } from 'model'
import { pickBy, map, orderBy, uniqBy, flatten, uniq } from 'lodash'
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
      const { showExample } = state
      const { selectedWord, savedWords } = vocabularyState
      return (
        <div
          style={{
            height: '100%',
            overflowY: 'hidden',
            maxHeight: 'calc(100vh - 74px) ',
            padding: 3,
          }}
        >
          <div className="md-form mt-0">
            <input
              className="form-control"
              type="text"
              disabled={state.isFetching}
              placeholder={
                state.isFetching ? 'Fetching...' : 'Search to add words...'
              }
              aria-label="Search"
              onChange={(e) => onChange(e.target.value)}
              value={state.query}
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            {state.subwordSuggestions &&
            state.subwordSuggestions.length !== 0 ? (
              <React.Fragment>
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
              </React.Fragment>
            ) : null}
          </div>
          {state.subwordSuggestions && state.subwordSuggestions.length ? (
            <div
              style={{
                height: '100%',
                overflowY: 'auto',
                border: 'solid 1px #dee2e6',
              }}
            >
              {!state.selectedWord &&
                state.subwordSuggestions &&
                state.subwordSuggestions.slice(0, 15).map((v) => (
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
                      if (savedWords.includes(v.text)) {
                        selectWord(v.text)
                      }
                    }}
                    title={'click to refine search'}
                  >
                    <DefinitionPage
                      definitions={v.definitions}
                      text={v.text}
                      showExample={showExample}
                      isSelected={v.text === selectedWord}
                    >
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
          ) : null}
        </div>
      )
    }}
  </Subscribe>
)

export default Search

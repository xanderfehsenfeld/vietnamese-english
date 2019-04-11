import { Subscribe, Container } from 'unstated'
import React from 'react'
import DefinitionPage from '../DefinitionPage'
import { SearchContainer } from '../SearchPage'
import axios from 'axios'
import { values } from 'lodash'

interface IState {
  savedWords: string[]
  isFetchingState: boolean
  didInitialFetch: boolean
}
export class VocabularyContainer extends Container<IState> {
  state: IState = {
    savedWords: [],
    isFetchingState: false,
    didInitialFetch: false,
  }
  persistState = async (state: any) => await axios.post('/state', state)
  fetchState = async () => {
    this.setState({ isFetchingState: true })
    try {
      const state = JSON.parse(
        values((await axios.get('/state')).data[0]).join(''),
      )
      this.setState({
        savedWords: state,
        isFetchingState: false,
        didInitialFetch: true,
      })
    } catch (e) {
      console.error(e)
    }

    this.setState({
      isFetchingState: false,
      didInitialFetch: true,
    })
  }

  addWordToSavedWords = async (word: string) => {
    const newSavedWords = this.state.savedWords.concat([word])
    this.setState({ savedWords: newSavedWords })
    await this.persistState(newSavedWords)
  }

  removeWord = async (word: string) => {
    const newSavedWords = this.state.savedWords.filter((w) => w !== word)
    this.setState({ savedWords: newSavedWords })
    await this.persistState(newSavedWords)
  }
}

const Vocabulary = () => (
  <Subscribe to={[VocabularyContainer, SearchContainer]}>
    {(
      { state, fetchState }: VocabularyContainer,
      { state: stateWithDictionary }: SearchContainer,
    ) => {
      const { savedWords, isFetchingState, didInitialFetch } = state

      if (!isFetchingState && !didInitialFetch) {
        fetchState()
        return null
      } else if (isFetchingState) {
        return (
          <div style={{ height: '100%' }}>
            <h3>Vocabulary</h3>
            <span>Fetching...</span>
          </div>
        )
      } else {
        const { dictionary } = stateWithDictionary
        return (
          <div style={{ height: '100%' }}>
            <h3>Vocabulary</h3>
            <div>
              {dictionary &&
                savedWords &&
                savedWords
                  .slice(0, 15)
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
                    >
                      <DefinitionPage definitions={v.definitions} text={v.text}>
                        {v.text}
                      </DefinitionPage>
                    </div>
                  ))}
              {dictionary && savedWords.length === 0 && (
                <h6>Nothing here. Add words using the Search pane.</h6>
              )}
            </div>
          </div>
        )
      }
    }}
  </Subscribe>
)

export default Vocabulary

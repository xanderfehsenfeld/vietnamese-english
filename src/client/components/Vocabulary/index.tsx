import { Subscribe, Container } from 'unstated'
import React from 'react'
import DefinitionPage from '../DefinitionPage'
import { SearchContainer } from '../SearchPage'

interface IState {
  savedWords: string[]
  showDefinition: boolean
  showExample: boolean
}
export class VocabularyContainer extends Container<IState> {
  state: IState = { savedWords: [], showDefinition: true, showExample: false }
  // persistState = async (state: any) =>
  //   await axios.post('/persistClientState', state)

  toggleShowDefinition = () => {
    this.setState({ showDefinition: !this.state.showDefinition })
  }
  toggleShowExample = () => {
    this.setState({ showExample: !this.state.showExample })
  }

  addWordToSavedWords = async (word: string) => {
    const newSavedWords = this.state.savedWords.concat([word])
    this.setState({ savedWords: newSavedWords })
    //await this.persistState(newSavedWords)
  }

  removeWord = (word: string) => {
    const newSavedWords = this.state.savedWords.filter((w) => w !== word)
    this.setState({ savedWords: newSavedWords })
  }
}

const Vocabulary = () => (
  <Subscribe to={[VocabularyContainer, SearchContainer]}>
    {(
      { state }: VocabularyContainer,
      { state: stateWithDictionary }: SearchContainer,
    ) => {
      const { savedWords } = state
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
              <h4>You have no saved words in your vocabulary</h4>
            )}
          </div>
        </div>
      )
    }}
  </Subscribe>
)

export default Vocabulary

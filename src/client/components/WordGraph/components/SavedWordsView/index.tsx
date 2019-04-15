import * as React from 'react'
import { Dictionary } from '../../../../../model'
import VocabularyBadge from '../../../VocabularyBadge'
import { Link } from 'react-router-dom'

const SavedWordsView = ({
  savedWords,
  dictionary,
  selectedWord,
  selectWord,
}: {
  savedWords: string[]
  dictionary: Dictionary
  selectedWord: string
  selectWord: (word: string) => void
}) => {
  return (
    <React.Fragment>
      <h3>
        Vocabulary <VocabularyBadge />
      </h3>
      {savedWords.length === 0 && (
        <h6>
          Add words to your vocabulary using the{' '}
          <Link to={'/'}>{'Search pane.'}</Link>
        </h6>
      )}

      {savedWords
        .slice(0, 15)
        .reverse()
        .map((v) => ({ text: v, definitions: dictionary[v] }))
        .map(({ text, definitions }) => (
          <div
            key={text}
            className={'suggestion'}
            style={{
              cursor: 'pointer',
              paddingBottom: 4,
              paddingTop: 3,
            }}
            onClick={() => selectWord(text)}
          >
            <div
              style={{
                display: 'flex',
                marginBottom: 4,
                marginTop: 4,
                justifyContent: 'space-between',
              }}
            >
              <h5
                style={{
                  marginTop: 5,
                  marginBottom: 5,
                  marginRight: 10,
                }}
              >
                {text}
              </h5>
              <em>{definitions[0].definition}</em>
              {text === selectedWord && (
                <button disabled className={'btn-sm btn-success'}>
                  Selected
                </button>
              )}
            </div>
          </div>
        ))}
    </React.Fragment>
  )
}

export default SavedWordsView

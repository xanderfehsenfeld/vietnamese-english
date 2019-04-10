import * as React from 'react'
import { Definition } from '../../../model'

import { VocabularyContainer } from '../Vocabulary'
import { Subscribe } from 'unstated'

const DefinitionPage = ({
  definitions,
  text,
  children,
}: {
  definitions: Definition[]
  text: string
  children?: any
}) => (
  <Subscribe to={[VocabularyContainer]}>
    {({ addWordToSavedWords, state, removeWord }: VocabularyContainer) => {
      const { savedWords } = state

      const wordIsSaved = savedWords.includes(text)
      return (
        <div className={'row'} style={{ padding: '15px 0' }}>
          <div className={'col-8'}>
            <div
              style={{
                display: 'flex',
                marginBottom: 4,
              }}
            >
              <h5 style={{ marginTop: 5, marginBottom: 5, marginRight: 10 }}>
                {children || text}
              </h5>
            </div>
            {definitions.map(({ definition, example }, i) => (
              <div
                style={{
                  display: 'flex',
                }}
                key={i}
              >
                {definitions.length > 1 && (
                  <h6 style={{ paddingRight: 5 }}>{`${i + 1}.   `}</h6>
                )}
                <div>
                  <em>{definition}</em>
                  <br />
                  {example && (
                    <span style={{ color: 'gray' }}>{`"${example}"`}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div
            className={'col-4'}
            style={{
              textAlign: 'right',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              alignItems: 'flex-end',
            }}
          >
            <button
              className={'btn btn-secondary'}
              value={'Add To Vocab'}
              onClick={(e) => {
                e.stopPropagation()
                wordIsSaved ? removeWord(text) : addWordToSavedWords(text)
              }}
            >
              {wordIsSaved ? 'Remove from vocab' : 'Add To Vocab'}
            </button>
          </div>
        </div>
      )
    }}
  </Subscribe>
)

export default DefinitionPage

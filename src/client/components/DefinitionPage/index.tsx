import * as React from 'react'
import { Definition } from '../../../model'

import { VocabularyContainer } from '../Vocabulary'
import { Subscribe } from 'unstated'

const DefinitionPage = ({
  definitions,
  text,
  children,
  showDefinition = true,
  showExample = true,
  isSelected,
  showRemoveButton = true,
}: {
  definitions: Definition[]
  text: string
  children?: any
  showDefinition?: boolean
  showExample?: boolean
  isSelected?: boolean
  showRemoveButton?: boolean
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
            {showDefinition &&
              definitions.map(({ definition, example }, i) => (
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
                    {example && showExample && (
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
              justifyContent: 'space-between',
              alignItems: 'flex-end',
            }}
          >
            {wordIsSaved && showRemoveButton && (
              <button
                className={`btn btn-danger`}
                onClick={(e) => {
                  e.stopPropagation()
                  removeWord(text)
                }}
              >
                {'Remove'}
              </button>
            )}

            {wordIsSaved && !showRemoveButton && (
              <button
                className={`btn 
                            btn-secondary
                          `}
                disabled={true}
              >
                {'Added'}
              </button>
            )}

            {!wordIsSaved && (
              <button
                className={`btn 
                  btn-secondary
                `}
                onClick={(e) => {
                  e.stopPropagation()
                  addWordToSavedWords(text)
                }}
              >
                {'Add To Vocab'}
              </button>
            )}
            {isSelected && (
              <button disabled className={'btn btn-success'}>
                Selected
              </button>
            )}
          </div>
        </div>
      )
    }}
  </Subscribe>
)

export default DefinitionPage

import * as React from 'react'
import { Definition } from '../../../model'

import { VocabularyContainer } from '../Vocabulary'
import { Subscribe } from 'unstated'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

const DefinitionPage = ({
  definitions,
  text,
  children,
  showDefinition = true,
  showExample = true,
  isSelected,
  showRemoveButton = true,
  translation,
}: {
  definitions: Definition[]
  text: string
  children?: any
  showDefinition?: boolean
  showExample?: boolean
  isSelected?: boolean
  showRemoveButton?: boolean
  translation: string
}) => (
  <Subscribe to={[VocabularyContainer]}>
    {({
      addWordToSavedWords,
      state,
      removeWordFromVocabulary,
    }: VocabularyContainer) => {
      const { savedWords } = state

      const wordIsSaved = savedWords.includes(text)
      return (
        <Row style={{ padding: '15px 0' }}>
          <Col xs={8}>
            <div
              style={{
                display: 'flex',
                marginBottom: 4,
              }}
            >
              <h5 style={{ marginTop: 5, marginBottom: 5, marginRight: 10 }}>
                {children || text}
                <span style={{ color: 'lightgray' }}>
                  {` : "${translation}"`}
                </span>
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
          </Col>
          <Col
            xs={4}
            style={{
              textAlign: 'right',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
            }}
          >
            {wordIsSaved && showRemoveButton && (
              <Button
                variant={'danger'}
                onClick={(e) => {
                  e.stopPropagation()
                  removeWordFromVocabulary(text)
                }}
              >
                {'Remove'}
              </Button>
            )}

            {wordIsSaved && !showRemoveButton && (
              <Button variant={'secondary'} disabled={true}>
                {'Added'}
              </Button>
            )}

            {!wordIsSaved && (
              <Button
                variant={'secondary'}
                onClick={(e) => {
                  e.stopPropagation()
                  addWordToSavedWords(text)
                }}
              >
                {'Add To Vocab'}
              </Button>
            )}
            {isSelected && (
              <Button disabled variant={'primary'}>
                Selected
              </Button>
            )}
          </Col>
        </Row>
      )
    }}
  </Subscribe>
)

export default DefinitionPage

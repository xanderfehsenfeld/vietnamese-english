import * as React from 'react'
import { Definition } from '../../../model'

import { SavedWordsContainer } from '../SavedWords'
import { Subscribe } from 'unstated'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { AppContainer } from '../SearchPage'

const DefinitionPage = ({
  definitions,
  text,
  children,
  showDefinition = true,
  showExample = true,
  isSelected,
  showRemoveButton = true,
  translation,
  isChecked,
}: {
  definitions: Definition[]
  text: string
  children?: any
  showDefinition?: boolean
  showExample?: boolean
  isSelected?: boolean
  showRemoveButton?: boolean
  translation: string
  isChecked?: boolean
}) => (
  <Subscribe to={[SavedWordsContainer, AppContainer]}>
    {(
      {
        addWordToSavedWords,
        state,
        removeWordFromSavedWords,
      }: SavedWordsContainer,
      { toggleWordFromCheckedWords }: AppContainer,
    ) => {
      const { savedWords } = state

      const wordIsSaved = savedWords.includes(text)
      return (
        <Row style={{ padding: '15px 0' }}>
          <Col xs={10}>
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
            xs={2}
            style={{
              textAlign: 'right',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              alignItems: 'flex-end',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                marginBottom: 10,
              }}
            >
              {wordIsSaved ? null : (
                <Button
                  size={'sm'}
                  onClick={(e) => {
                    e.stopPropagation()
                    addWordToSavedWords(text)
                  }}
                  variant={'secondary'}
                >
                  {'Save'}
                </Button>
              )}

              {wordIsSaved && showRemoveButton && (
                <Button
                  size={'sm'}
                  style={{ marginLeft: 10 }}
                  variant={'danger'}
                  onClick={(e) => {
                    e.stopPropagation()
                    removeWordFromSavedWords(text)
                  }}
                >
                  {'Remove'}
                </Button>
              )}
              {isChecked === true || isChecked === false ? (
                <Form.Check
                  type="checkbox"
                  checked={isChecked}
                  style={{
                    transform: 'scale(1.5)',
                    marginRight: 10,
                    marginLeft: 10,
                    cursor: 'pointer',
                    marginTop: 2,
                  }}
                  onClick={(e) => {
                    toggleWordFromCheckedWords(text)
                    e.stopPropagation()
                  }}
                />
              ) : null}
            </div>
          </Col>
        </Row>
      )
    }}
  </Subscribe>
)

export default DefinitionPage

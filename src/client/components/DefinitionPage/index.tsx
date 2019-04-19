import * as React from 'react'
import { Definition } from '../../../model'
import { Subscribe } from 'unstated'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import { AppContainer } from '../SearchBar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import Tooltip from 'react-bootstrap/Tooltip'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import {
  faBookmark,
  faTrash,
  faProjectDiagram,
  faArrowRight,
  faTimes,
  faSlash,
} from '@fortawesome/free-solid-svg-icons'
library.add(
  faTrash,
  faProjectDiagram,
  faArrowRight,
  faTimes,
  faBookmark,
  faSlash,
)

const DefinitionPage = ({
  definitions,
  text,
  children,
  showDefinition = true,
  showExample = true,
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
  <Subscribe to={[AppContainer]}>
    {({
      addWordToSavedWords,
      state,
      removeWordFromSavedWords,
      toggleWordFromCheckedWords,
    }: AppContainer) => {
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
                <OverlayTrigger
                  placement={'bottom'}
                  overlay={
                    <Tooltip id={`tooltip-${'bottom'}`}>{`Bookmark`}</Tooltip>
                  }
                >
                  <Button
                    size={'sm'}
                    onClick={(
                      e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
                    ) => {
                      e.stopPropagation()
                      addWordToSavedWords(text)
                    }}
                    variant={'secondary'}
                  >
                    <FontAwesomeIcon icon="bookmark" />
                  </Button>
                </OverlayTrigger>
              )}

              {wordIsSaved && showRemoveButton && (
                <OverlayTrigger
                  placement={'bottom'}
                  overlay={
                    <Tooltip id={`tooltip-${'bottom'}`}>{`Unbookmark`}</Tooltip>
                  }
                >
                  <Button
                    size={'sm'}
                    style={{ marginLeft: 10, position: 'relative' }}
                    variant={'danger'}
                    onClick={(
                      e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
                    ) => {
                      e.stopPropagation()
                      removeWordFromSavedWords(text)
                    }}
                  >
                    <FontAwesomeIcon icon="trash" />
                  </Button>
                </OverlayTrigger>
              )}
              {isChecked === true || isChecked === false ? (
                <OverlayTrigger
                  placement={'bottom'}
                  overlay={
                    <Tooltip id={`tooltip-${'bottom'}`}>
                      {isChecked ? `Remove` : `Add`}
                    </Tooltip>
                  }
                >
                  <Button
                    variant={isChecked ? 'warning' : 'success'}
                    onClick={(e: React.MouseEvent) => {
                      toggleWordFromCheckedWords(text)
                      e.stopPropagation()
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-end',
                      marginLeft: 10,
                    }}
                  >
                    <FontAwesomeIcon icon="project-diagram" />
                    <FontAwesomeIcon
                      icon={isChecked ? 'times' : 'arrow-right'}
                      size="xs"
                    />
                  </Button>
                </OverlayTrigger>
              ) : null}
            </div>
          </Col>
        </Row>
      )
    }}
  </Subscribe>
)

export default DefinitionPage

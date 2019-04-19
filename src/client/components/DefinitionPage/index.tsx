import * as React from 'react'
import { Definition } from '../../../model'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const DefinitionPage = ({
  definitions,
  text,
  children,
  showExample = true,
  translation,
}: {
  definitions: Definition[]
  text: string
  children?: any
  showExample?: boolean
  translation: string
}) => (
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
          <span style={{ color: 'lightgray' }}>{` : "${translation}"`}</span>
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
            {example && showExample && (
              <span style={{ color: 'gray' }}>{`"${example}"`}</span>
            )}
          </div>
        </div>
      ))}
    </Col>
  </Row>
)

export default DefinitionPage

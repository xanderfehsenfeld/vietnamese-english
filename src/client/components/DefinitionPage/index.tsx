import * as React from 'react'
import { Definition } from '../../../model'

const DefinitionPage = ({
  definitions,
  text,
}: {
  definitions: Definition[]
  text: string
}) => (
  <div style={{ padding: '4px 13px' }}>
    <h5>{text}</h5>
    {definitions.map(({ definition, example }, i) => (
      <div
        style={{
          display: 'flex',
        }}
        key={i}
      >
        <h6 style={{ paddingRight: 5 }}>{`${i + 1}.   `}</h6>
        <div>
          <h6>{definition}</h6>
          <em style={{ color: 'gray' }}>{example}</em>
        </div>
      </div>
    ))}
  </div>
)

export default DefinitionPage

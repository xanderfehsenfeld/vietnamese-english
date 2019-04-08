import * as React from 'react'
import { Definition } from '../../../model'

const DefinitionPage = ({
  definitions,
  text,
  children,
}: {
  definitions: Definition[]
  text: string
  children?: any
}) => (
  <div style={{ padding: '4px 0' }}>
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
          {example && <span style={{ color: 'gray' }}>{`"${example}"`}</span>}
        </div>
      </div>
    ))}
  </div>
)

export default DefinitionPage

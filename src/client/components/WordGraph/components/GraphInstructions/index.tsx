import * as React from 'react'
import Badge from 'react-bootstrap/Badge'

const GraphInstructions = () => (
  <h5 style={{ display: 'inline' }}>
    {[
      'scroll to zoom',
      'hold right mouse + move to pan',
      'click a node to expand related words',
    ].map((instruction, i) => (
      <Badge
        key={i}
        style={{ marginLeft: 14, marginBottom: 8 }}
        variant="secondary"
      >
        {instruction}
      </Badge>
    ))}
    <Badge variant={'success'} style={{ marginLeft: 14, marginBottom: 8 }}>
      {'added'}
    </Badge>
    <Badge variant={'warning'} style={{ marginLeft: 14, marginBottom: 8 }}>
      {'not added'}
    </Badge>
  </h5>
)

export default GraphInstructions

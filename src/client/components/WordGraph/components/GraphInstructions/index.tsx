import * as React from 'react'

const GraphInstructions = () => (
  <h5 style={{ display: 'inline' }}>
    {[
      'scroll to zoom',
      'hold right mouse + move to pan',
      'click a node to expand related words',
    ].map((instruction, i) => (
      <span
        style={{ marginLeft: 10 }}
        key={i}
        className="badge badge-secondary"
      >
        {instruction}
      </span>
    ))}
  </h5>
)

export default GraphInstructions

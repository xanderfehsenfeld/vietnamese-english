import * as React from 'react'

const GraphInstructions = () => (
  <h5 style={{ display: 'inline' }}>
    {[
      'scroll to zoom',
      'hold right mouse + move to pan',
      'click a node to expand related words',
    ].map((instruction, i) => (
      <span
        style={{ marginLeft: 14, marginBottom: 8 }}
        key={i}
        className="badge badge-secondary"
      >
        {instruction}
      </span>
    ))}
    <span
      style={{ marginLeft: 14, marginBottom: 8 }}
      className="badge badge-success"
    >
      {'added'}
    </span>
    <span
      style={{ marginLeft: 14, marginBottom: 8 }}
      className="badge badge-warning"
    >
      {'not added'}
    </span>
  </h5>
)

export default GraphInstructions

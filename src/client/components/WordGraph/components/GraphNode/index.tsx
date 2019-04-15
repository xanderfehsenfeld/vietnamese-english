import * as React from 'react'

export interface IGraphNode {
  id: string
  hiddenAdjacentNodes?: string[]
  color?: string
}

const GraphNode = ({ hiddenAdjacentNodes, color, id }: IGraphNode) => {
  const hiddenAdjacentNodesCount = hiddenAdjacentNodes
    ? hiddenAdjacentNodes.length
    : 0
  return (
    <div
      title={`${hiddenAdjacentNodesCount} other words related to '${id}.' Click to expand them.`}
      style={{
        width: 35,
        height: 35,
        backgroundColor: color,
        margin: 'auto',
        marginTop: 31,
        borderRadius: '50%',
        padding: 7,
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
      }}
    >
      {hiddenAdjacentNodesCount}
    </div>
  )
}

export default GraphNode

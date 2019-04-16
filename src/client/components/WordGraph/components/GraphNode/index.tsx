import * as React from 'react'
import { Definition } from '../../../../../model'

export interface IGraphNode {
  id: string
  hiddenAdjacentNodes?: string[]
  color?: string
}

interface IProps {
  definitions?: Definition[]
}

const GraphNode = ({
  hiddenAdjacentNodes,
  color,
  id,
  definitions,
}: IGraphNode & IProps) => {
  const hiddenAdjacentNodesCount =
    hiddenAdjacentNodes && hiddenAdjacentNodes.length
      ? hiddenAdjacentNodes.length
      : ''

  const definition = definitions ? definitions[0].definition : ''
  return (
    <React.Fragment>
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
      <span style={{ fontSize: 8, position: 'absolute' }} title={definition}>
        {definition}
      </span>
    </React.Fragment>
  )
}

export default GraphNode

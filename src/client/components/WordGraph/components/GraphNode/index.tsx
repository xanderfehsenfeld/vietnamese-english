import * as React from 'react'
import { Definition } from '../../../../../model'
import { VocabularyContainer } from '../../../Vocabulary'
import { Subscribe } from 'unstated'
import './index.scss'

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
    <Subscribe to={[VocabularyContainer]}>
      {({ state }: VocabularyContainer) => {
        const { selectedWord } = state
        return (
          <React.Fragment>
            <div
              title={`${hiddenAdjacentNodesCount} other words related to '${id}.' Click to expand them.`}
              className={`definition-graph-node ${
                selectedWord === id ? 'isSelected' : ''
              }`}
              style={{ backgroundColor: color }}
            >
              {hiddenAdjacentNodesCount}
            </div>
            <span
              style={{ fontSize: 8, position: 'absolute' }}
              title={definition}
            >
              {definition}
            </span>
          </React.Fragment>
        )
      }}
    </Subscribe>
  )
}

export default GraphNode

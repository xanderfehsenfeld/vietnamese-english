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
  removeself: (id: string) => void
}

const GraphNode = ({
  hiddenAdjacentNodes,
  color,
  id,
  definitions,
  removeself,
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
        const isSelected = selectedWord === id

        return (
          <React.Fragment>
            <div
              title={`${hiddenAdjacentNodesCount} other words related to '${id}.' Click to expand them.`}
              className={`definition-graph-node ${
                isSelected ? 'isSelected' : ''
              }`}
              style={{ backgroundColor: color }}
            >
              {hiddenAdjacentNodesCount}
            </div>
            {isSelected ? null : (
              <span
                style={{ fontSize: 8, position: 'absolute' }}
                title={definition}
              >
                {definition}
              </span>
            )}
            {isSelected ? (
              <button
                className={'btn btn-danger remove-node-button'}
                onClick={(e) => {
                  removeself(id)
                  e.stopPropagation()
                }}
              />
            ) : null}
          </React.Fragment>
        )
      }}
    </Subscribe>
  )
}

export default GraphNode

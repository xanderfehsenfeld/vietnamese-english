import * as React from 'react'
import { Definition } from '../../../../../model'
import { VocabularyContainer } from '../../../Vocabulary'
import { Subscribe } from 'unstated'
import './index.scss'
import { AppContainer } from '../../../SearchPage'
import Tooltip from 'react-bootstrap/Tooltip'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'

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
    <Subscribe to={[VocabularyContainer, AppContainer]}>
      {({ state }: VocabularyContainer, { state: appState }: AppContainer) => {
        const { selectedWord } = state
        const { translationVietnameseEnglish } = appState
        const isSelected = selectedWord === id
        const translation = translationVietnameseEnglish[id]
        return (
          <React.Fragment>
            <OverlayTrigger
              placement={'bottom'}
              overlay={
                <Tooltip id={`tooltip-${'bottom'}`}>
                  <span>{definition}</span>
                </Tooltip>
              }
            >
              <div
                title={
                  hiddenAdjacentNodesCount
                    ? `${hiddenAdjacentNodesCount} other words related to '${id}.' Click to expand them.`
                    : undefined
                }
                className={`definition-graph-node ${
                  isSelected ? 'isSelected' : ''
                }`}
                style={{ backgroundColor: color }}
              >
                {hiddenAdjacentNodesCount}
              </div>
            </OverlayTrigger>

            {isSelected ? (
              <button
                className={'btn btn-danger remove-node-button'}
                onClick={(e) => {
                  removeself(id)
                  e.stopPropagation()
                }}
              />
            ) : null}
            <span className={'node-translation'} style={{ fontSize: 15 }}>
              {translation ? `"${translation}"` : ''}
            </span>
          </React.Fragment>
        )
      }}
    </Subscribe>
  )
}

export default GraphNode

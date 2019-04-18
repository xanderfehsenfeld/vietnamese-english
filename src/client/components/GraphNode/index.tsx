import * as React from 'react'
import { Definition } from '../../../model'
import { Subscribe } from 'unstated'
import './index.scss'
import { AppContainer } from '../SearchPage'
import { IGraphNode } from 'react-d3-graph'

interface IProps {
  definitions?: Definition[]
  removeself: (id: string) => void
}

const GraphNode = ({
  hiddenAdjacentNodes,
  id,
  removeself,
}: IGraphNode & IProps) => {
  const hiddenAdjacentNodesCount =
    hiddenAdjacentNodes && hiddenAdjacentNodes.length
      ? hiddenAdjacentNodes.length
      : ''

  return (
    <Subscribe to={[AppContainer]}>
      {({ state: state }: AppContainer) => {
        const { translationVietnameseEnglish, selectedWord, savedWords } = state
        const isSelected = selectedWord === id
        const translation = translationVietnameseEnglish[id]

        let backgroundColor
        if (isSelected) {
          backgroundColor = 'rgb(123, 169, 248)'
        } else if (savedWords.includes(id)) {
          backgroundColor = '#28a745'
        } else {
          backgroundColor = '#ffc107'
        }
        return (
          <React.Fragment>
            <div
              className={`definition-graph-node ${
                isSelected ? 'isSelected' : ''
              }`}
              style={{
                backgroundColor,
              }}
            >
              {hiddenAdjacentNodesCount}
            </div>

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

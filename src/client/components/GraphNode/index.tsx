import * as React from 'react'
import { Definition } from '../../../model'
import { Subscribe } from 'unstated'
import './index.scss'
import { AppContainer } from '../SearchBar'
import { IGraphNode } from 'react-d3-graph'
import Badge from 'react-bootstrap/Badge'

interface IProps {
  definitions?: Definition[]
}

const GraphNode = ({ hiddenAdjacentNodes, id }: IGraphNode & IProps) => {
  const hiddenAdjacentNodesCount =
    hiddenAdjacentNodes && hiddenAdjacentNodes.length
      ? hiddenAdjacentNodes.length
      : 0

  return (
    <Subscribe to={[AppContainer]}>
      {({ state: state }: AppContainer) => {
        const { translationVietnameseEnglish, selectedWord, savedWords } = state
        const translation = translationVietnameseEnglish[id]

        let backgroundColor = 'white'
        return (
          <div className={'node-container'}>
            <div
              className={'suggestion'}
              style={{
                backgroundColor,
                position: 'absolute',
              }}
            >
              <span>{id}</span>

              {translation ? (
                <span className={'node-translation'} style={{ fontSize: 15 }}>
                  {`: "${translation}"`}
                </span>
              ) : null}
              {` `}
              <Badge variant={'secondary'}>{hiddenAdjacentNodesCount}</Badge>
            </div>
          </div>
        )
      }}
    </Subscribe>
  )
}

export default GraphNode

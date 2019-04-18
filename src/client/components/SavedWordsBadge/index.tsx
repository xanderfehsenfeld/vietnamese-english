import * as React from 'react'
import connect from 'unstated-connect2'
import { SavedWordsContainer } from '../SavedWords'
import Badge from 'react-bootstrap/Badge'

interface IProps {
  count: number
}

const SavedWordsBadge = ({ count }: IProps) => (
  <Badge variant="secondary">{count}</Badge>
)

export default connect({
  container: SavedWordsContainer,
  selector: ({ container }: { container: SavedWordsContainer }): IProps => ({
    count: container.state.savedWords.length,
  }),
})(SavedWordsBadge)

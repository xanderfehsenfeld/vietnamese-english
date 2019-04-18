import * as React from 'react'
import connect from 'unstated-connect2'
import Badge from 'react-bootstrap/Badge'
import { AppContainer } from '../SearchPage'

interface IProps {
  count: number
}

const SavedWordsBadge = ({ count }: IProps) => (
  <Badge variant="secondary">{count}</Badge>
)

export default connect({
  container: AppContainer,
  selector: ({ container }: { container: AppContainer }): IProps => ({
    count: container.state.savedWords.length,
  }),
})(SavedWordsBadge)

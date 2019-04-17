import * as React from 'react'
import connect from 'unstated-connect2'
import { VocabularyContainer } from '../Vocabulary'
import Badge from 'react-bootstrap/Badge'

interface IProps {
  count: number
}

const VocabularyBadge = ({ count }: IProps) => (
  <Badge variant="secondary">{count}</Badge>
)

export default connect({
  container: VocabularyContainer,
  selector: ({ container }: { container: VocabularyContainer }): IProps => ({
    count: container.state.savedWords.length,
  }),
})(VocabularyBadge)

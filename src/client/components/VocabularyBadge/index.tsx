import * as React from 'react'
import connect from 'unstated-connect2'
import { VocabularyContainer } from '../Vocabulary'

interface IProps {
  count: number
}

const VocabularyBadge = ({ count }: IProps) => (
  <span className="badge badge-secondary">{count}</span>
)

export default connect({
  container: VocabularyContainer,
  selector: ({ container }: { container: VocabularyContainer }): IProps => ({
    count: container.state.savedWords.length,
  }),
})(VocabularyBadge)

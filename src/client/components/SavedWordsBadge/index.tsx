import * as React from 'react'
import connect from 'unstated-connect2'
import Badge from 'react-bootstrap/Badge'
import { AppContainer } from '../SearchPage'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface IProps {
  count: number
}

const SavedWordsBadge = ({ count }: IProps) => {
  return (
    <div
      style={{
        position: 'relative',
        display: 'inline-flex',
        fontSize: 20,
        verticalAlign: 'top',
        marginRight: 5,
      }}
    >
      <FontAwesomeIcon
        icon={'bookmark'}
        style={{ marginRight: 5 }}
        size={'lg'}
      />

      <span
        style={{
          color: 'unset',
          position: 'absolute',
          left: 'calc(50% + 8px)',
          fontSize: 14,
          fontWeight: 'bold',
          top: 10,
        }}
      >
        {count}
      </span>
    </div>
  )
}

export default connect({
  container: AppContainer,
  selector: ({ container }: { container: AppContainer }): IProps => ({
    count: container.state.savedWords.length,
  }),
})(SavedWordsBadge)

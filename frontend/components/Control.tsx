import React, { FC, useState } from 'react'
import { IconButton, Tooltip } from '@material-ui/core'
import { NotInterested, Refresh, Lens } from '@material-ui/icons'
import { RecordAction } from '@frontend/hooks/records'
import { toggleRecording } from '@frontend/shared/network'

interface ControlProps {
  clickHandler: (action: RecordAction) => void
}

const c: FC<ControlProps> = (props: ControlProps) => {
  const [recording, setRecording] = useState(true)

  return (
    <div className="Control">
      <Tooltip title="Clear">
        <IconButton
          size="small"
          onClick={ () => props.clickHandler({ type: 'CLEAR'}) }>
            <NotInterested fontSize="small"/>
        </IconButton>
      </Tooltip>
      <Tooltip title={ `${ recording ? 'Stop recording' : 'Recording' } network log` }>
        <IconButton
          size="small"
          onClick={ () => {
            toggleRecording(!recording)
            setRecording(!recording)
          } }>
            <Lens fontSize="small" color={ recording ? 'secondary' : 'action' }/>
        </IconButton>
      </Tooltip>
      <Tooltip title="Refresh">
        <IconButton
          size="small"
          onClick={ () => props.clickHandler({ type: 'Refresh'}) }>
            <Refresh fontSize="small"/>
        </IconButton>
      </Tooltip>
    </div>
  )
}

export default c
import React, { FC, useState, ReactNode } from 'react'
import { IconButton } from '@material-ui/core'
import { NotInterested, Refresh, Lens } from '@material-ui/icons'

interface ControlProps {
  children?: ReactNode
  isListen: boolean
  toggleListen: () => void
}

const c: FC<ControlProps> = (props: ControlProps) => {
  return (
    <div className="Control">
      <IconButton
        size="small"
        title="Clear">
          <NotInterested fontSize="small"/>
      </IconButton>
      <IconButton
        size="small"
        onClick={ () => props.toggleListen() }
        title={ `${props.isListen ? 'Stop recording' : 'Recording'} network log` }>
          <Lens fontSize="small" color={ props.isListen ? 'secondary' : 'action' }/>
      </IconButton>
      <IconButton
        size="small"
        title="Refresh">
          <Refresh fontSize="small"/>
      </IconButton>
    </div>
  )
}

export default c
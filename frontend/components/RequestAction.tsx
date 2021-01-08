import React, { FC } from 'react'
import { IconButton, Tooltip } from '@material-ui/core'
import { Edit, AddCircleOutline, Description } from '@material-ui/icons'
import { RequestRecord } from '@frontend/hooks/records'
import { execScript } from '@frontend/shared/utils'

interface ActionProps {
  value: RequestRecord
}

const c: FC<ActionProps> = (props: ActionProps) => {
  return (
    <div className="RequestAction">
      <Tooltip title="Mock this response">
        <IconButton size="small">
          <Edit />
        </IconButton>
      </Tooltip>
      <Tooltip title="Add to mock list">
        <IconButton size="small">
          <AddCircleOutline />
        </IconButton>
      </Tooltip>
      <Tooltip title="Use details in console">
        <IconButton size="small" onClick={ () => handlerEdit(props.value) }>
          <Description />
        </IconButton>
      </Tooltip>
    </div>
  )
}

function handlerEdit(data: RequestRecord) {
  execScript(`
    window.$mock = ${JSON.stringify(data._details)}
    console.log('var $mock: ', $mock)
  `)
}

export default c
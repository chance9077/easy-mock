import React, { FC } from 'react'
import { Table, TableBody, TableCell, TableHead, TableRow, Link } from '@material-ui/core'
import Action from './RequestAction'
import { RequestRecord } from '../hooks/records'
interface Props {
  value: RequestRecord[]
}

function handlerOpenResource(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>): void {
  if (event.button !== 0) return
  if (chrome.devtools.panels.openResource) {
    chrome.devtools.panels.openResource((event.target as HTMLAnchorElement).href, 0, () => {})
  }
  event.preventDefault()
}

const c: FC<Props> = (props: Props) => {
  return (
    <Table size="small" stickyHeader={ true } >
      <TableHead>
        <TableRow>
          <TableCell className="name">名称</TableCell>
          <TableCell>URL</TableCell>
          <TableCell>协议</TableCell>
          <TableCell>类型</TableCell>
          <TableCell>状态</TableCell>
          <TableCell className="action"></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        { props.value.map((row, index) => (
          <TableRow key={ index } hover >
            <TableCell className="list-cell name" title={ row.name } style={{ paddingLeft: '22px' }}>
              { row.name }
            </TableCell>
            <TableCell className="list-cell url">
              <Link title={ row.url } href={ row.url } onClick={ handlerOpenResource }>{ row.url }</Link>
            </TableCell>
            <TableCell>{ row.httpVersion }</TableCell>
            <TableCell>{ row._resourceType }</TableCell>
            <TableCell className="list-cell status">{ row.statusText }</TableCell>
            <TableCell className="list-cell action" >
              <Action value={ row } />
            </TableCell>
          </TableRow>
        )) }
      </TableBody>
    </Table>
  )
}

export default c
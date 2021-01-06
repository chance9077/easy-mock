import React, { CSSProperties, FC, useEffect, useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableRow, Link } from '@material-ui/core'

interface ExtRequest extends chrome.devtools.network.Request {
  _resourceType?: string
}

interface SimpleRequest {
  name?: string
  url?: string
  httpVersion?: string
  _resourceType?: string
  statusText?: string
}

interface Props {
  isListen: boolean
  style?: CSSProperties
}

const _list: Array<SimpleRequest> = []
let isListen = true, hasRequestListener = false

function useListen() {
  const [list, setList] = useState<SimpleRequest[]>(_list.slice())

  const handler = (req: ExtRequest) => {
    if (!isListen) return
    const { request, _resourceType, response } = req
    let { pathname, hostname } = new URL(request.url)
    _list.push({
      name: pathname === '/' ? hostname : pathname.slice(pathname.lastIndexOf('/') + 1),
      url: request.url,
      httpVersion: request.httpVersion,
      _resourceType,
      statusText: response.statusText
    })
    setList(_list.slice())
  }

  useEffect(() => {
    chrome.devtools.network.onRequestFinished.addListener(handler)
    return function removeRequestFinishedHandler() {
      chrome.devtools.network.onRequestFinished.removeListener(handler)
    }
  })

  return list
}

function handlerOpenResource(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>): void {
  if (event.button !== 0) return
  if (chrome.devtools.panels.openResource) {
    chrome.devtools.panels.openResource((event.target as HTMLAnchorElement).href, 0, () => {})
  }
  event.preventDefault()
}

const c: FC<Props> = (props: Props) => {
  isListen = props.isListen
  const list = useListen()

  return (
    <Table size="small" stickyHeader={ true } style={ props.style }>
      <TableHead>
        <TableRow>
          <TableCell style={{ paddingLeft: '22px' }}>名称</TableCell>
          <TableCell>URL</TableCell>
          <TableCell>协议</TableCell>
          <TableCell>类型</TableCell>
          <TableCell>状态</TableCell>
          <TableCell></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        { list.map((row, index) => (
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
            <TableCell></TableCell>
          </TableRow>
        )) }
      </TableBody>
    </Table>
  )
}

export default c
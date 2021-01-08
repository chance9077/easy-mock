import { Dispatch } from 'react'
import { RecordAction } from '@frontend/hooks/records'

interface ExtRequest extends chrome.devtools.network.Request {
  _resourceType?: string
}

let recording = true
const { network } = chrome.devtools

export function toggleRecording(value: boolean) {
  recording = value
}

function requestFinished(req: ExtRequest, cb: (action: RecordAction) => void) {
  if (!recording) return

  const { request, _resourceType, response } = req
  const { pathname, hostname } = new URL(request.url)
  cb({ type: 'ADD', data: {
      name: pathname === '/' ? hostname : pathname.slice(pathname.lastIndexOf('/') + 1),
      url: request.url,
      httpVersion: request.httpVersion,
      _resourceType,
      statusText: response.statusText,
      _details: { request, response }
    }
  })
}


export function onRequestFinished(dispatch: Dispatch<RecordAction>) {
  const handler = (req: ExtRequest) => requestFinished(req, dispatch)
  network.onRequestFinished.addListener(handler)
  return () => network.onRequestFinished.removeListener(handler)
}
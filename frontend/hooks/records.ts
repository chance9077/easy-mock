import { useEffect, useReducer } from "react"
import { reload } from "@frontend/shared/utils"
import { onRequestFinished } from '@frontend/shared/network'

export interface RequestRecord {
  name?: string
  url?: string
  httpVersion?: string
  _resourceType?: string
  statusText?: string
  _details?: object
}

export interface RecordAction {
  type: 'ADD' | 'CLEAR' | 'Refresh'
  data?: RequestRecord
}

let _records: RequestRecord[] = []

function reducer(state: typeof _records, action: RecordAction) {
  if (action.type === 'ADD') {
    _records.push(action.data)
    return _records.slice()
  }
  if (action.type === 'CLEAR' || action.type === 'Refresh') {
    action.type === 'Refresh' && reload()
    return _records = []
  }
}

export function useRecords(only?: boolean) {
  const [records, dispatch] = useReducer(reducer, _records)

  useEffect(() => {
    if (only) return
    
    return onRequestFinished(dispatch)
  })

  return {
    records,
    dispatch
  }
}
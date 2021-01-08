
import React, { FC, Fragment, ChangeEvent, useState } from 'react'
import { AppBar, Tabs, Tab, Toolbar } from '@material-ui/core'
import TabsPanels from './components/TabsPanels'
import RequestList from './components/RequestList'
import Control from './components/Control'
import { useRecords } from './hooks/records'
import './app.scss'

const App: FC = () => {
  const [tabValue, setTabValue] = useState(0)
  const { records, dispatch } = useRecords()
  const tabChange = (event: ChangeEvent<{}>, newValue: number) => setTabValue(newValue)
  
  return (
    <Fragment>
      <AppBar color="default" position="sticky">
        <Toolbar>
          <Tabs value={ tabValue } indicatorColor="primary" onChange={ tabChange }>
            <Tab label="请求" />
            <Tab label="Mock配置" />
          </Tabs>
          <Control clickHandler={ dispatch } />
        </Toolbar>
      </AppBar>
      <TabsPanels value={ tabValue }>
        <RequestList value={ records } />
        <div>123</div>
      </TabsPanels>
    </Fragment>
  )
}

export default App
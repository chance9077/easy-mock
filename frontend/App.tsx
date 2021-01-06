
import React, { FC, Fragment, ChangeEvent, useState } from 'react'
import { AppBar, Tabs, Tab, Toolbar } from '@material-ui/core'
import RequestList from './components/RequestList'
import Control from './components/Control'
import './app.scss'

const App: FC = () => {
  const [tabValue, setTabValue] = useState(0)
  const [isListen, setListen] = useState(true)
  const tabChange = (event: ChangeEvent<{}>, newValue: number) => setTabValue(newValue)
  
  return (
    <Fragment>
      <AppBar color="default" position="sticky">
        <Toolbar>
          <Tabs value={ tabValue } indicatorColor="primary" onChange={ tabChange }>
            <Tab label="请求" />
            <Tab label="Mock配置" />
          </Tabs>
          <Control isListen={ isListen } toggleListen={ () => setListen(!isListen) }/>
        </Toolbar>
      </AppBar>
      <div className="tabs-panel">
        <RequestList isListen={ isListen } style={{ display: tabValue === 0 ? '' : 'none' }}/>
        <div style={{ display: tabValue === 1 ? '' : 'none' }}></div>
      </div>
    </Fragment>
  )
}

export default App
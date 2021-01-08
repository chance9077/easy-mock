import React, { FC, PropsWithChildren } from 'react'

type TabsPanelProps = PropsWithChildren<{ value: number }>

const c: FC<TabsPanelProps> = (props: TabsPanelProps) => {
  const { value, children } = props

  return (
    <div className="tabs-panel">
      { React.Children.map(children, (child, index) =>
          <div style={{ display: value === index ? '' : 'none' }}>
            { child }
          </div>
        )
      }
    </div>
  )
}

export default c
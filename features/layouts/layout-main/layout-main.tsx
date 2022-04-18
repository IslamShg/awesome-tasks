import React, { FC } from 'react'

import { LayoutHeader } from '../layout-header'
import { LayoutSidebar } from '../layout-sidebar'
import classes from './layout-main.module.scss'

type LayoutMainProps = {
  children: React.ReactNode
}

export const LayoutMain: FC<LayoutMainProps> = ({ children }) => {
  return (
    <>
      <LayoutHeader />
      <div style={{ display: 'flex' }}>
        <LayoutSidebar />
        <div className={classes.contentWrapper}>
          <div className={classes.content}>{children}</div>
        </div>
      </div>
    </>
  )
}

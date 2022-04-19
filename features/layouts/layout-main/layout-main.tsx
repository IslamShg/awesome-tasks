import React, { FC } from 'react'
import clsx from 'clsx'

import { LayoutHeader } from '../layout-header'
import { LayoutSidebar } from '../layout-sidebar'
import classes from './layout-main.module.scss'

type LayoutMainProps = {
  children: React.ReactNode
  containerStyles?: React.CSSProperties
  containerClassName?: string
}

export const LayoutMain: FC<LayoutMainProps> = ({
  children,
  containerClassName
}) => {
  return (
    <>
      <LayoutHeader />
      <div style={{ display: 'flex' }}>
        <LayoutSidebar />
        <div className={classes.contentWrapper}>
          <div className={clsx(classes.content, containerClassName)}>
            {children}
          </div>
        </div>
      </div>
    </>
  )
}

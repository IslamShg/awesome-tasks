import React from 'react'
import clsx from 'clsx'

import classes from './layout-sidebar.module.scss'
import { useAppSelector } from '../../../store/store'
import { mainSidebarStateSelector } from '../common'

export const LayoutSidebar = () => {
  const mainSidebarOpened = useAppSelector(mainSidebarStateSelector)

  return (
    <div
      className={clsx(classes.root, { [classes.hidden]: !mainSidebarOpened })}
    >
      Sidebar
    </div>
  )
}

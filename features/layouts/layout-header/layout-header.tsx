import React from 'react'
import { Avatar, IconButton } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'

import { useLayoutsActions } from '../common'
import classes from './layout-header.module.scss'

export const LayoutHeader = () => {
  const { toggleSidebar } = useLayoutsActions()

  return (
    <div className={classes.root}>
      <IconButton onClick={toggleSidebar} className={classes.burgerMenuButton}>
        <MenuIcon className={classes.burgerMenuIcon} />
      </IconButton>
      <Avatar
        src="https://yt3.ggpht.com/yti/APfAmoFgNsrwAsHKU0CQHIrpb_tEcq53O0LSsOKAYPWfAA=s88-c-k-c0x00ffffff-no-rj-mo"
        alt=""
        className={classes.avatar}
      />
    </div>
  )
}

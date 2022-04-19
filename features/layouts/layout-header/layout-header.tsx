import React from 'react'
import { Avatar, IconButton } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'

import { useLayoutsActions } from '../common'
import classes from './layout-header.module.scss'
import { useGetUser } from '../../auth'

export const LayoutHeader = () => {
  const { toggleSidebar } = useLayoutsActions()
  const { user } = useGetUser()

  return (
    <div className={classes.root}>
      <IconButton
        onClick={() => toggleSidebar()}
        className={classes.burgerMenuButton}
      >
        <MenuIcon className={classes.burgerMenuIcon} />
      </IconButton>
      <Avatar
        src={
          user?.avatarUrl ||
          'https://yantra-bg.ru/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png'
        }
        alt=""
        className={classes.avatar}
      />
    </div>
  )
}

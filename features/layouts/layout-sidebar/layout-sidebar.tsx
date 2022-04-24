import React, { useState } from 'react'
import { ListItemButton, Typography } from '@mui/material'
import CircleIcon from '@mui/icons-material/Circle'
import clsx from 'clsx'
import { useRouter } from 'next/router'
import AllInboxIcon from '@mui/icons-material/AllInbox'
import AddIcon from '@mui/icons-material/Add'

import {
  CreateCollectionPopup,
  selectCollections,
  useSetCollections
} from '../../tasks'
import classes from './layout-sidebar.module.scss'
import { useAppSelector } from '../../../store/store'
import { mainSidebarStateSelector } from '../common'

export const LayoutSidebar = () => {
  const [modalOpened, setModalOpened] = useState(false)
  const mainSidebarOpened = useAppSelector(mainSidebarStateSelector)
  const router = useRouter()

  const collections = useAppSelector(selectCollections)
  useSetCollections()

  return (
    <>
      <div
        className={clsx(classes.root, { [classes.hidden]: !mainSidebarOpened })}
      >
        <Typography color="#fff" sx={{ padding: '0 0 20px 15px' }}>
          Collections
        </Typography>
        <div className={classes.sidebarItems}>
          <ListItemButton
            onClick={() => router.push('/')}
            className={clsx(classes.listItem, {
              [classes.selected]: router.pathname === '/'
            })}
          >
            <AllInboxIcon
              sx={{ marginRight: 1 }}
              className={classes.listItemIcon}
            />
            <Typography variant="body2">Inbox</Typography>
          </ListItemButton>
          <ListItemButton
            onClick={() => setModalOpened(true)}
            className={clsx(classes.listItem)}
          >
            <AddIcon sx={{ marginRight: 1 }} className={classes.listItemIcon} />
            <Typography variant="body2">Create collection</Typography>
          </ListItemButton>
          <div className={classes.collections}>
            {collections?.map((collection) => (
              <ListItemButton
                key={collection.uid}
                onClick={() => {
                  router.push({
                    pathname: '/collections/[collectionUid]',
                    query: {
                      collectionUid: collection.uid
                    }
                  })
                }}
                className={clsx(classes.listItem, {
                  [classes.selected]:
                    router.asPath === `/collections/${collection.uid}`
                })}
              >
                <CircleIcon
                  sx={{
                    marginRight: 1,
                    color: collection.colorVariant || '#bdc3c7'
                  }}
                  className={classes.listItemIcon}
                />
                <Typography variant="body2">
                  {collection.collectionName}
                </Typography>
              </ListItemButton>
            ))}
          </div>
        </div>
      </div>
      <CreateCollectionPopup
        open={modalOpened}
        onClose={() => setModalOpened(false)}
      />
    </>
  )
}

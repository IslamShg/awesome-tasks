import React from 'react'

import { LayoutMain } from '../../features/layouts'
import { InboxTasks } from '../../features/tasks'
import classes from './today.module.scss'

const Index = () => {
  return (
    <LayoutMain containerClassName={classes.root}>
      <InboxTasks />
    </LayoutMain>
  )
}

export default Index

import React from 'react'

import { TaskCard } from '../common'
import classes from './inbox-tasks.module.scss'

export const InboxTasks = () => {
  return (
    <div className={classes.root}>
      <TaskCard />
      <TaskCard />
      <TaskCard />
      <TaskCard />
      <TaskCard />
    </div>
  )
}

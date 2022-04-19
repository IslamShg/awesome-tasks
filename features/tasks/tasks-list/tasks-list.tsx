import React, { FC } from 'react'

import { Task, TaskCard } from '../common'
import classes from './tasks-list.module.scss'

type TasksListProps = {
  tasks?: Task[]
}

export const TasksList: FC<TasksListProps> = ({ tasks }) => {
  return (
    <div className={classes.root}>
      {tasks?.map((task) => {
        return <TaskCard key={task.uid} {...task} />
      })}
    </div>
  )
}

import React, { FC } from 'react'
import { Typography } from '@mui/material'

import { TasksList } from '../tasks-list'
import classes from './inbox-tasks.module.scss'
import { CreateTaskField } from '../create-task-field'
import { useInboxTasksQuery, Task } from '../common'
import { useTasks } from '../common/hooks/use-tasks'
import { useCreateTask } from '../common/hooks/use-create-task'

type InboxTasksProps = {
  prefetchedInboxTasks?: Task[]
}

export const InboxTasks: FC<InboxTasksProps> = ({ prefetchedInboxTasks }) => {
  const { finishedTasks, unFinishedTasks, tasks } = useTasks(
    useInboxTasksQuery(),
    prefetchedInboxTasks
  )

  const handleAddTask = useCreateTask()

  return (
    <div className={classes.root}>
      <CreateTaskField onAddTask={handleAddTask} />
      <Typography color="#fff" variant="body1">
        Tasks - {tasks?.length}
      </Typography>
      <TasksList tasks={unFinishedTasks} />
      {!!finishedTasks?.length && (
        <>
          <Typography color="#fff" variant="body1">
            Completed - {finishedTasks.length}
          </Typography>
          <TasksList tasks={finishedTasks} />
        </>
      )}
    </div>
  )
}

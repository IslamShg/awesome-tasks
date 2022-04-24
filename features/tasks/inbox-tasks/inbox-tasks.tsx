import React, { FC } from 'react'
import { collection } from 'firebase/firestore'
import { Typography } from '@mui/material'
import { addDoc, Timestamp } from '@firebase/firestore'

import { TasksList } from '../tasks-list'
import classes from './inbox-tasks.module.scss'
import { CreateTaskField } from '../create-task-field'
import { firebaseDb } from '../../../configs/firebase'
import { getInboxTasksQuery, Task } from '../common'
import { useTasks } from '../common/hooks/use-tasks'
import { getUserUid } from '../../../utils/getUserUid'

type InboxTasksProps = {
  prefetchedInboxTasks?: Task[]
}

export const InboxTasks: FC<InboxTasksProps> = ({ prefetchedInboxTasks }) => {
  const userUid = getUserUid()
  const { finishedTasks, unFinishedTasks, tasks } = useTasks(
    getInboxTasksQuery(),
    prefetchedInboxTasks
  )

  const handleAddTask = async (taskTextContent: string) => {
    if (!taskTextContent) {
      return
    }
    await addDoc(collection(firebaseDb, 'tasks'), {
      authorUid: userUid,
      taskTextContent: taskTextContent,
      timestamp: Timestamp.now(),
      dateCreated: Date.now(),
      completed: false
    })
  }

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

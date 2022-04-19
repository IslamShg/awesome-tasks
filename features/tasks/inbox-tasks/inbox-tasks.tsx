import React, { useMemo } from 'react'
import { collection, orderBy, query, where } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { Typography } from '@mui/material'
import { addDoc, Timestamp } from '@firebase/firestore'

import { TasksList } from '../tasks-list'
import classes from './inbox-tasks.module.scss'
import { CreateTaskField } from '../create-task-field'
import { firebaseDb } from '../../../configs/firebase'
import { useTasks } from '../common/hooks/use-tasks'

export const InboxTasks = () => {
  const userUid = useMemo(() => getAuth().currentUser?.uid, [])
  const tasksQuery = useMemo(
    () =>
      query(
        collection(firebaseDb, 'tasks'),
        where('authorUid', '==', userUid),
        orderBy('timestamp', 'desc')
      ),
    [userUid]
  )
  const { finishedTasks, unFinishedTasks, tasks } = useTasks(tasksQuery)

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

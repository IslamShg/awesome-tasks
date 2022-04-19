import { useRouter } from 'next/router'
import React, { FC, useMemo } from 'react'
import { Typography } from '@mui/material'

import classes from './collection-tasks.module.scss'
import { Collection, useCollectionByUid } from '../common'
import { CreateTaskField } from '../create-task-field'
import { query, where } from 'firebase/firestore'
import { addDoc, collection, Timestamp } from '@firebase/firestore'
import { firebaseDb } from '../../../configs/firebase'
import { useTasks } from '../common/hooks/use-tasks'
import { getAuth } from '@firebase/auth'
import { TasksList } from '../tasks-list'

type CollectionTasks = {
  prefetchedCollection: Collection
}

export const CollectionTasks: FC<CollectionTasks> = ({
  prefetchedCollection
}) => {
  const router = useRouter()
  const auth = getAuth()
  const userUid = auth.currentUser?.uid
  const collectionUid = router.query.collectionUid

  const { collection: selectedCollection } = useCollectionByUid({
    collectionUid: collectionUid as string,
    prefetchedCollection
  })

  const collectionTasksQuery = useMemo(
    () =>
      query(
        collection(firebaseDb, 'tasks'),
        where('collectionUid', '==', collectionUid)
      ),
    [selectedCollection]
  )
  const { tasks } = useTasks(collectionTasksQuery)

  const handleAddTask = async (taskTextContent: string) => {
    if (!taskTextContent) {
      return
    }
    await addDoc(collection(firebaseDb, 'tasks'), {
      authorUid: userUid,
      taskTextContent: taskTextContent,
      timestamp: Timestamp.now(),
      dateCreated: Date.now(),
      completed: false,
      collectionUid
    })
  }

  return (
    <div className={classes.root}>
      <Typography variant={'h6'}>
        {selectedCollection?.collectionName}
      </Typography>
      <CreateTaskField onAddTask={handleAddTask} />
      <TasksList tasks={tasks} />
    </div>
  )
}

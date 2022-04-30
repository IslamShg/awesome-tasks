import CircleIcon from '@mui/icons-material/Circle'
import { Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { FC, useMemo } from 'react'
import { query, where, orderBy } from 'firebase/firestore'
import { collection } from '@firebase/firestore'

import { firebaseDb } from '../../../configs/firebase'
import { Collection, useCollectionByUid } from '../common'
import { useTasks } from '../common/hooks/use-tasks'
import { CreateTaskField } from '../create-task-field'
import { TasksList } from '../tasks-list'
import classes from './collection-tasks.module.scss'
import { useCreateTask } from '../common/hooks/use-create-task'

type CollectionTasks = {
  prefetchedCollection?: Collection
}

export const CollectionTasks: FC<CollectionTasks> = ({
  prefetchedCollection
}) => {
  const router = useRouter()
  const collectionUid = router.query.collectionUid

  const { collection: selectedCollection } = useCollectionByUid({
    collectionUid: collectionUid as string,
    prefetchedCollection
  })

  const collectionTasksQuery = useMemo(
    () =>
      query(
        collection(firebaseDb, 'tasks'),
        where('collectionUid', '==', collectionUid),
        orderBy('timestamp', 'desc')
      ),
    [collectionUid]
  )

  const { tasks } = useTasks(collectionTasksQuery)
  const handleAddTask = useCreateTask()

  return (
    <div className={classes.root}>
      <div className={classes.titleWrapper}>
        <CircleIcon
          sx={{
            marginRight: 1,
            color: selectedCollection?.colorVariant || '#bdc3c7'
          }}
          className={classes.listItemIcon}
        />
        <Typography variant={'h6'}>
          {selectedCollection?.collectionName}
        </Typography>
      </div>
      <CreateTaskField onAddTask={handleAddTask} />
      <TasksList tasks={tasks} />
    </div>
  )
}

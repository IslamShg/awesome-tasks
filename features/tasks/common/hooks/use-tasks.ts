import { DocumentData, Query } from '@firebase/firestore'
import { useEffect, useMemo, useState } from 'react'
import { onSnapshot } from 'firebase/firestore'

import { Task } from '../tasks.types'

export const useTasks = (
  query: Query<DocumentData>,
  prefetchedTasks?: Task[]
) => {
  const [tasks, setTasks] = useState<Task[]>(prefetchedTasks || [])

  useEffect(() => {
    const unsubscribe = onSnapshot(query, (snapshot) => {
      console.log('get tasks hook called')
      const tasks = snapshot.docs.map((doc) => ({
        ...doc.data(),
        uid: doc.id
      }))
      setTasks(tasks as Task[])
    })
    return () => unsubscribe()
  }, [query])

  const finishedTasks = useMemo(
    () => tasks?.filter((task) => task.completed),
    [tasks]
  )
  const unFinishedTasks = useMemo(
    () => tasks?.filter((task) => !task.completed),
    [tasks]
  )

  return {
    tasks,
    finishedTasks,
    unFinishedTasks
  }
}

import { DocumentData, Query } from '@firebase/firestore'
import { useEffect, useMemo, useState } from 'react'
import { onSnapshot } from 'firebase/firestore'

import { Task } from '../tasks.types'

export const useTasks = (query: Query<DocumentData>) => {
  const [tasks, setTasks] = useState<Task[]>()

  useEffect(() => {
    const unsub = onSnapshot(query, (snapshot) => {
      const tasks = snapshot.docs.map((doc) => ({
        ...doc.data(),
        uid: doc.id
      }))
      setTasks(tasks as Task[])
    })
    return () => unsub()
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

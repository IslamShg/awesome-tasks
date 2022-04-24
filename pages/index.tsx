import React from 'react'
import type { NextPage } from 'next'
import { collection, getDocs, orderBy, query } from 'firebase/firestore'

import { LayoutMain } from '../features/layouts'
import { InboxTasks, Task } from '../features/tasks'
import { firebaseDb } from '../configs/firebase'
import { getUserUid } from '../utils/getUserUid'

export const getStaticProps = async ({}) => {
  const q = query(collection(firebaseDb, 'tasks'), orderBy('timestamp', 'desc'))
  const inboxTasksSnap = await getDocs(q)
  const docsData: Task[] = inboxTasksSnap?.docs.map((doc) => ({
    uid: doc.id,
    authorUid: doc?.data().authorUid || '',
    taskTextContent: doc?.data().taskTextContent,
    dateCreated: doc?.data().dateCreated || null,
    completed: doc?.data().completed || null,
    dueBy: doc?.data().dueBy || null,
    subTasks: doc?.data().subTasks || null,
    collectionUid: doc?.data().collectionUid || null
  }))

  return {
    props: {
      prefetchedInboxTasks: docsData
    }
  }
}

type PageProps = {
  prefetchedInboxTasks?: Task[]
}

const Home: NextPage<PageProps> = ({ prefetchedInboxTasks }) => {
  const userUid = getUserUid()
  const prefetchedUserTasks = prefetchedInboxTasks?.filter(
    (task) => task.authorUid === userUid
  )

  return (
    <LayoutMain>
      <InboxTasks prefetchedInboxTasks={prefetchedUserTasks} />
    </LayoutMain>
  )
}

export default Home

import React from 'react'
import type { NextPage } from 'next'

import { LayoutMain } from '../features/layouts'
import { InboxTasks, Task } from '../features/tasks'

type PageProps = {
  prefetchedInboxTasks?: Task[]
}

const Home: NextPage<PageProps> = () => {
  return (
    <LayoutMain>
      <InboxTasks />
    </LayoutMain>
  )
}

export default Home

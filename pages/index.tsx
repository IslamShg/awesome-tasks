import React from 'react'
import type { NextPage } from 'next'

import { LayoutMain } from '../features/layouts'
import { InboxTasks, Task } from '../features/tasks'
import { useGlobalShortcuts } from '../hooks/use-global-shortcuts'

type PageProps = {
  prefetchedInboxTasks?: Task[]
}

const Home: NextPage<PageProps> = () => {
  useGlobalShortcuts()
  return (
    <LayoutMain>
      <InboxTasks />
    </LayoutMain>
  )
}

export default Home

import React from 'react'
import type { NextPage } from 'next'

import { LayoutMain } from '../features/layouts'
import { InboxTasks } from '../features/tasks'

const Home: NextPage = () => {
  return (
    <LayoutMain>
      <InboxTasks />
    </LayoutMain>
  )
}

export default Home

import type { NextPage } from 'next'

import styles from '../styles/Home.module.css'
import { LayoutHeader, LayoutSidebar } from '../features/layouts'
import { InboxTasks } from '../features/tasks'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <LayoutHeader />
      <div style={{ display: 'flex' }}>
        <LayoutSidebar />
        <div className={styles.contentWrapper}>
          <div className={styles.content}>
            {/*  inbox tasks should be on this page */}
            <InboxTasks />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home

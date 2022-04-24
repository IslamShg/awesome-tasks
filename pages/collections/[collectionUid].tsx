import React from 'react'

import { LayoutMain } from '../../features/layouts'
import { Collection, CollectionTasks } from '../../features/tasks'

const CollectionPage = (props: { collection: Collection }) => {
  return (
    <LayoutMain>
      <CollectionTasks prefetchedCollection={props.collection} />
    </LayoutMain>
  )
}

export default CollectionPage

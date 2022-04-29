import React, { FC } from 'react'

import { LayoutMain } from '../../features/layouts'
import { Collection, CollectionTasks } from '../../features/tasks'

type CollectionPageProps = {
  collection?: Collection
}

const CollectionPage: FC<CollectionPageProps> = (props) => {
  return (
    <LayoutMain>
      <CollectionTasks prefetchedCollection={props.collection} />
    </LayoutMain>
  )
}

export default CollectionPage

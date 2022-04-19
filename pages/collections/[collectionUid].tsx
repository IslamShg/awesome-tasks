import React from 'react'
import { getDoc } from '@firebase/firestore'
import { doc } from 'firebase/firestore'
import { GetServerSidePropsContext } from 'next'

import { LayoutMain } from '../../features/layouts'
import { Collection, CollectionTasks } from '../../features/tasks'
import { firebaseDb } from '../../configs/firebase'

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const collectionDocRef = doc(
    firebaseDb,
    'collections',
    ctx.params?.collectionUid as string
  )
  const collectionDocSnap = await getDoc(collectionDocRef)
  const collectionData = {
    collectionName: collectionDocSnap.data()?.collectionName,
    authorUid: collectionDocSnap.data()?.authorUid,
    dateCreated: collectionDocSnap.data()?.dateCreated,
    tasks: collectionDocSnap.data()?.tasks,
    uid: collectionDocSnap.id
  }

  return {
    props: {
      collection: collectionData
    }
  }
}

const CollectionPage = (props: { collection: Collection }) => {
  return (
    <LayoutMain>
      <CollectionTasks prefetchedCollection={props.collection} />
    </LayoutMain>
  )
}

export default CollectionPage

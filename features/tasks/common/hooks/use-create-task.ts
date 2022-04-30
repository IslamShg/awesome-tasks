import { addDoc, collection, Timestamp } from 'firebase/firestore'

import { firebaseDb } from '../../../../configs/firebase'
import { getUserUid } from '../../../../utils/getUserUid'

export const useCreateTask = () => {
  const authorUid = getUserUid()

  const handleAddTask = async (taskTextContent: string, collectionUid?: string) => {
    if (!taskTextContent) {
      return
    }
    await addDoc(collection(firebaseDb, 'tasks'), {
      taskTextContent,
      authorUid,
      timestamp: Timestamp.now(),
      dateCreated: Date.now(),
      completed: false,
      collectionUid: collectionUid || null
    })
  }
  return handleAddTask
}

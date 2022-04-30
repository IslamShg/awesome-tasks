import { doc, setDoc } from 'firebase/firestore'

import { firebaseDb } from '../../../../configs/firebase'

export const useToggleTaskCompletion = (taskUid: string, isCompleted: boolean) => {
  const toggleTaskCompletion = async () => {
    await setDoc(
      doc(firebaseDb, 'tasks', taskUid as string),
      {
        completed: !isCompleted
      },
      { merge: true }
    )
  }

  return toggleTaskCompletion
}

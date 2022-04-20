export type Task = {
  uid?: string
  authorUid: string
  taskTextContent: string
  dateCreated: number
  timestamp?: {}
  completed: boolean
  dueBy?: number
  subTasks?: []
  collectionUid?: string
}

export type Collection = {
  uid?: string
  authorUid: string
  timestamp?: {}
  dateCreated: number
  collectionName: string
  colorVariant?: string
}

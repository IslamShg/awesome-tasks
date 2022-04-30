import React, { ChangeEvent, FC, useState } from 'react'
import AddIcon from '@mui/icons-material/Add'
import { IconButton, TextField } from '@mui/material'

import classes from './create-task-field.module.scss'
import { useRouter } from 'next/router'

type CreateTaskFieldProps = {
  onAddTask: (taskTextContent: string, collectionUid?: string) => Promise<void>
}

export const CreateTaskField: FC<CreateTaskFieldProps> = ({ onAddTask }) => {
  const [taskTextContent, setTaskTextContent] = useState('')
  const router = useRouter()
  const collectionUid = router.query.collectionUid

  const addTask = async () => {
    setTaskTextContent('')
    await onAddTask(taskTextContent, collectionUid as string)
  }

  return (
    <div className={classes.root}>
      <IconButton onClick={addTask} className={classes.addBtn}>
        <AddIcon className={classes.icon} />
      </IconButton>
      <TextField
        placeholder="Add a task"
        fullWidth
        value={taskTextContent}
        color="primary"
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            addTask()
          }
        }}
        variant="standard"
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setTaskTextContent(e.target.value)
        }
        className={classes.addTaskInput}
        InputProps={{
          disableUnderline: true,
          className: classes.addTaskInput
        }}
      />
    </div>
  )
}

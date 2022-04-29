import React, { ChangeEvent, FC, useState } from 'react'
import AddIcon from '@mui/icons-material/Add'
import { IconButton, TextField } from '@mui/material'

import classes from './create-task-field.module.scss'

type CreateTaskFieldProps = {
  onAddTask: (taskTextContent: string) => Promise<void>
}

export const CreateTaskField: FC<CreateTaskFieldProps> = ({ onAddTask }) => {
  const [taskTextContent, setTaskTextContent] = useState('')

  const addTask = async () => {
    setTaskTextContent('')
    await onAddTask(taskTextContent)
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

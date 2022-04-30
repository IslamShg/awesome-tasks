import React, { FC } from 'react'
import { IconButton, Typography } from '@mui/material'
import DoneIcon from '@mui/icons-material/Done'
import clsx from 'clsx'

import { Task } from '../tasks.types'
import classes from './task-card.module.scss'
import { useToggleTaskCompletion } from '../hooks'

export const TaskCard: FC<Task> = ({ taskTextContent, completed, uid }) => {
  const toggleTaskCompletion = useToggleTaskCompletion(uid as string, completed as boolean)

  return (
    <div className={classes.root}>
      <IconButton
        onClick={toggleTaskCompletion}
        role="checkbox"
        className={clsx(classes.completeTaskBtn, {
          [classes.completed]: completed
        })}
      >
        {completed && <DoneIcon className={classes.icon} />}
      </IconButton>
      <Typography>{taskTextContent}</Typography>
    </div>
  )
}

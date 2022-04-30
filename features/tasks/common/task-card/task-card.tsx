import React, { FC } from 'react'
import { IconButton, Typography } from '@mui/material'
import DoneIcon from '@mui/icons-material/Done'
import clsx from 'clsx'
import { setDoc } from '@firebase/firestore'
import { doc } from 'firebase/firestore'

import { firebaseDb } from '../../../../configs/firebase'
import { Task } from '../tasks.types'
import classes from './task-card.module.scss'

export const TaskCard: FC<Task> = ({ taskTextContent, completed, uid }) => {
  const toggleTaskCompletion = async () => {
    await setDoc(
      doc(firebaseDb, 'tasks', uid as string),
      {
        completed: !completed
      },
      { merge: true }
    )
  }

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

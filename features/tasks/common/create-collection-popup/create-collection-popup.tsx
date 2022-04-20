import React, { FC, useState } from 'react'
import { Box } from '@mui/system'
import { Button, IconButton, Modal, TextField, Typography } from '@mui/material'
import { getAuth } from 'firebase/auth'
import { addDoc, collection, Timestamp } from '@firebase/firestore'
import DoneIcon from '@mui/icons-material/Done'
import CircleIcon from '@mui/icons-material/Circle'

import classes from './create-collection-popup.module.scss'
import { firebaseDb } from '../../../../configs/firebase'

type CreateCollectionPopupProps = {
  open: boolean
  onClose: () => void
}

const collectionsColors = [
  '#27ae60',
  '#8e44ad',
  '#c0392b',
  '#bdc3c7',
  '#2c3e50',
  '#d35400',
  '#f1c40f'
]

export const CreateCollectionPopup: FC<CreateCollectionPopupProps> = ({
  open,
  onClose
}) => {
  const [inputValue, setInputValue] = useState('')
  const [colorVariant, setColorVariant] = useState('#bdc3c7')
  const auth = getAuth()
  const userUid = auth.currentUser?.uid

  const addCollection = async () => {
    onClose()
    await addDoc(collection(firebaseDb, 'collections'), {
      authorUid: userUid,
      collectionName: inputValue,
      timestamp: Timestamp.now(),
      dateCreated: Date.now(),
      colorVariant
    })
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className={classes.popup}
    >
      <Box sx={{ color: '#fff' }} className={classes.popupContainer}>
        <Typography sx={{ textAlign: 'center' }}>Add Collection</Typography>
        <TextField
          placeholder="New collection name"
          fullWidth
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className={classes.inputWrapper}
          inputProps={{ className: classes.input }}
        />
        <div className={classes.colorsVariants}>
          {collectionsColors.map((color) => {
            const selected = color === colorVariant
            return (
              <IconButton
                onClick={() => setColorVariant(color)}
                key={color}
                className={classes.colorIconBtn}
              >
                <CircleIcon className={classes.colorIcon} sx={{ color }} />
                {selected && <DoneIcon className={classes.doneIcon} />}
              </IconButton>
            )
          })}
        </div>
        <div className={classes.buttons}>
          <Button onClick={onClose} className={classes.popupBtn}>
            Cancel
          </Button>
          <Button
            onClick={addCollection}
            disabled={!inputValue}
            className={classes.popupBtn}
            variant="contained"
            color="error"
          >
            Ok
          </Button>
        </div>
      </Box>
    </Modal>
  )
}

import { Paper } from '@material-ui/core'
import React from 'react'
import classes from './index.module.css'

const Transaction = () => {
  return (
    <Paper elevation={1} className={classes.disclosure}>
      <h1 className='border-2 border-red-500'>Hello world</h1>
    </Paper>
  )
}

export default Transaction
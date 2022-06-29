import { Paper } from '@material-ui/core'
import React from 'react'
import classes from './index.module.css'

const Transaction = () => {
  return (
    <Paper elevation={1} className={classes.disclosure}>
      <div className="">
        <input
          type="kraken_wallet_address"
          name="kraken_wallet_address"
          id="kraken_wallet_address"
          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full text-sm lg:text-base border-gray-300 rounded-md"
          placeholder="Enter wallet address to send"
        />
      </div>
    </Paper>
  )
}

export default Transaction
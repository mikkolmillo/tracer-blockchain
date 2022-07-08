import { useContext } from 'react'
import { Button, Paper } from '@material-ui/core'
import React from 'react'
import classes from './index.module.css'
import { TransactionContext } from '../../stores/context/transaction/context'

const Transaction = () => {
  const transactionCtx = useContext(TransactionContext)
  const { changeHandler, formData, sendMultiTransaction, addressSendToUser } = transactionCtx

  const submitHandler = (e) => {
    e.preventDefault()

    const {
      addressSendToUser,
      addressTo,
      amount,
    } = formData

    // return nothing, leave this function
    // not submit anything
    if (!addressSendToUser || !addressTo || !amount) return

    sendMultiTransaction()
  }

  return (
    <Paper elevation={1} className={classes.disclosure}>
      <div className="">
        <form onSubmit={submitHandler}>
          <input
            type="text"
            name="addressTo"
            onChange={(e) => changeHandler(e)}
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full text-sm lg:text-base border-gray-300 rounded-md"
            placeholder="Enter wallet address to send"
            required
          />

          <input
            type="number"
            name="amount"
            step="0.000001"
            min={'0.00000000000001'}
            onChange={(e) => changeHandler(e)}
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full text-sm lg:text-base border-gray-300 rounded-md my-4"
            placeholder="Enter ethereum amount"
            required
          />

          <Button
            variant="outlined"
            color="primary"
            type="submit"
            className='mt-4'
          >
            Send Ethereum
          </Button>
        </form>
      </div>
    </Paper>
  )
}

export default Transaction
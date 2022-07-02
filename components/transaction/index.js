import { useContext } from 'react'
import { Button, Paper } from '@material-ui/core'
import React from 'react'
import classes from './index.module.css'
import { TransactionContext } from '../../stores/context/transaction/context'

const Transaction = () => {
  const transactionCtx = useContext(TransactionContext)
  const { changeHandler, formData, sendMultiTransaction } = transactionCtx

  const submitHandler = (e) => {
    e.preventDefault()

    const {
      addressTo_One,
      amount_One,
      addressTo_Two,
      amount_Two,
    } = formData

    // return nothing, leave this function
    // not submit anything
    if (!addressTo_One || !amount_One || !addressTo_Two || !amount_Two) return

    sendMultiTransaction()
  }

  return (
    <Paper elevation={1} className={classes.disclosure}>
      <div className="">
        <form onSubmit={submitHandler}>
          <input
            type="text"
            name="addressTo_One"
            onChange={(e) => changeHandler(e)}
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full text-sm lg:text-base border-gray-300 rounded-md"
            placeholder="Enter wallet address to send"
            required
          />

          <input
            type="number"
            name="amount_One"
            step="0.000001"
            onChange={(e) => changeHandler(e)}
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full text-sm lg:text-base border-gray-300 rounded-md my-4"
            placeholder="Enter ethereum amount"
            required
          />

          <div className="mt-5">
            <input
              type="text"
              name="addressTo_Two"
              onChange={(e) => changeHandler(e)}
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full text-sm lg:text-base border-gray-300 rounded-md"
              placeholder="Enter wallet address to send"
              required
            />

            <input
              type="number"
              name="amount_Two"
              step="0.000001"
              onChange={(e) => changeHandler(e)}
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full text-sm lg:text-base border-gray-300 rounded-md my-4"
              placeholder="Enter ethereum amount"
              required
            />
          </div>

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
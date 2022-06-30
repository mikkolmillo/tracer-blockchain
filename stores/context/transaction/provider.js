import { TransactionContext } from "./context"

const transactionContext = {
  value: 'Hello'
}

export const TransactionProvider = ({children}) => {
  return (
    <TransactionContext.Provider value={transactionContext}>
      {children}
    </TransactionContext.Provider>
  )
}
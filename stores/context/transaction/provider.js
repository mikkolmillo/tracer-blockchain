import { useState } from "react"
import { useEffect } from "react"
import { TransactionContext, ethereum } from "./context"

export const TransactionProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState(null)

  useEffect(() => {
    checkIfWalletIsConnected()
  }, [])

  // ? Connect wallet function
  const connectWalletHandler = async() => {
    try {
      if (!ethereum) return alert('Please install Metamask')

      const accounts = await ethereum.request({ method: 'eth_requestAccounts' })

      // ? Set account
      setCurrentAccount(accounts[0])
    } catch (error) {
      console.error(error);      

      throw new Error('No Ethereum Object')
    }
  }
  
  // ? Check if there is a wallet connected
  const checkIfWalletIsConnected = async () => {
    if (!ethereum) return alert('Please install Metamask')

    // ? Get Ethereum Account
    const accounts = await ethereum.request({ method: 'eth_accounts' })
  }

  const transactionContext = {
    // ! NOT USED
    connectWallet: connectWalletHandler
  }

  return (
    <TransactionContext.Provider value={transactionContext}>
      {children}
    </TransactionContext.Provider>
  )
}
import { useState } from "react"
import { useEffect } from "react"
import { TransactionContext, ethereum } from "./context"

export const TransactionProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState(null)

  // * Form Data
  const [formData, setFormData] = useState({
    addressTo: '',
    amount: '',
  })

  const changeHandler = (e, name) => {
    setFormData((prevState) => ({...prevState, [name]: e.target.value}))
  }

  useEffect(() => {
    // * Start of the application
    // * check if there's a wallet
    checkIfWalletIsConnected()
  }, [])

  // ? Connect wallet function
  const connectWalletHandler = async () => {
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
    try {
      if (!ethereum) return alert('Please install Metamask')

      // ? Get Ethereum Account
      const accounts = await ethereum.request({ method: 'eth_accounts' })

      // ? Check if there's an account
      if (accounts.length > 0) {
        setCurrentAccount(accounts[0])

        // getAllTransactions()
      } else {
        console.log('No Accounts Found');
      }
    } catch (error) {
      console.error(error);

      throw new Error('No Ethereum Object')
    }
  }

  // ? Send transaction function
  const sendTransaction = async () => {
    try {
      if (!ethereum) return alert('Please install Metamask')

      // ? Get the data from the form
    } catch (error) {
      console.error(error);

      throw new Error('No Ethereum Object')
    }
  }

  const transactionContext = {
    account: currentAccount,
    // ! NOT USED
    connectWallet: connectWalletHandler,
    formData,
    setFormData,
    changeHandler
  }

  return (
    <TransactionContext.Provider value={transactionContext}>
      {children}
    </TransactionContext.Provider>
  )
}
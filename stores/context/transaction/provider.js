import { useState } from "react"
import { useEffect } from "react"
import { ethers } from 'ethers'
import { TransactionContext, getEthereumContract, ethereum } from "./context"

export const TransactionProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [transactionCount, setTransactionCount] = useState(0) // TODO localStorage.getItem('transactionCount')

  // * Form Data
  const [formData, setFormData] = useState({
    addressTo: '',
    amount: '',
  })

  const changeHandler = (e) => {
    setFormData((prevState) => ({ ...prevState, [e.target.name]: e.target.value }))
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

  const sendMultiTransaction = async () => {
    try {
      if (!ethereum) return alert('Please install Metamask')

      const DUMMY_ADDRESSES = ["0x9b5E65f79dC4e7b8025031Df7e8B433379EE2A51", "0x1d45367a55F4475316D9460d1241a127785893f1"]
      const DUMMY_AMOUNT = ["0.001", "0.001"]

      const parseDUMMY_AMOUNT = DUMMY_AMOUNT.map(amount => Number(amount))
      const ethersDUMMY_AMOUNT = DUMMY_AMOUNT.map(amount => {
        amount = ethers.utils.parseEther(amount)
        return amount._hex
      })
      const sum = parseDUMMY_AMOUNT.reduce((curr, i) => curr + i, 0);

      const contract = getEthereumContract()

      const amount = ethers.utils.parseEther(sum.toString())
      const parseAmount = amount._hex

      const options = { value: amount }
      const topUP = await contract.charge(options)

      await topUP.wait()

      console.log(topUP);

      // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

      const transactionHash = await contract.withdrawals(DUMMY_ADDRESSES, ethersDUMMY_AMOUNT)
      console.log(`Loading: ${transactionHash.hash}`);

      await transactionHash.wait()

      console.log(`Success: ${transactionHash.hash}`);
    } catch (error) {
      console.error(error);

      throw new Error('No Ethereum Object')
    }
  }

  // ? Send transaction function
  // const sendTransactionHandler = async () => {
  //   try {
  //     if (!ethereum) return alert('Please install Metamask')

  //     // ? Get the data from the form
  //     const { addressTo, amount } = formData

  //     // ? Get Ethereum Contract
  //     const contract = getEthereumContract()
  //     const parseAmount = ethers.utils.parseEther(amount)

  //     // ! Send Transaction Method on Ethereum Object
  //     await ethereum.request({
  //       method: 'eth_sendTransaction',
  //       params: [{
  //         from: currentAccount,
  //         to: addressTo,
  //         gas: '0x5208', // ? hex (21000 g/wei)
  //         value: parseAmount._hex // ? 0.0001
  //       }]
  //     })

  //     // ! Store the transaction from above to the blockchain
  //     const transactionHash = await contract.addToBlockchain(addressTo, parseAmount)

  //     setIsLoading(true)
  //     console.log(`Loading: ${transactionHash.hash}`);

  //     // ! Wait the transaction to be finished
  //     await transactionHash.wait()

  //     setIsLoading(false)
  //     console.log(`Success: ${transactionHash.hash}`);

  //     // ! Get the transaction count
  //     const tnxc_count = await contract.getTransactionCount()
  //     setTransactionCount(tnxc_count.toNumber())
  //   } catch (error) {
  //     console.error(error);

  //     throw new Error('No Ethereum Object')
  //   }
  // }

  const transactionContext = {
    // * Transaction Context
    account: currentAccount,
    // ! NOT USED
    connectWallet: connectWalletHandler,
    // sendTransaction: sendTransactionHandler,
    sendMultiTransaction,
    // ! Form Handling
    formData,
    changeHandler
  }

  return (
    <TransactionContext.Provider value={transactionContext}>
      {children}
    </TransactionContext.Provider>
  )
}
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
    addressTo_One: '',
    amount_One: '',
    addressTo_Two: '',
    amount_Two: '',
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
  // ? using Wallet Provider
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

  // ? Connect Wallet function
  const walletConnect = (account) => {
    setCurrentAccount(account)
    console.log(currentAccount);
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

  // ? Send to Multiple Addresses
  const sendMultiTransaction = async () => {
    try {
      if (!ethereum) return alert('Please install Metamask')

      const contract = getEthereumContract()

      // ? Get the data from the form
      const {
        addressTo_One,
        amount_One,
        addressTo_Two,
        amount_Two,
      } = formData

      // ? Turn inputs into arrays
      const addresses = [addressTo_One, addressTo_Two]
      const amounts = [amount_One, amount_Two]

      // ? Turn string amounts into numbers
      const numAmounts = amounts.map(amount => Number(amount))
      // ? Get the sum
      const totalAmount = numAmounts.reduce((curr, i) => curr + i, 0);

      // ? Turn inputted amounts into ethers hex values
      const etherAmounts = amounts.map(amount => {
        amount = ethers.utils.parseEther(amount)
        return amount._hex
      })

      // ? Get the total Amount and parse into ethers
      const topUpAmount = ethers.utils.parseEther(totalAmount.toString())

      // ? Charge the smart contract with the given total Amount
      const options = { value: topUpAmount }
      const topUP = await contract.charge(options)

      await topUP.wait()

      // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
      const transactionHash = await contract.withdrawals(addresses, etherAmounts)
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
    // ! USED
    walletConnect,
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
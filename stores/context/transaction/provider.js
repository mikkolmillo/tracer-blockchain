import { useState, useReducer } from "react"
import { useEffect } from "react"
import { ethers } from 'ethers'
import { TransactionContext, getEthereumContract, ethereum } from "./context"
import NetworkReducer, { defaultNetworkState } from "./reducer"

export const TransactionProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState(null)
  const [addressToUser, setAddressToUser] = useState('')
  // const [addressToOwner, setAddressToOwner] = useState('')
  // const [totalAmount, setAmount] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  // const [transactionCount, setTransactionCount] = useState(0) // TODO localStorage.getItem('transactionCount')

  const [state, dispatch] = useReducer(NetworkReducer, defaultNetworkState)

  useEffect(() => {
    // * Start of the application
    // * check if there's a wallet
    checkIfWalletIsConnected()
  }, [])

  // * Form Data
  const [formData, setFormData] = useState({
    addressSendToUser: '',
    addressTo: '',
    amount: '',
  })

  const changeHandler = (e) => {
    setFormData((prevState) => ({ ...prevState, [e.target.name]: e.target.value }))
  }

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

  // ? Connect wallet function
  const walletConnect = (account) => {
    setCurrentAccount(account)
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
      // const {
      //   addressTo_One,
      //   amount_One,
      //   addressTo_Two,
      //   amount_Two,
      // } = formData

      const {
        addressSendToUser,
        addressTo,
        amount
      } = formData

      // ? Turn inputs into arrays
      const addresses = [addressSendToUser, addressTo]
      const amounts = [amount, amount]

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

  const settAddressSendToUser = addressToUser => {
    setAddressToUser(addressToUser)
    // ? Set Form Data with the user's inputted address
    setFormData(currState => (
      { ...currState, addressSendToUser: addressToUser }
    ))
  }

  const changeTestnetNetwork = network => {
    dispatch({ type: 'SWITCH_TESTNET', payload: { network } })
  }

  const changeMainnetNetwork = network => {
    dispatch({ type: 'SWITCH_MAINNET', payload: { network } })
  }

  useEffect(() => {
    console.log(state.network);
  }, [state.network])
  
  // const settAddressSendToOwner = addressToOwner => setAddressToOwner(addressToOwner)

  const transactionContext = {
    // * Transaction Context
    account: currentAccount,
    addressSendToUser: addressToUser,
    network: state.network,
    changeTestnetNetwork,
    changeMainnetNetwork,
    settAddressSendToUser,
    // addressSendToOwner: addressToOwner,
    // settAddressSendToOwner,
    // amount: totalAmount,
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
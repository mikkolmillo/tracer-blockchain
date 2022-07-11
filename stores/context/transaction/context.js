import { createContext } from "react";
import { ethers } from "ethers";

import { contractAbi, contractAddress } from '../../../utils/constants'

// ? Get Ethereum Object
export let ethereum = null

if (typeof window !== "undefined") {
  ethereum = window.ethereum
}

// ? fetch ethereum contract
export const getEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum)
  const signer = provider.getSigner()
  const transactionContract = new ethers.Contract(contractAddress, contractAbi, signer)

  // console.log({
  //   provider,
  //   signer,
  //   transactionContract
  // });
  return transactionContract
}

export const TransactionContext = createContext({
  account: '',
  amount: '',
  addressSendToUser: '',
  settAddressSendToUser: () => {},
  addressSendToOwner: '',
  settAddressSendToOwner: () => {},
  connectMetaMaskWallet: () => {},
  connectCoinbaseWallet: () => {},
  sendTransaction: () => {}
})
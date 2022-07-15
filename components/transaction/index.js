import { useState, useEffect, useContext } from 'react'
import Image from 'next/image'
import { Button, Paper } from '@material-ui/core'
import React from 'react'
import classes from './index.module.css'
import { TransactionContext } from '../../stores/context/transaction/context'
import Loader from '../modal/Loader'
import { mainnets, testnets } from '../../utils/constants'

const ButtonIcon = ({ crypto }) => {
  if (crypto === '') crypto = 'unknown'

  return (
    <div className="-ml-0.5 mr-2">
      <Image src={`/wallets/${crypto}-logo.svg`} width={17} height={17} aria-hidden="true" alt={`${crypto} wallet`} />
    </div>
  )
}

const Transaction = () => {
  const transactionCtx = useContext(TransactionContext)
  const {
    changeHandler,
    formData,
    sendMultiTransaction,
    addressSendToUser,
    network,
    changeChainNetwork,
    chain
  } = transactionCtx

  const [transactHash, setTransactHash] = useState('')

  useEffect(() => {
    window.ethereum.on('chainChanged', networkChanged)
    return () => {
      window.ethereum.removeListener('chainChanged', networkChanged)
    }
    // eslint-disable-next-line
  }, [network])

  const networkChanged = (chainId) => {
    // ? Testnets
    if (network === 'testnet') {
      if (chainId === testnets.ropsten.chainId) { // ? Ropsten
        changeChainNetwork('ropsten')
      } else if (chainId === testnets.polygon.chainId) { // ? Polygon
        changeChainNetwork('polygon')
      } else if (chainId === testnets.binance.chainId) { // ? Binance
        changeChainNetwork('binance')
      }
    } else if (network === 'mainnet') {
      if (chainId === mainnets.ethereum.chainId) { // ? Ethereum
        changeChainNetwork('ethereum')
      } else if (chainId === mainnets.polygon.chainId) { // ? Polygon
        changeChainNetwork('polygon')
      } else if (chainId === mainnets.binance.chainId) { // ? Binance
        changeChainNetwork('binance')
      }
    }
  }

  const changeNetworkHandler = async (network) => {
    await changeNetwork({ chainNetwork: network })
  }

  const changeNetwork = async ({ chainNetwork }) => {
    try {
      if (!window.ethereum) throw new Error('No Crypto Wallet Found')

      let params = []

      if (network === 'testnet') {
        params = [
          // ! Change between testnets and mainnets
          { ...testnets[chainNetwork] }
        ]
      } else if (network === 'mainnet') {
        params = [
          // ! Change between testnets and mainnets
          { ...mainnets[chainNetwork] }
        ]
      }

      if (chainNetwork === 'ropsten') {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [
            { chainId: `0x${Number(3).toString(16)}` }
          ]
        })
      } else if (chainNetwork === 'ethereum') {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [
            { chainId: `0x${Number(1).toString(16)}` }
          ]
        })
      } else {
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params
        })
      }
    } catch (error) {
      console.error(error);
    }
  }

  console.log(network);
  console.log(chain);
  console.log(transactHash);

  const emptyTransactionHashHandler = () => {
    setTransactHash('')
  }

  const submitHandler = async (e) => {
    e.preventDefault()

    const {
      addressSendToUser,
      addressTo,
      amount,
    } = formData

    // return nothing, leave this function
    // not submit anything
    if (!addressSendToUser || !addressTo || !amount) return

    const transactionHash = await sendMultiTransaction()

    if (transactionHash !== '') {
      if (network === 'testnet') {
        if (chain === 'ropsten') { // ? Ropsten
          console.log(`${network} ${chain}`);
          setTransactHash(`${testnets.ropsten.blockExplorerUrls}tx/${transactionHash}`)
        } else if (chain === 'polygon') { // ? Polygon
          console.log(`${network} ${chain}`);
          setTransactHash(`${testnets.polygon.blockExplorerUrls}tx/${transactionHash}`)
        } else if (chain === 'binance') { // ? Binance
          console.log(`${network} ${chain}`);
          setTransactHash(`${testnets.binance.blockExplorerUrls}tx/${transactionHash}`)
        }
      } else if (network === 'mainnet') {
        if (chain === 'ethereum') { // ? Ropsten
          console.log(`${network} ${chain}`);
          setTransactHash(`${mainnets.ethereum.blockExplorerUrls}tx/${transactionHash}`)
        } else if (chain === 'polygon') { // ? Polygon
          console.log(`${network} ${chain}`);
          setTransactHash(`${mainnets.polygon.blockExplorerUrls}tx/${transactionHash}`)
        } else if (chain === 'binance') { // ? Binance
          console.log(`${network} ${chain}`);
          setTransactHash(`${mainnets.binance.blockExplorerUrls}tx/${transactionHash}`)
        }
      }
    }
  }

  return (
    <Paper elevation={1} className={classes.disclosure}>
      <Loader transactionHash={transactHash} onEmptyTransactHash={emptyTransactionHashHandler}/>
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

          <Button
            variant="outlined"
            color="primary"
            className='mt-4'
            startIcon={<ButtonIcon crypto={'binance'} />}
            onClick={() => changeNetworkHandler('binance')}
          >
            {network === 'testnet' ? 'Binance Testnet' : 'Binance'}
          </Button>

          <Button
            variant="outlined"
            color="primary"
            className='mt-4'
            startIcon={<ButtonIcon crypto={''} />}
            onClick={() => changeNetworkHandler('rsk')}
            disabled
          >
            {network === 'testnet' ? 'RSK Testnet' : 'RSK Mainnet'}
          </Button>

          <Button
            variant="outlined"
            color="primary"
            className='mt-4'
            startIcon={<ButtonIcon crypto={'ethereum'} />}
            onClick={network === 'testnet' ? () => changeNetworkHandler('ropsten') : () => changeNetworkHandler('ethereum')}
          >
            {network === 'testnet' ? 'Ropsten' : 'Ethereum'}
          </Button>

          <Button
            variant="outlined"
            color="primary"
            className='mt-4'
            startIcon={<ButtonIcon crypto={'polygon'} />}
            onClick={() => changeNetworkHandler('polygon')}
          >
            {network === 'testnet' ? 'Polygon Testnet' : 'Polygon'}
          </Button>

          <Button
            variant="outlined"
            color="primary"
            className='mt-4'
            startIcon={<ButtonIcon crypto={'fantom'} />}
            onClick={() => changeNetworkHandler('fantom')}
            disabled
          >
            {network === 'testnet' ? 'Fantom Testnet' : 'Fantom'}
          </Button>

          <Button
            variant="outlined"
            color="primary"
            className='mt-4'
            startIcon={<ButtonIcon crypto={'avalanche'} />}
            onClick={() => changeNetworkHandler('avalanche')}
            disabled
          >
            {network === 'testnet' ? 'Avalanche Testnet' : 'Avalanche'}
          </Button>
        </form>
      </div>
    </Paper>
  )
}

export default Transaction
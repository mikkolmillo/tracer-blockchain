import { useEffect, useContext } from 'react'
import { Button, Paper } from '@material-ui/core'
import React from 'react'
import classes from './index.module.css'
import { TransactionContext } from '../../stores/context/transaction/context'

const networks = {
  polygon: {
    chainId: `0x${Number(137).toString(16)}`,
    chainName: 'Polygon Mainnet',
    nativeCurrency: {
      name: 'MATIC',
      symbol: 'MATIC',
      decimals: 18
    },
    rpcUrls: ['https://polygon-rpc.com/'],
    blockExplorerUrls: ['https://polygonscan.com/']
  }
}

const testnets = {
  rsk: {
    chainId: `0x${Number(31).toString(16)}`,
    chainName: 'RSK Testnet',
    nativeCurrency: {
      name: 'RBTC',
      symbol: 'RBTC',
      decimals: 18
    },
    rpcUrls: ['https://public-node.testnet.rsk.co'],
    blockExplorerUrls: ['https://explorer.testnet.rsk.co']
  },
  ropsten: {
    chainId: `0x${Number(3).toString(16)}`,
    chainName: 'Ropsten Test Network',
    nativeCurrency: {
      name: 'RopstenETH',
      symbol: 'RopstenETH',
      decimals: 18
    },
    rpcUrls: ['https://ropsten.infura.io/v3/'],
    blockExplorerUrls: ['https://ropsten.etherscan.io/']
  },
  binance: {
    chainId: `0x${Number(97).toString(16)}`,
    chainName: 'BSC Testnet',
    nativeCurrency: {
      name: 'BNB',
      symbol: 'BNB',
      decimals: 18
    },
    rpcUrls: ['https://data-seed-prebsc-1-s1.binance.org:8545'],
    blockExplorerUrls: ['https://explorer.binance.org/smart-testnet']
  },
  fantom: {
    chainId: `0x${Number(4002).toString(16)}`,
    chainName: 'Fantom Testnet',
    nativeCurrency: {
      name: 'FTM',
      symbol: 'FTM',
      decimals: 18
    },
    rpcUrls: ['https://rpc.testnet.fantom.network/'],
    blockExplorerUrls: ['https://testnet.ftmscan.com/']
  },
  polygon: {
    chainId: `0x${Number(80001).toString(16)}`,
    chainName: 'Matic Mumbai',
    nativeCurrency: {
      name: 'MATIC',
      symbol: 'MATIC',
      decimals: 18
    },
    rpcUrls: ['https://rpc-mumbai.maticvigil.com/'],
    blockExplorerUrls: ['https://mumbai.polygonscan.com/']
  },
  avalanche: {
    chainId: `0x${Number(43113).toString(16)}`,
    chainName: 'Avalanche Fuji Testnet',
    nativeCurrency: {
      name: 'AVAX',
      symbol: 'AVAX',
      decimals: 18
    },
    rpcUrls: ['https://api.avax-test.network/ext/bc/C/rpc'],
    blockExplorerUrls: ['https://polygonscan.com/']
  },
}

const changeNetwork = async ({ network }) => {
  try {
    if (!window.ethereum) throw new Error('No Crypto Wallet Found')

    if (network === 'ropsten') {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [
          { chainId: `0x${Number(3).toString(16)}` }
        ]
      })
    } else {
      await window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [
          { ...testnets[network] }
        ]
      })
    }
  } catch (error) {
    console.error(error);
  }
}

const Transaction = () => {
  const transactionCtx = useContext(TransactionContext)
  const { changeHandler, formData, sendMultiTransaction, addressSendToUser } = transactionCtx

  useEffect(() => {
    window.ethereum.on('chainChanged', networkChanged)
    return () => {
      window.ethereum.removeListener('chainChanged', networkChanged)
    }
  }, [])

  const networkChanged = (chainId) => {
    console.log({ chainId });
  }

  const changeNetworkHandler = async (network) => {
    await changeNetwork({ network })
  }

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

          {/* <Button
            variant="outlined"
            color="primary"
            type="submit"
            className='mt-4'
          >
            Send Ethereum
          </Button> */}

          <Button
            variant="outlined"
            color="primary"
            className='mt-4'
            onClick={() => changeNetworkHandler('binance')}
          >
            Binance
          </Button>


          <Button
            variant="outlined"
            color="primary"
            className='mt-4'
            onClick={() => changeNetworkHandler('rsk')}
          >
            RSK Mainnet
          </Button>

          <Button
            variant="outlined"
            color="primary"
            className='mt-4'
            onClick={() => changeNetworkHandler('ropsten')}
          >
            Ropsten
          </Button>

          <Button
            variant="outlined"
            color="primary"
            className='mt-4'
            onClick={() => changeNetworkHandler('polygon')}
          >
            Polygon
          </Button>

          <Button
            variant="outlined"
            color="primary"
            className='mt-4'
            onClick={() => changeNetworkHandler('fantom')}
          >
            Fantom
          </Button>

          <Button
            variant="outlined"
            color="primary"
            className='mt-4'
            onClick={() => changeNetworkHandler('avalanche')}
          >
            Avalanche
          </Button>
        </form>
      </div>
    </Paper>
  )
}

export default Transaction
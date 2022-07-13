import { useEffect, useContext } from 'react'
import Image from 'next/image'
import { Button, Paper } from '@material-ui/core'
import React from 'react'
import classes from './index.module.css'
import { TransactionContext } from '../../stores/context/transaction/context'

const mainnets = {
  rsk: {
    chainId: `0x${Number(30).toString(16)}`,
    chainName: 'RSK Mainnet',
    nativeCurrency: {
      name: 'RBTC',
      symbol: 'RBTC',
      decimals: 18
    },
    rpcUrls: ['https://public-node.rsk.co'],
    blockExplorerUrls: ['https://explorer.rsk.co']
  },
  ethereum: {
    chainId: `0x${Number(1).toString(16)}`,
    chainName: 'Ethereum Mainnet',
    nativeCurrency: {
      name: 'ETH',
      symbol: 'ETH',
      decimals: 18
    },
    rpcUrls: ['https://mainnet.infura.io/v3/148c28b304ae438da3ba92dd6d8582f5'], // the game dust mikko
    blockExplorerUrls: ['https://etherscan.io']
  },
  binance: {
    chainId: `0x${Number(56).toString(16)}`,
    chainName: 'Binance Smart Chain Mainnet',
    nativeCurrency: {
      name: 'BNB',
      symbol: 'BNB',
      decimals: 18
    },
    rpcUrls: ['https://bsc-dataseed.binance.org/'],
    blockExplorerUrls: ['https://bscscan.com']
  },
  fantom: {
    chainId: `0x${Number(250).toString(16)}`,
    chainName: 'Fantom Opera Mainnet',
    nativeCurrency: {
      name: 'FTM',
      symbol: 'FTM',
      decimals: 18
    },
    rpcUrls: ['https://rpc.ftm.tools/'],
    blockExplorerUrls: ['https://ftmscan.com']
  },
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
  },
  avalanche: {
    chainId: `0x${Number(43114).toString(16)}`,
    chainName: 'Avalanche C-Chain Mainnet',
    nativeCurrency: {
      name: 'AVAX',
      symbol: 'AVAX',
      decimals: 18
    },
    rpcUrls: ['https://api.avax.network/ext/bc/C/rpc'],
    blockExplorerUrls: ['https://snowtrace.io']
  },
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
    blockExplorerUrls: ['https://testnet.bscscan.com/']
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
    changeChainNetwork
  } = transactionCtx

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
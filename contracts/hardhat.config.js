require('@nomiclabs/hardhat-waffle')
require('dotenv').config()

// TODO: Add private key of an account in order to deploy
const {
  // ? Private key of account to deploy
  PRIVATE_KEY,
  // ? Test networks
  INFURA_ROPSTEN,
  INFURA_RINKEBY,
  ALCHEMY_POLYGON_MUMBAI,
  BSC_TESTNET_URL,
  // ? Main networks
  BSC_MAINNET_URL,
  ETHEREUM_MAINNET_URL,
  POLYGON_MAINNET_URL
} = process.env

module.exports = {
  defaultNetwork: "ropsten",
  solidity: {
    version: "0.8.0",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  networks: {
    hardhat: {
      chainId: 1337
    },
    // * Main Networks
    ethereum: {
      url: ETHEREUM_MAINNET_URL,
      accounts: [],
    },
    polygon: {
      url: POLYGON_MAINNET_URL,
      accounts: [],
    },
    binance: {
      url: BSC_MAINNET_URL,
      accounts: [],
    },
    // * Test Networks
    ropsten: {
      // url: 'https://eth-ropsten.alchemyapi.io/v2/WezfmiT2fd1KObLKfLX3BBbzgeI6Xy9y',
      url: INFURA_ROPSTEN,
      // ! DEV ENV 1 Private Key
      // * Address use to find the contract
      accounts: [PRIVATE_KEY],
      // gasPrice: 8000000000, // ! default is 'auto' which breaks chains without the london hardfork
    },
    rinkeby: {
      // url: 'https://eth-ropsten.alchemyapi.io/v2/WezfmiT2fd1KObLKfLX3BBbzgeI6Xy9y',
      url: INFURA_RINKEBY,
      // ! DEV ENV 1 Private Key
      // * Address use to find the contract
      accounts: [PRIVATE_KEY],
      // gasPrice: 8000000000, // ! default is 'auto' which breaks chains without the london hardfork
    },
    bsc_testnet: {
      // url: 'https://eth-ropsten.alchemyapi.io/v2/WezfmiT2fd1KObLKfLX3BBbzgeI6Xy9y',
      url: BSC_TESTNET_URL,
      // ! DEV ENV 1 Private Key
      // * Address use to find the contract
      accounts: [PRIVATE_KEY],
      // gasPrice: 35000000000, // ! default is 'auto' which breaks chains without the london hardfork
    },
    matic_testnet: {
      // url: 'https://eth-ropsten.alchemyapi.io/v2/WezfmiT2fd1KObLKfLX3BBbzgeI6Xy9y',
      url: ALCHEMY_POLYGON_MUMBAI,
      // ! DEV ENV 1 Private Key
      // * Address use to find the contract
      accounts: [PRIVATE_KEY],
      // gasPrice: 35000000000, // ! default is 'auto' which breaks chains without the london hardfork
    },
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  },
  mocha: {
    timeout: 40000
  }
}
require('@nomiclabs/hardhat-waffle')

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
    ropsten: {
      // url: 'https://eth-ropsten.alchemyapi.io/v2/WezfmiT2fd1KObLKfLX3BBbzgeI6Xy9y',
      url: 'https://ropsten.infura.io/v3/148c28b304ae438da3ba92dd6d8582f5',
      // ! DEV ENV 1 Private Key
      // * Address use to find the contract
      accounts: ['6e260defa4c747bbcb58c2a70be15c3501c7f9d73683e13ebb9296933f66fd30'],
      gasPrice: 8000000000, // default is 'auto' which breaks chains without the london hardfork
    },
    rinkeby: {
      // url: 'https://eth-ropsten.alchemyapi.io/v2/WezfmiT2fd1KObLKfLX3BBbzgeI6Xy9y',
      url: 'https://rinkeby.infura.io/v3/148c28b304ae438da3ba92dd6d8582f5',
      // ! DEV ENV 1 Private Key
      // * Address use to find the contract
      accounts: ['6e260defa4c747bbcb58c2a70be15c3501c7f9d73683e13ebb9296933f66fd30'],
      gasPrice: 8000000000, // default is 'auto' which breaks chains without the london hardfork
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
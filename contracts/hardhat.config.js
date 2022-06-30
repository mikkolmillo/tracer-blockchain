require('@nomiclabs/hardhat-waffle')

module.exports = {
  solidity: '0.8.0',
  networks: {
    ropsten: {
      url: 'https://eth-ropsten.alchemyapi.io/v2/WezfmiT2fd1KObLKfLX3BBbzgeI6Xy9y',
      // ! DEV ENV 1 Private Key
      accounts: ['6e260defa4c747bbcb58c2a70be15c3501c7f9d73683e13ebb9296933f66fd30']
    }
  }
}
import abi from './abi/SendWithoutOwner.json'

export const contractAbi = abi.abi
// Paste smart contract after being deployed
// here:

// ? Test networks
// export const contractAddress_ropsten_testnet = '0x417eE595b1921f0AF3E6952AE269D82E70a7C549'
export const contractAddress_ropsten_testnet = '0xE297Cd0b09dF5604307C9B70B16Fc263a9bCAc82'
// export const contractAddress_polygon_testnet = '0x8f54Fa30A5957Ad1672d1712dbA0C0b2794cE5FE'
export const contractAddress_polygon_testnet = '0xe000361DbD8db64f575DbEA54142cC87711bAe6c'
// export const contractAddress_binance_testnet = '0x0Ff42Eb923b1F4FF2F2a7e6a2077E7289d5b8ABe'
export const contractAddress_binance_testnet = '0x382Cbc1e051622E165206b07Ac4b08942E8d7EDa'

// ? Main networks
// TODO: Paste deployed contract here:
export const contractAddress_ethereum_mainnet = ''
export const contractAddress_polygon_mainnet = ''
export const contractAddress_binance_mainnet = ''

// Paste the created abi from
// artifacts/contracts/[:DeployedContract]
// to the /abi folder

export const mainnets = {
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
    rpcUrls: [
      'https://bsc-dataseed1.binance.org/',
      'https://bsc-dataseed2.binance.org/',
      'https://bsc-dataseed3.binance.org/',
      'https://bsc-dataseed4.binance.org/',
      'https://bsc-dataseed1.defibit.io/',
      'https://bsc-dataseed3.defibit.io/',
      'https://bsc-dataseed4.defibit.io/',
      'https://bsc-dataseed1.ninicoin.io/',
      'https://bsc-dataseed2.ninicoin.io/',
      'https://bsc-dataseed3.ninicoin.io/',
      'https://bsc-dataseed4.ninicoin.io/',
    ],
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

export const testnets = {
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
    rpcUrls: [
      'https://data-seed-prebsc-1-s1.binance.org:8545/',
      'https://data-seed-prebsc-2-s1.binance.org:8545/',
      'http://data-seed-prebsc-1-s2.binance.org:8545/',
      'http://data-seed-prebsc-2-s2.binance.org:8545/',
      'https://data-seed-prebsc-1-s3.binance.org:8545/',
      'https://data-seed-prebsc-2-s3.binance.org:8545/',
    ],
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
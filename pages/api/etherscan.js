require('dotenv').config()

const { ETHERSCAN_API } = process.env

const etherscanHandler = async (req, res) => {
  const { address, network, chain } = req.query

  let baseURL = ''

  if (network === 'testnet') {
    baseURL = 'https://api-ropsten.etherscan.io'
  } else if (network === 'mainnet') {
    baseURL = "https://api.etherscan.io"
  }
  
  switch (req.method) {
    case 'GET':
      const result = await fetch(
        `${baseURL}/api?module=account&action=txlist&address=${address}&page=1&offset=10&sort=desc&apikey=${ETHERSCAN_API}`
      )

      const data = await result.json()

      res.status(200).json(data)
      break;

    default:
      break;
  }
}

export default etherscanHandler
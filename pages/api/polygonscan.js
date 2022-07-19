require('dotenv').config()

const { POLYGONSCAN_API } = process.env

const polygonScanHandler = async (req, res) => {
  const { address, network, chain } = req.query

  let baseURL = ''

  if (network === 'testnet') {
    baseURL = 'https://api-testnet.polygonscan.com'
  } else if (network === 'mainnet') {
    baseURL = "https://api.polygonscan.com"
  }

  switch (req.method) {
    case 'GET':
      const result = await fetch(
        `${baseURL}/api?module=account&action=txlist&address=${address}&page=1&offset=10&sort=desc&apikey=${POLYGONSCAN_API}`
      )

      const data = await result.json()

      res.status(200).json(data)
      break;

    default:
      break;
  }
}

export default polygonScanHandler
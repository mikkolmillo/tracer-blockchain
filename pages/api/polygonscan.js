require('dotenv').config()

const { POLYGONSCAN_API } = process.env

const polygonScanHandler = async (req, res) => {
  switch (req.method) {
    case 'GET':
      const result = await fetch(
        `https://api-testnet.polygonscan.com/api?module=account&action=txlist&address=0x9b5E65f79dC4e7b8025031Df7e8B433379EE2A51&page=1&offset=10&sort=desc&apikey=${POLYGONSCAN_API}`
      )

      const data = await result.json()

      res.status(200).json(data)
      break;

    default:
      break;
  }
}

export default polygonScanHandler
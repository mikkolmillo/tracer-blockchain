const Binance = require('node-binance-api');
const binance = new Binance().options({
  APIKEY: '<key>',
  APISECRET: '<secret>'
});

const binanceHandler = (req, res) => {
  switch (req.method) {
    case 'GET':
      getBalance()
      res.status(200).json({message: 'success'})
      break;
  
    default:
      break;
  }
}

const getBalance = (req) => {

}

export default binanceHandler
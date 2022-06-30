const etherscanApi = require('etherscan-api')

const etherscanHandler = (req, res) => {
  etherscanApi.init('V7JFYBWVUJIQ64GFB1IVWRFQ95JBTKFEIJ', 'ropsten', 3000);
  
  switch (req.method) {
    case 'GET':
      getBalance()
      res.status(200).json({ message: 'success' })
      break;

    default:
      break;
  }
}

const getBalance = async (req, res) => {
  const balance = await etherscanApi.account.balance('0xD8C42316e2bAFa294C25fc8852dD4935a18511B4');
  console.log(balance);
}

export default etherscanHandler
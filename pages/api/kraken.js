
// * Poutineswap API Credentials
// const key = 'jFDrF9dn9XRLMcQrSNCZmj5ln3wrp1cnzn6QBlKPp2TTiibHLTtCtDEW'; // API Key
// const secret = '0cw84Nqd3Vn7rqPifngCG0kTwmjhEBgtCxX/izdWk90fTrOmhcE3zBZNrAAY8/i1amGJgAiWVaUklJsQVEebfQ=='; // API Private Key


// * Mikko | The Gamedust API Credentials
const key = 'nu9/nVM9ZpZscQ0rEpSE2LJEfS2YzLZLccwzVv1+Zuld2zd2F6s9D5i5'; // API Key
const secret = 'G2DFfhBX7hkCBwhqNiMhV/FeVsaGZtaLsF2BBCyWNhr/6ln8BQXI6ifoPD2BcXKDxgmjLyEz6aDmGg8yoa4kQw=='; // API Private Key

const KrakenClient = require('kraken-api');
const kraken = new KrakenClient(key, secret);

(async () => {
  // Display user's balance
  console.log(await kraken.api('Balance'));
})();

const krakenHandler = (req, res) => {
  switch (req.method) {
    case 'GET':
      res.status(200).json({ message: 'Hello World' })
      break;

    default:
      break;
  }
}

export default krakenHandler
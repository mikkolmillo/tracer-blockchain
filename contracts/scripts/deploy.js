// const main = async() =>  {
//   const Transactions = await hre.ethers.getContractFactory("Transactions");
//   const transactions = await Transactions.deploy();

//   await transactions.deployed();

//   console.log("Transactions deployed to:", transactions.address);
// }

// ? MultiSend Contract
// const main = async() =>  {
//   const MultiSend = await hre.ethers.getContractFactory("MultiSend");
//   const multiSend = await MultiSend.deploy();

//   await multiSend.deployed();

//   console.log("MultiSend deployed to:", multiSend.address);
// }

// ? SendMultiple without owner Contract
const main = async() =>  {
  const SendWithoutOwner = await hre.ethers.getContractFactory("SendWithoutOwner");
  const sendWithoutOwner = await SendWithoutOwner.deploy();

  await sendWithoutOwner.deployed();

  console.log("SendWithoutOwner deployed to:", sendWithoutOwner.address);
}

const runMain = async() => {
  try {
    await main()
    process.exit(0)
  } catch (error) {
    console.error(error);
    process.exit(1)
  }
}

runMain()

// ? Run npx hardhat script to deploy
// * npx hardhat run scripts/deploy.js --network ropsten
// After getting the smart contract, paste it in the constants on the frontend side
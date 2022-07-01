const main = async() =>  {
  const Transactions = await hre.ethers.getContractFactory("Transactions");
  const transactions = await Transactions.deploy();

  await transactions.deployed();

  console.log("Transactions deployed to:", transactions.address);
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
// npx hardhat run scripts/deploy.js --network ropsten
// After getting the smart contract, paste it in the constants on the frontend side
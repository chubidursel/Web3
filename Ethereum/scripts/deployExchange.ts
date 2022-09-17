import { ethers } from "hardhat";

// npx hardhat clean && npx hardhat compile

//npx hardhat run --network localhost scripts/deployExchange.ts
// npx hardhat run --network rinkeby scripts/deployExchange.ts

// verify SC on etherscan 
//npx hardhat verify --network rinkeby 0xE1D5aFb20a6Fe4bD9139D91C9c833dA4c6AAcF12 0x4F77F82dF5CcC8D8d5f46ECadA58e500f53fDb3a

async function main() {

  const address = "0x4F77F82dF5CcC8D8d5f46ECadA58e500f53fDb3a" // ERC20 address

  console.log("🚀 deploying scmart contract.....");

  const [deployer] = await ethers.getSigners();
  
  const Exchange = await ethers.getContractFactory("Exchange");
  const exchange = await Exchange.deploy(address); //deploy token first

  await exchange.deployed();

  console.log("👨 The owner of smart contract is: ", deployer.address);
  console.log("🔥 Smart Contract address:  ", exchange.address);
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

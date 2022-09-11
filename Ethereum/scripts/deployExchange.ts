import { ethers } from "hardhat";

// npx hardhat clean && npx hardhat compile

//npx hardhat run --network localhost scripts/deployExchange.ts
// npx hardhat run --network rinkeby scripts/deployExchange.ts

// verify SC on etherscan 
//npx hardhat verify --network rinkeby 0x15f4d3eD01d833FCE8fbcc76fA61077dAdF44672 0x7C2ED4E6fB642186ec9472813207c902005583D7

async function main() {

  const address = "0x7C2ED4E6fB642186ec9472813207c902005583D7" // ERC20 address

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

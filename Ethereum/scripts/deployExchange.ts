import { ethers } from "hardhat";

// npx hardhat clean && npx hardhat compile

//npx hardhat run --network localhost scripts/deployExchange.ts
// npx hardhat run --network goerli scripts/deployExchange.ts

// verify SC on etherscan 
// npx hardhat verify --network goerli 0xB93FE087284F4b38535260Ac9B1eC8060Ae9f245 0x9fa7096177A9eDC1547cCA1345B6a9C9e3A7eA6D

async function main() {

  const address = "0x9fa7096177A9eDC1547cCA1345B6a9C9e3A7eA6D" // ERC20 address

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

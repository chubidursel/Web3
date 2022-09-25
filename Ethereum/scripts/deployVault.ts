import { ethers } from "hardhat";

// npx hardhat clean && npx hardhat compile

// npx hardhat run --network goerli scripts/deployVault.ts

// verify SC on etherscan 
// npx hardhat verify --network goerli 0xBd9bb2397512527718125661faC4c5b63d0b0c2d 0x9fa7096177A9eDC1547cCA1345B6a9C9e3A7eA6D

async function main() {

  const address = "0x9fa7096177A9eDC1547cCA1345B6a9C9e3A7eA6D" // ERC20 address

  console.log("🚀 deploying scmart contract.....");

  const [deployer] = await ethers.getSigners();
  
  const Exchange = await ethers.getContractFactory("Vault");
  const exchange = await Exchange.deploy(address); 

  await exchange.deployed();

  console.log("👨 The owner of smart contract is: ", deployer.address);
  console.log("🔥 Smart Contract address:  ", exchange.address);
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

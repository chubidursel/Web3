import { ethers } from "hardhat";

// npx hardhat clean && npx hardhat compile

// npx hardhat run --network goerli scripts/deployFaucet.ts

// verify SC on etherscan 
// npx hardhat verify --network goerli 0xac08174CFC05d7aEB4dEB87044787D6BFfd69e61 0x9fa7096177A9eDC1547cCA1345B6a9C9e3A7eA6D

async function main() {

  const address = "0x9fa7096177A9eDC1547cCA1345B6a9C9e3A7eA6D" // ERC20 address

  console.log("🚀 deploying scmart contract.....");

  const [deployer] = await ethers.getSigners();
  
  const Contract = await ethers.getContractFactory("FaucetCWT");
  const contract = await Contract.deploy(address); //deploy token first

  await contract.deployed();

  console.log("👨 The owner of smart contract is: ", deployer.address);
  console.log("🔥 Smart Contract address:  ", contract.address);
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

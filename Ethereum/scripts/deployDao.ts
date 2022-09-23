import { ethers } from "hardhat";

// npx hardhat clean && npx hardhat compile

// npx hardhat run --network goerli scripts/deployDao.ts

// verify SC on etherscan 
// npx hardhat verify --network goerli 0x76086675490192222654F93a15761f53a5B96a15 0x71aca2815d8237A3bf3DB4AcE47115666F46a961

async function main() {

  const address = "0x71aca2815d8237A3bf3DB4AcE47115666F46a961" // ERC721 address

  console.log("🚀 deploying scmart contract.....");

  const [deployer] = await ethers.getSigners();
  
  const DaoContract = await ethers.getContractFactory("DaoSimple");
  const daoContract = await DaoContract.deploy(address); //deploy token first

  await daoContract.deployed();

  console.log("👨 The owner of smart contract is: ", deployer.address);
  console.log("🔥 Smart Contract address:  ", daoContract.address);
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

import { ethers } from "hardhat";

// npx hardhat clean && npx hardhat compile

// npx hardhat run --network goerli scripts/deployDao.ts

// verify SC on etherscan 
// npx hardhat verify --network goerli 0x05C94576Ef2aCB916D64e714b477a8814F58Aa7a 0x3eEEaEe76C2D5d4a1E72106F13AB82F750b19994

async function main() {

  const address = "0x3eEEaEe76C2D5d4a1E72106F13AB82F750b19994" // ERC721 address

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

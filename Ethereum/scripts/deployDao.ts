import { ethers } from "hardhat";

// npx hardhat clean && npx hardhat compile

// npx hardhat run --network goerli scripts/deployDao.ts

// verify SC on etherscan 
// npx hardhat verify --network goerli 0x33C0Be7211F2eB39Cfb80f3Df9E5aAeC0e50E82E 0x8E05352b5937e9aaCc1e1F39C2A7D335e044a9ED

async function main() {

  const address = "0x8E05352b5937e9aaCc1e1F39C2A7D335e044a9ED" // ERC721 address

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

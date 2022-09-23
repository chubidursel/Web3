import { ethers } from "hardhat";

// npx hardhat clean && npx hardhat compile

// npx hardhat run --network goerli scripts/deployAuctionNft.ts

// verify SC on etherscan 
// npx hardhat verify --network goerli 0x8DEC16652765ddfD5f8fB7fB3620749b89D9e978 0x71aca2815d8237A3bf3DB4AcE47115666F46a961

async function main() {

  const address = "0x71aca2815d8237A3bf3DB4AcE47115666F46a961" // ERC721 address

  console.log("🚀 deploying scmart contract.....");

  const [deployer] = await ethers.getSigners();
  
  const Exchange = await ethers.getContractFactory("AuctionFactory");
  const exchange = await Exchange.deploy(address); //deploy token first

  await exchange.deployed();

  console.log("👨 The owner of smart contract is: ", deployer.address);
  console.log("🔥 Smart Contract address:  ", exchange.address);
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

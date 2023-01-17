import { ethers } from "hardhat";

// npx hardhat clean && npx hardhat compile

// npx hardhat run --network goerli scripts/deployAuctionNft.ts

// verify SC on etherscan 
// npx hardhat verify --network goerli 0x835D203A80F63923Dc5DDDf1bbE9519058365374 0x8E05352b5937e9aaCc1e1F39C2A7D335e044a9ED

async function main() {

  const address = "0x8E05352b5937e9aaCc1e1F39C2A7D335e044a9ED" // ERC721 address

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

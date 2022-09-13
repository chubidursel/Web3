import { ethers } from "hardhat";

//npx hardhat run --network localhost scripts/deployNFT.ts
// npx hardhat run --network rinkeby scripts/deployNFT.ts

// verify SC on etherscan 
//npx hardhat verify 0x436c7CEe43947A1714914ccc30223C235f8605aF --network rinkeby

async function main() {
  console.log("🚀 deploying scmart contract.....");

  const [deployer] = await ethers.getSigners();
  
  const Nft = await ethers.getContractFactory("NftTest");
  const token = await Nft.deploy();

  await token.deployed();

  console.log("👨 The owner of smart contract is: ", deployer.address);
  console.log("🔥 Smart Contract address:  ", token.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

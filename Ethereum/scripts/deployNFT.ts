import { ethers } from "hardhat";
// npx hardhat clean && npx hardhat compile
// npx hardhat run --network localhost scripts/deployNFT.ts
// npx hardhat run --network goerli scripts/deployNFT.ts

// verify SC on etherscan 
//npx hardhat verify 0x71aca2815d8237A3bf3DB4AcE47115666F46a961 --network goerli

async function main() {
  console.log("🚀 deploying scmart contract.....");

  const [deployer] = await ethers.getSigners();
  
  const Nft = await ethers.getContractFactory("Emoji");
  const token = await Nft.deploy();

  await token.deployed();

  console.log("👨 The owner of smart contract is: ", deployer.address);
  console.log("🔥 Smart Contract address:  ", token.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

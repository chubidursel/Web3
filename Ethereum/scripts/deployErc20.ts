import { ethers } from "hardhat";
// npx hardhat clean && npx hardhat compile
//npx hardhat run --network localhost scripts/deployErc20.ts
// npx hardhat run --network goerli scripts/deployErc20.ts

// verify SC on etherscan 
//npx hardhat verify 0x9fa7096177A9eDC1547cCA1345B6a9C9e3A7eA6D --network goerli

async function main() {
  console.log("🚀 deploying scmart contract.....");

  const [deployer] = await ethers.getSigners();
  
  const Token = await ethers.getContractFactory("CryptoWorldToken");
  const token = await Token.deploy();

  await token.deployed();

  console.log("👨 The owner of smart contract is: ", deployer.address);
  console.log("🔥 Smart Contract address:  ", token.address);
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

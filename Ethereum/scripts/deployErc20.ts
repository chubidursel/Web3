import { ethers } from "hardhat";

//npx hardhat run --network localhost scripts/deployErc20.ts
// npx hardhat run --network rinkeby scripts/deployErc20.ts

// verify SC on etherscan 
//npx hardhat verify 0x7C2ED4E6fB642186ec9472813207c902005583D7 --network rinkeby

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

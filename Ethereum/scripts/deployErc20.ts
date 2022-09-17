import { ethers } from "hardhat";

//npx hardhat run --network localhost scripts/deployErc20.ts
// npx hardhat run --network rinkeby scripts/deployErc20.ts

// verify SC on etherscan 
//npx hardhat verify 0x4F77F82dF5CcC8D8d5f46ECadA58e500f53fDb3a --network rinkeby

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

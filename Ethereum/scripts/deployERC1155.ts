import { ethers } from "hardhat";
// npx hardhat clean && npx hardhat compile
// npx hardhat run --network localhost scripts/deployERC1155.ts
// npx hardhat run --network goerli scripts/deployERC1155.ts

// verify SC on etherscan 
//npx hardhat verify 0xc7Afde5bF7011eC415e7107BaA6FF02559E6f44f --network goerli

async function main() {
  console.log("🚀 deploying smart contract.....");

  const [deployer] = await ethers.getSigners();
  
  const Nft = await ethers.getContractFactory("MyCoin");
  const token = await Nft.deploy();

  await token.deployed();

  console.log("👨 The owner of smart contract is: ", deployer.address);
  console.log("🔥 Smart Contract address:  ", token.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

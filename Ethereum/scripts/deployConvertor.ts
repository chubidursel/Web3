import { ethers } from "hardhat";

// npx hardhat clean && npx hardhat compile

// npx hardhat run --network goerli scripts/deployConvertor.ts

// verify SC on etherscan 
// npx hardhat verify --network goerli 0x1B493aC3C02735546736b2db2c29A02F49285731

async function main() {

  console.log("🚀 deploying scmart contract.....");

  const [deployer] = await ethers.getSigners();
  
  const Demo = await ethers.getContractFactory("Converter");
  const demo = await Demo.deploy();


  await demo.deployed();

  console.log("👨 The owner of smart contract is: ", deployer.address);
  console.log("🔥 Smart Contract address:  ", demo.address);
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

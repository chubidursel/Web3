import { ethers } from "hardhat";

// npx hardhat clean && npx hardhat compile
// npx hardhat run --network goerli scripts/deployProxyBox.ts

// verify SC on etherscan 
//npx hardhat verify 0x629d6c9473921cCe3317f213c097b16168664646 --network goerli

async function main() {
  console.log("🚀 deploying scmart contract.....");

  const [deployer] = await ethers.getSigners();
  
  const Box1 = await ethers.getContractFactory("BoxV1");
  const box1 = await Box1.deploy();

  const Box2 = await ethers.getContractFactory("BoxV2");
  const box2 = await Box2.deploy();


  await box1.deployed();

  console.log("👨 The owner of smart contract is: ", deployer.address);
  console.log("🔥 Smart Contract BOX 1 address:  ", box1.address);
  console.log("🔥 Smart Contract BOX 2 address:  ", box2.address);
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

// 0x42551E0B5d48ed3A4CEb8592E31e13E24adf19a0
// 0x629d6c9473921cCe3317f213c097b16168664646
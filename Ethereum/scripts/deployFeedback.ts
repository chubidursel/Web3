import { ethers } from "hardhat";

// npx hardhat clean && npx hardhat compile
//npx hardhat run --network goerli scripts/deployFeedback.ts
// npx hardhat verify 0x99f2eaafab75a5c8BeCCE44861a4a97e79ad83d2 --network goerli


async function main() {
  console.log("🚀 deploying scmart contract.....");
  
  const Demo = await ethers.getContractFactory("Feedback");
  const demo = await Demo.deploy();

  await demo.deployed();

  console.log("🔥 Smart Contract address:  ", demo.address);
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});


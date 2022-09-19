import { ethers } from "hardhat";

// npx hardhat clean && npx hardhat compile
//npx hardhat run --network goerli scripts/deployChainLinkEth.ts
// npx hardhat verify 0x3Fb7955c779F3871C076F905139C8EB6703b2063 --network goerli


async function main() {
  console.log("🚀 deploying scmart contract.....");
  
  const Demo = await ethers.getContractFactory("ChainLinkETH");
  const demo = await Demo.deploy();

  await demo.deployed();

  console.log("🔥 Smart Contract address:  ", demo.address);
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});


import { ethers } from "hardhat";

//npx hardhat run --network localhost scripts/deploy.ts

async function main() {
  console.log("🚀 deploying scmart contract.....");
  
  const Demo = await ethers.getContractFactory("Demo");
  const demo = await Demo.deploy();

  await demo.deployed();

  console.log("🔥 Smart Contract address:  ", demo.address);
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

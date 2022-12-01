import { ethers } from "hardhat";
import hre from 'hardhat';
// npx hardhat clean && npx hardhat compile
// npx hardhat run --network localhost scripts/deployERC1155.ts
// npx hardhat run --network goerli scripts/deployERC1155.ts

// verify SC on etherscan 
//npx hardhat verify 0xc7Afde5bF7011eC415e7107BaA6FF02559E6f44f --network goerli

async function main() {
  console.log("🚀 deploying smart contract.....");

  const [deployer] = await ethers.getSigners();
  
  const Contract = await ethers.getContractFactory("MyCoin");
  const contract = await Contract.deploy();

  await contract.deployed();

  console.log("👨 The owner of smart contract is: ", deployer.address);
  console.log("🔥 Smart Contract address:  ", contract.address);


  // verify contract >>>>>>DOES IT WORK?
  await hre.run("verify:verify", {
    address: contract.address,
    constructorArguments: []
  })
  console.log("CONTRACT HAS BEEN VERIFIED! YAHOOOOO");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

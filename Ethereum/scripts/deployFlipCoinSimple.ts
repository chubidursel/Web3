import { ethers } from "hardhat";
import hre from 'hardhat';

// npx hardhat clean && npx hardhat compile

// npx hardhat run --network goerli scripts/deployFlipCoinSimple.ts

// verify SC on etherscan 
// npx hardhat verify --network goerli 0x05AEfb4C6620C81830b4C053fcDFa15a91428e68 0x9fa7096177A9eDC1547cCA1345B6a9C9e3A7eA6D

async function main() {
  console.log("🚀 deploying smart contract.....");

  const address = "0x9fa7096177A9eDC1547cCA1345B6a9C9e3A7eA6D" // ERC20 address

  const [deployer] = await ethers.getSigners();
  
  const Contract = await ethers.getContractFactory("FlipCoinSimple");
  const contract = await Contract.deploy(address);

  await contract.deployed();

  console.log("👨 The owner of smart contract is: ", deployer.address);
  console.log("🔥 Smart Contract address:  ", contract.address);


  // verify contract >>>>>>DOES IT WORK?
  // await hre.run("verify:verify", {
  //   address: contract.address,
  //   constructorArguments: []
  // })
  // console.log("CONTRACT HAS BEEN VERIFIED! YAHOOOOO");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

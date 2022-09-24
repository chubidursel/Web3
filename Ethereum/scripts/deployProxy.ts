import { ethers } from "hardhat";

// npx hardhat clean && npx hardhat compile

// npx hardhat run --network goerli scripts/deployProxy.ts

// verify SC on etherscan 
// npx hardhat verify --network goerli 0x41153577d5931F5c47f575d2EC1674e10AB102aB 0x42551E0B5d48ed3A4CEb8592E31e13E24adf19a0 0x629d6c9473921cCe3317f213c097b16168664646

async function main() {

  const address1 = "0x42551E0B5d48ed3A4CEb8592E31e13E24adf19a0" // ERC721 address
  const address2 = "0x629d6c9473921cCe3317f213c097b16168664646" 
  console.log("🚀 deploying scmart contract.....");

  const [deployer] = await ethers.getSigners();
  
  const Proxy = await ethers.getContractFactory("Proxy");
  const exchange = await Proxy.deploy(address1, address2); //deploy token first

  await exchange.deployed();

  console.log("👨 The owner of smart contract is: ", deployer.address);
  console.log("🔥 Smart Contract address:  ", exchange.address);
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

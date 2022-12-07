import { ethers } from "hardhat";
// npx hardhat clean && npx hardhat compile
// npx hardhat run --network localhost scripts/deployERC1155.ts
// npx hardhat run --network goerli scripts/deployERC1155.ts


// VERIFY IT THRU REMIX AND FLAT
// verify SC on etherscan 
//npx hardhat verify 0x3eFE4982C0F35721e46f195Cac74Cbbe48F625B9 --network goerli

async function main() {
  console.log("🚀 deploying smart contract.....");

  const [deployer] = await ethers.getSigners();
  
  const Nft = await ethers.getContractFactory("CoinCollection");
  const token = await Nft.deploy();

  await token.deployed();

  console.log("👨 The owner of smart contract is: ", deployer.address);
  console.log("🔥 Smart Contract address:  ", token.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

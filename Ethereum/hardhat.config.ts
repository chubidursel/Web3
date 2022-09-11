import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@openzeppelin/hardhat-upgrades";

import "@nomiclabs/hardhat-etherscan";

import dotenv from "dotenv";
dotenv.config();

const config: HardhatUserConfig = {
  solidity: "0.8.9",
  
};

export default config;

// etherscan: {
//   apiKey: process.env.ETHERSCAN_VERIFY,
// },
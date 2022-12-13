import { ethers } from "ethers";

// https://data-seed-prebsc-1-s1.binance.org:8545/

const bsc_jsonRPC_testnet = "https://data-seed-prebsc-1-s1.binance.org:8545/" // json RPC url
const bscProvider = new ethers.providers.JsonRpcProvider(bsc_jsonRPC_testnet)

export default bscProvider; 


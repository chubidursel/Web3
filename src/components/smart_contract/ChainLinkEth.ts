import { ethers } from "ethers";
import defaultProvider from "../../abi/defaultProvider";

const address = "0x3Fb7955c779F3871C076F905139C8EB6703b2063"
const abi = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"getLatestPrice","outputs":[{"internalType":"int256","name":"","type":"int256"}],"stateMutability":"view","type":"function"}]

export const contractChainLink = new ethers.Contract(address, abi, defaultProvider)


import { ethers } from "ethers";
import walletProvider from "../../abi/walletProvider"
import defaultProvider from "../../abi/defaultProvider"


const address1 = "0x42551E0B5d48ed3A4CEb8592E31e13E24adf19a0"
const address2 = "0x629d6c9473921cCe3317f213c097b16168664646"
const abi = [{"inputs":[],"name":"dec","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"encNum","outputs":[{"internalType":"bytes","name":"","type":"bytes"}],"stateMutability":"pure","type":"function"},{"inputs":[],"name":"encodeDec","outputs":[{"internalType":"bytes","name":"","type":"bytes"}],"stateMutability":"pure","type":"function"},{"inputs":[],"name":"encodeInc","outputs":[{"internalType":"bytes","name":"","type":"bytes"}],"stateMutability":"pure","type":"function"},{"inputs":[],"name":"implementation","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"inc","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"num","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}]
  //this sc you can only read
export const contractBoxV1 = new ethers.Contract(address1, abi, defaultProvider)
export const contractBoxV2 = new ethers.Contract(address2, abi, defaultProvider)

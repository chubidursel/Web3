import { ethers } from "ethers";
import walletProvider from "../../abi/walletProvider"
import defaultProvider from "../../abi/defaultProvider";

const address = "0x3Fb7955c779F3871C076F905139C8EB6703b2063"
const abi = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"getLatestPrice","outputs":[{"internalType":"int256","name":"","type":"int256"}],"stateMutability":"view","type":"function"}]

export const contractChainLink = new ethers.Contract(address, abi, defaultProvider)

// //smart contract with Signer so we can signer
// const signer = walletProvider.getSigner();
// export const contractERC20WithSigner = contractERC20.connect(signer)
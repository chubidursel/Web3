import { ethers } from "ethers";
import walletProvider from "../../abi/walletProvider"
import defaultProvider from "../../abi/defaultProvider"


const address = "0x41153577d5931F5c47f575d2EC1674e10AB102aB"

const abi = [{"inputs":[{"internalType":"address","name":"_imp1","type":"address"},{"internalType":"address","name":"_imp2","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"stateMutability":"payable","type":"fallback"},{"inputs":[],"name":"implementation","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"implementation1","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"implementation2","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"num","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"switchImplementation","outputs":[],"stateMutability":"nonpayable","type":"function"},{"stateMutability":"payable","type":"receive"}]  //this sc you can only read
export const contractProxy = new ethers.Contract(address, abi, defaultProvider)

//smart contract with Signer so we can signer
const signer = walletProvider.getSigner();
export const contractProxyWithSigner = contractProxy.connect(signer)


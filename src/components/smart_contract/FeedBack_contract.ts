import { ethers } from "ethers";
import walletProvider from "../../abi/walletProvider"
import defaultProvider from "../../abi/defaultProvider";

const address = "0x99f2eaafab75a5c8BeCCE44861a4a97e79ad83d2"
const abi = [{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"who","type":"address"},{"indexed":false,"internalType":"string","name":"feedBack","type":"string"},{"indexed":false,"internalType":"uint256","name":"time","type":"uint256"}],"name":"FeedBack","type":"event"},{"inputs":[],"name":"feebackAmount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"_feedback","type":"string"}],"name":"leaveFeedback","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"listFeedback","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"}]
export const contractFeedBack = new ethers.Contract(address, abi, defaultProvider)

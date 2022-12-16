import { ethers } from "ethers";
import defaultProvider from "../../abi/defaultProvider";


// V3 "0x96F7010a4706756faFd6ee43969993334F80cfA1"
const address = "0x05AEfb4C6620C81830b4C053fcDFa15a91428e68" //V4
const abi = [{"inputs":[{"internalType":"contract IERC20","name":"_token","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"who","type":"address"},{"indexed":false,"internalType":"uint256","name":"when","type":"uint256"},{"indexed":false,"internalType":"bool","name":"didWin","type":"bool"},{"indexed":false,"internalType":"uint256","name":"randomNum","type":"uint256"}],"name":"Flip","type":"event"},{"inputs":[],"name":"checkUrBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_bank","type":"uint256"},{"internalType":"uint256","name":"_bet","type":"uint256"}],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_saltFromJS","type":"uint256"},{"internalType":"bool","name":"choise","type":"bool"}],"name":"flip","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"token","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"userInfo","outputs":[{"internalType":"uint256","name":"bank","type":"uint256"},{"internalType":"uint256","name":"bet","type":"uint256"},{"internalType":"bool","name":"wonLast","type":"bool"},{"internalType":"uint256","name":"lost","type":"uint256"},{"internalType":"uint256","name":"gameCount","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"withdrawOwner","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdrawPlayer","outputs":[],"stateMutability":"nonpayable","type":"function"}]
export const contractFlipSimple = new ethers.Contract(address, abi, defaultProvider)





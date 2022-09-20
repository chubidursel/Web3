import { ethers } from "ethers";
import walletProvider from "../../abi/walletProvider"
import defaultProvider from "../../abi/defaultProvider";

const address = "0xE1D5aFb20a6Fe4bD9139D91C9c833dA4c6AAcF12"
const abi = [{"inputs":[{"internalType":"address","name":"_nft","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"auction","type":"address"},{"indexed":false,"internalType":"address","name":"owner","type":"address"},{"indexed":false,"internalType":"uint256","name":"time","type":"uint256"}],"name":"CreatedAuction","type":"event"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"createAuction","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"listOfAuctions","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"nft","outputs":[{"internalType":"contract IERC721","name":"","type":"address"}],"stateMutability":"view","type":"function"}]
export const contractAuctionFactory = new ethers.Contract(address, abi, defaultProvider)

//smart contract with Signer so we can signer
const signer = walletProvider.getSigner();
export const contractAuctionFactoryWithSigner = contractAuctionFactory.connect(signer)

import { ethers } from "ethers";

declare let window: any;
let walletProvider:any;

if (typeof window !== "undefined" && window?.ethereum) {
  walletProvider = new ethers.providers.Web3Provider(window.ethereum);
} 

export default walletProvider;

//const signer = walletProvider.getSigner();
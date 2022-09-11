import { ethers } from "ethers";


// Bad solution, gonna find the better way later
declare let window: any;
let metamaskProvider:any;
      
if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
  metamaskProvider = new ethers.providers.Web3Provider(window.ethereum);
} 

export default metamaskProvider;
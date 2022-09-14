import { ethers } from "ethers";
import {config} from "dotenv";
config();

//How To Get Pending Ethereum Mempool Transactions Using Ethers.js 

async function main(){
    const provider = new ethers.providers.WebSocketProvider(`wss://intensive-cosmological-pool.ethereum-goerli.discover.quiknode.pro/${process.env.QUICKNODE_API_WSS}/`);
    provider.on('rending', async(tx)=>{
        const txInfo = await provider.getTransaction(tx);
        console.log(txInfo)
    })
}

main() 

// ts-node src/coolFeauters/mempool.ts

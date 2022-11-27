import { ethers } from 'ethers'
// import * as dotenv from 'dotenv' 
// dotenv.config({ path: '../../../../.env' })


export const SendTx = async (mnemonic, to, amount, data) =>{

    console.log('🦶 0', mnemonic, to, amount, data)

    // if(!data){
    //     data = '0x'
    // } else if(!amount){
    //     amount = "0"
    // }
   

    try {
        console.log("Start")
        //const provider = new ethers.providers.JsonRpcProvider(`https://goerli.infura.io/v3/${process.env.INFURA_API}`)
        const provider = new ethers.providers.JsonRpcProvider(`https://eth-goerli.g.alchemy.com/v2/mBtpcVMOf8dYHF9q64t_ZAriU_utqtCk`)
        console.log('🦶 1', provider)

        const gasPrice = await provider.getGasPrice()
    console.log('🦶 2', gasPrice.toString())
    
        const wallet = ethers.Wallet.fromMnemonic(mnemonic)

     console.log("🖥 Wallet: ", wallet)  
        const signer = wallet.connect(provider)

    console.log("🖥 Wallet with signer", signer)  

        const tx = {
            from: wallet.address,
            to: to,
            value: ethers.utils.parseUnits(amount.toString(), 'ether'),
            data: data,
            gasPrice: gasPrice,
            gasLimit: ethers.utils.hexlify(100000), // 100gwei
            nonce: provider.getTransactionCount(wallet.address, 'latest'),
        }
  
    
        const transaction = await signer.sendTransaction(tx);
    
        const res = await transaction.wait(1)
    console.log("✅ Transation result: ", res)
    console.log("✅ Transation result: ", res.transactionHash)
    return res.transactionHash    
    
    } catch (error) {
        console.log("❌ Error: ", error)  
    }


}

//SendTx('www', 'qqqq', 21)



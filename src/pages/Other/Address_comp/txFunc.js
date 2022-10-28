import { ethers } from 'ethers'
import * as dotenv from 'dotenv' 
dotenv.config({ path: '../../../../.env' })



export const sendTx = async(mnemonic, to, amount) =>{
    const provider = new ethers.providers.JsonRpcProvider(`https://goerli.infura.io/v3/${process.env.INFURA_API}`)

    const gasPrice = await provider.getGasPrice()
    //console.log(gasPrice.toString())

    const wallet = new ethers.Wallet.fromMnemonic(mnemonic)

    const signer = wallet.connect(provider)

    const tx = {
        from: wallet.address,
        to: to,
        value: ethers.utils.parseUnits(amount.toString(), 'ether'),
        gasPrice: gasPrice,
        gasLimit: ethers.utils.hexlify(100000), // 100gwei
        nonce: provider.getTransactionCount(wallet.address, 'latest'),
    }
console.log(tx)

    const transaction = await signer.sendTransaction(tx);

    const res = await transaction.wait(1)
console.log(res)
return res
}




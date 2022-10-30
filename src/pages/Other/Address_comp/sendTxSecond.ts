import { ethers } from 'ethers'


(async () => {
    const mnemonic = 'mean wasp quote close thumb world search captain fabric expire bomb crawl'


    console.log("Start") 

    const provider = new ethers.providers.JsonRpcProvider(`https://eth-goerli.g.alchemy.com/v2/mBtpcVMOf8dYHF9q64t_ZAriU_utqtCk`)
    console.log('🦶 1', provider)

    const gasPrice = await provider.getGasPrice()
    const blockNum = await provider.getBlockNumber()
    console.log('🦶 2', gasPrice, blockNum)

    const wallet = ethers.Wallet.fromMnemonic(mnemonic)
    console.log(wallet) 


})();
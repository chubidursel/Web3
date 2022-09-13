import React from 'react'
import { ethers } from "ethers";
import {useState, useEffect} from 'react';
import defaultProvider from '../../abi/defaultProvider';
import walletProvider from '../../abi/walletProvider';
import { contractExchange, contractExchangeWithSigner } from '../../components/smart_contract/exchange'
import Result from './components/exchange/Result';
import { contractERC20WithSigner } from '../../components/smart_contract/erc20'; //ERC token

export function Exchange() {
  const [cwt, setCwt] = useState();
  const [eth, setEth] = useState();
  const [amountBuy, setAmountBuy] = useState();
  const [amountSell, setAmountSell] = useState();

  useEffect(()=>{
    (async()=>{
      try {
        const balanceCWT = await contractExchange.getTokenBalance();
        setCwt(ethers.utils.formatEther(balanceCWT) as any) // ANY

        const balanceETH = await contractExchange.getEthBalance();
        setEth(ethers.utils.formatEther(balanceETH) as any)

      } catch (error) {
        console.log(error)
      }
    })()
  },[])

  const handleBuy = async()=>{
    const tx= {
        value: ethers.utils.parseEther(amountBuy.toString()),
        // gasLimit: ethers.utils.hexlify(21000), //???
        // gasPrice: ethers.utils.hexlify(gas),
    }
    const callFunc = await contractExchangeWithSigner.buyToken(tx)
    await callFunc.wait()
    console.log(callFunc)
  }
  const handleSell = async()=>{
    const amount = ethers.utils.parseEther(amountSell.toString());
    try {

      //calling ERC20 contract to set approve
      const tx = await contractERC20WithSigner.approve(contractExchange.address, amount);
      await tx.wait()
      console.log(tx)

    } catch (error) {
      console.error(error)
    }
    try {
      const callFunc = await contractExchangeWithSigner.sellToken(amount, {gasLimit: 3e7});
      await callFunc.wait()
      console.log(callFunc)
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <div className='w-1/2 h-auto bg-slate-50 m-16 rounded-2xl p-10'>
        <h1 className='text-2xl font-bold'>You wanna get some tokens?</h1>
        <div>Check out our smart contract here: 
        <a href='https://rinkeby.etherscan.io/address/0x15f4d3eD01d833FCE8fbcc76fA61077dAdF44672#code'><span className='px-3 underline font-bold'>Etherscan</span></a>
        </div>
        <div>
          <p>CWT: {cwt}</p>
          <p>ETH: {eth} </p>
          
        </div>
        <div className='m-5 bg-gray-200 w-3/4 h-auto rounded-xl p-2'>
            <h2>Exchange: </h2>
            <div>
                <input className='m-2' onChange={e => setAmountBuy(e.target.value as any)}></input>
                <button onClick={handleBuy} className='bg-green-500 px-10 rounded-xl'>buy</button>
            </div>
            <div>
                <input className='m-2' onChange={e => setAmountSell(e.target.value as any)}></input>
                <button onClick={handleSell} className='bg-red-500 px-10 rounded-xl'>sell</button>
            </div>
        </div>
        <div>
         </div>
        <Result />
        <p>What if i dont have rinkeby acc ❓ </p>
    </div>
  )
}


import React from 'react'
import { ethers } from "ethers";
import {useState, useEffect} from 'react';
import defaultProvider from '../../components/defaultProvider';
import { contractExchange, contractERC20WithSigner } from '../../components/smart_contract/exchange';
export function Exchange() {
  const [cwt, setCwt] = useState();
  const [amountBuy, setAmountBuy] = useState();

  useEffect(()=>{
    (async()=>{
      try {
        const balanceCWT = await contractExchange.getTokenBalance();
        setCwt(ethers.utils.formatEther(balanceCWT) as any) // ANY
      } catch (error) {
        console.log(error)
      }
    })()
  },[])

  const handleBuy = async()=>{
    const tx = await contractERC20WithSigner.getTokenBalance();
    console.log(tx)
  }


  return (
    <div className='w-1/2 h-auto bg-slate-50 m-16 rounded-2xl p-10'>
        <h1 className='text-2xl font-bold'>You wanna get some tokens?</h1>
        <div>Check out our smart contract here: 
        <a href='https://rinkeby.etherscan.io/address/0x15f4d3eD01d833FCE8fbcc76fA61077dAdF44672#code'><span className='px-3 underline font-bold'>Etherscan</span></a>
        </div>
        <div>
          <p>CWT: {cwt}</p>
          <p>ETH:  </p>
        </div>
        <div className='m-5 bg-gray-200 w-3/4 h-auto rounded-xl p-2'>
            <h2>Exchange: </h2>
            <div>
                <input className='m-2' onChange={e => setAmountBuy(e.target.value as any)}></input>
                <button onClick={handleBuy} className='bg-green-500 px-10 rounded-xl'>buy</button>
            </div>
            <div>
                <input className='m-2' onChange={e => setAmountBuy(e.target.value as any)}></input>
                <button onClick={handleBuy} className='bg-red-500 px-10 rounded-xl'>sell</button>
            </div>
        </div>
        <h1> POPUP warning</h1>
        <p>What if i dont have rinkeby acc ❓ </p>
    </div>
  )
}


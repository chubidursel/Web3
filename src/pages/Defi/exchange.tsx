import React from 'react'
import { ethers } from "ethers";
import {useState, useEffect} from 'react';
import defaultProvider from '../../abi/defaultProvider';
import walletProvider from '../../abi/walletProvider';
import { contractExchange, contractExchangeWithSigner } from '../../components/smart_contract/exchange'
import Result from './components/exchange/Result';
import { contractERC20WithSigner } from '../../components/smart_contract/erc20'; //ERC token
import Header from '../../components/headerNew';
import EventsExchange from './components/exchange/EventsExchange';
import Sidebar from '../../components/Sidebar';

export function Exchange() {
  const [cwt, setCwt] = useState();
  const [eth, setEth] = useState();
  const [amountBuy, setAmountBuy] = useState();
  const [amountSell, setAmountSell] = useState();
  const [result, setResult] = useState('');
  const [showEvents, setShowEvents] =useState(false)

  useEffect(()=>{
    (async()=>{
      try {
        const balanceCWT = await contractExchange.getTokenBalance();
        setCwt(balanceCWT.toString()) 

        const balanceETH = await contractExchange.getEthBalance();
        setEth(ethers.utils.formatEther(balanceETH) as any)

      } catch (error) {
        console.log(error)
      }
    })()
  },[cwt])

  const handleBuy = async()=>{
    try {
      if(Number(amountBuy) * 100 <= Number(cwt) ){
        const tx= {
          value: ethers.utils.parseEther(amountBuy.toString()),
      }
        const callFunc = await contractExchangeWithSigner.buyToken(tx)
        await callFunc.wait()
        console.log(callFunc)
        setResult(`✅ Complete! TX hash: ${callFunc.hash}`)
      } 
      else{
        setResult('Not enough fund here 😞')
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleSell = async()=>{
    try {
      const amount = ethers.utils.parseEther(amountSell.toString());

 console.log(amount)

// #1 calling ERC20 contract to set approve
      const resApprove = await contractERC20WithSigner.approve(contractExchange.address, amount);
      await resApprove.wait()
  console.log(resApprove)
      setResult(`✅ Approve completed! TX hash: ${resApprove.hash}`)

// #2 calling this SC to sell tokens
console.log("Start with selling tokens")
      const tx= {
        value: amount,
        gasLimit: 1000000, 
      }
      const resSell = await contractExchangeWithSigner.sellToken(amount);
      await resSell.wait()
console.log(resSell)
console.log("Finished!")
    } catch (error) {
      console.log(error)
      setResult('Oii wei, we got problems! 😞')
    }
  }

  return (
    <>
    <Header />
  
    <div className='w-max h-auto bg-slate-50 m-16 rounded-2xl p-10'>
        <h1 className='text-2xl font-bold'>You wanna get some CWT tokens?</h1>
        <div>Check out this smart contract here: 
        <a href='https://rinkeby.etherscan.io/address/0xE1D5aFb20a6Fe4bD9139D91C9c833dA4c6AAcF12#code' target ='_blank'><span className='px-3 underline font-bold'>Etherscan</span></a>
        </div>
        <div className='flex flex-row'>
            <div className='bg-blue-100 p-3'>
              <p>EXCHANGE RATE: </p>
              <p>1 CWT = 0.01 ETH</p>
            </div>
            <div className='bg-pink-200 p-2'>
              <p>Current amount of tokens and Ethereum here:</p>
              <p>CWT: {cwt}</p>
              <p>ETH: {eth} </p>
            </div>
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
         {result && <div>result: {result}</div>}
        <Result />
        <button onClick={()=>setShowEvents(!showEvents)} className='bg-gray-200 w-full py-2 rounded-xl'>events</button>
    </div>
    {showEvents && <EventsExchange /> }
    </>
  )
}


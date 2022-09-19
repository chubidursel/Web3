import React from 'react'
import { ethers } from "ethers";
import {useState, useEffect} from 'react';
import { contractExchange, contractExchangeWithSigner } from '../../components/smart_contract/exchange'
import Result from './components/exchange/Result';
import { contractERC20WithSigner } from '../../components/smart_contract/erc20'; //ERC token
import Header from '../../components/headerNew';
import EventsExchange from './components/exchange/EventsExchange';

export function Exchange() {
  const [cwt, setCwt] = useState();
  const [eth, setEth] = useState();
  const [rateCwt, setRateCwt] = useState(); // How much ETH for 1 CWT
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

        const getRate = await contractExchange.rate();
        setRateCwt(getRate.toString() / 1000000000000000000)

      } catch (error) {
        console.log(error)
      }
    })()
  },[cwt])

  const handleBuy = async()=>{
    //contract get amount of ETH u want to send to this SC and according to Rate recive certain amount of CWT
    const convertEthToCwt = amountBuy.toString() * rateCwt // 1 * 0.01 

    try {
      if(convertEthToCwt * 100 <= Number(cwt) ){
        //contract get amount of ETH u want to send to this SC and according to Rate recive certain amount of CWT
        const tx= {
          value: ethers.utils.parseEther(convertEthToCwt.toString()),
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

// #1 calling ERC20 contract to set approve
      const resApprove = await contractERC20WithSigner.approve(contractExchange.address, amount);
      await resApprove.wait()
  console.log(resApprove)
      setResult(`✅ Approve completed! TX hash: ${resApprove.hash}`)

// #2 calling this SC to sell tokens
console.log("Start with selling tokens")
      const resSell = await contractExchangeWithSigner.sellToken(amountSell);
      await resSell.wait()
      setResult(`✅ Sell Token completed! TX hash: ${resSell.hash}`)
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
        <a href='https://goerli.etherscan.io/address/0xB93FE087284F4b38535260Ac9B1eC8060Ae9f245' target ='_blank'><span className='px-3 underline font-bold'>Etherscan</span></a>
        </div>
        <div className='flex flex-row'>
            <div className='bg-blue-100 p-3'>
              <p>EXCHANGE RATE: </p>
              <p>1 CWT = {rateCwt} ETH</p>
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
                <input className='m-2' onChange={e => setAmountBuy(e.target.value as any)} placeholder='amount of CWT'></input>
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


import React from 'react'
import defaultProvider from '../../components/defaultProvider';
import { contractERC20 } from '../../components/erc20';
import {useState} from 'react';
import Header from '../../components/header';

export function ERC20() {
  const [owner, setOwner] = useState()
  const [add, setAdd] = useState("")


  async function getData(){
    const blockNum = await defaultProvider.getBlockNumber();
    console.log(blockNum)

    const data = await contractERC20.owner();
    setOwner(data)

  }
  const hadleSupply = async()=>{
    const balance = await contractERC20.balanceOf(add);
    console.log(balance.toString())
  }

  const address = "0x354hb23jhb2"
  const tokenAddress = "0xXXXXXXX"
  const tokenAmount = 10000;

  return (
    <>
    <Header />
<button onClick={getData}>TESTING</button>

<div className="py-6 flex flex-col justify-center sm:py-12">
<div className="py-3 sm:max-w-xl sm:mx-auto ">
<div className="bg-white min-w-1xl flex flex-col rounded-xl shadow-lg ">
      <div className="px-12 py-5">
        <h2 className="text-gray-800 text-3xl font-semibold">Check out our ERC20 token</h2>
      </div>
      <div className="bg-gray-200 w-full flex flex-col items-center">
      <div className="flex flex-col items-center py-6 space-y-3">
          <a href='https://etherscan.io/address/0x7C2ED4E6fB642186ec9472813207c902005583D7' target="_blank"><span className="text-gray-800 text-3xl font-semibold hover:underline">Etherscan</span></a>
          <p>Here i wanna put link to defi page with my small exchange  THIS IS WILL BE OUR FAUSET</p>
      </div>
      <div>
        <h2>Your address: {owner}</h2>
        <h2>Token address: {tokenAddress}</h2>
        <p>total supply: {tokenAmount}</p>
        <p>owner: ??</p>
      </div>
      <div className='p-5'>
        <h1 className='text-4xl text-center'>Token Function:</h1>
        <label>Check your balance: 
        <input onChange={(event)=>setAdd(event.target.value)}></input>
        <button onClick={hadleSupply} className="bg-orange-600 px-10 rounded-xl">submit</button>
        </label>
        
        
        <p> ADD more Feauters....... </p>

      </div>

      </div>
</div>
</div>
</div>
</>
  )
}
/*
  <div className="py-3 sm:max-w-xl sm:mx-auto">
    <div className="bg-white min-w-1xl flex flex-col rounded-xl shadow-lg">
      <div className="px-12 py-5">
        <h2 className="text-gray-800 text-3xl font-semibold">Check out our ERC20 token</h2>
      </div>
      <div className="bg-gray-200 w-full flex flex-col items-center">
        <div className="flex flex-col items-center py-6 space-y-3">
          <a href='https://etherscan.io/token/0x2260fac5e5542a773aa44fbcfedf7c193bc2c599#code' target="_blank"><span className="text-lg text-gray-800">Etherscan</span></a>
          <span className="text-lg text-gray-800">fauset</span>
          
          <div className="flex space-x-3">
            
          </div>
        </div>
        <div className="w-3/4 flex flex-col justify-center">
          <span className="text-lg text-gray-800">function</span>
          <textarea className="p-4 text-gray-500 rounded-xl resize-none">Write your balance to check the balance</textarea>
          <button className="py-3 my-8 text-lg bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl text-white">Check out</button>
        </div>
      </div>
      <div className="h-20 flex items-center justify-center">
        <a href="#" className="text-gray-600">Coming soon ...</a>
      </div>
    </div>
  </div>


*/

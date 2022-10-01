import React, {useState} from 'react'
import { ethers } from "ethers";
import Header from '../../components/headerNew';
import { contractChainLink } from '../../components/smart_contract/ChainLinkEth';

export function ChainLink() {
  const[priceEth, setPriceEth] = useState();
  
  const handleGetPrice = async() => {
    const priceEth = await contractChainLink.getLatestPrice();
    setPriceEth(priceEth.toString())
  }

  // THis for pop up description
  const desciption = (<><div className='font-bold'><h1>there are some text...</h1></div></>)
  
  return (
  <>
  <Header marginFromTop={'1/3'}>
    <h1>Here we implement simple chainLink contract to get data from off-chain</h1>
  </Header>
  <h2 className="flex justify-center text-6xl text-blue-100 font-bold">ChainLink</h2>

  <div className='flex justify-center'>
    <div className='bg-blue-100 w-1/2 flex flex-col m-3 text-purple-800 p-4 rounded-2xl border-4 hover:shadow-2xl border-red-400'>
        <h1 className='font-bold text-center my-3 text-2xl'>Get data from off-chain</h1>
       <div className='flex justify-center mb-3'> <a href='https://goerli.etherscan.io/address/0x3fb7955c779f3871c076f905139c8eb6703b2063#code' target='_blank'>
          <button className="font-bold hover:text-blue-100 hover:shadow-xl rounded-xl text-3xl border-2 border-red-400 px-[15px] hover:bg-red-400">
            Contract</button></a></div>

          <div className='bg-blue-100 rounded-2xl border-2 hover:shadow-2xl border-red-400 p-5 hover:bg-blue-200 flex flex-col'>
              <h1 className='font-bold text-2xl text-center mb-3'>Retrieve the latest asset prices</h1>
              <div className='flex justify-center'>
                <p className='text-xl font-semibold'> Ethereum: {priceEth && <span className='text-5xl font-bold'> {priceEth}$</span>}</p>
                <button onClick={handleGetPrice} className="font-bold hover:text-blue-100 ml-3 hover:shadow-xl rounded-xl text-3xl border-2 border-red-400 px-[15px] hover:bg-red-400">Check</button>
              </div>
          </div>
          <div className='bg-blue-100 mt-3 text-xl font-semibold rounded-2xl border-2 hover:shadow-2xl border-red-400 p-5 text-center hover:bg-blue-200 flex flex-col'>
          <h1 className='text-3xl'>Random Number</h1>
          <p>comming soon....</p>
          </div>
          <div className='bg-blue-100 mt-3 rounded-2xl border-2 text-xl font-semibold hover:shadow-2xl border-red-400 p-5 text-center hover:bg-blue-200 flex flex-col'>
          <h1 className='text-3xl'>Call External APIs</h1>
          <p>comming soon....</p>
          </div>

</div>



    </div>
  </>
  )
}


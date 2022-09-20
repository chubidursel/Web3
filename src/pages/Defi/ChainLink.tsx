import React, {useState} from 'react'
import { ethers } from "ethers";
import {Faq} from '../../components/Faq'
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
  <Header />
  
    <div className='bg-blue-100 w-2/3 flex flex-col m-10 rounded-2xl p-4'>
        <h1 className='font-bold text-center text-5xl'>ChainLink</h1>
        <h1 className='font-bold text-center my-3 text-2xl'>get data from off-chain</h1>

          <div className='bg-blue-100 rounded-2xl border-4 hover:shadow-2xl border-red-400 p-5 hover:bg-blue-200 flex flex-col'>
              <h1 className='font-bold text-2xl text-center'>Retrieve the latest asset prices</h1>
              <div flex-row>
                <span>{priceEth}$</span>
                <button onClick={handleGetPrice} className="font-bold hover:text-blue-100 ml-3 hover:shadow-xl rounded-xl text-3xl border-2 border-red-400 px-[15px] hover:bg-red-400">Check</button>
                <a href='https://goerli.etherscan.io/address/0x3fb7955c779f3871c076f905139c8eb6703b2063#code' target='_blank'><button className="font-bold ml-3 hover:shadow-xl hover:text-blue-100 rounded-xl text-3xl border-2 border-red-400 px-[15px] hover:bg-red-400">Contract</button></a>
              </div>
          </div>
<h1>Random Number</h1>
<h1>Call External APIs</h1>



    </div>
  </>
  )
}


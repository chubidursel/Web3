import React, {useState} from 'react'
import {Faq} from '../../components/Faq'
import Header from '../../components/headerNew';

export function ChainLink() {

  const desciption = (<><div className='font-bold'><h1>there are some text...</h1></div></>)
  
  return (
  <>
  <Header />
  <Faq info={desciption}/>
    <div className='bg-blue-100 w-2/3 flex flex-col m-10 rounded-2xl p-4'>
        <h1 className='font-bold text-center text-5xl'>ChainLink</h1>
        <h1 className='font-bold text-center my-3 text-2xl'>get data from off-chain</h1>

          <div className='bg-blue-100 rounded-2xl border-4 hover:shadow-2xl border-red-400 p-5 hover:bg-blue-200 flex flex-col'>
              <h1 className='font-bold text-2xl text-center'>Retrieve the latest asset prices</h1>
              <div flex-row>
                <span>{'1200'}$</span>
                <button onClick={console.log(21)} className="font-bold hover:text-blue-100 ml-3 hover:shadow-xl rounded-xl text-3xl border-2 border-red-400 px-[15px] hover:bg-red-400">Check</button>
                <a href='https://goerli.etherscan.io/address/0xD4a33860578De61DBAbDc8BFdb98FD742fA7028e#code' target='_blank'><button onClick={console.log(21)} className="font-bold ml-3 hover:shadow-xl hover:text-blue-100 rounded-xl text-3xl border-2 border-red-400 px-[15px] hover:bg-red-400">Contract</button></a>
              </div>
          </div>
<h1>Random Number</h1>
<h1>Call External APIs</h1>



    </div>
  </>
  )
}


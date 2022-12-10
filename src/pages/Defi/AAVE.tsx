import {useState, useEffect} from 'react'
import Header from '../../components/headerNew';

export function AAVE() {



  return (<>
  <Header marginFromTop={'1/3'}>
    <div className='text-center p-4'>
      <h1 className='font-bold'>There is a simple implemetation of DAO</h1>
      <p>How does it work?</p>
      <p>The NFT-holders can create an proposal and vote for them</p>
      <p>If you want to participate and be a member of our DAO you need to get one of our token which u can get in a few different way (buy it on the Auction, in the shop or buy dirrectly from the smart contract)</p>
      <p>PS: We are going to add more feautures here such as a basic standard of Governant contract with TimeLock</p>
    </div>
  </Header>
      <div>
            <h2 className="flex justify-center text-6xl text-blue-100 font-bold m-3 mb-5">AAVE protocol</h2>
            <h2 className="flex justify-center text-6xl font-bold m-3 mb-5 bg-yellow-200">BETA</h2>
            <div className="flex flex-col justify-center">
         

                <div className='bg-blue-100 w-1/2 flex flex-col m-3 text-purple-800 p-4 rounded-2xl border-4 hover:shadow-2xl border-red-400'>
                    <h1 className='font-bold text-center my-3 text-5xl'>Liquidity Pool</h1>
                    
                    
                    {/* https://staging.aave.com/   << design from here*/}
                    <div className='flex flex-row'>
                    <h1 className='font-bold  my-3 text-2xl mr-5'>ETH </h1>
                    <h1 className='font-bold  my-3 text-2xl'>100000</h1>
                        <button className="font-bold py-1 text-2xl hover:shadow-xl mx-10 rounded-xl border-2 border-red-400 px-[15px] hover:bg-red-400 active:bg-red-500 active:text-blue-100">supply</button>
                        <button className="font-bold py-1 text-2xl hover:shadow-xl  mx-10 rounded-xl border-2 border-red-400 px-[15px] hover:bg-red-400 active:bg-red-500 active:text-blue-100">withdraw</button>
                    </div>
                   
                </div>

                <div className='bg-blue-100 w-1/2 flex flex-col m-3 text-purple-800 p-4 rounded-2xl border-4 hover:shadow-2xl border-red-400'>
                    <h1 className='font-bold text-center my-3 text-2xl'>FlashLoan</h1>
                    <a className='text-center hover:underline' href="https://github.com/chubidursel/smart_contracts/tree/main/AAVE/Flashloan">check out github </a>
                </div>

                <div className='bg-blue-100 w-1/2 flex flex-col m-3 text-purple-800 p-4 rounded-2xl border-4 hover:shadow-2xl border-red-400'>
                    <h1 className='font-bold text-center my-3 text-2xl'>Loan</h1>
                </div>
 
            </div>


      </div>
 
    </>
  )
}

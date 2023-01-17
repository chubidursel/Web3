import React, {useEffect, useState} from 'react'
import Pic from "../../../../../assets/unknown.png"
import { auctionPutAddress} from '../../../../../components/smart_contract/AuctionSingle';
import { ethers } from 'ethers';
import walletProvider from '../../../../../abi/walletProvider';
import getErrorMessage from '../../../../../components/getErrorMessage';
// DISPLAY LIKE A MODULE FOR THE WHOLE SCREEN! 

export function AuctionLot({address}) {
  const [highestBid, setHighestBid] = useState(0);
  const [higBidder, setHigBidder] = useState("");
  const [finished, setFinished] = useState(false);
  const [closed, setClosed] = useState(false);
  const [timeFinished, setTimeFinished] = useState('');
  const [result, setResult] = useState('');

  const [bid, setBid] = useState(0);

  function auctionPutAddressSigner(address:string){
    const contract = auctionPutAddress(address)
    const signer = walletProvider.getSigner();
    const contractAuctionWithSigner = contract.connect(signer);
    return contractAuctionWithSigner;
}


  useEffect((()=>{
    (async()=>{
      try {
        const contractInstanse = auctionPutAddress(address)
        const num = await contractInstanse.highestBid()
        setHighestBid(Number(num.toString()) /100000000000000000)
        
        const bired = await contractInstanse.highestBidder()
        const resBider = bired == "0x0000000000000000000000000000000000000000" ? "No bids yet 😿" : bired
        setHigBidder(resBider)

        const finish = await contractInstanse.ended()
        setFinished(finish)

        const closed = await contractInstanse.biddingClosed();
        setClosed(closed);

        const overTime = await contractInstanse.endAt()
        // const timeRow = new Date(overTime.toString() * 1000)
        // const time = timeRow.getHours() + ":" + timeRow.getMinutes()
        //console.log(time)
        const timeJS = new Date().getTime();
        const howManyMinLeft = Math.round((overTime - (timeJS/1000)) / 60)
        setTimeFinished(howManyMinLeft.toString())

      } catch (error) {
        console.log(error)
      }
    })()
  }),[])

  const handleEnding = async() =>{
    try {
      setResult("Sign tx to finish Auction📝")
        const contractInstanseSig = auctionPutAddressSigner(address)
      const finish = await contractInstanseSig.end()
      console.log("DEV>>>", finish)
      setResult("✅ Transation completed!")
    } catch (error) {
      const message = getErrorMessage(error);
      setResult(message)
      console.log(error)
      setTimeout(() => {setResult('')}, 7000)
    }    
  }
  
  const handleBid = async() =>{
    try {
      setResult("Sign tx to bid 📝")
      const contractInstanseSig = auctionPutAddressSigner(address)
    
      const bidBG = ethers.utils.parseUnits(bid.toString(), 'ether')
  
      const tx = await contractInstanseSig.bid({value: bidBG})
      await tx.wait(2)
      console.log(tx)
      setResult("✅ Transation completed!")
    } catch (error) {
      const message = getErrorMessage(error);
      setResult(message)
      console.log(error)
      setTimeout(() => {setResult('')}, 7000)
    }

  }


// There are 3 states of a single Auction
// 1st -> Live  (started)
// 2nd -> Closed (Bidding is closed)
// 3nd -> Finished
const live = <>
            <p className='font-bold'>Finish in: </p><p>{timeFinished} min</p>
            <input type="number"onChange={e => setBid(e.target.value as any)} className='m-2 rounded border-solid border-2 pl-2 border-purple-800' placeholder='amount of ETH'></input>
            <button  className='text-lg font-bold rounded-lg my-4 border-2 border-red-400 px-[15px] hover:bg-red-400 w-1/3' onClick={handleBid}>BID</button>
            {result && <h1 className='font-bold my-3 bg-yellow-100 py-2 text-center  px-1 rounded-xl text-purple-900 text-xl '>{result}</h1>} 
            </>
const closedBid = <>
              <button className='w-full text-2xl font-bold rounded-xl m-2 border-2 border-red-400 py-2 hover:bg-red-400' onClick={handleEnding}>Finished Auction</button>
              {result && <h1 className='font-bold my-3 bg-yellow-100 py-2 text-center  px-1 rounded-xl text-purple-900 text-xl '>{result}</h1>} 
              </> 
const finish = <>
              <h1 className='bg-gray-300 text-center rounded-lg text-3xl py-2 my-4'>🏁 Finished 🏁</h1>
              </>

  return (
    <>
     <div className='rounded-2xl border-4 border-red-400 px-[15px] text-purple-800'>
       <div className='flex justify-center'><img src={Pic} className="h-32" /></div> 
        <p className='font-bold'>address:</p><p>{address.toString().slice(0, 7) + "..." + address.toString().slice(34)}</p>
        <p className='font-bold'>highest bid: </p><p>{highestBid} ETH</p>
        <p className='font-bold'>highest Bidder from address:</p><p>{higBidder.toString().slice(0, 7) + "..." + higBidder.toString().slice(34)}</p>
        {/* {finished ?  <p className='font-bold text-center text-green-500'>Status: active until {timeFinished}</p> : <p className='font-bold text-center text-red-500'>Status: finished!</p>} */}
      {(!closed && !finished)? live : (closed && !finished) ? closedBid : finish}
    </div>
    </>
  )
}


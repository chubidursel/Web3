import React, {useEffect, useState} from 'react'
import Pic from "../../../../../assets/unknown.png"
import { auctionPutAddress, auctionPutAddressSigner } from '../../../../../components/smart_contract/AuctionSingle';
import { ethers } from 'ethers';
// DISPLAY LIKE A MODULE FOR THE WHOLE SCREEN! 

export function AuctionLot({address}) {
  const [highestBid, setHighestBid] = useState(0);
  const [higBidder, setHigBidder] = useState("");
  const [finished, setFinished] = useState(false);
  const [timeFinished, setTimeFinished] = useState('');

  const [bid, setBid] = useState(0);

  //"0x61b593bFC4f84c37DE0553B2F1593B617df9C0f7"
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
        const overTime = await contractInstanse.endAt()
        const timeRow = new Date(overTime.toString() * 1000)
        const time = timeRow.getHours() + ":" + timeRow.getMinutes()
        //console.log(time)
        setTimeFinished(time)

      } catch (error) {
        console.log(error)
      }
    })()
  }),[])

  const handleEnding = async() =>{
    const contractInstanseSig = auctionPutAddressSigner(address)
    const finish = await contractInstanseSig.end()
    console.log(finish)
  }
  
  const handleBid = async() =>{
    const contractInstanseSig = auctionPutAddressSigner(address)
    
    const bidBG = ethers.utils.parseUnits(bid.toString(), 'ether')

    const tx = await contractInstanseSig.bid({value: bidBG})
    await tx.wait(2)
    console.log(tx)
  }

  const handleWithdraw = async()=>{
    const contractInstanseSig = auctionPutAddressSigner(address);
    const txWithdraw = await contractInstanseSig.withdraw()
    console.log(txWithdraw)
  }



  return (
    <>
     <div className='bg-blue-100 w-max rounded-2xl border-4 p-2 border-red-400 px-[15px]'>
        <img src={Pic} className="h-40" />
        <p className='bg-green-200'>address: {address}</p>
        <p className='bg-yellow-200'>highest bid: {highestBid} ETH</p>
        <p className='bg-red-200'>highest Bitter: {higBidder} </p>
        {finished ? <p className='bg-pink-300'>finished!</p> :  <p className='bg-green-500'>active! until {timeFinished}</p>}
        <input type="number" step="0.01" onChange={e => setBid(e.target.value as any)} placeholder='amount of ETH'></input>
        <button disabled={finished} className='bg-orange-400 px-5 w-max' onClick={handleBid}>BID</button>

        <button className='bg-purple-200 px-5 w-full 'onClick={handleEnding}>finied Auction!</button>
        <button className='bg-orange-100 px-5 w-full' onClick={handleWithdraw}>withdraw</button>
    </div>
    </>
  )
}


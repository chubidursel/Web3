import React, {useEffect, useState} from 'react'
import Pic from "../../../../../assets/unknown.png"
import { auctionPutAddress, auctionPutAddressSigner } from '../../../../../components/smart_contract/AuctionSingle';

// DISPLAY LIKE A MODULE FOR THE WHOLE SCREEN! 

export function AuctionLot({address}) {
  const [highestBid, setHighestBid] = useState(0);
  const [higBidder, setHigBidder] = useState("");
  const [finished, setFinished] = useState(false);
  const [timeFinished, setTimeFinished] = useState('');

  const [bid, setBid] = useState(0);

  
  useEffect((()=>{
    (async()=>{
      try {
        const contractInstanse = auctionPutAddress(address)
        const num = await contractInstanse.highestBid()
        setHighestBid(Number(num.toString()) /100000000000000000)
        
        const bired = await contractInstanse.highestBidder()
        setHigBidder(bired)

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
    const tx = await contractInstanseSig.bid({value: bid})
    await tx.wait(2)
    console.log(tx)
  }



  return (
    <>
     <div className='bg-blue-100 w-max rounded-2xl border-4 border-red-400 px-[15px] hover:bg-blue-200'>
        <img src={Pic} className="h-40" />
        <p className='bg-green-200'>address: {address}</p>
        <p className='bg-yellow-200'>highest bid: {highestBid} ETH</p>
        <p className='bg-red-200'>highest Bitter: {higBidder} </p>
        {finished ?  <p className='bg-green-500'>active! until {timeFinished}</p> : <p className='bg-pink-300'>finished!</p>}
        <input type="number"onChange={e => setBid(e.target.value as any)} placeholder='amount of ETH'></input>
        <button  className='bg-orange-400 px-5' onClick={handleBid}>BID</button>

        <button className='bg-purple-200 px-5 w-full 'onClick={handleEnding}>finied Auction!</button>
        <button className='bg-orange-100 px-5 w-full'>withdraw</button>
    </div>
    </>
  )
}


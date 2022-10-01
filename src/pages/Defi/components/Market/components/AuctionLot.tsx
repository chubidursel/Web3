import React, {useEffect, useState} from 'react'
import Pic from "../../../../../assets/unknown.png"
import { auctionPutAddress} from '../../../../../components/smart_contract/AuctionSingle';
import { ethers } from 'ethers';
import walletProvider from '../../../../../abi/walletProvider';
// DISPLAY LIKE A MODULE FOR THE WHOLE SCREEN! 

export function AuctionLot({address}) {
  const [highestBid, setHighestBid] = useState(0);
  const [higBidder, setHigBidder] = useState("");
  const [finished, setFinished] = useState(false);
  const [timeFinished, setTimeFinished] = useState('');

  const [bid, setBid] = useState(0);

  function auctionPutAddressSigner(address:string){
    const contract = auctionPutAddress(address)
    const signer = walletProvider.getSigner();
    const contractAuctionWithSigner = contract.connect(signer);
    return contractAuctionWithSigner;
}

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
     <div className='rounded-2xl border-4 border-red-400 px-[15px] text-purple-800'>
       <div className='flex justify-center'><img src={Pic} className="h-32" /></div> 
        <p className='font-bold'>address:</p><p>{address.toString().slice(0, 7) + "..." + address.toString().slice(34)}</p>
        <p className='font-bold'>highest bid: </p><p>{highestBid} ETH</p>
        <p className='font-bold'>highest Bitter from address:</p><p>{higBidder.toString().slice(0, 7) + "..." + higBidder.toString().slice(34)}</p>
        {finished ?  <p className='font-bold text-center text-green-500'>Status: active until {timeFinished}</p> : <p className='font-bold text-center text-red-500'>Status: finished!</p>}
        <input type="number"onChange={e => setBid(e.target.value as any)} className='m-2 rounded border-solid border-2 pl-2 border-purple-800' placeholder='amount of ETH'></input>
        <button  className='text-lg font-bold rounded-2xl m-2 border-2 border-red-400 px-[15px] hover:bg-red-400' onClick={handleBid}>BID</button>
<div className='flex flex-row justify-center'>
        <button className='text-lg font-bold rounded-2xl m-2 border-2 border-red-400 px-[15px] hover:bg-red-400' onClick={handleEnding}>finied Auction!</button>
        <button className='text-lg font-bold rounded-2xl m-2 border-2 border-red-400 px-[15px] hover:bg-red-400'onClick={handleWithdraw} >withdraw</button>
    </div></div>
    </>
  )
}


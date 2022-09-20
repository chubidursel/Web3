import React from 'react'
import Pic from "../../../../../assets/unknown.png"

// DISPLAY LIKE A MODULE FOR THE WHOLE SCREEN! 

export function AuctionLot() {
  return (
    <>
     <div className='bg-blue-100 w-1/2 rounded-2xl border-4 border-red-400 px-[15px] hover:bg-blue-200'>
        <img src={Pic} className="h-40" />
        <p className='bg-green-200'>amount of bids: </p>
        <p className='bg-yellow-200'>highest bid: </p>
        <p className='bg-red-200'>highest Bitter: </p>
        <p className='bg-purple-200'>Finish: </p>
        <input type="number"></input>
        <button className='bg-orange-400 px-5'>BID</button>
        <button className='bg-orange-100 px-5 w-full m-2'>withdraw</button>
    </div>
    </>
  )
}


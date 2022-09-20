import React from 'react'
import Pic from "../../../../../assets/unknown.png"

export function AuctionLot() {
  return (
    <>
     <div className='bg-blue-100 w-1/2 rounded-2xl border-4 border-red-400 px-[15px] hover:bg-blue-200'>
        <img src={Pic} className="h-40" />
        <p className='bg-green-200'>amount of bids: </p>
        <p className='bg-yellow-200'>highest bid: </p>
        <p className='bg-red-200'>highest Bitter: </p>
        <button className='bg-orange-400 px-5'>BID</button>
    </div>
    </>
  )
}


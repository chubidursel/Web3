import React, {useState} from 'react'
import { AuctionLot } from './AuctionLot';

export function ItemAuction({arr}) {
  const [display, setDisplay] = useState(false);

  return (
    <>
    <div className='bg-blue-200 flex flex-row py-4 space-x-10'>
        <h1 className='bg-green-100'>status</h1>
        <p>nftId</p>
        <h1>address of sc</h1>
        <button className='bg-orange-400 px-5' onClick={()=>{setDisplay(!display)}}>OPEN</button>
    </div>
    {display &&
    <AuctionLot />}
    </>
  )
}


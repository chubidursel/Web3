import React, {useState} from 'react'
import Pic from "../../../../assets/unknown.png"
import { AuctionLot } from './components/AuctionLot';

export function Auction() {
    const [display, setDisplay] = useState(false);

    const listOfAuction = [];


  return (
    <>
    <div className="bg-blue-100 rounded-2xl border-4 w-1/2 m-20" >
        <div>START AUCTION</div>
        <label>Token ID: </label>
        <input type="text" />

        <label>Time: </label>
        <input type="text" placeholder='How many hours' />
        <button className='bg-orange-200 p-3 rounded-xl' >DEPLOY</button>
    </div>
    <div className="bg-blue-100 rounded-2xl border-4 w-1/2 m-20" >
        <div>LIVE AUCTION</div>
        <p>useeffect from Auction Factory to see current Auction</p>
        <div className='bg-blue-200 flex flex-row py-4'>
            <p>nftId</p>

            <button className='bg-orange-400 px-5' onClick={()=>{setDisplay(!display)}}>OPEN</button>
        </div>

    </div>

    {display &&
    <AuctionLot />}
    </>
  )
}

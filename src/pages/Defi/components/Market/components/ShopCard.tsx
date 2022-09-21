import React from 'react'
import Pic from "../../../../../assets/unknown.png"

export function ShopCard() {
  return (
    <>

     <div className='bg-blue-100 rounded-2xl border-4 border-red-400 px-[15px] hover:bg-blue-200'>
        <img src={Pic} className="h-40" />
        <p className='bg-green-200'>price: </p>
        <p>address of sc: {address}</p>
        <button className='bg-orange-100 px-5 w-full m-2'>Buy</button>
    </div>
    </>
  )
}


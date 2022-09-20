import React from 'react'
import {Link} from "react-router-dom"

export function Market() {
  return (
    <div className='flex flex-wrap space-x-4 mt-20 ml-5'>
        <Link to="/Defi/Market/Auction" className='font-bold rounded-2xl border-2 bg-blue-100 border-red-400 px-10 py-5 text-6xl hover:bg-red-200 text-purple-900'><h1>Auction</h1></Link>
        <Link to="/Coming_soon" className='font-bold rounded-2xl border-2 bg-blue-100 border-red-400 px-10 py-5 text-6xl hover:bg-red-200 text-purple-900'><h1>Shop</h1></Link>
    </div>
  )
}


import React from 'react'
import {Link} from "react-router-dom"
import Header from '../../components/headerNew'

export function Market() {
  return (<>
  <Header marginFromTop={'ещз-1/3'}>Our marketplace</Header>
  <h2 className="flex justify-center text-5xl text-blue-100 font-bold m-3">Market</h2>

    <div className='flex flex-wrap justify-center mt-10 gap-10'>
        <Link to="/Defi/Market/Auction" className='font-bold rounded-2xl border-2 bg-blue-100 border-red-400 px-10 py-5 text-6xl hover:bg-red-200 text-purple-900'><h1>Auction</h1></Link>
        <Link to="/Coming_soon" className='font-bold rounded-2xl border-2 bg-blue-100 border-red-400 px-10 py-5 text-6xl hover:bg-red-200 text-purple-900'><h1>Shop</h1></Link>
    </div>
    </>)
}


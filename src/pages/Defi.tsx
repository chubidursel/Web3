import React from 'react'
import {Link} from "react-router-dom"
import Header from '../components/headerNew'

export function Defi() {
  return (
    <>
    <Header>
      <h1 className='text-center'>There are few main technoly that are going to help us to switch to the decentralized world 😉 </h1>
    
    </Header>
    <div className='text-white text-7xl font-bold text-center pt-10'>DeFi</div>
    <div className='grid grid-cols-2 gap-5 mt-5 mx-10 text-center'>

  <Link to="/Defi/exchange"><h1 className='font-bold rounded-2xl border-2 bg-blue-100 border-red-400 px-10 py-5 text-6xl hover:bg-red-200 text-purple-900 hover:animate-pulse'>Exchange</h1></Link>

  <Link to="/Defi/vault" className='font-bold rounded-2xl border-2 bg-blue-100 border-red-400 px-10 py-5 text-6xl hover:bg-red-200 text-purple-900 hover:animate-pulse'><h1>Vault</h1></Link>

  <Link to="/Coming_soon" className='font-bold rounded-2xl border-2 bg-blue-100 border-red-400 px-10 py-5 text-6xl hover:bg-red-200 text-purple-900 hover:animate-pulse'><h1>Swap</h1></Link>

  <Link to="/ChainLink" className='font-bold rounded-2xl border-2 bg-blue-100 border-red-400 px-10 py-5 text-6xl hover:bg-red-200 text-purple-900 hover:animate-pulse'><h1>ChainLink</h1></Link>

  <Link to="/DAO" className='font-bold rounded-2xl border-2 bg-blue-100 border-red-400 px-10 py-5 text-6xl hover:bg-red-200 text-purple-900 hover:animate-pulse'><h1>DAO</h1></Link>

  <Link to="/Defi/Market/Auction" className='font-bold rounded-2xl border-2 bg-blue-100 border-red-400 px-10 py-5 text-6xl hover:bg-red-200 text-purple-900 hover:animate-pulse'><h1>Auction</h1></Link>
</div>
    </>
  )
}

import React from 'react'
import {Link} from "react-router-dom"
import Header from '../components/headerNew'
import Sidebar from '../components/Sidebar'

// https://play.tailwindcss.com/ULwT6MTmWI
{/* <div className="bg-gray-50 min-h-screen flex items-center justify-center px-16">
  <div className="relative w-full max-w-lg">
    <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-100 animate-blob"></div>
    <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-400 rounded-full mix-blend-multiply filter blur-xl opacity-100 animate-blob animation-delay-2000"></div>
    <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-100 animate-blob animation-delay-4000"></div>
    
        </div>
      </div> */}


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

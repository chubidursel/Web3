import React from 'react'
import {Link} from "react-router-dom"
import Header from '../components/headerNew'
import Sidebar from '../components/Sidebar'

// https://play.tailwindcss.com/ULwT6MTmWI
{/* <div className="bg-gray-50 min-h-screen flex items-center justify-center px-16">
  <div className="relative w-full max-w-lg">
    <div className="absolute top-0 -left-4 w-64 h-64 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-100 animate-blob"></div>
    <div className="absolute top-0 -right-4 w-64 h-64 bg-yellow-400 rounded-full mix-blend-multiply filter blur-xl opacity-100 animate-blob animation-delay-2000"></div>
    <div className="absolute -bottom-8 left-20 w-64 h-64 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-100 animate-blob animation-delay-4000"></div>
    
        </div>
      </div> */}


export function Defi() {
  return (
    <>
    <Header>
      <h1 className='text-center'>There are few main technoly that are going to help us to switch to the decentralized world 😉 </h1>
    
    </Header>
    {/* <div className='text-white text-7xl font-bold text-center pt-10'>DeFi</div>
    <div className='flex flex-wrap space-x-4 mt-20 ml-5'>

  <Link to="/Defi/exchange"><h1 className='font-bold rounded-2xl border-2 bg-blue-100 border-red-400 px-10 py-5 text-6xl hover:bg-red-200 text-purple-900'>Exchange</h1></Link>

  <Link to="/Defi/vault" className='font-bold rounded-2xl border-2 bg-blue-100 border-red-400 px-10 py-5 text-6xl hover:bg-red-200 text-purple-900'><h1>Vault</h1></Link>

  <Link to="/Coming_soon" className='font-bold rounded-2xl border-2 bg-blue-100 border-red-400 px-10 py-5 text-6xl hover:bg-red-200 text-purple-900'><h1>Swap</h1></Link>

  <Link to="/ChainLink" className='font-bold rounded-2xl border-2 bg-blue-100 border-red-400 px-10 py-5 text-6xl hover:bg-red-200 text-purple-900'><h1>ChainLink</h1></Link>

  <Link to="/DAO" className='font-bold rounded-2xl border-2 bg-blue-100 border-red-400 px-10 py-5 text-6xl hover:bg-red-200 text-purple-900'><h1>DAO</h1></Link>

  <Link to="/Defi/Market/Auction" className='font-bold rounded-2xl border-2 bg-blue-100 border-red-400 px-10 py-5 text-6xl hover:bg-red-200 text-purple-900'><h1>Auction</h1></Link>
</div> */}

<div className='absolute top-1/5 ml-24 flex flex-row'>
  <div  className='ml-5 absolute text-5xl text-white font-bold animate-blob top-24 animation-delay-4000'>Exchange</div>
    <Link to="/Defi/exchange" className="mr-20 text-white w-64 h-64 bg-rose-700 filter rounded-full blur-xl opacity-80 animate-blob animation-delay-4000">
   </Link>

  <div className='absolute right-80 top-20 w-64 h-64 text-7xl text-white font-bold animate-blob animation-delay-3000'>Vault</div>
    <Link to="/Defi/vault" className="mr-20 w-64 h-64 bg-blue-700 rounded-full filter blur-xl opacity-80 animate-blob animation-delay-3000">
    </Link>

  <div className='absolute left-3/4 top-24 w-64 h-64 text-5xl text-white font-bold animate-blob animation-delay-2000'>ChainLink</div>
    <Link to="/ChainLink" className="w-64 h-64 bg-pink-700 rounded-full filter blur-xl opacity-80 animate-blob animation-delay-2000">
    </Link></div>


    <div className='absolute top-1/2 ml-96 flex flex-row'>
  <div  className='ml-12 absolute text-8xl text-white font-bold animate-blob top-20 animation-delay-2000'>DAO</div>
    <Link to="/DAO" className="mr-20 text-white w-64 h-64 bg-yellow-600 filter rounded-full blur-xl opacity-80 animate-blob animation-delay-2000">
   </Link>

  <div className='absolute right-80 top-20 w-64 h-64 text-6xl text-white font-bold animate-blob animation-delay-4000'>Auction</div>
    <Link to="/Defi/Market/Auction" className="mr-20 w-64 h-64 bg-lime-500 rounded-full filter blur-xl opacity-80 animate-blob animation-delay-4000">
    </Link>
    
  <div className='absolute left-3/4 top-20 ml-6 w-64 h-64 text-7xl text-white font-bold animate-blob animation-delay-5000'>Swap</div>
    <Link to="/Coming_soon" className="w-64 h-64 bg-cyan-500 rounded-full filter blur-xl opacity-80 animate-blob animation-delay-5000">
    </Link>
    </div>  
    
    
    </>
  )
}

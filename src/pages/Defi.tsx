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

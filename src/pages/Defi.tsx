import React from 'react'
import {Link} from "react-router-dom"
import Header from '../components/headerNew'
import Sidebar from '../components/Sidebar'

export function Defi() {
  return (
    <>
    <Header>info about DeFi</Header>
    <div className='text-white text-7xl font-bold text-center pt-10'>DeFi</div>
    <div className='flex flex-wrap space-x-4 mt-20 ml-5'>

      <Link to="/Defi/exchange"><h1 className='font-bold rounded-2xl border-2 bg-blue-100 border-red-400 px-10 py-5 text-6xl hover:bg-red-200 text-purple-900'>Exchange</h1></Link>

      <Link to="/Defi/vault" className='font-bold rounded-2xl border-2 bg-blue-100 border-red-400 px-10 py-5 text-6xl hover:bg-red-200 text-purple-900'><h1>Vault</h1></Link>

      <Link to="/Coming_soon" className='font-bold rounded-2xl border-2 bg-blue-100 border-red-400 px-10 py-5 text-6xl hover:bg-red-200 text-purple-900'><h1>Swap</h1></Link>

      <Link to="/ChainLink" className='font-bold rounded-2xl border-2 bg-blue-100 border-red-400 px-10 py-5 text-6xl hover:bg-red-200 text-purple-900'><h1>ChainLink</h1></Link>

      <Link to="/Coming_soon" className='font-bold rounded-2xl border-2 bg-blue-100 border-red-400 px-10 py-5 text-6xl hover:bg-red-200 text-purple-900'><h1>DAO</h1></Link>

      <Link to="/Defi/Market" className='font-bold rounded-2xl border-2 bg-blue-100 border-red-400 px-10 py-5 text-6xl hover:bg-red-200 text-purple-900'><h1>Market</h1></Link>
    </div>
    </>
  )
}

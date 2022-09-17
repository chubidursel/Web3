import React from 'react'
import {Link} from "react-router-dom"
import Header from '../components/header'

export function Defi() {
  return (
    <>
    <div className='text-white text-5xl font-bold text-center pt-10'>Defi</div>
    <div className='flex flex-raw justify-around text-5xl font-bold text-gray-100 mt-40'>
      <Link to="/Defi/exchange"><h1 className='hover:underline'>Exchange</h1></Link>
      <Link to="/Defi/vault" className='hover:underline hover:animate-pulse	'><h1>Vault</h1></Link>
      <Link to="/Coming_soon" className='hover:underline'><h1>Swap</h1></Link>
      <Link to="/Coming_soon" className='hover:underline'><h1>ChainLink</h1></Link>
      <Link to="/Coming_soon" className='hover:underline'><h1>DAO</h1></Link>
    </div>
    </>
  )
}

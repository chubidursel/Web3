import React from 'react'
import {Link} from "react-router-dom"

export function Defi() {
  return (
    <>
    <div className='text-white text-5xl text-center pt-10'>Defi</div>
    <div className='flex flex-raw justify-around text-5xl font-bold text-gray-100 mt-40'>
      <Link to="/Defi/exchange"><h1>Exchange</h1></Link>
      <h1>Vault</h1>
      <h1>PiggyBank</h1>
      <h1>ChainLink</h1>
      <h1>Auction</h1>
    </div>
    </>
  )
}

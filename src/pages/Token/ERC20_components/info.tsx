import React from 'react'

export function Info() {
  return (
    <>
    <div className='bg-blue-100 rounded-2xl border-4 border-red-400 px-[15px]'>
        <h1 className=" text-3xl text-center font-bold m-3">INFO</h1>
<div className='text-xl'>
        <label htmlFor="chain" className='mr-3 font-bold'>Network:</label>
            <select name="chain" id="chain" form="carform">
            <option value="ETH">ETH</option>
            <option value="Poligon">Poligon</option>
            <option value="BNB">BNB</option>
            </select>         
            <p className='font-bold'>Token name:</p> <p>CryptoWorldToken</p>
            <p className='font-bold'>Token address:</p> <p>0x7C2ED4E6fB642186ec9472813207c902005583D7</p>
            <p className='font-bold'>Owner:</p> <p>0x98162D17D4d15c945B7418475EdEb4d9c0335684</p>
            <p className='font-bold'>Total supply:</p> <p>1000</p>
            
    </div></div></>
    
  )
}


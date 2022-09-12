import React from 'react'

export function Info() {
  return (
    <>
    <div className='bg-blue-100 w-full py-5 px-2'>
        <h1 className='font-bold text-center'>INFO</h1>

        <label htmlFor="chain">Network:</label>
            <select name="chain" id="chain" form="carform">
            <option value="ETH">ETH</option>
            <option value="Poligon">Poligon</option>
            <option value="BNB">BNB</option>
            </select>
            <p>Token name: CryptoWorldToken</p>
        <p>Token address: 0x7C2ED4E6fB642186ec9472813207c902005583D7 </p>
        <p>Owner: 0x98162D17D4d15c945B7418475EdEb4d9c0335684</p>
        <p>total supply: 1000</p>
    </div>
    </>
  )
}


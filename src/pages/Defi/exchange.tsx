import React from 'react'

export function Exchange() {
  return (
    <div className='w-1/2 h-96 bg-slate-50 m-16 rounded-2xl p-10'>
        <h1 className='text-2xl font-bold'>You wanna get some tokens?</h1>
        <p>send Rinkeby Ether -- smart contract --- recive our awesome token</p>
        <div className='m-10 bg-gray-200 w-3/4 h-1/2'>
            <h2>Exchange: </h2>
            <label>
                Amount of Rinkeby ETH token:
                <input className='m-5'></input>
                <input type="submit"></input>
            </label>
        </div>
        <p>What if i dont have rinkeby acc ❓ </p>
    </div>
  )
}


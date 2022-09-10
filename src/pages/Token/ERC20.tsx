import React from 'react'

export function ERC20() {
  return (
<div className="py-6 flex flex-col justify-center sm:py-12">
  <div className="py-3 sm:max-w-xl sm:mx-auto">
    <div className="bg-white min-w-1xl flex flex-col rounded-xl shadow-lg">
      <div className="px-12 py-5">
        <h2 className="text-gray-800 text-3xl font-semibold">Check out our ERC20 token</h2>
      </div>
      <div className="bg-gray-200 w-full flex flex-col items-center">
        <div className="flex flex-col items-center py-6 space-y-3">
          <a href='https://etherscan.io/token/0x2260fac5e5542a773aa44fbcfedf7c193bc2c599#code' target="_blank"><span className="text-lg text-gray-800">Etherscan</span></a>
          <span className="text-lg text-gray-800">fauset</span>
          
          <div className="flex space-x-3">
            
          </div>
        </div>
        <div className="w-3/4 flex flex-col justify-center">
          <span className="text-lg text-gray-800">function</span>
          <textarea className="p-4 text-gray-500 rounded-xl resize-none">Write your balance to check the balance</textarea>
          <button className="py-3 my-8 text-lg bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl text-white">Check out</button>
        </div>
      </div>
      <div className="h-20 flex items-center justify-center">
        <a href="#" className="text-gray-600">Coming soon ...</a>
      </div>
    </div>
  </div>
</div>
  )
}


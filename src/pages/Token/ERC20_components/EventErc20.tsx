import React from 'react'

function EventErc20() {
  return (
    <div className='bg-blue-100 w-2/5 rounded-2xl border-4 border-red-400 px-[15px] text-purple-800'>
   
        <p className='font-bold text-3xl p-1 text-center'>Token transaction history</p>
        <div className='flex justify-center'> 
        <button onClick={console.log(21)} className="font-bold text-xl m-3 rounded-2xl border-2 border-red-400 px-[15px] hover:bg-red-400">REFRESH</button>
        </div>
        <table className='bg-orange-100 w-full rounded-xl'>
          <tr className='bg-orange-300'>
          <th>Type</th>
            <th>Block Number</th>
            <th>Address</th>
            <th >Value</th>
          </tr>
          {"There is a data from logs"}
        </table>
    </div>
  )
}

export default EventErc20
import React from 'react'

function EventErc20() {
  return (
    <div className='bg-gray-100 w-2/3 p-3 rounded-xl ml-10 mb-10'>
    <button onClick={console.log(21)} className='bg-blue-100 p-3  w-full rounded-xl'>REFRESH</button>
        <p className='font-bold py-5 text-center'>TOKEN TRANSATION HISTORY</p>
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
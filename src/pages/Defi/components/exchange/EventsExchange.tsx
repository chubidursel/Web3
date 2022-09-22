import React, {useEffect, useState} from 'react'
import { ethers } from 'ethers';
import {contractExchange} from '../../../../components/smart_contract/exchange';
import {contractERC20} from '../../../../components/smart_contract/erc20';

function EventsExchange() {
    const [eventsLog, setEventsLog] = useState([])


   
    async function listenEvent(){
        let eventFilter = contractExchange.filters.Purchase() // <<<< HOW TO SWITCH FOR BOTH SELL AND BUY???????
        let events = await contractExchange.queryFilter(eventFilter)
        console.log(events)

        setEventsLog(() => [... events] as any)

        // contractERC20.on ("Transfer", (from, to, amount, event) => {
        //     console.log(21)
        //   });

        //   contractEvents.on('Purchase', ()=>{
        //     console.log("DOESNT WORK!!!!!!!!! WTFFFFF")
        //   })
        
        // const filter = contractEvents.filters.Purchase();
        // console.log(filter)

    }
    
    const listTx = eventsLog.map((el:any, id) =>{
      return(
        <tr key={id} className='text-center py-1'>
          <td className='font-bold'>{el.event}</td>
          <td>{el.blockNumber}</td>
          <td>{el.args[0].toString()}</td>
          <td className='ml-5 font-bold'>{el.args[1].toString()}</td>
        </tr>
      )
    })

  return (
    <div className='bg-blue-100 w-2/5 rounded-2xl border-4 border-red-400 p-1 px-[15px] text-purple-800'>
      <p className='font-bold text-3xl p-1 text-center'>Contract events</p>
      <div className='flex justify-center'> 
      
    <button onClick={listenEvent} className="font-bold text-xl m-3 rounded-2xl border-2 border-red-400 px-[15px] hover:bg-red-400">REFRESH</button></div>
    
        <table className='bg-orange-100 w-full'>
          <tr className='bg-orange-300'>
          <th>Type</th>
            <th>Block Number</th>
            <th>Address</th>
            <th >Value</th>
          </tr>
          {listTx}
        </table>
    </div>
  )
}

export default EventsExchange
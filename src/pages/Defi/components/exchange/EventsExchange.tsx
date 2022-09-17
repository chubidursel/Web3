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
        <tr key={id}>
          <td className='bg-green-300 text-center py-1'>{el.event}</td>
          <td>{el.blockNumber}</td>
          <td>{el.args[0].toString()}</td>
          <td className='ml-5 font-bold'>{el.args[1].toString()}</td>
        </tr>
      )

    })

  return (
    <div className='bg-gray-100 w-2/3 p-3 rounded-xl ml-10 mb-10'>
    <button onClick={listenEvent} className='bg-blue-100 p-3  w-full rounded-xl'>REFRESH</button>
        <p className='font-bold py-5 text-center'>CONTRACT EVENTS</p>
        <table className='bg-orange-100 w-full rounded-xl'>
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
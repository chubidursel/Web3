import React, {useEffect, useState} from 'react'
import { contractFeedBack } from '../../components/smart_contract/FeedBack_contract'


export function FeedBackList() {
  const [eventsLog, setEventsLog] = useState([])

  useEffect((()=>{
    (async()=>{
      try {
        let eventFilter = contractFeedBack.filters.FeedBack()
        let events = await contractFeedBack.queryFilter("FeedBack")
        console.log(eventFilter)
        setEventsLog(() => [... events] as any)
      } catch (error) {
        console.log(error)
      }
    })()
  }),[])

  const listTx = eventsLog.map((el:any, id) =>{
    return(
      <tr key={id}>
        <td>{new Date(el.args.time.toNumber() * 1000).getDate() + "/" + new Date(el.args.time.toNumber() * 1000).getMonth()}</td>
        <td>{ 
        el.args.who.toString().slice(0, 5) +
        "..." +
        el.args.who.toString().slice(38)
        }</td>
        <td>{el.args.feedBack}</td>
      </tr>
    )
  })

  return (
        <table className='bg-orange-100 w-full mt-2 p-1 text-xl rounded-2xl text-center'>
          <tr className='bg-orange-300 '>
            <th>time</th>
            <th>from</th>
            <th>feedback</th>
          </tr>
          {listTx}
        </table>

  )
}

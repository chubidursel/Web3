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
  // PAGINATION
  const[currentPage, setCurrentPage] = useState(1)
  const [txPerPage] = useState(5)
  const lastTxId = currentPage * txPerPage
  const firstTxId = lastTxId - txPerPage
  const currentTx = eventsLog.reverse().slice(firstTxId, lastTxId)
  const pageNum = []
  for (let i=1; i <= Math.ceil(eventsLog.length/txPerPage); i++){
    pageNum.push(i)
  }
  const paginate = (pageNumber: any) => setCurrentPage(pageNumber)
const pages = pageNum.map(page => <p onClick={() => paginate(page)} key={page} 
className='font-semibold text-2xl m-2 text-center md:hover:text-pink-400'>{page}</p>)

  const listTx = currentTx.map((el:any, id) =>{
    return(
      <tr key={id}>
        <td className='p-2 m-2'>{new Date(el.args.time.toNumber() * 1000).getDate() + "/" + (new Date(el.args.time.toNumber() * 1000).getMonth() + 1)}</td>
        <td className='p-3 m-3'>{ 
        el.args.who.toString().slice(0, 5) +
        "..." +
        el.args.who.toString().slice(38)
        }</td>
        <td>{el.args.feedBack ? el.args.feedBack : "⭐⭐⭐⭐⭐"}</td> 
      </tr>
    )
  })






  return (<div className='flex justify-center rounded-lg flex-col'>
        <table className='bg-orange-100 m-3 p-3 text-xl rounded-2xl text-center'>
          <tr className='bg-orange-300'>
            <th className='p-2'>time</th>
            <th className='p-2'>from</th>
            <th>feedback</th>
          </tr>
          {listTx}
        </table>
        <div className='flex justify-center cursor-pointer'>{pages}</div>
        </div>
  )
}

import React, {useEffect, useState} from 'react'
import { contractERC20 } from '../../../components/smart_contract/erc20';

function EventErc20() {
  const [eventsLog, setEventsLog] = useState([])

  useEffect((()=>{
    (async(e)=>{
      try {
        let eventFilter = contractERC20.filters.Transfer()
        let events = await contractERC20.queryFilter(eventFilter)
        setEventsLog(() => [... events] as any)
      } catch (error) {
        console.log(error)
      }
    })()
  }),[])

    const[currentPage, setCurrentPage] = useState(1)
    const [txPerPage] = useState(10)
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
        <td>{ 
        el.args.from.toString().slice(0, 5) +
        "..." +
        el.args.from.toString().slice(38)

        }</td>
        <td>{        el.args.to.toString().slice(0, 5) +
        "..." +
        el.args.to.toString().slice(38)}</td>
        <td className='ml-5 font-bold'>{el.args.value.toString()}</td>
      </tr>
    )
  })




  return (
    <div className='bg-blue-100 w-1/2 rounded-2xl border-4 border-red-400 px-[15px] text-purple-800'>
        <p className='font-bold text-3xl p-1 text-center'>Token transfer history</p>
        <div className='flex justify-center'> 
        
        </div>
        <table className='bg-orange-100 w-full  my-2 text-xl rounded-2xl text-center'>
          <tr className='bg-orange-300 '>
            <th>from</th>
            <th>to</th>
            <th >Value</th>
          </tr>
          {listTx}
        </table>
       <div className='flex justify-center cursor-pointer'>{pages}</div>
    </div>
  )
}

export default EventErc20
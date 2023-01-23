import {useEffect, useState} from 'react'
import { contractERC20 } from '../../../components/smart_contract/erc20';
import usePagination from '../../../utils/pagination';

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

    const {currentTx, pagPages} = usePagination({inArr: eventsLog})

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


  return (<>
    <div className='bg-blue-100 w-1/2 rounded-2xl border-4 border-red-400 px-[15px] text-purple-800'>
        <p className='font-bold text-3xl p-1 text-center mt-2'>Token transfer history</p>
        <table className='bg-orange-100 w-full  my-2 text-xl rounded-2xl text-center'>
          <tr className='bg-orange-300 '>
            <th>from</th>
            <th>to</th>
            <th >Value</th>
          </tr>
          {listTx}
        </table>
{pagPages}
    </div></>
  )
}

export default EventErc20
import React, {useEffect, useState} from 'react'
import { contractDAO} from '../../../components/smart_contract/Dao_contract';
import Modal from '../../../components/modal';
import {Vote} from './vote';
import Loader from '../../../components/loader';
import { value } from '@material-tailwind/react/types/components/chip';

//import { contractERC20 } from '../../../components/smart_contract/erc20';
type Proposal = {
  id : number,
  exist : boolean,
  desc : string,
  deadline : number,
  voteUp : number,
  voteDown : number,
  countConducted: boolean,
  passed : boolean,
  initiator : string,
  contractTarget: string, 
  funcSelector: string,
  ethToSend: number,
  isItFinished: boolean,
  counted: boolean,
}

export function PrposalTable() {
  const [allProp, setAllProp] = useState ([])
  const[displayCard, setDisplayCard] = useState(false)
  const [objForCard, setObjForCard] = useState()
  const [all, setAll] = useState(true)
  const [loader, setLoader] = useState(false)

  useEffect((()=>{
    (async()=>{
      try {
        setLoader(true)
        const indexProp = await contractDAO.nextProposal();
        const index = indexProp - 1;
        let arrAllProp = [];
        for(let i = 1; i <= index; i++){
          const isitDone = await contractDAO.isItFinished(i)
          const data = await contractDAO.Proposals(i);
          const newProp  = {
            id: Number(data.id.toString()),
            exist: data.exist,
            desc: data.description,
            deadline: Number(data.deadline.toString()),
            voteUp: Number(data.votesUp.toString()),
            voteDown: Number(data.votesDown.toString()),
            counted: data.countConducted,
            passed: data.passed,
            initiator: data.initiator,
            contractTarget: data.target,
            funcSelector: data.funcExecute,
            ethToSend: data.ethToSend,
            isItFinished: isitDone,
          }
          arrAllProp.push(newProp)
        }
        setAllProp([...arrAllProp] as any)
        setLoader(false)
      } catch (error) {
        console.log(error)
      }
    })()
  }),[all])

  const showCard = (event: any) => {
    try {
     setObjForCard(allProp.find(i => i.id == event.target.value))  
     console.log(objForCard);
     setDisplayCard(true)  
    } catch (error) {
     console.log(error);
    }
   }
  
  const listTx = allProp.map((el:Proposal) =>{
    return(<>
      <tbody key={el.id} className='w-full my-2 text-xl  text-center'>
      <tr>
        <td>{el.id}</td>
        <td>{el.desc}</td>
        <td>{el.voteUp + el.voteDown}</td>
        <td>
<button onClick={showCard} value={el.id} className='text-lg rounded-lg hover:bg-orange-400 hover:shadow-xl m-2 btn bg-orange-300 px-3 py-1'>
  {!el.isItFinished ? 'VOTE' : el.counted ? 'Info' : 'Finish'}
  </button>
        </td>
      </tr>
      </tbody>
    </>
    )
  }) 


  return (<>
{loader ? <Loader /> : 
   <><div className='bg-blue-100 w-1/2 rounded-2xl border-4 mb-10 border-red-400 px-[15px] text-purple-800'>
   <p className='font-bold text-4xl py-3 text-center'>Governance Overview</p>
   <div className='flex justify-center'> 
   <button onClick={() => setAll(!all)}
   className='ml-3 w-1/2 className="font-bold rounded-xl border-2 border-red-400 px-[15px] hover:bg-red-400'>REFRESH</button>
   
   
   </div>
   <table className='bg-orange-100 w-full  my-2 text-xl text-center'>
     <tr className='bg-orange-300 '>
       <th>id</th>
       <th>desciption</th>
       <th>votes</th>
       <th>status</th>
     </tr>
     {listTx}
   </table>
</div>
<Modal 
active={displayCard}
setActive={setDisplayCard}
marginFromTop={'top-24'}
>
 <Vote objInfo = {objForCard}/>
</Modal></>
}
</>
 
    
  )
}
// 

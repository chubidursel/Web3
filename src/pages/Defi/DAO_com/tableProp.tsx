import React, {useEffect, useState} from 'react'
import { contractDAO} from '../../../components/smart_contract/Dao_contract';
import Modal from '../../../components/modal';
import {Vote} from './vote';
import Loader from '../../../components/loader';

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
          const data = await contractDAO.Proposals(i);

          const newProp  = {
            id: Number(data.id.toString()),
            exist: data.exist,
            desc: data.description,
            deadline: Number(data.deadline.toString()),
            voteUp: Number(data.votesUp.toString()),
            voteDown: Number(data.votesDown.toString()),
            passed: data.passed,
            initiator: data.initiator,
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


  const showCard = (event) => {
    setDisplayCard(!displayCard)
    
    const card = allProp.forEach(card => {
      if(card.id === event.target.value){
        return card
      }
      setObjForCard(card)
    })
  }

  // const listTx = allProp.map((el:Proposal, id) =>{
  //   return(
  //     <tr key={id}>
  //       <td>{el.id}</td>
  //       <td>{el.desc}</td>
  //       <td>{el.voteUp}</td>
  //       <button value={el.id} onClick={showCard} className='text-sm font-bold rounded-xl m-2 border-2 border-red-400 px-[15px] hover:bg-red-400'>VOTE</button>
  //     </tr>
  //   )
  // }) 
  //{el.passed ? "active" : "finished"}

  const listTx = allProp.map((el:Proposal) =>{
    return(<>
      <tbody key={el.id} className='w-full my-2 text-xl  text-center'>
      <tr>
        <td>{el.id}</td>
        <td>{el.desc}</td>
        <td>{el.voteUp}</td>
        <td>{el.deadline > Number(Date.now().toString().slice(0,10))
        ? <button onClick={showCard} value={el.id} className='text-sm m-2 btn'>VOTE
        </button>
        : <p>Finished</p>}</td>     
      </tr>
      </tbody>
    </>
    )
  }) 


  return (<>
{loader ? <Loader /> : 
   <><div className='bg-blue-100 w-1/2 rounded-2xl border-4 border-red-400 px-[15px] text-purple-800'>
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
marginFromTop={2}
>
 <Vote objInfo = {objForCard}/>
</Modal></>
}
</>
 
    
  )
}
// 

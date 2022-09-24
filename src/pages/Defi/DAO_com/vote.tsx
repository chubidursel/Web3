import React from 'react';
import { ethers } from 'ethers';
import { contractDAO, contractDAOWithSigner} from '../../../components/smart_contract/Dao_contract';


export function Vote({objInfo}) {

  const handleVote = async(event)=>{
    const res = event.target.value
    const id = ethers.BigNumber.from( objInfo.id.toString() )

    console.log(id, res)
    const txVote = await contractDAOWithSigner.voteOnProposal(objInfo.id, res)
    await txVote.wait(1)
    console.log(txVote)
  }

  return (
    <div className='rounded-2xl border-2 border-red-400 px-[15px] p-2 m-2 text-purple-800 text-lg'>
      <h1 className='font-bold text-center'>INFO</h1>
      <div className='flex flex-row'><h1 className='mr-2 font-bold'>initiator:</h1> <h1>{objInfo.initiator}</h1></div>
      <div className='flex flex-row'><h1 className='mr-2 font-bold'>time: </h1><h1>{objInfo.deadline  }</h1></div>
      <div className='flex flex-row'><h1 className='mr-2 font-bold'>descripion:</h1><h1> {objInfo.desc}</h1></div>
      <div className='flex flex-row justify-around mt-2'>
      <button className='font-bold ml-1 rounded-2xl border-2 border-red-400 px-[15px] hover:bg-red-400' value={true} onClick={handleVote}>up</button>
      <button className='font-bold ml-1 rounded-2xl border-2 border-red-400 px-[15px] hover:bg-red-400' value={false} onClick={handleVote}>down</button>
    </div> </div>
  )
}


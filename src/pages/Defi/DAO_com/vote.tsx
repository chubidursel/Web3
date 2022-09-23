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
    <div className='bg-rink-300 p-2'>
      <h1>INFO</h1>
      <h1>initiator: {objInfo.initiator}</h1>
      <h1>time: {objInfo.deadline}</h1>
      <h1>descripion: {objInfo.desc}</h1>

      <button className='bg-green-400 px-4 mx-3' value={true} onClick={handleVote}>up</button>
      <button className='bg-red-400 px-4 mx-3' value={false} onClick={handleVote}>down</button>
    </div>
  )
}


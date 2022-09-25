import React, {useState} from 'react';
import { ethers } from 'ethers';
import { contractDAO, contractDAOWithSigner} from '../../../components/smart_contract/Dao_contract';


export function Vote({objInfo}) {

  const [displayResult, setDisplayResult] = useState(false)
  const [resultTx, setResultTx] = useState('');

  const handleVote = async(event)=>{
    try {
      setDisplayResult(true)
      setResultTx("Sign the transaction in MetaMask and wait a bit 🙌")
      const res = event.target.value
      const id = ethers.BigNumber.from( objInfo.id.toString() )
  
      console.log(id, res)
      const txVote = await contractDAOWithSigner.voteOnProposal(objInfo.id, res)
      await txVote.wait(1)
      setResultTx("Congratulations 🥳! We count your Vote!")
  
      console.log(txVote)
      
    } catch (error) {
      setResultTx("Oi wei! We got problems! 😰")
      console.log(error)
      setTimeout(() => {setDisplayResult(false)}, 10000)
    }

  }

  return (
    <div className='m-10 w-full text-center'>
      <h1 className='font-bold text-2xl'>INFO</h1>
      <h1>initiator: {objInfo.initiator}</h1>
      <h1>time: {objInfo.deadline}</h1>
      <h1>descripion: {objInfo.desc}</h1>

      <button className='bg-green-400 w-full py-2 mx-3 mb-3 rounded-xl' value={true} onClick={handleVote}>up</button>
      <button className='bg-red-400 w-full py-2 mx-3 rounded-xl' value={false} onClick={handleVote}>down</button>

      {displayResult && <div className='bg-yellow-300 p-3 mt-4'>
        <h1>RESULT: </h1>
      </div>}
    </div>
  )
}


import React, {useState} from 'react';
import { ethers } from 'ethers';
import { contractDAO} from '../../../components/smart_contract/Dao_contract';
import conectSigner from '../../../components/smart_contract/SIGNER';

export function Vote({objInfo}) {

  const [displayResult, setDisplayResult] = useState(false)
  const [resultTx, setResultTx] = useState('');

  const handleVote = async(event)=>{
    try {
      setDisplayResult(true)
      setResultTx("Sign the transaction in MetaMask and wait a bit 🙌")
      const resuslt = event.target.value
      const res = resuslt ? true : false;
      const id = ethers.BigNumber.from( objInfo.id.toString() )
  
      console.log(id, res)
      const contractDAOWithSigner = conectSigner(contractDAO)
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
// UPDATE!!!!!
  return (
    <div className='rounded-2xl border-2 w-full border-red-400 px-[15px] p-2 m-2 text-purple-800 text-lg'>
      <h1 className='font-bold text-center'>INFO</h1>
        <div className='flex flex-row'><h1 className='mr-2 font-bold'>initiator:</h1> <h1>{objInfo.initiator.toString().slice(0, 5) +
            "..." + objInfo.initiator.toString().slice(38)}</h1></div>
      <div className='flex flex-row'><h1 className='mr-2 font-bold'>time: </h1><h1>{(new Date(objInfo.deadline * 1000)).toLocaleDateString()}</h1></div>
      <div className='flex flex-row'><h1 className='mr-2 font-bold'>descripion:</h1><h1> {objInfo.desc}</h1></div>
      <div className='flex flex-row justify-around mt-2'>
      <button className='font-bold ml-1 w-1/2 rounded-2xl border-2 border-red-400 px-[15px] hover:bg-red-400' value={1} onClick={handleVote}>up</button>
      <button className='font-bold ml-1 w-1/2 rounded-2xl border-2 border-red-400 px-[15px] hover:bg-red-400' value={0} onClick={handleVote}>down</button>
    </div> </div>
  )
}


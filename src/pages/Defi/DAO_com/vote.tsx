import React, {useState} from 'react';
import { ethers } from 'ethers';
import { contractDAO} from '../../../components/smart_contract/Dao_contract';
import conectSigner from '../../../components/smart_contract/SIGNER';
import getErrorMessage from '../../../components/getErrorMessage';
import { Line } from 'rc-progress';

export function Vote({objInfo}) {
  const [resultTx, setResultTx] = useState('');
  const [viewDetail, setViewDetail] = useState(false)

  const handleVoteUP = async(event)=>{
    try {
      setResultTx("Sign transaction in MetaMask 📝")
      const result = event.target.value
      const res = result ? true : false;
      const id = ethers.BigNumber.from( objInfo.id.toString())
      const contractDAOWithSigner = conectSigner(contractDAO)
      const txVote = await contractDAOWithSigner.voteOnProposal(objInfo.id, res)
      await txVote.wait()
      setResultTx("✅ Confirmed We count your Vote!")
      console.log(txVote)
    } catch (error) {
      const message = getErrorMessage(error);
      setResultTx(message)
      setTimeout(() => {setResultTx('')}, 5000)
    }
  }
  const handleVoteDOWN = async(event)=>{
    try {
      setResultTx("Sign transaction in MetaMask 📝")
      const result = event.target.value
      const res = result ? false : true;
      //const id = ethers.BigNumber.from( objInfo.id.toString())
      const contractDAOWithSigner = conectSigner(contractDAO)
      const txVote = await contractDAOWithSigner.voteOnProposal(objInfo.id, res)
      await txVote.wait()
      setResultTx("✅ Confirmed We count your Vote!")
      console.log(txVote)
    } catch (error) {
      const message = getErrorMessage(error);
      setResultTx(message)
      setTimeout(() => {setResultTx('')}, 5000)
    }
  }

  const handleFinish = async()=>{
    try {
      setResultTx("Sign transaction in MetaMask 📝")
      const contractDAOWithSigner = conectSigner(contractDAO)
      const txVote = await contractDAOWithSigner.finish(objInfo.id)
      await txVote.wait()
      setResultTx("✅ Voting is over!")
      console.log("DEV (tx result)>>>", txVote)
    } catch (error) {
      const message = getErrorMessage(error);
      setResultTx(message)
      setTimeout(() => {setResultTx('')}, 5000)
    }
  }

  // ------------ THERE ARE 3 STAGES  (voting | finishing | info)
  const voting = <>
    <div className='flex flex-row justify-around mt-2'>
      <button className='font-bold ml-1 w-1/2 rounded-lg border-2 border-red-400 px-[15px] hover:bg-green-400' value={1} onClick={handleVoteUP}>up</button>
      <button className='font-bold ml-1 w-1/2 rounded-lg border-2 border-red-400 px-[15px] hover:bg-red-400' value={0} onClick={handleVoteDOWN}>down</button>
      </div>
  </>

const finishing = <>
<div className='flex flex-row justify-around mt-2'>
  <button className='font-bold text-3xl w-full rounded-lg border-2 border-red-400 py-3 px-[15px] hover:bg-purple-400' onClick={handleFinish}>execute</button>
  </div>
</>

const info = <>
  <h1 className='bg-gray-100 rounded-lg text-center'>🏁 VOTING IS OVER 🏁</h1>
</>

const viewDet = <>
<div className='bg-blue-100 rounded-lg my-2 pl-3 py-3'>
  <p>Quorum: {"Passed"}</p>
  <p>Smart contract address: {objInfo.contractTarget}</p>
  <p>Function Selector: {objInfo.funcSelector.slice(0, 10)}...</p>
  {/* <p>Ethereum value: {objInfo.ethToSend}</p> */}
</div>
</>

    const progBarPrcnt = objInfo.voteUp/(objInfo.voteDown + objInfo.voteUp) * 100
//  {!el.isItFinished ? 'VOTE' : el.counted ? 'Info' : 'Finish'}
  return (
    <div className='rounded-2xl border-2 w-full border-red-400 px-[15px] p-2 m-2 text-purple-800 text-lg'>
      <h1 className='font-bold text-center'>INFO</h1>
        <div className='flex flex-row'><h1 className='mr-2 font-bold'>Initiator:</h1> <h1>{objInfo.initiator.toString().slice(0, 10) +
            "..." + objInfo.initiator.toString().slice(38)}</h1></div>
      <div className='flex flex-row'><h1 className='mr-2 font-bold'>Deadline: </h1><h1>{(new Date(objInfo.deadline * 1000)).toLocaleDateString()}</h1></div>
      <div className='flex flex-row'><h1 className='mr-2 font-bold'>Descripion:</h1><h1> {objInfo.desc}</h1></div>

      <div className="flex justify-between mt-2">
             <p><strong>Voted for:</strong> {objInfo.voteUp}</p><p><strong>Voted against:</strong> {objInfo.voteDown}</p>
      </div>
      <div className='flex justify-center'>
      <Line percent={progBarPrcnt} strokeWidth={5} trailWidth={5} strokeColor="green" trailColor='red' className='w-[90%] m-3'/>
      </div>
      {!objInfo.isItFinished ? voting : objInfo.counted ? info : finishing}

    <div className='flex justify-center'> {resultTx && <h1 className='font-bold mt-3 bg-yellow-100 w-full py-2 text-center  px-1 rounded-xl text-purple-900 text-xl '>{resultTx}</h1>}   </div>
    <button className='mt-3 w-full rounded-lg border-2 border-red-400 px-[15px] hover:shadow-2xl hover:bg-blue-200' onClick={()=>setViewDetail(!viewDetail)}>view details</button>
        {viewDetail && viewDet}
    </div>
  )
}


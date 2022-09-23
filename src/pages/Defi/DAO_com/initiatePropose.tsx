import React, {useState, useEffect} from 'react';
import { contractDAO, contractDAOWithSigner} from '../../../components/smart_contract/Dao_contract';
import { contractERC721, contractERC721WithSigner} from '../../../components/smart_contract/ERC721';
import { useAppContext } from "../../../hooks/useAppContext";


export function InitiatePropse() {
  const [descProp, setDescProp] = useState('')
  const [timeProp, setTimeProp] = useState(0)

// GET OWNER
const[ownerOrNot, setOwnrOrNot ] = useState(0)
const { contextState, updateContextState } = useAppContext();
const currentAccount = contextState?.currentAccount;
useEffect((()=>{
  (async()=>{
    try {
      const addressOwner = await contractERC721.balanceOf(currentAccount)
      setOwnrOrNot(addressOwner.toString())
    } catch (error) {
      console.log(error)
    }
  })()
}),[])


  const handleCreate = async() =>{
    const txCreate = await contractDAOWithSigner.createProposal(descProp, timeProp)
    await txCreate.wait(1);
    console.log(txCreate);
  }

  return (<>
  
    <div className='rounded-2xl border-2 border-red-400 px-[15px] p-2 m-2 text-purple-800 text-lg'>
        <h1 className='text-2xl font-bold text-center'>InitiatePropse</h1>
        <h1 className='text-center mb-2'>Check if you have an NFT</h1>
        <form>
            <label className='text-center'>Desciption</label>
            <input placeholder='descr' className='ml-2 mb-3 rounded border-solid border-2 pl-2 border-purple-800' onChange={(e)=>{setDescProp(e.target.value as any)}} /><br />
            <label className='mt-3'>Time:</label>
            <input type='number' className='ml-2 mb-3 rounded border-solid border-2 pl-2 border-purple-800' placeholder='sec' onChange={(e)=>{setTimeProp(e.target.value as any)}} />
        </form>
        <button onClick={handleCreate} className='ml-28 font-bold ml-1 rounded-2xl border-2 border-red-400 px-[15px] hover:bg-red-400'>submit</button>
    </div>
    </>
  )
}


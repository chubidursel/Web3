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
  
    <div className='bg-blue-100 p-3 flex flex-col'>
        <h1>InitiatePropse</h1>
        <h1>check if you have an NFT</h1>
        <form>
            <label>Desciption</label>
            <input placeholder='des' onChange={(e)=>{setDescProp(e.target.value as any)}} />
            <label>Time:</label>
            <input type='number' placeholder='sec' onChange={(e)=>{setTimeProp(e.target.value as any)}} />
        </form>
        <button onClick={handleCreate} className='bg-red-300'>submit</button>
    </div>
    </>
  )
}


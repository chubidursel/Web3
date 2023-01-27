import {useState, useEffect} from 'react';
import { contractDAO} from '../../../components/smart_contract/Dao_contract';
import { contractERC721} from '../../../components/smart_contract/ERC721';
import { useAppContext } from "../../../hooks/useAppContext";
import conectSigner from '../../../components/smart_contract/SIGNER';
import getErrorMessage from '../../../components/getErrorMessage';

export function InitiatePropse() {
  const [descProp, setDescProp] = useState('')
  const [timeProp, setTimeProp] = useState(0)
  const [addrTarget, setAddrTarget] = useState('')
  const [funcSelector, setFuncSelector] = useState('')
  const [ethValue, setEthValue] = useState(0)
  const [result, setResult] = useState(''); 

// GET OWNER
const[ownerOrNot, setOwnrOrNot ] = useState(false)
const { contextState, } = useAppContext();
const currentAccount = contextState?.currentAccount;

useEffect((()=>{
  (async()=>{
    try {
      const addressOwner = await contractERC721.balanceOf(currentAccount)
      setOwnrOrNot(addressOwner.toString() != 0)
    } catch (error) {
      console.log(error)
    }
  })()
}),[])


  const handleCreate = async() =>{
    try {
      setResult("Please sign the transation in MetaMask 📝 and wait till this tx will be confirmed in blockchain")
      const minTime = timeProp * 60
      const contractDAOWithSigner = conectSigner(contractDAO)
      console.log('👨‍💻DEV <<Param you send to create propsal>>> ', descProp, minTime, addrTarget, 'EthVAlue$$$: ', ethValue, funcSelector)
      const txCreate = await contractDAOWithSigner.createProposal(descProp, minTime, addrTarget,ethValue, funcSelector)
      await txCreate.wait(1);
      setResult("✅ Confirmed")
      console.log('👨‍💻DEV>>', txCreate);
      setTimeout(() => {setResult('')}, 5000)
    } catch (error) {
      const message = getErrorMessage(error);
      setResult(message)
      setTimeout(() => {setResult('')}, 5000)
    }
  }

  return (<>
  
    <div className='rounded-2xl border-2 border-red-400 px-[15px] p-2 m-2 text-purple-800 text-lg'>
        <h1 className='text-3xl font-bold text-center my-3'>Initiate a Proposal</h1>
        <h1 className='text-center mb-2'>{ownerOrNot ? 'You can init Propose 😉' : 'Sorry your current account does not have our NFT token to init Propose'}</h1>
        <form>
            <label className='font-bold'>Desciption:</label><br />
            <input placeholder='desc' className='w-full mb-3 rounded border-solid border-2 pl-2 border-purple-800' onChange={(e)=>{setDescProp(e.target.value as any)}} /><br />
            
            <label className='font-bold'>Time:</label><br />
            <input type='number' className='w-full mb-3 rounded border-solid border-2 pl-2 border-purple-800' placeholder='min' onChange={(e)=>{setTimeProp(e.target.value as any)}} /><br />
            
            <label className='font-bold'>Address:</label><br />
            <input placeholder='smart contract address' className='w-full mb-3 rounded border-solid border-2 pl-2 border-purple-800' onChange={(e)=>{setAddrTarget(e.target.value as string)}} /><br />
        
            <label className='font-bold'>Function:</label><br />
            <input placeholder='0x371303c0' className='w-full mb-3 rounded border-solid border-2 pl-2 border-purple-800' onChange={(e)=>{setFuncSelector(e.target.value as any)}} /><br />
        
            <label className='font-bold'>Value:</label><br />
            <input type='number' className='w-full mb-7 rounded border-solid border-2 pl-2 border-purple-800' placeholder='eth' onChange={(e)=>{setEthValue(e.target.value as any)}} /><br />
            
        </form>
        <button disabled={!ownerOrNot} onClick={handleCreate} className='w-full font-bold ml-1 rounded-lg hover:shadow-xl border-2 border-red-400 px-[15px] hover:bg-red-400'>submit</button>
        <div className='flex justify-center'> {result && <h1 className='font-bold mt-3 bg-yellow-100 w-full py-2 text-center  px-1 rounded-xl text-purple-900 text-xl '>{result}</h1>}   </div>
    </div>
    </>
  )
}


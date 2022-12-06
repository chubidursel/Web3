import { contractERC20 } from '../../../components/smart_contract/erc20';
import conectSigner from '../../../components/smart_contract/SIGNER';
import {useState} from 'react';
import { useAppContext } from '../../../hooks/useAppContext';
import Loader from '../../../components/loader';


export default function TokenFunction() {
  // const [owner, setOwner] = useState()
  const [add, setAdd] = useState("")
  const [balance, setBalance] = useState()
  const [addressTo, setAddressTo] = useState("");
  const [amountTo, setAmountTo] = useState('');
  const [errorBal, setErrorBal] = useState('')
  const [loaderBal, setLoaderBal] = useState(false)

  const [succs, setSuccs] = useState('')
  const [error, setError] = useState('')
  const [loader, setLoader] = useState(false)

  const [succsAp, setSuccsAp] = useState('')
  const [errorAp, setErrorAp] = useState('')
  const [loaderAp, setLoaderAp] = useState(false)

  const [amountApprove, setAmountApprove] = useState();
  const [addressToArrpove, setAddressToApporve] = useState("");

const { contextState, updateContextState } = useAppContext();
const currentAccount = contextState?.currentAccount;

  const hadleSupply = async()=>{
    try {
      setLoaderBal(true)
      const balance = await contractERC20.balanceOf(add);
      setBalance(balance.toString())
      
    }
      catch(error) {
        if(error.code === "INVALID_ARGUMENT") {setErrorBal('Invalid input')
        setTimeout(() => {setErrorBal('')}, 2000);
      }
        else {setErrorBal("Some mystic error")}
      }
      setLoaderBal(false)
  }

  const handleTransaction = async(event:any)=>{
    event.preventDefault();
    setLoader(true)
    setError('')   
    try {
      const contractERC20WithSigner = conectSigner(contractERC20)
      const tx = await contractERC20WithSigner.transfer(addressTo, amountTo);
      const trans = await tx.wait()
      console.log(trans.transactionHash)
      if(tx){setSuccs("Transaction Success")
      setTimeout(() => {setSuccs('')}, 4000);
    }
      
    } catch (error) {
      console.log(error)
      if(error.code === "INSUFFICIENT_FUNDS") {setError('Not enough funds')}
      else if(error.code === "INVALID_ARGUMENT") {setError('Invalid input')}
      else if(error.code === "ACTION_REJECTED") {setError('Transaction was rejected')}
      else {setError("Error")}
      setTimeout(() => {setError('')}, 2000);
    }
    setLoader(false)
  }

  const handleApprove = async(event:any)=>{
    event.preventDefault();
    setLoaderAp(true)
    try {
      const contractERC20WithSigner = conectSigner(contractERC20)
      const tx = await contractERC20WithSigner.approve(addressToArrpove, amountApprove);
      await tx.wait()
      if(tx){setSuccsAp("Transaction Success")
      setTimeout(() => {setSuccsAp('')}, 2000);}
    } catch (error) {
      if(error.code === "INSUFFICIENT_FUNDS") {setErrorAp('Not enough funds')}
      else if(error.code === "INVALID_ARGUMENT") {setErrorAp('Invalid input')}
      else if(error.code === "ACTION_REJECTED") {setErrorAp('Transaction was rejected')}
      else {setErrorAp("Some mystic error")}
    }setTimeout(() => {setErrorAp('')}, 2000)
    setLoaderAp(false)
  }


  return (
    <>   
      
      <div className='bg-blue-100 rounded-2xl border-4 border-red-400 text-xl px-[15px]'>
        <h1 className=" text-3xl text-center font-bold m-3">Token function</h1>
   
       <div className='rounded-2xl border-2 border-red-400 px-[15px] p-2 m-2 hover:bg-blue-200 hover:shadow-xl'>
          <h1 className='text-center font-bold mb-1'>Check your balance</h1>
            <input placeholder='Enter your address' onChange={(event)=>setAdd(event.target.value)} className = 'rounded text-center w-2/3 hover:shadow-xl' />
            
            {loaderBal ? 
           <Loader /> : <button onClick={hadleSupply} className="font-bold ml-3 px-10 rounded-xl border-2 border-red-400 hover:bg-red-400 hover:shadow-xl">Check</button>}
            
            {balance ? <h1 className='font-bold'>Your balance: {balance} CWT</h1> 
                      : (errorBal ? <h1 className='font-bold text-red-500 text-2xl text-center '>{errorBal}</h1> : null) }
        </div>

        <div className='rounded-2xl border-2 border-red-400 px-[15px] p-2 m-2 hover:bg-blue-200 hover:shadow-xl'>
        <form onSubmit={handleTransaction}>
          <h1 className='text-center font-bold p-1'>Transfer token</h1>
          <label>Send to:</label>
          <input onChange={(e)=>setAddressTo(e.target.value)} className='rounded ml-3 mb-1' placeholder='Enter address' /><br />
          <label>Amount:</label>
          <input type='text' className='rounded  ml-3' onChange={(e:any)=>setAmountTo(e.target.value)} placeholder='Enter amount' />
     
        {loader ? 
          <Loader /> : <button type="submit" onClick={handleTransaction} className="font-bold ml-3 rounded-2xl border-2 border-red-400 px-[15px] hover:bg-red-400">Transfer</button>}
            </form>
            {error ? <div className='text-red-500 text-2xl font-bold'>{error}</div> : null}
            {succs ? <div className="text-green-500 text-2xl font-bold">{succs}</div> : null}
        </div>



<div className='rounded-2xl border-2 border-red-400 px-[15px] p-2 m-2 hover:bg-blue-200 hover:shadow-xl'>
        <form onSubmit={handleApprove}>
          <h1 className='text-center font-bold'>Approve</h1>
          <label>Approve:</label>
          <input onChange={(e)=>setAddressToApporve(e.target.value)} className='rounded ml-3 mb-1' placeholder='Enter address' /><br />
          <label>Amount:</label>
          <input type='text' className='rounded ml-3' onChange={(e:any)=>setAmountApprove(e.target.value)} placeholder='Enter amount' />
        
          {loaderAp ? 
            <Loader /> : <button type="submit" onClick={handleApprove} className="font-bold ml-3 rounded-2xl border-2 border-red-400 px-[15px] hover:bg-red-400">Approve</button>}
      </form>
      {errorAp ? <div className='text-red-500 text-2xl font-bold'>{errorAp}</div> : null}
      {succsAp ? <div className="text-green-500 text-2xl font-bold">{succsAp}</div> : null}

      </div></div>

  
      


</>
  )}


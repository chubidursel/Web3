import defaultProvider from '../../../abi/defaultProvider';
import { contractERC20, contractERC20WithSigner } from '../../../components/smart_contract/erc20';
import {useState} from 'react';
import walletProvider from '../../../abi/walletProvider';
import { useAppContext } from '../../../hooks/useAppContext';


export default function TokenFunction() {
  // const [owner, setOwner] = useState()
  const [add, setAdd] = useState("")
  const [balance, setBalance] = useState()
  const [addressTo, setAddressTo] = useState("");
  const [amountTo, setAmountTo] = useState();
  const [errorBal, setErrorBal] = useState()
  const [loaderBal, setLoaderBal] = useState(false)

  const [succs, setSuccs] = useState()
  const [error, setError] = useState()
  const [loader, setLoader] = useState(false)

  const [succsAp, setSuccsAp] = useState()
  const [errorAp, setErrorAp] = useState()
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
        setTimeout(() => {setErrorBal()}, 2000);
      }
        else {setErrorBal("Some mystic error")}
      }
      setLoaderBal(false)
  }

  const handleTransaction = async(event:any)=>{
    event.preventDefault();
    setLoader(true)
    setError()   
    try {
      const tx = await contractERC20WithSigner.transfer(addressTo, amountTo);
      const trans = await tx.wait()
      console.log(trans.transactionHash)
      if(tx){setSuccs("Transaction Success")
      setTimeout(() => {setSuccs()}, 2000);}
      
    } catch (error) {
      if(error.code === "INSUFFICIENT_FUNDS") {setError('Not enough funds')
      setTimeout(() => {setError()}, 2000);}
      else if(error.code === "INVALID_ARGUMENT") {setError('Invalid input')
      setTimeout(() => {setError()}, 2000);}
      else if(error.code === "ACTION_REJECTED") {setError('Transaction was rejected')
      setTimeout(() => {setError()}, 2000);}
      else {setError("Error")
      setTimeout(() => {setError()}, 2000);}
     
    }
    setLoader(false)
  }

  const handleApprove = async(event:any)=>{
    event.preventDefault();
    setLoaderAp(true)
    try {
      const tx = await contractERC20WithSigner.approve(addressToArrpove, amountApprove);
      await tx.wait()
      if(tx){setSuccsAp("Transaction Success")
      setTimeout(() => {setSuccsAp()}, 2000);}
    } catch (error) {
      if(error.code === "INSUFFICIENT_FUNDS") {setErrorAp('Not enough funds')
      setTimeout(() => {setErrorAp()}, 2000);}
      else if(error.code === "INVALID_ARGUMENT") {setErrorAp('Invalid input')
      setTimeout(() => {setErrorAp()}, 2000);}
      else if(error.code === "ACTION_REJECTED") {setErrorAp('Transaction was rejected')
      setTimeout(() => {setErrorAp()}, 2000);}
      else {setErrorAp("Some mystic error")
      setTimeout(() => {setErrorAp()}, 2000)}
    }
    setLoaderAp(false)
  }


  return (
    <>   
      
      <div className='bg-blue-100 rounded-2xl border-4 border-red-400 text-xl px-[15px]'>
        <h1 className=" text-3xl text-center font-bold m-3">Token function</h1>
   
       <div className='rounded-2xl border-2 border-red-400 px-[15px] p-2 m-2 hover:bg-blue-200 hover:shadow-xl'>
          <h1 className='text-center font-bold mb-1'>Check your balance</h1>
            <input placeholder='Enter your address' onChange={(event)=>setAdd(event.target.value)} className = 'rounded' />
            
            {loaderBal ? 
            <div className='flex justify-center'>
              <svg aria-hidden="true" className="mr-2 w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-red-400" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
              </svg>
              <span class="sr-only">Loading...</span>
            </div> : <button onClick={hadleSupply} className="font-bold ml-3 rounded-2xl border-2 border-red-400 px-[15px] hover:bg-red-400">Check</button>}
            
            {balance ? <h1 className='font-bold'>Your balance: {balance} CWT</h1> 
                      : (errorBal ? <h1 className='font-bold text-red-500 text-2xl '>{errorBal}</h1> : null) }
        </div>

        <div className='rounded-2xl border-2 border-red-400 px-[15px] p-2 m-2 hover:bg-blue-200 hover:shadow-xl'>
        <form onSubmit={handleTransaction}>
          <h1 className='text-center font-bold p-1'>Transfer token</h1>
          <label>Send to:</label>
          <input onChange={(e)=>setAddressTo(e.target.value)} className='rounded ml-3 mb-1' placeholder='Enter address of reciever' /><br />
          <label>Amount:</label>
          <input type='text' className='rounded ml-3' onChange={(e:any)=>setAmountTo(e.target.value)} placeholder='Enter amount of tokens' />
     
        {loader ? 
            <div className='flex justify-center'>
              <svg aria-hidden="true" className="mr-2 w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-red-400" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
              </svg>
              <span class="sr-only">Loading...</span>
            </div> : <button type="submit" onClick={handleTransaction} className="font-bold ml-3 rounded-2xl border-2 border-red-400 px-[15px] hover:bg-red-400">Transfer</button>}
            </form>
            {error ? <div className='text-red-500 text-2xl font-bold'>{error}</div> : null}
            {succs ? <div className="text-green-500 text-2xl font-bold">{succs}</div> : null}
        </div>



<div className='rounded-2xl border-2 border-red-400 px-[15px] p-2 m-2 hover:bg-blue-200 hover:shadow-xl'>
        <form onSubmit={handleApprove}>
          <h1 className='text-center font-bold'>Approve</h1>
          <label>Approve:</label>
          <input onChange={(e)=>setAddressToApporve(e.target.value)} className='rounded ml-3 mb-1' placeholder='Enter address of reciever' /><br />
          <label>Amount:</label>
          <input type='text' className='rounded ml-3' onChange={(e:any)=>setAmountApprove(e.target.value)} placeholder='Enter amount of tokens' />
        
          {loaderAp ? 
            <div className='flex justify-center'>
              <svg aria-hidden="true" className="mr-2 w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-red-400" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
              </svg>
              <span className="sr-only">Loading...</span>
                </div> : <button type="submit" onClick={handleApprove} className="font-bold ml-3 rounded-2xl border-2 border-red-400 px-[15px] hover:bg-red-400">Approve</button>}
      </form>
      {errorAp ? <div className='text-red-500 text-2xl font-bold'>{errorAp}</div> : null}
      {succsAp ? <div className="text-green-500 text-2xl font-bold">{succsAp}</div> : null}

      </div></div>

  
      


</>
  )}


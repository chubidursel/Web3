import React, {useState} from 'react'
import Header from '../../components/headerNew';
import Sidebar from '../../components/Sidebar';

export function Vault() {
  const [lockAmount, setLockAmount] = useState();

  const contractSig = 'contractSigner'
  const contractSimple = 'just a normal contract from ethers.js'

  const habdleCheckBallance = async() =>{
    // const balance = contractSig.balanceOf();
    // setBalance(balance)
    console.log(21)
  }
// FUNCTION
  const handleLock = async()=>{
    console.log("Connect contract and call this func")
  }

  return (
  <>
  <Header />
  
    <div className='bg-white w-1/2 m-40 rounded-xl p-2'>
        <div>
          <h1 className='font-bold text-center text-2xl'>INFO: </h1>
          <p>CWT: {222}</p>
          <p>ETH: {10}</p>
          <div>
            <h1>CHeck out ur lock</h1>
            <input type='text' className='outline'></input>
            <button onClick={habdleCheckBallance} className='bg-orange-500 mx-2 p-1'>check</button>
            <h1>Your balance: ...</h1>
          </div>
        </div>

        <div className='bg-slate-400 p-3'>
          <h1 className='font-bold text-center text-2xl'>Functions:</h1>
          <div className='flex flex-row justify-center '>
            <div className='bg-green-500 p-5'>
              <h1>Lock CWT Token:</h1>
              <input type="number" min="0" step='0.01' value={lockAmount} onChange={(e:any) => setLockAmount(e.target.value)} />
              <button onClick={handleLock} className='bg-blue-300 px-2 ml-2 rounded-xl'>LOCK</button>
            </div>
            <div className='bg-orange-500 p-5'>
              <h1>Withdraw CWT Token:</h1>
              <input type="number" min="0" step='0.01' value={lockAmount} onChange={(e:any) => setLockAmount(e.target.value)} />
              <button onClick={handleLock} className='bg-blue-300 px-2 ml-2 rounded-xl'>LOCK</button>
            </div>
          </div>

        </div>

        <div className='bg-yellow-200'>
          <h1>result: {lockAmount}</h1>
        </div>
        <button className='bg-blue-200 w-full mt-2 rounded-xl py-2 hover:bg-blue-400 active:bg-blue-800'>EVEVENTS</button>
        
    </div>
    </>
  )
}


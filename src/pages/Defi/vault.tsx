import React, {useState, useEffect} from 'react'
import Header from '../../components/headerNew';
import { contractVault, contractVaultWithSigner} from '../../components/smart_contract/vault';
import { contractERC20WithSigner } from '../../components/smart_contract/erc20';

export function Vault() {
  const [lockAmount, setLockAmount] = useState();
  const [withdrawAmount, setWithdrawAmount] = useState();
  const [totalSupply, setTotalSupply] = useState(0);
  
  const[checkBalance, setCheckBalance] = useState(0);
  const[getBalanCheck, setGetBalanCheck] = useState('');

  const [displayResult, setDisplayResult] = useState(false)
  const [resultTx, setResultTx] = useState('');

  const addressVault = "0xBd9bb2397512527718125661faC4c5b63d0b0c2d"
  useEffect((()=>{
    (async()=>{
      try {
        const totalSupply = await contractVault.totalSupply()
        setTotalSupply(totalSupply.toString())
      } catch (error) {
        console.log(error)
      }
    })()
  }),[])

  const habdleCheckBallance = async() =>{
    const balance = await  contractVault.balanceOf(getBalanCheck);
    setCheckBalance(balance.toString())
  }
// FUNCTION
  const handleLock = async()=>{
    setDisplayResult(true)
    setResultTx('Please sign 2 transations in MetaMask (1st to approve transfer from ERC20 and 2nd is deposit here) 🙌')
    const resApprove = await contractERC20WithSigner.approve(addressVault, lockAmount);
    await resApprove.wait(1)
    const tx = await  contractVaultWithSigner.deposit(lockAmount);
    await tx.wait(1)
    setResultTx(`Congratulations 🥳! You lock ${lockAmount} CWT here`)
    setTimeout(() => {setDisplayResult(false)}, 10000)
  }
  const handleWithdraw = async()=>{
    setDisplayResult(true)
    setResultTx('Hold on! I am calculating how much you locked here ... 😉 Please sign the transation in MetaMask ')
    const tx = await  contractVaultWithSigner.withdraw(withdrawAmount);
    await tx.wait(1)
    setResultTx(`Congratulations 🥳! You got ${withdrawAmount} CWT back`)
    setTimeout(() => {setDisplayResult(false)}, 10000)
  }

  return (
  <>
  <Header >Just a simple Vault</Header>
  <h2 className="flex justify-center text-6xl text-blue-100 font-bold m-3 mb-5">Vault</h2>
<div className='grid grid-col-1 justify-center text-purple-800  text-lg'>
    <div className='rounded-2xl border-4 border-red-400 px-[15px] p-2 m-2 bg-blue-100'>
    
          
          <h1 className='font-bold text-center text-2xl'>INFO: </h1>
          <div className='flex flex-row justify-around'>
          <button className='font-semibold rounded-xl border-2 border-red-400 px-[15px] hover:bg-red-400 text-lg' target='_blanck' href="https://goerli.etherscan.io/address/0xBd9bb2397512527718125661faC4c5b63d0b0c2d#code">Etherscan</button> 
          <div className='flex flex-row'><p className='font-bold mr-2'>totalSupply: </p><p>{totalSupply}</p></div>
     </div>
     <div className='flex flex-row justify-center mt-4 text-lg'>
            <h1>CHeck out ur lock</h1>
            <input type='text' onChange={(e)=>setGetBalanCheck(e.target.value)} className='outline ml-2 rounded-lg'></input>
            <button onClick={habdleCheckBallance} className='ml-2 font-semibold rounded-xl border-2 border-red-400 px-[15px] hover:bg-red-400 text-lg'>check</button>
            </div>
            <div className='flex flex-row justify-around mt-4 text-lg font-bold'><h1>Your balance: {checkBalance}</h1></div>
     
    </div>
            <div className='rounded-2xl border-4 border-red-400 px-[15px] p-2 m-2 bg-blue-100'>

        
          <h1 className='font-bold text-center text-2xl'>Functions</h1>
          <div className='grid grid-cols-2 justify-center'>
              <div className='grid grid-cols-1'>
              <h1 className='text-center font-bold m-3'>Lock CWT Token</h1>
              <input type="number" min="0" onChange={(e:any) => setLockAmount(e.target.value)} className="outline rounded-lg" />
              <button onClick={handleLock} className='m-3 font-semibold rounded-xl border-2 border-red-400 px-[15px] hover:bg-red-400 text-lg'>LOCK</button>
              </div>

              <div className='grid grid-cols-1'>
              <h1 className='font-bold text-center m-3'>Withdraw CWT Token</h1>
              <input type="number" min="0" className='outline ml-2 rounded-lg'  onChange={(e:any) => setWithdrawAmount(e.target.value)} />
              <button onClick={handleWithdraw} className='m-3 font-semibold rounded-xl border-2 border-red-400 px-[15px] hover:bg-red-400 text-lg'>Withdraw</button>
              </div>
          </div>
          </div>
          </div>

        

        {displayResult && <div className='bg-yellow-200 justify-center flex-row flex py-5 rounded-xl'>
          <h1 className='text-center text-2xl'>{resultTx}</h1>
        </div>}

        
    
    </>
  )
}


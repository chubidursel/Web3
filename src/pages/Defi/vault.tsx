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
  
    <div className='bg-white w-1/2 m-40 rounded-xl p-2'>
        <div>
          
          <h1 className='font-bold text-center text-2xl'>INFO: </h1>
          <a className='hover:underline' target='_blanck' href="https://goerli.etherscan.io/address/0xBd9bb2397512527718125661faC4c5b63d0b0c2d#code">Etherscan</a> 
          <p>totalSupply: {totalSupply}</p>
          <div>
            <h1>CHeck out ur lock</h1>
            <input type='text' onChange={(e)=>setGetBalanCheck(e.target.value)} className='outline'></input>
            <button onClick={habdleCheckBallance} className='bg-orange-500 mx-2 p-1'>check</button>
            <h1>Your balance: {checkBalance}</h1>
          </div>
        </div>

        <div className='bg-slate-400 p-3'>
          <h1 className='font-bold text-center text-2xl'>Functions:</h1>
          <div className='flex flex-row justify-center '>
            <div className='bg-green-500 p-5'>
              <h1>Lock CWT Token:</h1>
              <input type="number" min="0" onChange={(e:any) => setLockAmount(e.target.value)} />
              <button onClick={handleLock} className='bg-blue-300 px-2 ml-2 rounded-xl'>LOCK</button>
            </div>
            <div className='bg-orange-500 p-5'>
              <h1>Withdraw CWT Token:</h1>
              <input type="number" min="0"   onChange={(e:any) => setWithdrawAmount(e.target.value)} />
              <button onClick={handleWithdraw} className='bg-blue-300 px-2 ml-2 rounded-xl'>Withdraw</button>
            </div>
          </div>

        </div>

        {displayResult && <div className='bg-yellow-200 py-5 rounded-xl'>
          <h1 className='text-center text-2xl'>{resultTx}</h1>
        </div>}

        
    </div>
    </>
  )
}


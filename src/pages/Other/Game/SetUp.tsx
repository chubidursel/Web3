import { useState, useEffect } from 'react';
import { contractFlipSimple } from '../../../components/smart_contract/FlipCoin';
import { contractERC20 } from '../../../components/smart_contract/erc20';
import conectSigner from '../../../components/smart_contract/SIGNER';
import Loader from '../../../components/loader';
import getErrorMessage from '../../../components/getErrorMessage';
import { useAppContext } from "../../../hooks/useAppContext";
export function SetUp() {
  const [loader, setLoader] = useState(false)
  const[result, setResult ] = useState('')

  const[amountBank, setAmountBank] = useState(0)
  const[amountBet, setAmountBet] = useState(0)

  
  const { contextState } = useAppContext(); // CHECK INFO about players acc
  const currentAccount = contextState?.currentAccount;

  const onSetUp = async(event: React.FormEvent<HTMLFormElement>)=>{
    event.preventDefault();

    // if(amountBank && amountBet){
    //     setResult('Fill all input!')
    //     setTimeout(() => {setResult('')}, 4000)
    //     return null
    // }

    try{
    setLoader(true)
       setResult('Pls sign 1st tx to Approve ur tokens transfer 📝')

       const contractERC20WithSigner = conectSigner(contractERC20)
       const resApprove = await contractERC20WithSigner.approve(contractFlipSimple.address, amountBank);
       const res = await resApprove.wait(1)
       console.log("👨‍💻 DEV >>>", res)


       setResult('✅ Fantastic! Sign 2nd tx to actually send token to this contract 📝')

       const contractWithSigner = conectSigner(contractFlipSimple)
       const txTransfer = await contractWithSigner.deposit(amountBank, amountBet);
       const res2 = await txTransfer.wait(1)
       console.log("👨‍💻 DEV >>>", res2)

       setResult(`✅ Awesome! You put ${amountBank} CWT, which means u can play ${amountBank / amountBet} times. Good luck!`)

       setTimeout(() => {setResult('')}, 10000)
       setLoader(false)
    }catch (error) {
        console.log("👨‍💻 DEV >>>", error)
        const message = getErrorMessage(error);
        setResult(message)
        setTimeout(() => {setResult('')}, 7000)
        setLoader(false)
    }
  }

  const handleWithdraw = async()=>{
    try{
        setLoader(true)
           setResult('Wanna take your tokens back? Sign the tx 📝')
        
           const contractWithSigner = conectSigner(contractFlipSimple)
           const txTransfer = await contractWithSigner.withdrawPlayer();
           const res2 = await txTransfer.wait(1)
           console.log("👨‍💻 DEV >>>", res2)
    
           setResult(`✅ Confirmed! See ya soon`)
    
           setTimeout(() => {setResult('')}, 10000)
           setLoader(false)
        }catch (error) {
            console.log("👨‍💻 DEV >>>", error)
            const message = getErrorMessage(error);
            setResult(message)
            setTimeout(() => {setResult('')}, 7000)
            setLoader(false)
        }
  }

  const handleInfo = async()=>{
    try{
        const info = await contractFlipSimple.userInfo(currentAccount);
        console.log("👨‍💻 DEV INFO ACC >>>", info)
  
        const didWin = info.won // CHANGE !!!!!!!!!!!!!!!!!!!!!!!
        const gameLeft = Number(info.bank.toString()) - Number(info.bet.toString())

        setResult(`Bank:${info.bank.toString()}  || Bet:${info.bet.toString()} || Game:${info.gameCount.toString()} || Lost:${info.lost.toString()}`)

        }catch (error) {
            console.log("👨‍💻 DEV >>>", error)
            const message = getErrorMessage(error);
            setResult(message)
            setTimeout(() => {setResult('')}, 7000)
            setLoader(false)
        }
  }


  return (
    <>
        <div>
            <h1 className='text-center text-3xl font-bold'>SET UP UR GAME</h1>
            <h1 className='text-center text-2xl hover:underline hover:cursor-pointer'><a href="https://goerli.etherscan.io/address/0x96F7010a4706756faFd6ee43969993334F80cfA1" target="_blank">Etherscan</a></h1>
       
       <div className='bg-gray-100 rounded-lg'>
                <h1>Explanation 💁</h1>
                <h2>📍 Refill ur account with CWT tokens</h2>
                <h2>📍 Write the bank and single bet for this game</h2>
                <h2>📍 Sign 2 transations (approve and deposit)</h2>
                <h2>📍 Enjoy our game</h2>
                <h2>📍 Withdraw your tokens back</h2>
       </div>
      
                <h1>-----------------------setting-----------------</h1>
        
                {loader ? 
            <Loader /> : <>
            
        <form onSubmit={onSetUp} className=" flex justify-center flex-col">
                    
    {/* <section>  =( DOESNT WORK NOW
        <option value="">ETH</option>
        <option value="">CWT</option>
        <option value="">GOLD</option>
    </section> */}
                        <label>Your Bank: </label>
                        <input type='number' min='0' className='rounded-xl text-center p-1 hover:shadow-lg' onChange={e => setAmountBank(e.target.value as any)} placeholder='amount of CWT token' />
                        
                        <label>Your Bet: </label>
                        <input type='number' min='0' className='rounded-xl text-center p-1 hover:shadow-lg' onChange={e => setAmountBet(e.target.value as any)} placeholder='CWT pro flip' />
                   
            <button className='bg-orange-300 p-4 mt-2' type='submit'>submit</button>
           </form>

                <div className='flex flex-row'>
                   <button onClick={handleWithdraw} className='bg-red-200 mt-2 w-full p-4' type='submit'>WITHDRAW</button>
                  <button onClick={handleInfo} className='bg-orange-200 mt-2 w-full p-4' type='submit'>INFO</button>
               </div>

               </>
           }


     
         </div>

         {result && <div className='bg-blue-200 text-center p-3 mt-2 rounded-xl'>{result}</div>} 
    </>
  )
}

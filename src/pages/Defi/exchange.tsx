import React from 'react'
import { ethers } from "ethers";
import {useState, useEffect} from 'react';
import { contractExchange, contractExchangeWithSigner } from '../../components/smart_contract/exchange'
import Result from './components/exchange/Result';
import { contractERC20WithSigner } from '../../components/smart_contract/erc20'; //ERC token
import Header from '../../components/headerNew';
import EventsExchange from './components/exchange/EventsExchange';
import Sidebar from '../../components/Sidebar';
import HeaderExchange from './components/exchange/headerExchange';

export function Exchange() {
  const [cwt, setCwt] = useState();
  const [eth, setEth] = useState();
  const [rateCwt, setRateCwt] = useState<any>(); // How much ETH for 1 CWT
  const [amountBuy, setAmountBuy] = useState<any>();
  const [amountSell, setAmountSell] = useState(0);
  const [result, setResult] = useState('');
  // const [showEvents, setShowEvents] =useState(false)
  const [showEvent, setShowEvent] = useState(false)
  const handleToggle = () =>setShowEvent(!showEvent)

  const [succs, setSuccs] = useState()
  const [error, setError] = useState()
  const [loader, setLoader] = useState(false)
  const [loaderSell, setLoaderSell] = useState(false)


  useEffect(()=>{
    (async()=>{
      try {
        const balanceCWT = await contractExchange.getTokenBalance();
        setCwt(balanceCWT.toString()) 

        const balanceETH = await contractExchange.getEthBalance();
        setEth(ethers.utils.formatEther(balanceETH) as any)

        const getRate = await contractExchange.rate();
        setRateCwt(getRate.toString() / 1000000000000000000)

      } catch (error) {
        console.log(error)
      }
    })()
  },[cwt])

  const handleBuy = async()=>{
    //contract get amount of ETH u want to send to this SC and according to Rate recive certain amount of CWT
    const convertEthToCwt = amountBuy * rateCwt // 1 * 0.01 
    console.log(convertEthToCwt)
    console.log(ethers.utils.parseEther(convertEthToCwt.toString()))
    try {
      if(convertEthToCwt * 100 <= Number(cwt) ){setLoader(true)
        //contract get amount of ETH u want to send to this SC and according to Rate recive certain amount of CWT
        setResult("Please sign the transation in MetaMask 📝 and wait till this tx will be confirmed in blockchain")
        const tx= {
          value: ethers.utils.parseEther(convertEthToCwt.toString()),
      }
        const callFunc = await contractExchangeWithSigner.buyToken(tx)
        const res = await callFunc.wait(1)
        console.log(res.events)

        setResult(`✅ Complete! You just bought ${cwt} CWT`)
        setTimeout(() => {setResult('')}, 7000)
      } 
      else{
        setResult('Not enough fund here 😞')
        setTimeout(() => {setResult('')}, 4000)
      }
    } catch (error) {
      console.log(error)
      setResult('Oii wei, we got problems! 😞')
      setTimeout(() => {setResult('')}, 4000)
    }setLoader(false)
  }

  const handleSell = async()=>{
    try {
      setLoaderSell(true)
      const amount = ethers.utils.parseEther(amountSell.toString());
      setResult(`To sell CWT token you must sign 2 transation. The first one is to approve in ERC20 contract and the secont tx you call in Exchange contract 📝`)
// #1 calling ERC20 contract to set approve
      const resApprove = await contractERC20WithSigner.approve(contractExchange.address, amount);
      await resApprove.wait()
  console.log(resApprove)
      setResult(`✅ Approve completed! Now please sign the second transaction to sell your token`)
// #2 calling this SC to sell tokens
      const resSell = await contractExchangeWithSigner.sellToken(amountSell);
      await resSell.wait()
      setResult(`✅ Sell Token completed!`)
      setTimeout(() => {setResult('')}, 8000)
    } catch (error) {
      console.log(error)
      setResult('Oii wei, we got problems! 😞')
      setTimeout(() => {setResult('')}, 2000)
    }setLoaderSell(false)
  }

  return (
    <>
  <Header>
    <div className='text-center'>
      Simple app where you can exchange Ethreum (Goerli) token  to CryptoWorldToken 💱
      <h1 className='mt-3'>💡 If u do not have any of these token, we recommend  you to visit one of Goerli faucet website, to get free goerli token</h1>
    </div>
  </Header>
    <div className='flex justify-around'>
    <HeaderExchange handleToggle={handleToggle}/></div>
  <div className='flex justify-center text-purple-800'>
    <div className='bg-blue-100 w-1/2 rounded-2xl border-4 border-red-400 text-xl px-[15px] py-5 m-8'>
    <h1 className=" text-3xl text-center mb-2 font-bold m-1">You wanna get some CWT tokens?</h1>
     
   
    <div className='flex justify-around text-center'>
            <div className='grid grid-cols-1 gap-3 w-56 rounded-2xl border-2 border-red-400 px-[15px] p-1'>
              <p className='font-bold'>Exchange rate: </p>
              <p>1 CWT = {rateCwt} ETH</p>
            </div>
            <div className='grid grid-cols-1 gap-3 rounded-2xl border-2 border-red-400 px-[15px] p-1'>
              <p className='font-bold'>Current amount of:</p>
              <p>CWT: {cwt}</p>
              <p>ETH: {eth} </p>
            </div>
          </div>


          <div className='rounded-2xl border-2 border-red-400 px-[15px] p-2 m-2'>
          <h1 className='text-center font-bold text-3xl mb-2 p-1'>Exchange</h1>
          <div className='flex justify-around flex-wrap'>
          <div className="grid grid-cols-1 gap-3 w-72">
                <input className='rounded-xl text-center p-1 hover:shadow-lg' onChange={e => setAmountBuy(e.target.value as any)} placeholder='amount of CWT' />
                {loader ? 
            <div className='flex justify-center'>
              <svg aria-hidden="true" className="mr-2 w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-red-400" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
              </svg>
              <span className="sr-only">Loading...</span>
            </div> : <button onClick={handleBuy} className="font-bold rounded-xl py-1 text-2xl hover:shadow-xl border-2 border-red-400 px-[15px] hover:bg-red-400">buy</button>}            
        </div>

        <div className="grid grid-cols-1 gap-3 w-72 my-1">
                <input className='rounded-xl text-center p-1 hover:shadow-lg' onChange={e => setAmountSell(e.target.value as any)} placeholder='amount of CWT' />
                {loaderSell ? 
            <div className='flex justify-center'>
              <svg aria-hidden="true" className="mr-2 w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-red-400" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
              </svg>
              <span className="sr-only">Loading...</span>
            </div> : <button onClick={handleSell} className="font-bold py-1 text-2xl hover:shadow-xl rounded-xl border-2 border-red-400 px-[15px] hover:bg-red-400">sell</button>}           
            </div>
            </div>  
           <div className='flex justify-center'> {result && <h1 className='font-bold mt-3 bg-yellow-100 w-full py-2 text-center  px-1 rounded-xl text-purple-900 text-xl '>{result}</h1>}   </div>
            </div>
        {/* <Result /> */}
        {/* {error && <div>{error}</div>} */}
    </div></div>
    <div className='flex justify-center'>{showEvent && <EventsExchange />}</div>
    </>
  )
}


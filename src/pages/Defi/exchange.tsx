import React from 'react'
import { ethers } from "ethers";
import {useState, useEffect} from 'react';
import { contractExchange } from '../../components/smart_contract/exchange'
import Header from '../../components/headerNew';
import EventsExchange from './components/exchange/EventsExchange';
import HeaderExchange from './components/exchange/headerExchange';
import { contractERC20 } from '../../components/smart_contract/erc20';
import conectSigner from '../../components/smart_contract/SIGNER';
import Loader from '../../components/loader';
import getErrorMessage from '../../components/getErrorMessage';
import ethereum from "../../assets/ethereum.png"


export function Exchange() {
  const [cwt, setCwt] = useState();
  const [eth, setEth] = useState();
  const [rateCwt, setRateCwt] = useState<any>(); // How much ETH for 1 CWT
  const [amountBuy, setAmountBuy] = useState<any>();
  const [amountSell, setAmountSell] = useState(0);
  const [changeSwap, setChangeSwap] = useState(true)
console.log(amountBuy);

  // const [showEvents, setShowEvents] =useState(false)
  const [showEvent, setShowEvent] = useState(false)
  const handleToggle = () =>setShowEvent(!showEvent)

  const [loader, setLoader] = useState(false)
  const [loaderSell, setLoaderSell] = useState(false)


  const [result, setResult] = useState('');   // ALL RESULT (SUCC , ERR, Pand)
  
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
    const convertEthToCwt = amountBuy // 1 * 0.01 - i've corrected this because there is new logic in swap

    try {
      if(convertEthToCwt * 100 <= Number(cwt) ){setLoader(true)
        //contract get amount of ETH u want to send to this SC and according to Rate recive certain amount of CWT
        setResult("Please sign the transation in MetaMask 📝 and wait till this tx will be confirmed in blockchain")
        const tx= {
          value: ethers.utils.parseEther(convertEthToCwt.toString()),
      }
      const contractExchangeWithSigner = conectSigner(contractExchange)
        const callFunc = await contractExchangeWithSigner.buyToken(tx)
        const res = await callFunc.wait(1)
        console.log(res.events)

        setResult(`✅ Complete! You just bought ${amountBuy} CWT`)
        setTimeout(() => {setResult('')}, 7000)
      } 
      else{
        setResult('Not enough fund here 😞')
        setTimeout(() => {setResult('')}, 7000)
      }
    } catch (error) {
      const message = getErrorMessage(error);
      setResult(message)
      setTimeout(() => {setResult('')}, 7000)
    }setLoader(false)
  }

  const handleSell = async()=>{
    try {
      setLoaderSell(true)
      const amount = ethers.utils.parseEther(amountSell.toString());
      setResult(`To sell CWT token you must sign 2 transation. The first one is to approve in ERC20 contract and the secont tx you call in Exchange contract 📝`)
// #1 calling ERC20 contract to set approve
const contractERC20WithSigner = conectSigner(contractERC20)
      const resApprove = await contractERC20WithSigner.approve(contractExchange.address, amount);
      await resApprove.wait()
  console.log(resApprove)
      setResult(`✅ Approve completed! Now please sign the second transaction📝 to sell your token`)
// #2 calling this SC to sell tokens
const contractExchangeWithSigner = conectSigner(contractExchange)
      const resSell = await contractExchangeWithSigner.sellToken(amountSell);
      await resSell.wait()
      setResult(`✅ Sell Token completed!`)
      setTimeout(() => {setResult('')}, 8000)
    } catch (error) {
      const message = getErrorMessage(error);
      setResult(message)
      setTimeout(() => {setResult('')}, 7000)
    }setLoaderSell(false)
  }

  return (
    <>
  <Header marginFromTop={'top-1/3'}>
    <div className='text-center'>
      Simple app where you can exchange Ethreum (Goerli) token  to CryptoWorldToken 💱
      <h1 className='mt-3'>💡 If u do not have any of these token, we recommend  you to visit one of Goerli faucet website, to get free goerli token</h1>
    </div>
  </Header>
  
    <div className='flex justify-around'>
    <HeaderExchange handleToggle={handleToggle}/></div>

  {/* <div className='flex justify-center text-purple-800'>
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
                <input type='number' min='0' className='rounded-xl text-center p-1 hover:shadow-lg' onChange={e => setAmountBuy(e.target.value as any)} placeholder='amount of CWT' />
                {loader ? 
            <Loader /> : <button onClick={handleBuy} className="font-bold rounded-xl py-1 text-2xl hover:shadow-xl border-2 border-red-400 px-[15px] hover:bg-red-400">buy</button>}            
        </div>

        <div className="grid grid-cols-1 gap-3 w-72 my-1">
                <input type='number' min='0' className='rounded-xl text-center p-1 hover:shadow-lg' onChange={e => setAmountSell(e.target.value as any)} placeholder='amount of CWT' />
                {loaderSell ? 
            <Loader /> : <button onClick={handleSell} className="font-bold py-1 text-2xl hover:shadow-xl rounded-xl border-2 border-red-400 px-[15px] hover:bg-red-400">sell</button>}           
            </div>
            </div>  
           <div className='flex justify-center'> {result && <h1 className='font-bold mt-3 bg-yellow-100 w-full py-2 text-center  px-1 rounded-xl text-purple-900 text-xl '>{result}</h1>}   </div>
            </div>
    </div></div> */}

{/* New design */}

<div className="relative text-purple-800 grid border-red-400 rounded-xl border-2 h-max w-[40%] mt-20 m-[auto] bg-blue-50 grid-cols-[1fr_1fr] grid-rows-[1fr_1fr_1fr_1fr]">
  <div className="font-bold text-2xl p-2 m-2">Swap your money </div>
  <div className="text-lg p-2 m-2 h-[40%] justify-self-end bg-blue-100 rounded-lg">1 CWT = {rateCwt} ETH</div>
  
{changeSwap 
? <>
<div className='h-28 col-span-2 bg-blue-100 rounded-2xl mx-3'>
<div className="flex justify-between p-2 max-w-full overflow-hidden">
    <input min='0' type="number" className='bg-blue-100 w-[50%] rounded-lg text-5xl p-1 border-none outline-none appearance-none' 
    onChange={e => setAmountBuy(e.target.value as any)} placeholder='ETH' />
    <img src={ethereum} alt="coin"  className='h-12 w-12'/>
</div>
</div>

<div className="inline-flex absolute bottom-1/2 -mb-6 -ml-5 left-1/2 z-10 w-[8,5%] border-[5px] bg-blue-100 border-blue-50 rounded-lg text-center font-extrabold text-3xl text-blue-50">
{loader 
? <div className='-mr-2'><Loader /></div>
: <button onClick={() => setChangeSwap(!changeSwap)}>↑↓</button>}</div>

<div className='col-span-2 bg-blue-100 rounded-2xl mt-[6px] mx-3'>
<div className="flex justify-between p-2 max-w-full">
<div className='text-5xl'>{amountBuy ? <p className='text-purple-800'>{amountBuy*100}</p> : <p className='text-gray-400'>CWT</p>}
</div>
<div className='font-bold text-3xl text-blue-50 rounded-lg bg-purple-800 p-1 h-[50%]'>CWT</div>
</div>
</div>
</>
: <>
<div className='h-28 col-span-2 bg-blue-100 rounded-2xl mx-3'>
<div className="flex justify-between p-2 max-w-full">
    <input min='0' type='number' className='bg-blue-100 w-[50%] rounded-lg text-5xl p-1 border-none outline-none' 
    onChange={e => setAmountSell(e.target.value as any)} placeholder='CWT' />
<div className='font-bold text-3xl text-blue-50 rounded-lg bg-purple-800 p-1 h-[50%]'>CWT</div>

</div>
</div>

<div className="inline-flex absolute bottom-1/2 -mb-6 -ml-5 left-1/2 z-10 w-[8,5%] border-[5px] bg-blue-100 border-blue-50 rounded-lg text-center font-extrabold text-3xl text-blue-50">
{loaderSell 
? <div className='-mr-2'><Loader /></div>
: <button onClick={() => setChangeSwap(!changeSwap)}>↑↓</button>}</div>

<div className='col-span-2 bg-blue-100 rounded-2xl mt-[6px] mx-3'>
<div className="flex justify-between p-2 max-w-full">
<div className='text-5xl'>{amountSell ? <p className='text-purple-800'>{amountSell*0.01}</p> : <p className='text-gray-400'>ETH</p>}
</div>
<img src={ethereum} alt="coin"  className='h-12 w-12'/>

</div>
</div></>
}
  <div className="self-end col-span-2 h-[60%]">
      <button onClick={changeSwap ? handleBuy : handleSell}
  className="font-bold rounded-xl h-[80%] text-2xl w-[96%] mx-3 bg-blue-100 hover:bg-red-400">SWAP</button>            
      </div>
    </div>
    
    <div className='m-[auto] w-[50%]'> {result && <h1 className='font-bold mt-3 bg-yellow-100 py-2 text-center  px-1 rounded-xl text-purple-900 text-xl '>{result}</h1>}   </div>

    <div className='flex justify-center'>{showEvent && <EventsExchange />}</div>

    </>
  )
}


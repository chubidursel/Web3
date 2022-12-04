import React, {useState, useEffect} from 'react'
import { ethers } from "ethers";
import Header from '../../components/headerNew';
import { contractChainLink, contractChainLinkRandom } from '../../components/smart_contract/ChainLinkEth';
import conectSigner from '../../components/smart_contract/SIGNER';
import getErrorMessage from '../../components/getErrorMessage';


export function ChainLink() {
  const[priceEth, setPriceEth] = useState();

  const[lengthRandom, setLengthRandom] = useState('');
  const[randomNum, setRandomNum] = useState('');

//-------------------
const [getLastId, setGetLastId] = useState('')

// useEffect((()=>{
//   (async()=>{
//     try {
//       let eventFilter = contractChainLinkRandom.filters.RequestFulfilled()
//       let events = await contractChainLinkRandom.queryFilter(eventFilter)

//       console.log(events[events.length - 1].args[0].toString())
//     } catch (error) {
//       console.log(error)
//     }
//   })()
// }),[])
//-------------------

  
  const handleGetPrice = async() => {
    const priceEth = await contractChainLink.getLatestPrice();
    setPriceEth(priceEth.toString())
  }

  const handleRandomRequests = async () =>{
    // FROM JS -> just in case
    //const tempSolution = Math.floor(Math.random() * Number(lengthRandom)) + 1;
try {
  setRandomNum("To make a request to ChainLink pls sign the tx 📝");
  const contractExchangeWithSigner = conectSigner(contractChainLinkRandom)
  const callFunc = await contractExchangeWithSigner.requestRandomWords();
  const res = await callFunc.wait(1)
  console.log(res.events)
  console.log(res)

  //-------- GET EVENT FROM REQ
  let eventFilter = contractChainLinkRandom.filters.RequestSent()
  let events = await contractChainLinkRandom.queryFilter(eventFilter)
  const reqId = events[events.length - 1].args[0].toString()
  console.log(reqId)

  //setGetLastId(reqId)

  setRandomNum("✅ Completed, Pls wait till ChainLink nodes generete random num");

  setTimeout(() => {setRandomNum('')}, 9000)
  
} catch (error) {
  const message = getErrorMessage(error);
  setRandomNum(message)
  setTimeout(() => {setRandomNum('')}, 7000)
}

  }

  const handleCheck = async() => {
    setRandomNum("Start");
    const lastId = await contractChainLinkRandom.lastRequestId();
    setRandomNum(`📨 Last request ID: ${lastId.toString().slice(0, 10) + "..." + lastId.toString().slice(60)}`);

    const requestStatus = await contractChainLinkRandom.getRequestStatus(lastId);
    console.log("👨‍💻 whole number: ", requestStatus[1][0].toString());
    console.log("👨‍💻 RES ->", requestStatus);
    setRandomNum(`Request status: ${requestStatus[0] ? requestStatus[1][0].toString().slice(0, Number(lengthRandom)) : "in progeress"}`)
  }


  return (
  <>
  <Header marginFromTop={'top-1/3'}>
    <h1>Here we implement simple chainLink contract to get data from off-chain</h1>
    <h1 className='text-center font-bold text-2xl'>Random Number</h1>
    <p>Chose the lenght (how many digits) → Make a request to ChainLink Oracle → Wait a bit → Check the Result</p>
  </Header>
  <h2 className="flex justify-center text-6xl text-blue-100 font-bold">ChainLink</h2>

  <div className='flex justify-center'>
    <div className='bg-blue-100 w-1/2 flex flex-col m-3 text-purple-800 p-4 rounded-2xl border-4 hover:shadow-2xl border-red-400'>
        <h1 className='font-bold text-center my-3 text-2xl'>Get data from off-chain</h1>
       {/* <div className='flex justify-center mb-3'> <a href='https://goerli.etherscan.io/address/0x3fb7955c779f3871c076f905139c8eb6703b2063#code' target='_blank'>
          <button className="font-bold hover:text-blue-100 hover:shadow-xl rounded-xl text-3xl border-2 border-red-400 px-[15px] hover:bg-red-400">
            Contract</button></a></div> */}

          <div className='bg-blue-100 rounded-2xl border-2 hover:shadow-2xl border-red-400 p-5 hover:bg-blue-200 flex flex-col'>
              <h1 className='font-bold text-2xl text-center mb-3'>Retrieve the latest asset prices</h1>
              <div className='flex justify-center'>
                <p className='text-xl font-semibold'> Ethereum: {priceEth && <span className='text-5xl font-bold'> {priceEth}$</span>}</p>
                <button onClick={handleGetPrice} className="font-bold hover:text-blue-100 ml-3 hover:shadow-xl rounded-xl text-3xl border-2 border-red-400 px-[15px] hover:bg-red-400">Check</button>
              </div>
          </div>
          <div className='bg-blue-100 mt-3 text-xl font-semibold rounded-2xl border-2 hover:shadow-2xl border-red-400 p-5 text-center hover:bg-blue-200 flex flex-col'>
          <h1 className='text-3xl mb-2 hover:underline'><a href="https://goerli.etherscan.io/address/0x16A8aBC4D0760a6957AE7019a569a9273d57CD72" target='_blanck' >Random Number</a></h1> 
          
      <div className='flex flex-row'>
            <input type="number" onChange={(event: React.ChangeEvent<HTMLInputElement>)=>(setLengthRandom(event.target?.value))} placeholder='length' min='0' className='text-center h-10 rounded-lg hover:shadow-xl'/>
            <button onClick={handleRandomRequests} className="w-1/4 font-bold hover:text-blue-100 ml-3 hover:shadow-xl rounded-xl text-3xl border-2 border-red-400 px-[15px] hover:bg-red-400">Request</button>
            <button onClick={handleCheck} className="w-1/4 font-bold hover:text-blue-100 ml-3 hover:shadow-xl rounded-xl text-3xl border-2 border-red-400 px-[15px] hover:bg-red-400">Check</button>
      </div>
 
           {randomNum ? <span className='mt-2 py-3 rounded-lg bg-yellow-100'>{randomNum}</span> : null}
           </div>
          <div className='bg-blue-100 mt-3 rounded-2xl border-2 text-xl font-semibold hover:shadow-2xl border-red-400 p-5 text-center hover:bg-blue-200 flex flex-col'>
          <h1 className='text-3xl'>Call External APIs</h1>
          <p>comming soon....</p>
          </div>

</div>



    </div>
  </>
  )
}


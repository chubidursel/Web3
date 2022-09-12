import React from 'react'
import defaultProvider from '../../abi/defaultProvider';
import { contractERC20, contractERC20WithSigner } from '../../components/smart_contract/erc20';
import {useState, useContext} from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/header';
import { Context } from "../../contexts/context";
import walletProvider from '../../abi/walletProvider';
import {Info} from "./ERC20_components/info"

export function ERC20() {
  const [owner, setOwner] = useState()
  const [add, setAdd] = useState("")
  const [balance, setBalance] = useState()

  const [addressTo, setAddressTo] = useState("");
  const [amountTo, setAmountTo] = useState();

//<<<<<<<<<<<<<<<<<<<<<  TESTING
  const currentAccount = useContext(Context);

  async function getData(){
    const blockNum = await defaultProvider.getBlockNumber();
    console.log(walletProvider)

    console.log(currentAccount)

  }

//<<<<<<<<<<<<<<<<<<<<
  const hadleSupply = async()=>{
    const balance = await contractERC20.balanceOf(add);
    setBalance(balance.toString())
  }

  const handleTransaction = async(event:any)=>{
    event.preventDefault();
    try {
      const tx = await contractERC20WithSigner.transfer(addressTo, amountTo);
      console.log(tx)

    } catch (error) {
      console.error(error)
    }

  }
//0x63018F44E822875Be96e7CE6F5b53cB1dEcA1B96 //my 2nd acc
  const address = "0x354hb23jhb2"
  const tokenAddress = "0xXXXXXXX"
  const tokenAmount = 10000;

  return (
    <>
    <Header />
<div className="py-6 flex flex-col justify-center sm:py-12">
<div className="py-3 sm:max-w-xl sm:mx-auto ">
<div className="bg-white min-w-1xl flex flex-col rounded-xl shadow-lg ">
      <div className="px-12 py-5">
        <h2 className="text-purple-800 text-3xl text-center font-semibold">Check out our ERC20 token</h2>
      </div>
      <div className="bg-gray-200 w-full flex flex-col items-center">
      <div className="flex flex-row space-x-4 items-center py-6 space-y-3">
          <a href='https://etherscan.io/address/0x7C2ED4E6fB642186ec9472813207c902005583D7' target="_blank"><span className="text-gray-800 text-3xl font-semibold hover:underline">Etherscan </span></a>
          <Link to="/Defi/exchange" ><span className="text-gray-800 text-3xl font-semibold hover:underline">Exchange</span> </Link>
      </div>

      <Info />

      <div className='p-5 bg-orange-100'>
        <h1 className='text-4xl text-center'>Token Function:</h1>
        <div className="bg-pink-400 p-2">
          <label >Check your balance: 
            <input onChange={(event)=>setAdd(event.target.value)}></input>
            <button onClick={hadleSupply} className="bg-orange-600 px-10 rounded-xl">submit</button>
            <h1 className='text-center font-bold'>{balance}</h1>
          </label>
        </div>
        
        <form onSubmit={handleTransaction} className="bg-green-400 p-2">
          <h1 className='text-center font-bold underline'>Transfer token</h1>
          <label>send to: </label>
          <input onChange={(e)=>setAddressTo(e.target.value)} className='rounded'></input><br />
          <label>amount:</label>
          <input type='text' onChange={(e:any)=>setAmountTo(e.target.value)}></input>
          <button type="submit" className="ml-10 px-2 bg-orange-500" >click</button>
        </form>
      </div>

      </div>
</div>
</div>
</div>
</>
  )}

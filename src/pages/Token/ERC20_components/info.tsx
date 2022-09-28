import { useAppContext } from "../../../hooks/useAppContext";
import {useEffect, useState} from 'react';
import { contractERC20 } from '../../../components/smart_contract/erc20';

export function Info() {
  const[totalSupply, setTotalSupply] = useState();

  const { contextState, updateContextState } = useAppContext();
  const currentAccount = contextState?.currentAccount;


  useEffect(()=>{
    (async()=>{
      try {
        const balanceCWT = await contractERC20.totalSupply();
        setTotalSupply(balanceCWT.toString())       

      } catch (error) {
        console.log(error)
      }
    })()
  },[])


  return (
    <>
    <div className='bg-blue-100 rounded-2xl border-4 border-red-400 px-[15px] hover:bg-blue-200'>
        <h1 className=" text-3xl text-center font-bold m-3">INFO</h1>
<div className='text-xl'>
            <p className='font-bold'>Network:</p> <p>Ethreum Testnet ( Goerli )</p>
            <p className='font-bold'>Token name / symbol:</p> <p>CryptoWorldToken / CWT</p>
            <p className='font-bold'>Token address:</p> <p>0x9fa7096177A9eDC1547cCA1345B6a9C9e3A7eA6D</p>
            <p className='font-bold'>Owner:</p> <p>0x98162D17D4d15c945B7418475EdEb4d9c0335684</p>
            <p className='font-bold'>Total supply:</p> <p>{totalSupply}</p>
            <p className='font-bold'>Your address:</p> 
            {currentAccount ? <p>{currentAccount}</p> : <p className='font-bold text-red-500'>Please connect your wallet</p>}
            
    </div></div></>
    
  )
}

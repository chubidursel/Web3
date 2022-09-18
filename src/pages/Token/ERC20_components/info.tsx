import { useAppContext } from "../../../hooks/useAppContext";
import {useEffect, useState} from 'react';
import { contractERC20, contractERC20WithSigner } from '../../../components/smart_contract/erc20';
import defaultProvider from '../../../abi/defaultProvider';

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
        <label htmlFor="chain" className='mr-3 font-bold'>Network:</label>
            <select name="chain" id="chain" form="carform" className="rounded-xl px-2">
            <option value="ETH">ETH</option>
            <option value="Poligon">Poligon</option>
            <option value="BNB">BNB</option>
            </select>         
            <p className='font-bold'>Token name / symbol:</p> <p>CryptoWorldToken / CWT</p>
            <p className='font-bold'>Token address:</p> <p>0x4F77F82dF5CcC8D8d5f46ECadA58e500f53fDb3a </p>
            <p className='font-bold'>Owner:</p> <p>0x98162D17D4d15c945B7418475EdEb4d9c0335684</p>
            <p className='font-bold'>Total supply:</p> <p>{totalSupply}</p>
            <p className='font-bold'>Your address:</p> 
            {currentAccount ? <p>{currentAccount}</p> : <p className='font-bold text-red-500'>Please connect your wallet</p>}
            
    </div></div></>
    
  )
}


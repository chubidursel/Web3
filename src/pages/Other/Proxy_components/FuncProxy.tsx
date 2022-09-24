import React, {useEffect, useState} from 'react'
import {contractProxy, contractProxyWithSigner} from '../../../components/smart_contract/ProxyMain'
import walletProvider from '../../../abi/walletProvider';
import { useAppContext } from "../../../hooks/useAppContext";
import { ethers } from 'ethers';



function FuncProxy() {
    const [getNum, setGetNum] = useState();
    const[contractImplementation, setContractImplementation] = useState();

    const { contextState, updateContextState } = useAppContext();
    const currentAccount = contextState?.currentAccount;

    useEffect((()=>{
        (async()=>{
          try {
            const num1 = await contractProxy.num();
            setGetNum(num1.toString())
            const contractImpl = await contractProxy.implementation();
            setContractImplementation(contractImpl)
          } catch (error) {
            console.log(error)
          }
        })()
      }),[])

      const handleSwitch = async() =>{
        const tx = await contractProxyWithSigner.switchImplementation();
        console.log(tx)
      }

      const lowLevelCallPlus = async()=>{
        const tx = {
          from: currentAccount,
          to: "0x41153577d5931F5c47f575d2EC1674e10AB102aB", 
          data: "0x371303c0",
        }
        console.log(tx)
        const res = await walletProvider.sendTransaction(tx);
        console.log(res)
      }


  return (
    <div>
    <div className='text-center'>
        <h1> LOCAL VALUE: {getNum}</h1>
        <h1>current contract implementation: {contractImplementation} </h1>
        <h1>Set up First implementation contract</h1>
        
        <button onClick={handleSwitch} className='bg-orange-200 p-3 hover:bg-red-300'>switch contract implementation</button>
        <h1>Low-Lew function to smart contract</h1>
        <button onClick={lowLevelCallPlus} className='bg-orange-200 p-3 mx-2 hover:bg-orange-300'>+</button>
        <button  className='bg-orange-200 p-3 mx-2 hover:bg-orange-300'>-</button>
      </div>
    </div>
  )
}

export default FuncProxy
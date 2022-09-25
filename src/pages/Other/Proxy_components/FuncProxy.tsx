import React, {useEffect, useState} from 'react'
import {contractProxy, contractProxyWithSigner} from '../../../components/smart_contract/ProxyMain'
import walletProvider from '../../../abi/walletProvider';
import { useAppContext } from "../../../hooks/useAppContext";
import { ethers } from 'ethers';



function FuncProxy() {
  const [displayResult, setDisplayResult] = useState(false)
  const [resultTx, setResultTx] = useState('');

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
        setDisplayResult(true)
        setResultTx('Sign the transation to switch implementation contract ... ⏳')
        const tx = await contractProxyWithSigner.switchImplementation();
        await tx.wait(1)
        console.log(tx)
        setResultTx('✅ Done! Now you can use functions from another contract to change value in Proxy')
        setTimeout(() => {setDisplayResult(false)}, 5000)
      }



      const lowLevelCallPlus = async()=>{
        setDisplayResult(true)
        setResultTx('Sign the transation to increase the value in Proxy contract ... ⏳')
        const signer = walletProvider.getSigner()
        const tx = {
          from: currentAccount,
          to: "0x41153577d5931F5c47f575d2EC1674e10AB102aB", 
          data: "0x371303c0",
        }
        const res = await signer.sendTransaction(tx);
        await res.wait(1)
        console.log(res)
        setResultTx('✅ Awesome! The value here has been changed!')
        setTimeout(() => {setDisplayResult(false)}, 8000)
      }
// MINUS
      const lowLevelCallMinus = async()=>{
        setDisplayResult(true)
        setResultTx('Sign the transation to decrease the value in Proxy contract ... ⏳')
        

        const signer = walletProvider.getSigner()
        const tx = {
          from: currentAccount,
          to: "0x41153577d5931F5c47f575d2EC1674e10AB102aB", 
          data: "0xb3bcfa82",
        }
        const res = await signer.sendTransaction(tx);
        await res.wait(1)


        console.log(res)
        setResultTx('✅ Awesome! The value here has been changed!')
        setTimeout(() => {setDisplayResult(false)}, 8000)
      }

// 0x42551E0B5d48ed3A4CEb8592E31e13E24adf19a0 
// 0x629d6c9473921cCe3317f213c097b16168664646 BOX2
  return (<>

    <div>
    <div className='text-center'>
        <h1 className='font-bold text-3xl'> LOCAL VALUE: {getNum}</h1>

        <h1>current contract implementation: {contractImplementation} </h1>
        <h1 className='font-bold text-xl'>{contractImplementation === "0x629d6c9473921cCe3317f213c097b16168664646" ? "Box #2" : "Box#1"}</h1>
        
        <button onClick={handleSwitch} className='bg-orange-200 p-3 rounded-xl hover:bg-red-300'>switch contract implementation</button>
        
        <div className='bg-orange-100 rounded-xl mt-2'>
          <h1 className='font-bold text-xl'>Low-Level function to Proxy contract</h1>
          <button onClick={lowLevelCallPlus} className='bg-orange-200 p-1 w-full mb-2 hover:bg-orange-400 font-bold text-3xl'>+</button>
          <button onClick={lowLevelCallMinus} className='bg-orange-200 p-1 w-full mb-2 hover:bg-orange-400 font-bold text-3xl'>-</button>
        </div>
      </div>
      {displayResult && <div className='bg-purple-200 rounded-xl text-center p-1 mt-2'>
        <h1 className='font-bold text-xl'>RESULT</h1>
        <h1>{resultTx}</h1>
      </div>}
    </div>
    </>
  )
}

export default FuncProxy
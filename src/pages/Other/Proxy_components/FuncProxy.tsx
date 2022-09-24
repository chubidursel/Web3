import React, {useEffect, useState} from 'react'
import {contractProxy, contractProxyWithSigner} from '../../../components/smart_contract/ProxyMain'


function FuncProxy() {
    const [getNum, setGetNum] = useState();
    const[contractImplementation, setContractImplementation] = useState();

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

      const lowLewelCall = async()=>{
        const tx = await contractProxyWithSigner.call("371303c0");
        console.log(tx)
      }


  return (
    <div>
    <div className='text-center'>
        <h1> LOCAL VALUE: {getNum}</h1>
        <h1>current contract implementation: {contractImplementation} </h1>
        <h1>Set up First implementation contract</h1>
        
        <button onClick={handleSwitch} className='bg-orange-200 p-3 hover:bg-red-300'>switch contract implementation</button>
        <h1>Low-Lew function to smart contract</h1>
        <button onClick={lowLewelCall} className='bg-orange-200 p-3'>change value</button>
      </div>
    </div>
  )
}

export default FuncProxy
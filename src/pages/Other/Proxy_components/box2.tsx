import React, {useEffect, useState} from 'react'
import {contractBoxV2} from '../../../components/smart_contract/ProxyBox'
import conectSigner from '../../../components/smart_contract/SIGNER';

export function FunctionBox2() {
    const [getNum1, setGetNum1] = useState();

    useEffect((()=>{
        (async()=>{
          try {
            const num1 = await contractBoxV2.num();
            setGetNum1(num1.toString())
          } catch (error) {
            console.log(error)
          }
        })()
      }),[])

      const handleInc1 = async()=>{
        const contractBoxV2WithSigner = conectSigner(contractBoxV2)
        const tx = await contractBoxV2WithSigner.inc();
        console.log(tx)
      }
      const handleDec1 = async()=>{
        const contractBoxV2WithSigner = conectSigner(contractBoxV2)
        const tx = await contractBoxV2WithSigner.dec();
        console.log(tx)
      }

  return (
    <div>
        <h1 className='py-2'>add/sub by 5</h1>
        <h1 className='font-bold text-xl'>Value: {getNum1}</h1>
        
        <button className='bg-purple-300 px-4 font-bold text-4xl rounded-full' onClick={handleInc1}>+</button>
        <button className='bg-purple-300 px-4 font-bold text-4xl rounded-full' onClick={handleDec1}>-</button>
        
    </div>
  )
}


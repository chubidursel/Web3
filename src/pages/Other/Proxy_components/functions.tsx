import React, {useEffect, useState} from 'react'
import {contractBoxV1, contractBoxV1WithSigner} from '../../../components/smart_contract/ProxyBox'


export function FunctionBox() {
    const [getNum1, setGetNum1] = useState();

    useEffect((()=>{
        (async()=>{
          try {
            const num1 = await contractBoxV1.num();
            setGetNum1(num1.toString())
          } catch (error) {
            console.log(error)
          }
        })()
      }),[])

      const handleInc1 = async()=>{
        const tx = await contractBoxV1WithSigner.inc();
        console.log(tx)
      }
      const handleDec1 = async()=>{
        const tx = await contractBoxV1WithSigner.inc();
        console.log(tx)
      }

  return (
    <div>
        <h1>First Implementation</h1>
        <h1>Number state of this smat contract: {getNum1}</h1>
        <button className='bg-purple-300 px-4 font-bold text-4xl rounded-full' onClick={handleInc1}>+</button>
        <button className='bg-purple-300 px-4 font-bold text-4xl rounded-full' onClick={handleDec1}>-</button>
    </div>
  )
}


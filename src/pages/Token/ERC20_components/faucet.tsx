import { useState, useEffect } from 'react';
import faucet from "../../../assets/faucet.gif";

import { contractFaucet } from '../../../components/smart_contract/Faucet';
import conectSigner from '../../../components/smart_contract/SIGNER';
// import Loader from '../../../components/loader';
import getErrorMessage from '../../../components/getErrorMessage';

export function Faucet() {
//   const [loader, setLoader] = useState(false)

  const[result, setResult ] = useState('')

  const handleRequest = async()=>{
    try{
        setResult('Pls sign the request tx 📝')
      const contractWithSigner = conectSigner(contractFaucet)
      const txTransfer = await contractWithSigner.requestTokens();

      const res = await txTransfer.wait(2)
  
      console.log("👨‍💻 DEV >>>", res)

      setResult('✅ Done! You got 5 CWT tokens! Next request in 7 hours')


    }catch (error) {
        console.log("👨‍💻 DEV >>>", error)
        const message = getErrorMessage(error);
        setResult(message)
        setTimeout(() => {setResult('')}, 7000)
    }
  }

  return (
    <>
        <div>
        <img src={faucet} alt="wait" className='item-center'/>
        <button onClick={handleRequest} className="w-full font-bold bg-orange-400 text-white py-2 rounded-xl text-5xl border-4 border-orange-300 px-[15px] hover:bg-orange-600 hover:shadow-xl">request</button>
        {result && <h1 className='text-center text-xl bg-blue-200 rounded-xl mt-3 py-2'>{result}</h1> }
        <h1 className='text-center text-gray-400 hover:underline hover:cursor-pointer'><a href="https://goerli.etherscan.io/address/0x581f9c7a2FD6b53041332Bcb7B01d14efB40741F" target="_blank">Etherscan</a></h1>
        </div>
    </>
  )
}


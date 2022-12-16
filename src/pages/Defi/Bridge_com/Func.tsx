import {useState, useRef} from 'react'
import conectSigner from '../../../components/smart_contract/SIGNER';
import getErrorMessage from '../../../components/getErrorMessage';
import walletProvider from "../../../abi/walletProvider" // to sign the message
import { contractBirdgeETH} from '../../../components/smart_contract/Bridge';
import { ethers } from "ethers";

export function BridgeFunc({contract}) {
  const [result, setResult] = useState('');
  const amountRef = useRef<HTMLInputElement>()

  const handleTransfer = async()=>{
    const num = Number(amountRef.current?.value)
    try {
        console.log("Works!")
    //   setResult(`Pls sign the tx`)
    //   const contractWithSigner = conectSigner(contract);
     
    //   // ETH | BSC bridge sc
    //     const callFunc = await contractWithSigner.mint()
    //     const res = await callFunc.wait(1)
    //     console.log("👨‍💻 DEV >> ", res)

   setResult(`✅ Confirmed! You just locked ${(Number(num) / 1000000000000000000).toString().slice(0, 7)} ETH`)
    //     setTimeout(() => {setResult('')}, 7000)
      } 

    catch (error) {
      const message = getErrorMessage(error);
      setResult(message)
      setTimeout(() => {setResult('')}, 7000)
    }
  }



  // --------------------------DEMO----------------
  // const handleDemo = async() =>{
  //   console.log("🏃 Strarting") 
  //   console.log("Contract is in REMIX")
  //   // STEP 1 -----------> sign the message //https://www.youtube.com/watch?v=Y6MtQG6IEGk
  //   const signer = walletProvider.getSigner();
  //   const from = "0x98162D17D4d15c945B7418475EdEb4d9c0335684"
  //   const amount = 7;
  //   const nonce = 69;
  //   const hash = await contractBirdgeETH.getMessageHash(from, from, amount, nonce)
  //   console.log(" 🖊  Hash of ur message: ", hash)
  //   const signature = await signer.signMessage(ethers.utils.arrayify(hash));
  //   console.log(" 🖊  sign message: ", signature)

  //   // STEP 2 -----------> SeendTX on ETH
  //   console.log("Starting 2 step") 
  //   const tokenETHwiithSigner = conectSigner(contractBirdgeETH);

  //   const callFunc = await tokenETHwiithSigner.burn(from, from, amount, nonce, signature)
  //   const res = await callFunc.wait(1)
  //   console.log("👨‍💻 DEV >> ", res)

  //   // STEP 3 -----------> SeendTX on ETH
  //   console.log("Starting 3 step") 
  //   // Deploy BNB Bridge
    
  // }
  

  return (<>
 {/* <button onClick={handleDemo} className='bg-red-300 py-5 rounded-2xl w-full'>TEST</button> */}
 <div className='flex flex-col items-center'>
        <input ref={amountRef} placeholder='amount ETH in wei' className='text-center hover:shadow-xl m-4 rounded-lg pl-2 my-2'></input>
        <button onClick={handleTransfer} className="font-bold py-1 text-2xl hover:shadow-xl mx-10 rounded-xl border-2 border-red-400 px-[15px] hover:bg-red-400 active:bg-red-500 active:text-blue-100">Convert</button>

 </div>
    
    <div className='flex justify-center'> {result && <h1 className='font-bold m-4 bg-yellow-100 w-full py-2 text-center  px-1 rounded-xl text-purple-900 text-xl '>{result}</h1>}   </div>
          
    </>
  )
}

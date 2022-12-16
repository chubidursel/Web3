import {useState, useEffect, useRef} from 'react'
import { contractAAVE_borrow } from '../../../components/smart_contract/AAVE_liq';
import conectSigner from '../../../components/smart_contract/SIGNER';
import getErrorMessage from '../../../components/getErrorMessage';
import { useAppContext } from "../../../hooks/useAppContext";

export function Borrow() {
    const amountRef = useRef<HTMLInputElement>()
    const [result, setResult] = useState('');

    const { contextState, } = useAppContext();
    const currentAccount = contextState?.currentAccount;

    const handleBorrow = async()=>{
        const num = Number(amountRef.current?.value)
        console.log('Current acc: ', currentAccount);
        console.log('Amount: ', num);
        try {

          setResult(`Pls sign the tx`)
             const contractWithSigner = conectSigner(contractAAVE_borrow)
    
             // DECLARE VAR AS PARAM TO CALL FUNC
        const overrides = {
              value: num,
          }

          const addreessToken = '0x65E2fe35C30eC218b46266F89847c63c2eDa7Dc7'
          const interestRateMode = 2
          const referralCode = 0
          const onBehalfOf = currentAccount;
           
            const callFunc = await contractWithSigner.borrow(addreessToken, num, interestRateMode, referralCode, onBehalfOf, overrides)
            const res = await callFunc.wait(1)
            console.log("👨‍💻 DEV >> ", res)
        
            setResult(`✅ Confirmed! You borrowed ${"??"} UDT`)
            setTimeout(() => {setResult('')}, 7000)
          } 
    
        catch (error) {
          const message = getErrorMessage(error);
          setResult(message)
          setTimeout(() => {setResult('')}, 7000)
        }
      }
    
    

  return (<>

<div className='flex items-center flex-col'>

    <input ref={amountRef} placeholder='amount ETH in wei' className='hover:shadow-xl rounded-lg pl-2 mb-5 w-72' /></div>
    <div className="justify-center flex">

    <button onClick={handleBorrow} className="font-bold py-1 text-2xl hover:shadow-xl mx-10 rounded-xl border-2 border-red-400 px-[15px] hover:bg-red-400 active:bg-red-500 active:text-blue-100">Borrow</button>
    <button  className="font-bold py-1 text-2xl hover:shadow-xl  mx-10 rounded-xl border-2 border-red-400 px-[15px] hover:bg-red-400 active:bg-red-500 active:text-blue-100">Repay</button>
</div>

    <div className='flex justify-center'> {result && <h1 className='font-bold mt-3 bg-yellow-100 w-full py-2 text-center  px-1 rounded-xl text-purple-900 text-xl '>{result}</h1>}   </div>

    </>
  )
}

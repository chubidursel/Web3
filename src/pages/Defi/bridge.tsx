import {useState, useEffect} from 'react'
import Header from '../../components/headerNew';
import { contractERC20 } from '../../components/smart_contract/erc20';
import { contractERC20BSC } from '../../components/smart_contract/BSC/ERC20';
import { useAppContext } from "../../hooks/useAppContext";
import {ListenEvent} from './Bridge_com/Bridge_API'
import { BridgeFunc } from './Bridge_com/Func';


export function Bridge() {
  const [amountETH, setAmountETH] = useState('');
  const [amountBSC, setAmountBSC] = useState('');

// GET TOKEN BALANCE FROM BOTH CONTRACT
  const { contextState, } = useAppContext();
  const currentAccount = contextState?.currentAccount;
  useEffect((()=>{
    (async()=>{
      try {
        console.log("Your address: ", currentAccount)
        if(currentAccount){
          const balanceETH = await contractERC20.balanceOf(currentAccount)
          setAmountETH(balanceETH.toString())
  
          const balanceBSC = await contractERC20BSC.balanceOf(currentAccount)
          setAmountBSC(balanceBSC.toString())
  
  
          console.log('👨‍💻DEV>>', balanceETH.toString(), "ETH", '----', balanceBSC.toString(), 'BNB')
        } else {
          setAmountETH(" ❔ ")
          setAmountBSC(' ❓ ')  
        }


      } catch (error) {
        console.log(error)
      }
    })()
  }),[])

  useEffect(()=>{
        // BRIDGE API
        ListenEvent(contractERC20, contractERC20BSC);
        console.log("IT HAS TO BE CALLED JUST ONCE!!!")
  }, [])


  return (<>
  <Header marginFromTop={'1/3'}>
    <div className='text-center p-4'>
      <h1 className='font-bold'>ETH to BSC bridge</h1> 
    </div>
  </Header> 



  
        {/* <h1 className='bg-yellow-300 text-3xl text-center'>BETA</h1> */}
        <h1 className="text-center text-6xl text-blue-100 font-bold m-3 mb-5">Bridge</h1  >
        <div className='flex justify-center'>
        <div className='rounded-2xl border-4 border-red-400 px-[15px] w-1/3 p-2 m-2 bg-blue-100'>
              <h1 className='font-bold text-center text-2xl'>INFO</h1>
              <h1>ETH: <span className='font-bold text-2xl'>{amountETH}</span> CWT</h1>
              <h1>BSC: <span className='font-bold text-2xl'>{amountBSC}</span> CWT</h1>
        
    <h1>Function</h1>

    <h1> ETH burn() ➡️ BSC mint()</h1>
        <BridgeFunc />
        </div>
      </div>
 
    </>
  )
}

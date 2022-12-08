import {useState} from 'react';
import Header from '../../components/headerNew';
import { FlipCoin } from './Game/FlipCoin';
import getErrorMessage from '../../components/getErrorMessage';
import Modal from '../../components/modal';
import { SetUp } from './Game/SetUp';
import { contractFlipSimple } from '../../components/smart_contract/FlipCoin';
import conectSigner from '../../components/smart_contract/SIGNER';
import Loader from '../../components/loader';
import { useAppContext } from "../../hooks/useAppContext";

export function Game() {
  const [active, setActive] = useState(false);

  const [loader, setLoader] = useState(false)
  const[result, setResult ] = useState('')

  const { contextState } = useAppContext(); // CHECK INFO about players acc
  const currentAccount = contextState?.currentAccount;
   
  const handleFlip = async()=>{
    try {
      setLoader(true)
      setResult('Pls sign the tx and we will flip the coin! 📝')

      const contractWithSigner = conectSigner(contractFlipSimple)
      const txTransfer = await contractWithSigner.flip();
      const res2 = await txTransfer.wait()
      console.log("👨‍💻 DEV >>>", res2)

        //-------- HISTORY
        let eventFilter = contractFlipSimple.filters.Flip()
        let events = await contractFlipSimple.queryFilter(eventFilter)
        const reqId = events[events.length - 1].args[4].toString()
        console.log('events>> ', events)

        //-------- check status
        const info = await contractWithSigner.userInfo(currentAccount);
        console.log("👨‍💻 DEV INFO ACC >>>", info)
  
        const didWin = info.won // CHANGE !!!!!!!!!!!!!!!!!!!!!!!
        const gameLeft = Number(info.bank.toString()) - Number(info.bet.toString())
        
        
        didWin ? setResult(`🥳 Congratulation! Your bank: ${info.bank}CWT 🥳`) : setResult(`Ops, you lost 😔 There are ${gameLeft} game left. Good luck 🍀`)

      setTimeout(() => {setResult('')}, 10000)
      setLoader(false)

    } catch (error) {
      console.log("❌ ❌ ❌ DEV >>>", error)
      const message = getErrorMessage(error);
      setResult(message)
      setTimeout(() => {setResult('')}, 7000)
      setLoader(false)
    }
  }




// https://freefrontend.com/css-coins/

  return (
    <>
    
    <Header marginFromTop={'1/3'}>
        <div className='text-center p-1'> 
          <h1 className="font-bold text-3xl">Flip a Coing</h1>
          <h1>Set ut the game first</h1>
          <h1 className="font-bold text-3xl">Planing to connect ChainLink oracle to generete random number</h1>
          </div>
       </Header>

  
  
        <FlipCoin />
        
        <h1 className='text-5xl text-center text-white'>BETA</h1>


  <div className=' absolute bottom-20 left-1/3 w-1/3'>
   <button onClick={handleFlip} className="w-[300px] font-bold bg-orange-400 text-white py-2 rounded-xl text-5xl border-4 border-orange-300 px-[15px] hover:bg-orange-600 hover:shadow-xl">{loader ? <Loader /> : "FLIP"}</button>
    <button onClick={()=>setActive(true)} className="w-max font-bold text-white py-2 rounded-xl text-5xl border-4 border-orange-300 px-[15px] hover:bg-orange-600 hover:shadow-xl ml-2">SETUP</button>
              
        
        {result && <h1 className='text-center text-xl bg-blue-200 rounded-xl mt-3 py-4 px-2'>{result}</h1> }
    
 
  </div>


  <Modal
   active={active}
   setActive={setActive}
   marginFromTop={'top-10'}
   >
   <SetUp />
   </Modal>

    </>
    
  )
}


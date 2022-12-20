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
import head from "../../assets/head.png"
import tail from "../../assets/tail.png"

export function Game() {
  const [active, setActive] = useState(false);
  const [coin, setCoin] = useState({run:false, win:''})
  const [loader, setLoader] = useState(false)
  const[result, setResult ] = useState('')

  const { contextState } = useAppContext(); // CHECK INFO about players acc
  const currentAccount = contextState?.currentAccount;
   
  const handleFlip = async(headOrTail : boolean)=>{
    try {
      setLoader(true)
      setCoin({...coin, run:true})
      setResult('Pls sign the tx and we will flip the coin! 📝')

      const saltJS = Math.floor(Math.random() * 1000)
      const contractWithSigner = conectSigner(contractFlipSimple)
      const txTransfer = await contractWithSigner.flip(saltJS, headOrTail);
      const res2 = await txTransfer.wait()
      console.log("👨‍💻 DEV >>>", res2)

        //-------- HISTORY
        // let eventFilter = contractFlipSimple.filters.Flip()
        // let events = await contractFlipSimple.queryFilter(eventFilter)
        // const reqId = events[events.length - 1].args[4].toString()
        // console.log('events>> ', events)

        //-------- check status
        const info = await contractWithSigner.userInfo(currentAccount);
        console.log("👨‍💻 DEV INFO ACC >>>", info)
  
        // const didWin = info.won // CHANGE !!!!!!!!!!!!!!!!!!!!!!!
        // const gameLeft = Number(info.bank.toString()) - Number(info.bet.toString())
        
        
        // didWin ? setResult(`🥳 Congratulation! Your bank: ${info.bank}CWT 🥳`) : setResult(`Ops, you lost 😔 There are ${gameLeft} game left. Good luck 🍀`)

      setTimeout(() => {setResult('')}, 3000)
      setCoin({...coin, run:false})      
      setLoader(false)

    } catch (error) {
      console.log("❌ ❌ ❌ DEV >>>", error)
      const message = getErrorMessage(error);
      setResult(message)
      setCoin({...coin, run:false})      
      setTimeout(() => {setResult('')}, 3000)
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
       <h1 className='text-7xl text-center text-white font-bold'>Game</h1>

{coin.run 
? (<div className='flex justify-center h-72'>
<div className="coin-flip">
  <div className="coin-tails">
  <img src={head} alt="coin"  className=''/>  </div>   
  
  <div 
  className="coin-heads">
  <img src={tail} alt="coin"  className=''/>  </div>
  </div></div>)
: 
<div className='flex justify-center mt-32'><img src={head} alt="coin"  className='w-[200px] h-[200px]'/></div>
}
  
        {/* <FlipCoin /> */}
        


  <div className='flex items-center mt-24 flex-col'>
    <div>
   {/* <button  className="w-64 font-bold bg-orange-400 text-white py-2 rounded-xl text-5xl border-4 border-orange-300 px-[15px] hover:bg-orange-600 hover:shadow-xl">{loader ? <Loader /> : "FLIP"}</button> */}
    <button onClick={()=>setActive(true)} className="w-64 font-bold text-white py-2 rounded-xl text-5xl border-4 border-orange-300 px-[15px] hover:bg-orange-600 hover:shadow-xl">SETUP</button>

<div className='mt-3'>
    <button onClick={()=>handleFlip(true)} className="w-32 font-bold bg-green-400 border-4 border-orange-300 border-r-0  text-white py-2 rounded-xl rounded-r-none text-5xl  px-[15px] hover:bg-orange-600 hover:shadow-xl">head</button>
    <button onClick={()=>handleFlip(false)} className="w-32 font-bold bg-yellow-400 text-white py-2 rounded-xl border-4 border-orange-300 border-l-0  rounded-l-none text-5xl  px-[15px] hover:bg-orange-600 hover:shadow-xl">tail</button>
</div>

    </div>
              
        <div className='flex justify-center'>
        {result && <h1 className='text-center text-xl bg-blue-200 rounded-xl mt-3 py-4 px-2'>{result}</h1> }
        </div>
 
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


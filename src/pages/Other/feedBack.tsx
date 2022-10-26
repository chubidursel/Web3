import React, {useState, useRef} from 'react'
import { contractFeedBack } from '../../components/smart_contract/FeedBack_contract'
import {FeedBackList} from './feedbackList';
import conectSigner from '../../components/smart_contract/SIGNER';
import getErrorMessage from '../../components/getErrorMessage';
import Loader from '../../components/loader';

export function FeedBack() {
    const [resultTx, setResultTx] = useState('');
    const testRef = useRef<HTMLInputElement>()
    const [showList, setShowList] = useState(false)
    const [loader, setLoader] = useState(false)

    const handleComment = async()=>{
      console.log(testRef.current?.value)
      if (testRef.current?.value) {
        try {
          setLoader(true)
          setResultTx("Sign the transaction to leave the comment!")
          const contractFeedBackWithSigner = conectSigner(contractFeedBack)
          const tx = await contractFeedBackWithSigner.leaveFeedback(testRef.current?.value);
          await tx.wait(1)
          setResultTx("Thank you for you feedback! 🙏 ")
          setLoader(false)
          setTimeout(() => {setResultTx('')}, 7000);
        } catch (error) {
          const message = getErrorMessage(error);
          setResultTx(message)
          setTimeout(() => {setResultTx('')}, 7000)
          setLoader(false)
        }
      } else {
        setResultTx("Hmm, u didn`t write anything 🤔")
      }
 

    }

  return (
    <>
    <div>
    <div >
        <h1 className='text-center font-bold text-2xl' >Leave us a feedback 📝</h1>
        <h2>➡️ Contract supports only Latin alphabet</h2>
        <h2>➡️ Smart contract: <a href='https://goerli.etherscan.io/address/0x99f2eaafab75a5c8BeCCE44861a4a97e79ad83d2' target='_blank' className='hover:cursor-pointer hover:underline'>ETHERSCAN</a></h2>
        <h2>➡️ Contact with developer: <a href='https://twitter.com/chubidurcel' target='_blank' className='hover:cursor-pointer hover:animate-pulse'>👨‍💻</a></h2>
<input ref={testRef} type="text" className='w-full h-20 mt-3 border-red-400 border-2 pl-3 rounded-xl hover:shadow-xl' placeholder='write here'/>
{resultTx && <div className='bg-yellow-200 text-center text-xl mt-1 rounded-xl py-2'>{resultTx}</div>}

{loader ? <Loader /> :
<button onClick={handleComment} className="font-bold rounded-2xl w-full my-3 bg-blue-100 border-2 hover:shadow-xl border-red-400 px-[15px] py-2 text-xl hover:bg-red-400">send</button>}
<button onClick={()=>{setShowList(!showList)}} className="font-bold rounded-2xl w-full  bg-blue-100 border-2 hover:shadow-xl border-red-400 px-[15px] py-2 text-xl hover:bg-red-200">see all feedback</button>

    </div>
    {showList && <FeedBackList />}
    </div>
    </>
  )
}

 
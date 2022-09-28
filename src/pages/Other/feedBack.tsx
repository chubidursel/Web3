import React, {useState, useEffect, useRef} from 'react'
import { contractFeedBack, contractFeedBackWithSigner } from '../../components/smart_contract/FeedBack_contract'
import {FeedBackList} from './feedbackList';

export function FeedBack() {
    const [displayResult, setDisplayResult] = useState(false)
    const [resultTx, setResultTx] = useState('');
    const testRef = useRef<string>('')
    const [showList, setShowList] = useState(false)

    const handleComment = async()=>{
        setDisplayResult(true)
        setResultTx("Sign the transaction to leave the comment! 📝 ")
        const tx = await contractFeedBackWithSigner.leaveFeedback(testRef.current);
        await tx.wait(1)
        setDisplayResult(true)
        setResultTx("Thank you for you feedback! 🙏 ")
        setTimeout(() => {setResultTx('')}, 7000);
    }

  return (
    <>
    <div>
    <div className='text-center' >
        <h1>Leave us a feedback by sanding ur message to the blockchain</h1>
<input ref={testRef as any} type="text" className='w-full h-20 border-red-400 border-2 pl-3 rounded-xl hover:shadow-xl' placeholder='write here'/>
{displayResult && <div className='bg-yellow-200 text-xl mt-1 rounded-xl py-2'>{resultTx}</div>}
<button onClick={handleComment} className="font-bold rounded-2xl w-full my-3 bg-blue-100 border-2 hover:shadow-xl border-red-400 px-[15px] py-2 text-xl hover:bg-red-400">send</button>
<button onClick={()=>{setShowList(!showList)}} className="font-bold rounded-2xl w-full  bg-blue-100 border-2 hover:shadow-xl border-red-400 px-[15px] py-2 text-xl hover:bg-red-200">see all feedback</button>

    </div>
    {showList && <FeedBackList />}
    </div>
    </>
  )
}

 
import {useState} from 'react'
import Header from '../components/headerNew'
import { Link } from 'react-router-dom'
import Modal from '../components/modal'
import { FeedBack } from './Other/feedBack'
import Feedback from "../assets/feedbackPIC.jpg"

export function Other() {
  const [openFeedback, setOpenFeedback] = useState(false)


  return (<>
   <Header marginFromTop={'top-1/3'}>
    <div className='text-center'>
    <p>Other cool features</p>
    <p>We have many ideas which we will implement here very soon...</p>
    </div>

   </Header>
   
      {/* <h2 className="flex justify-center text-6xl mt-3 text-blue-100 font-bold">Other</h2> */}
     
    <div className='flex justify-center'>
    <div className='grid grid-cols-1 w-1/3 text-5xl text-purple-800 text-center font-bold justify-center mt-5'>
          <Link to="/Other/Converter" className="bg-blue-100 rounded-2xl border-4 hover:shadow-2xl border-red-400 m-2 p-5 hover:bg-blue-200 hover:animate-pulse">Converter 🔄</Link>
          <Link to="/Other/Address" className='bg-blue-100 rounded-2xl border-4 hover:shadow-2xl border-red-400 m-2 p-5 hover:bg-blue-200 hover:animate-pulse'>Account 📮</Link> 
          <Link to="/Other/Proxy" className='bg-blue-100 rounded-2xl border-4 hover:shadow-2xl border-red-400 m-2 p-5 hover:bg-blue-200 hover:animate-pulse'>Proxy 👷</Link>
          <Link to="/Game" className='bg-blue-100 rounded-2xl border-4 hover:shadow-2xl border-red-400 m-2 p-5 hover:bg-blue-200 hover:animate-pulse'>Game 🎮</Link>
          <Link to="/Other/Ipfs" className='bg-blue-100 rounded-2xl border-4 hover:shadow-2xl border-red-400 m-2 p-5 hover:bg-blue-200 hover:animate-pulse'>IPFS 💾</Link>

    
    </div>
    </div>
    <button onClick={()=>{setOpenFeedback(true)}} className='absolute top-20 right-10 text-blue-100 text-2xl rounded-xl hover:text-2xl hover:animate-pulse mb-10'><img src={Feedback} alt="tools" className='h-24 rounded-2xl'/></button>
<Modal 
    marginFromTop={"top-16"}
    active={openFeedback}
    setActive={setOpenFeedback}
    >
   <FeedBack />
    
    </Modal>  
  
  </>
  )
}


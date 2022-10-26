import {useState} from 'react'
import Header from '../components/headerNew'
import { Link } from 'react-router-dom'
import Modal from '../components/modal'
import { FeedBack } from './Other/feedBack'


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
          <Link to="/Other/Ipfs" className='bg-blue-100 rounded-2xl border-4 hover:shadow-2xl border-red-400 m-2 p-5 hover:bg-blue-200 hover:animate-pulse'>IPFS 💾</Link>
          <button onClick={()=>{setOpenFeedback(true)}} className='bg-blue-100 text-4xl rounded-2xl border-4 hover:shadow-2xl border-red-400 m-2 p-5 hover:bg-blue-200 hover:animate-pulse mb-10'>@Feedback 📝</button>
    
    </div>
    </div>

<Modal 
    marginFromTop={"top-1/3"}
    active={openFeedback}
    setActive={setOpenFeedback}
    >
   <FeedBack />
    
    </Modal>  
  
  </>
  )
}


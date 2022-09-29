import {useState} from 'react'
import Header from '../components/headerNew'
import Welcome from '../components/Other/welcome'
import { Link } from 'react-router-dom'
import Modal from '../components/modal'
import { FeedBack } from './Other/feedBack'
import Sidebar from '../components/Sidebar'
import Footer from '../components/footer'


export function Other() {
  // const [openFeedback, setOpenFeedback] = useState(false)

  return (<>
   <Header>info about other functions</Header>
   
  
{/* <button onClick={()=>{setOpenFeedback(true)}} className='absolute top-20 right-5 hover:bg-blue-100 hover:text-purple-900 w-max px-4 py-1 font-bold rounded-xl border-2 text-white border-red-400 text-xl hover:bg-red-400"'>leave us a feedback</button> */}

   {/* <div className='absolute top-1/3 ml-64 flex flex-row'>
  <div  className='ml-5 absolute text-6xl text-white font-bold animate-blob top-24'>Converter</div>
    <Link to="/Other/Converter" className="mr-20 text-white w-80 h-72 bg-yellow-600 filter rounded-full blur-xl opacity-80 animate-blob">
   </Link>
  <div className='absolute right-80 top-20 w-72 h-72 text-7xl text-white font-bold animate-blob animation-delay-2000'>Game</div>
    <Link to="/Coming_soon" className="mr-20 w-72 h-72 bg-blue-700 rounded-full filter blur-xl opacity-80 animate-blob animation-delay-2000">
    </Link>
  <div className='absolute left-3/4 top-24 ml-4 w-72 h-72 text-7xl text-white font-bold animate-blob animation-delay-4000'>Proxy</div>
    <Link to="Proxy" className="w-72 h-72 bg-pink-700 rounded-full filter blur-xl opacity-80 animate-blob animation-delay-4000">
    </Link>
    </div> */}
    
    {/* </div> */}
 
    {/* <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-700 rounded-full filter blur-xl opacity-80 animate-blob animation-delay-4000"></div> */}
 
    {/* <Modal 
    active={openFeedback}
    setActive={setOpenFeedback}
    >
   <FeedBack />
    
    </Modal>   */}
      <h2 className="flex justify-center text-6xl mt-3 text-blue-100 font-bold">Other</h2>

    <div className='flex justify-center'>
    <div className='grid grid-cols-1 w-1/3 text-5xl text-purple-800 text-center font-bold justify-center mt-5'>
          <Link to="/Other/Converter" className="bg-blue-100 rounded-2xl border-4 hover:shadow-2xl border-red-400 m-2 p-5 hover:bg-blue-200">Converter</Link>
          <Link to="/Coming_soon" className='bg-blue-100 rounded-2xl border-4 hover:shadow-2xl border-red-400 m-2 p-5 hover:bg-blue-200'>Game</Link>
          <Link to="Proxy" className='bg-blue-100 rounded-2xl border-4 hover:shadow-2xl border-red-400 m-2 p-5 hover:bg-blue-200'>Proxy</Link>
    </div>
    </div>

  <div className='absolute bottom-0 right-0'>
  <Footer />
  </div>
  
  </>
  )
}


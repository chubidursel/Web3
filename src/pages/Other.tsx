import {useState} from 'react'
import Header from '../components/headerNew'
import { Link } from 'react-router-dom'
import Modal from '../components/modal'
import { FeedBack } from './Other/feedBack'

export function Other() {
  const [first, setFirst] = useState(false)
  const [show, setShow] = useState(false)
  const [showGame, setShowGame] = useState(false)
  const [showProxy, setShowProxy] = useState(false)
  const [openFeedback, setOpenFeedback] = useState(false)

  return (<>
   <Header>info about other functions</Header>

  
<button onClick={()=>{setOpenFeedback(true)}} className='absolute top-20 right-5 hover:bg-blue-100 hover:text-purple-900 w-max px-4 py-1 font-bold rounded-xl border-2 text-white border-red-400 text-xl hover:bg-red-400"'>leave us a feedback</button>

   <div className='absolute top-1/3 ml-64 flex flex-row'>
  {/* <div className="w-full max-w-lg"> */}
  <div  className='ml-5 absolute text-6xl text-white font-bold animate-blob top-24'>Converter</div>
    <Link to="/Other/Converter" className="mr-20 text-white w-80 h-72 bg-yellow-600 filter rounded-full blur-xl opacity-80 animate-blob">
   </Link>
  <div className='absolute right-80 top-20 w-72 h-72 text-7xl text-white font-bold animate-blob animation-delay-2000'>Game</div>
    <Link to="/Coming_soon" className="mr-20 w-72 h-72 bg-blue-700 rounded-full filter blur-xl opacity-80 animate-blob animation-delay-2000">
    </Link>
  <div className='absolute left-3/4 top-24 ml-4 w-72 h-72 text-7xl text-white font-bold animate-blob animation-delay-4000'>Proxy</div>
    <Link to="Proxy" className="w-72 h-72 bg-pink-700 rounded-full filter blur-xl opacity-80 animate-blob animation-delay-4000">
    </Link>


    
    </div>
    

    <Modal 
    active={openFeedback}
    setActive={setOpenFeedback}
    >
   <FeedBack />
    
    </Modal>



 



  
  
  </>
  )
}

//<Header />
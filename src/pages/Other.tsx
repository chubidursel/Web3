import {useState} from 'react'
import Header from '../components/headerNew'
import Welcome from '../components/Other/welcome'
import Modal from '../components/modal'
import { Link } from 'react-router-dom'
import { Defi } from './Defi'

export function Other() {
  const [show, setShow] = useState(false)
  const [showOne, setShowOne] = useState(false)
  return (<>
   <Header>info about other functions</Header>

   {/* {show ? <div className='flex justify-center' onClick={()=>{setShow(!show)}}><Welcome /></div> :  */}
   <div className='min-h-screen flex items-center justify-center px-16'>
  <div className="relative w-full max-w-lg">{show && <div className='text-2xl text-white font-bold'>kjlkh</div>}
    <Link to="/Defi/vault" onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)} className="text-white absolute top-0 -left-4 w-72 h-72 bg-yellow-700 rounded-full filter blur-xl opacity-70 animate-blob">
    
    </Link>



    <div className="absolute top-0 -right-4 w-72 h-72 bg-blue-700 rounded-full filter blur-xl opacity-80 animate-blob animation-delay-2000">
    
    <Link to="/Defi/vault" onMouseEnter={() => setShowOne(true)} onMouseLeave={() => setShowOne(false)} className="text-white absolute top-0 -left-4 w-72 h-72 bg-purple-700 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob">
    
    </Link>
   
    </div>
    {showOne && <div className='text-2xl text-white font-bold'>kkkkkk</div>}
    <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-700 rounded-full filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
    {/* <div className="m-8 relative space-y-4">
   

    </div> */}
  </div>
</div>


  }



  
  
  </>
  )
}

//<Header />
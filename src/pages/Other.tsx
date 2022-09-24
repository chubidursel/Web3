import {useState} from 'react'
import Header from '../components/headerNew'
import Welcome from '../components/Other/welcome'
import { Link } from 'react-router-dom'


export function Other() {
  const [first, setFirst] = useState(false)
  const [show, setShow] = useState(false)
  const [showGame, setShowGame] = useState(false)
  const [showProxy, setShowProxy] = useState(false)
  return (<>
   <Header>info about other functions</Header>

   {!first ? <div className='flex justify-center' onClick={()=>{setFirst(!show)}}><Welcome /></div> : 
   <div className='min-h-screen flex items-center justify-center'>

  <div className="relative w-full max-w-lg">
    {show && <div className='absolute text-7xl text-white font-bold blur-sm animate-blob -left-32'>Converter</div>}
    <Link to="/Other/Converter" onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)} className="text-white absolute top-0 -left-4 w-72 h-72 bg-yellow-700 rounded-full filter blur-xl opacity-70 animate-blob">
    </Link>
    {showGame && <div className='absolute -top-1/2 -right-20 w-72 h-72 text-7xl text-white font-bold blur-sm animate-blob'>Game</div>}
    <Link to="/Coming_soon" onMouseEnter={() => setShowGame(true)} onMouseLeave={() => setShowGame(false)} className="absolute top-0 -right-4 w-72 h-72 bg-blue-700 rounded-full filter blur-xl opacity-70 animate-blob animation-delay-2000">
    </Link>
    {showProxy && <div className='absolute -top-72 left-20 w-72 h-72 text-7xl text-white font-bold blur-sm animate-blob'>Proxy</div>}
    <Link to="Proxy" onMouseEnter={() => setShowProxy(true)} onMouseLeave={() => setShowProxy(false)} className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-700 rounded-full filter blur-xl opacity-80 animate-blob animation-delay-4000">
    </Link>
    </div>
    </div>
   }

    {/* <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-700 rounded-full filter blur-xl opacity-80 animate-blob animation-delay-4000"></div> */}
 
 
  



 



  
  
  </>
  )
}

//<Header />
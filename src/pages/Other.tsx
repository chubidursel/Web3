import {useState} from 'react'
import Header from '../components/headerNew'
import { Link } from 'react-router-dom'
import Modal from '../components/modal'
import { FeedBack } from './Other/feedBack'

import Footer from '../components/footer'

export function Other() {
  // const [openFeedback, setOpenFeedback] = useState(false)

  return (<>
   <Header marginFromTop={'1/3'}>info about other functions</Header>
   <div className='flex justify-end'><Footer /></div>
      <h2 className="flex justify-center text-6xl mt-3 text-blue-100 font-bold">Other</h2>
     
    <div className='flex justify-center'>
    <div className='grid grid-cols-1 w-1/3 text-5xl text-purple-800 text-center font-bold justify-center mt-5'>
          <Link to="/Other/Converter" className="bg-blue-100 rounded-2xl border-4 hover:shadow-2xl border-red-400 m-2 p-5 hover:bg-blue-200 hover:animate-pulse">Converter</Link>
          <Link to="/Coming_soon" className='bg-blue-100 rounded-2xl border-4 hover:shadow-2xl border-red-400 m-2 p-5 hover:bg-blue-200 hover:animate-pulse'>Game</Link>
          <Link to="Proxy" className='bg-blue-100 rounded-2xl border-4 hover:shadow-2xl border-red-400 m-2 p-5 hover:bg-blue-200 hover:animate-pulse'>Proxy</Link>
    </div>
    </div>

    
 

  
  </>
  )
}


import {useState} from 'react'
import Header from '../components/headerNew'
import Welcome from '../components/Other/welcome'
import Modal from '../components/modal'

export function Other() {
  const [show, setShow] = useState(true)
  
  return (<>
   <Header>info about other functions</Header>

   {show ? <div className='flex justify-center' onClick={()=>{setShow(!show)}}><Welcome /></div> : 
   <div>
    BUBBLES WITH SOME FEAUTERS
   </div>

  }
 
  </>
  )
}

//<Header />
import { useState } from 'react';
import Modal from '../components/modal'
import { FeedBack } from '../pages/Other/feedBack';


const Footer = () => {
    const [openFeedback, setOpenFeedback] = useState(false)
    
    return ( <>
 <button onClick={()=>{setOpenFeedback(true)}} className='hover:text-pink-300 px-4 py-1 font-semibold text-white text-lg opacity-60'>
    @leave us a feedback</button>
   
    <Modal 
    active={openFeedback}
    setActive={setOpenFeedback}
    >
   <FeedBack />
    
    </Modal>  

    
    </> );
}
 
export default Footer;
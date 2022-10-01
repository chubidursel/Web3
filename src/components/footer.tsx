import { useState } from 'react';
import Modal from '../components/modal'
import { FeedBack } from '../pages/Other/feedBack';


const Footer = () => {
    const [openFeedback, setOpenFeedback] = useState(false)
    
    return ( <>
 <button onClick={()=>{setOpenFeedback(true)}} className='hover:text-pink-300 px-4 py-1 font-semibold text-white text-xl animate-pulse opacity-60'>
    @leave us a feedback</button>
   
    <Modal 
    marginFromTop={'1/3'}
    active={openFeedback}
    setActive={setOpenFeedback}
    >
   <FeedBack />
    
    </Modal>  

    
    </> );
}
 
export default Footer;
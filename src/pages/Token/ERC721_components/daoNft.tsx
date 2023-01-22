import Section from '../ERC721_components/section';
import { motion } from "framer-motion";
import { Link } from 'react-router-dom';
const DaoNft = ({leftAnimation, daoo}) => {
    return ( 
        <Section>
          <motion.div 
    className="bg-blue-100 bg-opacity-50 p-5 text-2xl rounded-2xl
    w-[1000px] justify-around grid grid-cols-[_1fr_1fr] gap-10 items-stretch" 
    variants={leftAnimation}
>
  <div className='text-center'>
            <h1 className='text-3xl font-bold'>THE DAO</h1> <br/>
<p className='text-center text-3xl'>Welcome to our community!</p><br/>
<p className='text-center'>The NFT-holders can create a proposal and vote for them.</p><br/>
<p className='text-center'>Participating in a DAO also gives individuals a sense of ownership.</p><br/>
  </div>
  <div className='self-center'>
  <Link to="/DAO" >
   <motion.img className='hover:animate-spin w-[90%]'
   src={daoo}

   />
   </Link>
  </div>
        </motion.div >
</Section>

     );
}
 
export default DaoNft;

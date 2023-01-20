import Section from '../ERC721_components/section';
import { motion } from "framer-motion";
import { Link } from 'react-router-dom';

const AuctionNft = ({rightAnimation, auction}) => {
    return ( 
        <Section>
          <motion.div 
    className="bg-blue-100 bg-opacity-50 p-5 text-2xl rounded-2xl mb-44
    w-[1000px] justify-between grid grid-cols-[_1fr_1fr] gap-10" 
    variants={rightAnimation}
>
  <div className='text-center'>
            <h1 className='text-3xl font-bold'> Do you want to sell your NFT?</h1> <br/>
<p className='text-left'>Here you can create you own auction and sell you NFT by the best price!</p><br/>
<p className='text-left'>Enjoy!</p> 
  </div>
  <div className=''>
  <Link to="../Defi/Market/Auction" >
   <motion.img 
   src={auction}
   whileHover={{scale: 1.3}}
   />
   </Link>
  </div>
        </motion.div >
</Section>

     );
}
 
export default AuctionNft;
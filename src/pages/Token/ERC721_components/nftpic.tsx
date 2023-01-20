import Section from '../ERC721_components/section';
import { motion } from "framer-motion";


const NftPic = ({img, faq}) => {
    return (  
        <Section>
  <motion.div variants={faq} custom={2} className='flex justify-center'>
      <div className='text-white font-bold text-5xl my-44 bg-blue-100 bg-opacity-50 rounded-2xl w-fit flex justify-center p-5'>
  <p>Here you can see few variants of our NFT</p>
  </div>

  </motion.div>
<div 
className="grid grid-cols-[300px_300px_300px_300px] justify-around h-[370px] mb-44">
{img.map(({custom, title, src}) => 
  <motion.div 
  variants={faq}
custom={custom}
className='bg-blue-100 bg-opacity-50 rounded-2xl grid grid-cols-1 justify-self-stretch'>
<img src={src} className='pt-5 w-[95%] justify-self-center'/>
<p className='text-3xl font-bold text-center'>{title}</p>
</motion.div>)
}  
</div>
</Section>

    );
}
 
export default NftPic;
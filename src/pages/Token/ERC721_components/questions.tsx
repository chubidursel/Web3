import { motion } from 'framer-motion';
import Section from './../ERC721_components/section';

const faq = {
  visible: custom => ({ opacity: 1, scale: 1, transition: { duration: 0.8, delay: 0.5 * custom, ease: [0, 0.71, 0.2, 1.01] } }),
  hidden: { opacity: 0, scale: 0.5 }
};
const leftAnimation = {
  hidden:{
    x: -1000,
    opacity: 0,
  },
  visible: custom => ({
    x: 0,
    opacity: 1,
    transition: {duration: 3, delay: 0.5 * custom},
})}

const rightAnimation = {
  hidden:{
    x: 1000,
    opacity: 0,
  },
  visible: custom => ({
    x: 0,
    opacity: 1,
    transition: {duration: 3, delay: 0.5 * custom}
  }),
}



const Questions = () => {
   
    return ( <>
<div>
      <section className="text-white text-xl">
        <div className="container px-5 py-10 mx-auto">
          <div className="text-center mb-10">
            <Section>
            <motion.h1 
            className="text-5xl font-bold text-center title-font text-blue-200 mb-4"
            variants={faq}
            custom={1}
            >
              Frequently Asked Question
            </motion.h1>
            </Section>

          </div>
          <div className="flex flex-wrap  text-4xl justify-center ">
            <div className="grid grid-cols-1 content-center px-4 py-2 gap-5">
<Section>
<motion.div 
className="mb-4"
variants={leftAnimation}
custom={2}
>
                <motion.div 
                className="font-semibold text-black  bg-blue-100
                 bg-opacity-50 rounded-md py-2 px-4 ">
                  Where do we store data?
                </motion.div>
                <span className="text-white">
                  Metadata and images are stored on IPFS and Pinata
                </span>
              </motion.div>
</Section>


<Section>
<motion.div
className="mb-4"
variants={rightAnimation}
custom={3}
>
                <div className="font-semibold  bg-blue-100
                 bg-opacity-50  text-black rounded-md py-2 px-4">
                  What Blockchain are these minted on?
                </div>

                <span>
                  Goerli Testnet Ethereum
                </span>
              </motion.div>
</Section>
<Section>
<motion.div 
className="mb-4"
variants={leftAnimation}
custom={4}>
                <div className="font-semibold text-black  bg-blue-100
                 bg-opacity-50  rounded-md py-2 px-4">
                  Can I sell or trade my NFT card?
                </div>

                <span>
                  Easy! You can sell it on our Auction or via OpenSea
                 </span>
              </motion.div>
</Section>

<Section>
<motion.div 
className="mb-4"
variants={rightAnimation}
custom={5}>
                <div className="font-semibold text-black  bg-blue-100
                 bg-opacity-50  rounded-md py-2 px-4">
                  How many NFTs can i mint?
                </div>

                <span className="px-4 py-2">
                  max 3 per wallet
                </span>
              </motion.div>
</Section>
<Section>
<motion.div 
className="mb-4"
variants={leftAnimation}
custom={6}>
                <div className="font-semibold text-black  bg-blue-100
                 bg-opacity-50  rounded-md py-2 px-4">
                  How many sites I can create at once?
                </div>

                <span className="px-4 py-2">
                  Laboris qui labore cillum culpa in sunt quis sint veniam.
                  Dolore ex aute deserunt esse ipsum elit aliqua. Aute quis
                  minim velit.
                </span>
              </motion.div>
</Section>
            </div>
          </div>
        </div>
      </section>
    </div>
   </> );
}
 
export default Questions;


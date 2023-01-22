import Section from '../ERC721_components/section';
import { motion } from "framer-motion";

const Interact = ({leftAnimation, currentAccount, amountNft, handleMod, arrNft, setNumInteract}) => {
    return ( 
        <Section>
          <motion.div 
    className="bg-blue-100 bg-opacity-50 p-5 text-2xl rounded-2xl mb-44
    w-[1000px] justify-between grid grid-cols-[_1fr_1fr] gap-10" 
    variants={leftAnimation}
>
  <div className=''>
            <h1 className='text-3xl font-bold text-center'>Interact with your NFT</h1> <br/>
<p className='text-justify'>Just enter ID number of your NFT and you will see additional info.</p><br/>
<p className='text-justify'>You can see image of your NFT, transfer or approve it! Also you could see another NFT from collection, just enter ID!</p><br/>
  </div>
    <div className='grid grid-cols-[_1fr] py-5'>
    <h1 className='text-purple-800 text-center font-bold text-3xl'>{currentAccount 
    ?  arrNft.length != 0 ? <><p className=''>You have: {amountNft} NFTs</p><br/><p>TokenID of yours NFTs: {arrNft.map(i => '#' + i.toString()).reverse().join(', ')}</p></>
    : `You don't have any NFT but you can mint it on the top of this page`
    : 'Connect your wallet!'}</h1>
            <input className='rounded-xl text-center h-fit w-1/2 justify-self-center' type='number' min={1}
            onChange={(e)=>setNumInteract(e.target.value)} placeholder='token ID'/>
            <button onClick={handleMod} 
            className='border-2 justify-self-center w-1/2 h-fit border-black text-3xl bg-blue-200 rounded-lg hover:bg-blue-400 p-3 mt-3'>
              Show</button>
             {/* <img src={nftButt} className="w-[40%] justify-self-center"/> */}
  </div>
        </motion.div >
</Section>
     );
}
 
export default Interact;
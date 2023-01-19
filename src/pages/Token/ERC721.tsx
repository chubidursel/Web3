import Header from '../../components/headerNew';
import { contractERC721 } from '../../components/smart_contract/ERC721';
import { useEffect, useState } from 'react';
import conectSigner from '../../components/smart_contract/SIGNER';
import getErrorMessage from '../../components/getErrorMessage';
import logoNft from "../../assets/logoNft.gif"
import etherscan from "../../assets/etherscan.png"
import opensea from "../../assets/opensea.png"
import daoo from "../../assets/daoo.png"
import auction from "../../assets/auction.png"
import otherr from "../../assets/otherr.png"
import Questions from './ERC721_components/questions';
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Section from './ERC721_components/section';
import Modal from '../../components/modal';
import NftCard from './ERC721_components/NFTcard';
import { useAppContext } from "../../hooks/useAppContext";
import { element } from 'prop-types';
import NftPic from './ERC721_components/nftpic';
import Interact from './ERC721_components/interact';
import AuctionNft from './ERC721_components/auction';
import DaoNft from './ERC721_components/daoNft';
import {
  leftAnimation,
  rightAnimation,
  upAnimation,
  downAnimation,
  faq,
  img
} from "./ERC721_components/addInfo";


export function ERC721() {
  const [result, setResult] = useState("");
  const [nftPrice, setNftPrice] = useState("");
  const [amountMinted, setAmountMinted] = useState('');
  const [numInteract, setNumInteract] = useState(null) // toos this number to NFT card
  const [active, setActive] = useState<boolean>(false);

  const [arrNft, setArrNft] = useState([]);
  const [amountNft, setAmountNft] = useState();
  
  
  const handleMod = () => setActive(true)
  
  // 📕 ADDR TO GET LIST OF NFT TOKENS BY ADDRESS  
  const { contextState, } = useAppContext();
  const currentAccount = contextState?.currentAccount;

  useEffect((()=>{
  
    (async()=>{
      try {
        document.title = 'NFT';
        const numMinted = await contractERC721.amountMintedNFT()
        setAmountMinted(numMinted.toString())

        const price = await contractERC721.Rate()
        setNftPrice(price.toString())

        console.log("👨‍💻 DEV useEffect Fetch: ", amountMinted, price)

          // 📕 SET LIST OF NFT TOKENS BY ADDRESS 
         if(currentAccount){
          const arrOfNFTs = await contractERC721.tokenList(currentAccount)
          const totalAmount = await contractERC721.balanceOf(currentAccount)
          setArrNft(arrOfNFTs);
          setAmountNft(totalAmount.toString())
         }
      } catch (error) {
        console.log(error)
      }
    })()
  }),[currentAccount])

  const handlePurcase = async()=>{
    try{
      setResult(`Pls sign the tx`);
      const contractERC721WithSigner = conectSigner(contractERC721)
      const txTransfer = await contractERC721WithSigner.purchase({
        value: await contractERC721.Rate(),
      });
      await txTransfer.wait()
      console.log("👨‍💻 DEV >> ", txTransfer)
      setResult(`🥳 Congratulations!, You bought nice NFT`);
      setTimeout(() => {setResult('')}, 2000)
    }catch (error) {
      console.log(error)
      const message = getErrorMessage(error);
      setResult(message)
      setTimeout(() => {setResult('')}, 2000)
    }
  }

  return (
    <>
   <Header marginFromTop={2}>
    <div className='text-center py-2'>
   <h1 className='font-bold mb-2'>Simple ERC721 smart contract</h1>
    </div>
    </Header>

<div className="flex justify-end">
            <div className="flex flex-col fixed gap-3 -mr-60 mt-60">
                <a href='https://goerli.etherscan.io/address/0x8E05352b5937e9aaCc1e1F39C2A7D335e044a9ED' target="_blank">
                         <motion.img 
        src={etherscan} 
        className='w-[20%]'
        whileHover={{scale: 1.2}}
        /></a>
            
            <a href='https://testnets.opensea.io/collection/howtofix' target="_blank" 
                >
                                    <motion.img 
        src={opensea} 
        className='w-[20%]'
        whileHover={{scale: 1.2}}
        />
                   </a>
          
            </div></div>


<div 
className='grid grid-cols-1 w-[96vw] gap-32'
>
<Section>
  <div className="flex justify-center">
  <motion.img 
        src={logoNft} 
        className=' -m-20 -z-50'
        variants={upAnimation}
        />
  </div>
</Section>

        <Section>
        <div className="flex justify-center -m-5">
        <motion.div
        variants={downAnimation}
        >
                  {result && <h1 className='text-center text-xl bg-yellow-200 rounded-xl m-3 py-4 px-10'>{result}</h1> }
          <div className=' bg-blue-100 rounded-2xl p-5 flex justify-center flex-col text-center text-xl'>
          <p>Price: {Number(nftPrice) / 1000000000000000000 } ETH</p>
        <p>Minted: {amountMinted} / 500</p>
        <button onClick={handlePurcase} className='border-2 border-black text-5xl bg-blue-200 rounded-lg hover:bg-blue-400 p-3 mt-3'>mint</button>
        </div>
        </motion.div>
          </div>

</Section>

{/* ---------- NFT pic --------- */}
<NftPic 
img={img}
faq={faq}

/>
{/* ---------- Interact --------- */}
<Interact 
leftAnimation={leftAnimation}
currentAccount={currentAccount}
amountNft={amountNft}
arrNft={arrNft}
handleMod={handleMod}
setNumInteract={setNumInteract}

/>
{/* -------- Auction --------------- */}

<AuctionNft
rightAnimation={rightAnimation}
auction={auction}
/>  
  {/* -------- DAO --------------- */}
  <DaoNft
  leftAnimation={leftAnimation}
daoo={daoo}
  />
    <section>
      <div className=''>
         <Questions />
      </div>
    </section>
    </div>


    <Modal
   active={active}
   setActive={setActive}
   marginFromTop={'top-[2000px]'}
   >
   <NftCard 
  tokenId={numInteract}
   /> 
   </Modal>



    </>
  )
}

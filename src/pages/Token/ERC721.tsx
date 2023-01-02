import Header from '../../components/headerNew';
import { contractERC721 } from '../../components/smart_contract/ERC721';
import { useEffect, useState } from 'react';
import conectSigner from '../../components/smart_contract/SIGNER';
import getErrorMessage from '../../components/getErrorMessage';
import nftt from "../../assets/nftt.png"
import nft1 from "../../assets/nft1.png"
import nft2 from "../../assets/nft2.png"
import nft3 from "../../assets/nft3.png"
import nft4 from "../../assets/nft4.png"
import nft5 from "../../assets/nft5.png"
import Questions from './ERC721_components/questions';
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Section from './ERC721_components/section';


const leftAnimation = {
  hidden:{
    x: -1000,
    opacity: 0,
  },
  visible: {
    x: -300,
    opacity: 1,
    transition: {duration: 3, delay: 1},
}}

const rightAnimation = {
  hidden:{
    x: 600,
    opacity: 0,
  },
  visible: {
    x: 300,
    opacity: 1,
    transition: {duration: 3, delay: 1}
  },
}
const upAnimation = {
  hidden:{
    scale: 0,
    opacity: 0,
    y: -1000,
  },
  visible: {
    scale: 1,
    opacity: 1,
    y: 0,
    transition: {duration: 2}
  },
}

const downAnimation = {
  hidden:{
    scale: 0,
    opacity: 0,
    y: 1000,
  },
  visible: {
    scale: 1,
    opacity: 1,
    y: 0,
    transition: {duration: 2}
  },
}
const coinsAnim = {
  hidden:{
    x: -1000,
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: {duration: 2}
  },
}

let coins = ["1","2","3","4","5"];
let nft = 'nft'
const c = coins.map((i,id) => <img key={id} src={`nft${i}`} className='w-[10%]'/>)

console.log(c);

export function ERC721() {
  const [result, setResult] = useState("");
  const [nftPrice, setNftPrice] = useState("");
  const [amountMinted, setAmountMinted] = useState('');

  useEffect((()=>{
  
    (async()=>{
      try {
        document.title = 'NFT';
        const numMinted = await contractERC721.amountMintedNFT()
        setAmountMinted(numMinted.toString())

        const price = await contractERC721.Rate()
        setNftPrice(price.toString())

        console.log("👨‍💻 DEV useEffect Fetch: ", amountMinted, price)
      } catch (error) {
        console.log(error)
      }
    })()
  }),[])

  const handlePurcase = async()=>{
    try{
      setResult(`Pls sign the tx`);
      const contractERC721WithSigner = conectSigner(contractERC721)
      const txTransfer = await contractERC721WithSigner.purchase({
        value: await contractERC721.Rate(),
      });
      await txTransfer.wait()
      console.log("👨‍💻 DEV >> ", txTransfer)
      setResult(`🥳 Congratulation!, You bought nice NFT`);
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

    <section id='links'>
    <div>

            <div className="flex justify-center gap-10 text-white my-10">
                <a href='https://goerli.etherscan.io/address/0x3eEEaEe76C2D5d4a1E72106F13AB82F750b19994' target="_blank" 
                className="font-bold rounded-2xl border-2 border-red-400 px-[15px] py-2 text-xl hover:bg-red-400">Etherscan </a>
            
            <a href='https://testnets.opensea.io/collection/circleart' target="_blank" 
                className="font-bold rounded-2xl border-2 border-red-400 px-[15px] py-2 text-xl hover:bg-red-400">OpenSea </a>
          
            </div>
        </div>
    </section>


<div 
className='grid grid-cols-1 w-[97vw] gap-32'
>
<Section>
  <div className="flex justify-center">
  <motion.img 
        src={nftt} 
        alt="APE"  
        className='w-[40%] h-[70vh] -m-32 -z-50'
        variants={upAnimation}
        />
  </div>
</Section>

        <Section>
        <div className="flex justify-center -m-11">
        <motion.div
        variants={downAnimation}
        >
                  {result && <h1 className='text-center text-xl bg-yellow-200 rounded-xl m-3 py-4 px-10'>{result}</h1> }
          <div className=' bg-blue-100 rounded-2xl p-5 flex justify-center flex-col text-center text-xl'>
          <p>rate: {Number(nftPrice) / 1000000000000000000 } ETH</p>
        <p>amount Minted: {amountMinted} / 33</p>
        <button onClick={handlePurcase} className='border-2 border-black text-5xl bg-blue-200 rounded-lg hover:bg-blue-400 p-3 mt-3'>mint</button>
        </div>
        </motion.div>
          </div>

</Section>

<Section>
<motion.section 
    className=" h-[30vh] mt-20"
    variants={coinsAnim}
>
  <div className='text-white font-bold text-center text-3xl m-3'>
  <p>Here you can see few variants of our NFT</p>
  </div>
<div className="flex justify-center gap-5">
  {/* {[1,2,3,4,5].map((i,id) => {<img key={id} src={`nft${i}`} className='w-[13%]'/>)} */}
<img src={nft1} className='w-[13%]'/>
<img src={nft4} className='w-[13%]'/>
<img src={nft3} className='w-[13%]'/>
<img src={nft5} className='w-[13%]'/> 
<img src={nft2} className='w-[13%]'/>
  </div>
    </motion.section>
</Section>

<Section>
<div className="flex justify-center">
  <motion.section 
    className="bg-blue-200 px-5 py-2 text-2xl rounded-lg border-4  border-red-400 w-1/5 h-[30vh]"
    variants={rightAnimation}
>
            <h1>i think we have to</h1> 
            <p>create here some interactive</p>
            <p>form which allows to get info </p>
             <p> about nft if user has it</p>
            <p>or about that he hasn't</p>
        </motion.section>
        </div>
</Section>

<Section>
<div className="flex justify-center">
          <motion.div 
    className="bg-blue-100 p-5 text-2xl rounded-2xl w-1/5 h-[30vh] text-center" 
    variants={leftAnimation}
>
        <h1> Here you can create a new smart contract and sell NFT! </h1> 
<button className='border-2 border-black text-5xl bg-blue-200 rounded-lg hover:bg-blue-400 p-3 m-3'>
<Link to="../Defi/Market/Auction" >GO!</Link>
</button>
        </motion.div >
        </div>
</Section>
  
<Section>
<div className="flex justify-center">
          <motion.div 
    className="bg-blue-100 p-5 text-2xl rounded-2xl w-1/5 h-[30vh] text-center" 
    variants={rightAnimation}
>
        <h1>There is a simple implemetation of DAO! Take part in it with your NFT!</h1> 
<button className='border-2 border-black text-5xl bg-blue-200 rounded-lg hover:bg-blue-400 p-3 m-3'>
<Link to="../DAO">GO!</Link>
</button>
        </motion.div >
        </div>
</Section>

    <section>
      <Questions />
    </section>
    </div>
    </>
  )
}

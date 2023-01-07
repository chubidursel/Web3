import Header from '../../components/headerNew';
import { contractERC721 } from '../../components/smart_contract/ERC721';
import { useEffect, useState } from 'react';
import conectSigner from '../../components/smart_contract/SIGNER';
import getErrorMessage from '../../components/getErrorMessage';
import logoNft from "../../assets/logoNft.gif"
import nft1 from "../../assets/nft1.png"
import nft2 from "../../assets/nft2.png"
import nft3 from "../../assets/nft3.png"
import nft4 from "../../assets/nft4.png"
import etherscan from "../../assets/etherscan.png"
import opensea from "../../assets/opensea.png"
import auction from "../../assets/auction.png"
import otherr from "../../assets/otherr.png"
import Questions from './ERC721_components/questions';
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Section from './ERC721_components/section';
import Modal from '../../components/modal';
import NftCard from './ERC1155_comp/nftCard';


const leftAnimation = {
  hidden:{
    x: -500,
    opacity: 0,
  },
  visible: {
    x: 100,
    opacity: 1,
    transition: {duration: 3, delay: 1},
}}

const rightAnimation = {
  hidden:{
    x: 900,
    opacity: 0,
  },
  visible: {
    x: 450,
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
const faq = {
  visible: custom => ({ opacity: 1, scale: 1, transition: { duration: 1.5, delay: 1 * custom, ease: [0, 0.71, 0.2, 1.01] } }),
  hidden: { opacity: 0, scale: 0.5 }
};

const img = [{
  title: 'Tired fish',
  src: nft1,
  custom: 4, 
},
{
  title: 'Sick love',
  src: nft2,
  custom: 2, 
},
{
  title: 'Hungry Mosquito',
  src: nft3,
  custom: 3, 
},
{
  title: 'Enamored Bananas',
  src: nft4,
  custom: 4, 
},
// {
//   title: 'Sick Duck',
//   src: nft5,
//   custom: 1, 
// },
]

export function ERC721() {
  const [result, setResult] = useState("");
  const [nftPrice, setNftPrice] = useState("");
  const [amountMinted, setAmountMinted] = useState('');
  const [numInteract, setNumInteract] = useState<string>('') // toos this number to NFT card
  const [active, setActive] = useState<boolean>(false);

  const handleMod = async() => {
  //   if(!numInteract) { 
  //     dispatch({ type: "er_bal", payload: "Invalid input!"})
  //   setTimeout(() => {
  //     dispatch({ type: "stop", payload: initial })
  //   }, 2000)
  // }
    // else 
    setActive(true);
    // router.push({
    //   query: { tokenId: numInteract,
    //     currentAccount: currentAccount
    //   },
    // });
}


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

<div className="flex justify-end">
            <div className="flex flex-col fixed gap-3 -mr-60">
                <a href='https://goerli.etherscan.io/address/0x3eEEaEe76C2D5d4a1E72106F13AB82F750b19994' target="_blank" 
                >
                         <motion.img 
        src={etherscan} 
        className='w-[20%]'
        whileHover={{scale: 1.2}}
        /></a>
            
            <a href='https://testnets.opensea.io/collection/circleart' target="_blank" 
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
        className='w-[50%] h-[70vh] -m-20 -z-50'
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
          <p>rate: {Number(nftPrice) / 1000000000000000000 } ETH</p>
        <p>amount Minted: {amountMinted} / 33</p>
        <button onClick={handlePurcase} className='border-2 border-black text-5xl bg-blue-200 rounded-lg hover:bg-blue-400 p-3 mt-3'>mint</button>
        </div>
        </motion.div>
          </div>

</Section>

<Section>
  <motion.div variants={faq} className='flex justify-center'>
      <div className='text-white font-bold text-5xl my-44 bg-blue-100 bg-opacity-50 rounded-2xl w-fit flex justify-center p-5'>
  <p>Here you can see few variants of our NFT</p>
  </div>

  </motion.div>
<div 
className="grid grid-cols-[300px_300px_300px_300px] justify-around h-[350px] mb-44">
{img.map(({custom, title, src}) => 
  <motion.div 
  variants={faq}
custom={custom}
className='bg-blue-100 bg-opacity-50 rounded-2xl grid grid-cols-1'>
<img src={src}/>
<p className='text-3xl font-bold text-center'>{title}</p>
</motion.div>)
}  
</div>
</Section>

<Section>
          <motion.div 
    className="bg-blue-100 bg-opacity-50 p-5 text-2xl rounded-2xl mb-44
    w-[1000px] h-[60vh] justify-between grid grid-cols-[_1fr_1fr] gap-10 items-stretch" 
    variants={rightAnimation}
>
  <div className='text-center'>
            <h1 className='text-3xl font-bold'>There is a interactive form, which helps you to get info about your NFT!</h1> <br/>
<p className='text-left'>Just enter ID number of your NFT and you will see additional info.</p><br/>
<p className='text-right'> If you want to participate and be a member of our DAO you need to get one of our token which u can get in a few different way (buy it on the Auction, in the shop or buy dirrectly from the smart contract)</p><br/>
  </div>
  <div className='self-center'>
  <h1 className=" text-3xl text-center font-bold m-1">Interact</h1>
<div className='brd justify-center flex border-2 py-5'>
           
            <input className='w-1/2 inpt' type='number' 
            min="1" max="8" onChange={(e:ChangeEvent<HTMLInputElement>)=>setNumInteract(e.target.value)} placeholder='token ID'/>
            <button onClick={handleMod} className='btn'>show</button>
</div> 

  </div>
        </motion.div >
</Section>


<Section>
          <motion.div 
    className="bg-blue-100 bg-opacity-50 p-5 text-2xl rounded-2xl mb-44
    w-[1000px] h-[60vh] justify-between grid grid-cols-[_1fr_1fr] gap-10" 
    variants={leftAnimation}
>
  <div className='text-center'>
            <h1 className='text-3xl font-bold'> Here you can create a new smart contract and sell NFT! </h1> <br/>
<p className='text-left'>Without write a single line of code Exited!,isn't it? 🤩</p><br/>
<p className='text-right'> How does it work?</p><br/>
<p className='text-left'>There is factory smart contract with create a Auction contract where you can sell our NFT</p> 
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
  
<Section>
          <motion.div 
    className="bg-blue-100 bg-opacity-50 p-5 text-2xl rounded-2xl mb-20
    w-[1000px] h-[60vh] justify-between grid grid-cols-[_1fr_1fr] gap-10 items-stretch" 
    variants={rightAnimation}
>
  <div className='text-center'>
            <h1 className='text-3xl font-bold'>There is a simple implemetation of DAO. How does it work?</h1> <br/>
<p className='text-left'>The NFT-holders can create an proposal and vote for them.</p><br/>
<p className='text-right'> If you want to participate and be a member of our DAO you need to get one of our token which u can get in a few different way (buy it on the Auction, in the shop or buy dirrectly from the smart contract)</p><br/>
  </div>
  <div className='self-center'>
  <Link to="../Defi/Market/Auction" >
   <motion.img className=''
   src={otherr}
   whileHover={{scale: 1.3}}
   />
   </Link>
  </div>
        </motion.div >
</Section>
    <section>
      <div className=''>
         <Questions />
      </div>
    </section>
    </div>


    <Modal
   active={active}
   setActive={setActive}
   marginFromTop={'top-16'}
   >
   <NftCard 
  tokenId={numInteract}
   /> 
   </Modal>



    </>
  )
}

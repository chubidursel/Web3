import React from 'react'
import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import walletProvider from '../../abi/walletProvider';
import { NftCard } from './ERC721_components/NftCard';
import Header from '../../components/headerNew';
import {Link} from "react-router-dom"
import { contractWithSigner, contract } from './ERC721_components/contract_conection';
// import Sidebar from '../../components/Sidebar';
import HeaderTokenNft from './ERC721_components/headerToken721';
import Modal from '../../components/modal';


export function ERC721() {
  const [tokenId, setTokenId] = useState(1);
  const [tokenUri, setTokenUri] = useState('');
  const [tokenOwner, setTokenOwner] = useState('');

  const [numInteract, setNumInteract] = useState() // toos this number to NFT card
  const [active, setActive] = useState(false);

  const handleMod = () => setActive(true)
  // const [displayNftCard, setDisplayNftCard] = useState(false)
  const [amountMinted, setAmountMinted] = useState();

// BLOCK 1 INFO
useEffect((()=>{
  (async()=>{
    try {
      const numMinted = await contractERC721.numOfNft()
      setAmountMinted(numMinted.toString())
      
    } catch (error) {
      console.log(error)
    }
  })()
}),[])


// BLOCK 2 CHECK OWNER
  const habdleGetInfo = async()=>{
    const owner = await contractERC721.ownerOf(tokenId);
    setTokenOwner(owner)

    const urlById = await contractERC721.tokenURI(tokenId)
    setTokenUri(urlById);
  }

// BLOCK 2
  // const handleCheckOwnerNft = async()=>{

  //   setDisplayNftCard(!displayNftCard)
  // }


  return (
    <>
   <Header>info about token ERC721</Header>
   <div className='flex justify-center'>
   <HeaderTokenNft /></div>
   <div className='flex justify-around text-purple-800'>
 
   <div className='bg-blue-100 w-1/2 rounded-2xl border-4 border-red-400 text-xl px-[15px] py-5 m-8'>
   
        <div>
        <h1 className=" text-3xl text-center font-bold m-1">INFO</h1>
       </div>
       <div className='flex flex-row justify-around rounded-2xl border-2 border-red-400 px-[15px] p-2 m-2'>
         {/* <a href='https://goerli.etherscan.io/address/0x71aca2815d8237a3bf3db4ace47115666f46a961#code' target="_blank">SMART CONTRACT</a><br /> */}
         {/* <a href='https://gateway.pinata.cloud/ipfs/QmNM3ZUzASR78M61PsPF3f63j13ZsXNCACnfMshNroFuKz' target="_blank">IPFS</a>
         <Link to="/Defi/Market"><button className="font-bold rounded-2xl border-2 border-red-400 px-[15px] hover:bg-red-400">BUY</button></Link> */}
         <p className='font-semibold'>Amount of NFT: 8</p>
         <p className='font-semibold'>Amount of minted NFT: {amountMinted}</p> 
       </div>

        <div className='rounded-2xl border-2 border-red-400 px-[15px] p-2 m-2'>
          <p className='font-semibold'>Check out the NFT info:</p>
          <input className='rounded-xl' onChange={(e:any)=>setTokenId(e.target.value)} placeholder='token ID'/>
          <button onClick={habdleGetInfo} className='ml-3 className="font-bold rounded-2xl border-2 border-red-400 px-[15px] hover:bg-red-400'>TEST</button>
          <p className='font-semibold'>address:</p><p>{tokenUri}</p>
          <p className='font-semibold'>owner:</p><p> {tokenOwner}</p>

        </div>

        <div className='rounded-2xl border-2 border-red-400 px-[15px] p-2 m-2'>
            <h1>Interact with your NFT</h1>
            <input className='rounded-xl' onChange={(e:any)=>setNumInteract(e.target.value)} type='text' placeholder='token ID'/>
            <button onClick={handleMod} className='ml-3 className="font-bold rounded-2xl border-2 border-red-400 px-[15px] hover:bg-red-400'>Check</button>
            {/* <h2>In this block The nft card should pops up so u can interact with it</h2> */}
        </div>
    </div></div>
    <Modal 
    active={active}
    setActive={setActive}
    >
    <NftCard tokenId={numInteract}/> 
    
    </Modal>
    {/* {displayNftCard && <NftCard tokenId={numInteract}/>} */}
    </>
  )
}

// function Home() {
//   const [totalMinted, setTotalMinted] = useState(0);
//   useEffect(() => {
//     getCount();
//   }, []);

//   const getCount = async () => {
//     const count = await contract.count();
//     console.log(parseInt(count));
//     setTotalMinted(parseInt(count));
//   };

//   return (
//     <div>
//       <h1>Fired Guys NFT Collection</h1>
//       <div className="container">
//         <div className="row">
//           {Array(totalMinted + 1)
//             .fill(0)
//             .map((_, i) => (
//               <div key={i} className="col-sm">
//                 <NFTImage tokenId={i} getCount={getCount} />
//               </div>
//             ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// function NFTImage({ tokenId, getCount }) {
//   const contentId = 'Qmdbpbpy7fA99UkgusTiLhMWzyd3aETeCFrz7NpYaNi6zY';
//   const metadataURI = `${contentId}/${tokenId}.json`;
//   const imageURI = `https://gateway.pinata.cloud/ipfs/${contentId}/${tokenId}.png`;
// //   const imageURI = `img/${tokenId}.png`;

//   const [isMinted, setIsMinted] = useState(false);
//   useEffect(() => {
//     getMintedStatus();
//   }, [isMinted]);

//   const getMintedStatus = async () => {
//     const result = await contract.isContentOwned(metadataURI);
//     console.log(result)
//     setIsMinted(result);
//   };

//   const mintToken = async () => {
//     const connection = contract.connect(signer);
//     const addr = connection.address;
//     const result = await contract.payToMint(addr, metadataURI, {
//       value: ethers.utils.parseEther('0.05'),
//     });

//     await result.wait();
//     getMintedStatus();
//     getCount();
//   };

//   async function getURI() {
//     const uri = await contract.tokenURI(tokenId);
//     alert(uri);
//   }
//   return (
    
//   );
// }



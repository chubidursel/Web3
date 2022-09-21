import React from 'react'
import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import walletProvider from '../../abi/walletProvider';
import { NftCard } from './ERC721_components/NftCard';
import Header from '../../components/headerNew';
import {Link} from "react-router-dom"
import { contractERC721, contractERC721WithSigner } from '../../components/smart_contract/ERC721';
import Sidebar from '../../components/Sidebar';

export function ERC721() {
  const [tokenId, setTokenId] = useState(1);
  const [tokenUri, setTokenUri] = useState('');
  const [tokenOwner, setTokenOwner] = useState('');

  const [numInteract, setNumInteract] = useState() // toos this number to NFT card

  const [displayNftCard, setDisplayNftCard] = useState(false)
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
  const handleCheckOwnerNft = async()=>{

    setDisplayNftCard(!displayNftCard)
  }


  return (
    <>
   <Header />
 
    <div className='w-1/2 h-full bg-slate-100 rounded-xl m-10 p-2'>
        <div>
         <p className='text-center pt-5 font-bold text-3xl'>INFO</p>
       </div>
       <div className='m-5 bg-orange-200'>
         <a href='https://goerli.etherscan.io/address/0x71aca2815d8237a3bf3db4ace47115666f46a961#code' target="_blank">SMART CONTRACT</a><br />
         <a href='https://gateway.pinata.cloud/ipfs/QmNM3ZUzASR78M61PsPF3f63j13ZsXNCACnfMshNroFuKz' target="_blank">IPFS</a>
         <Link to="/Defi/Market"><button className='bg-red-500 px-10 text-3xl rounded-xl'>BUY</button></Link>
         <p>amount of NFT: 8</p>
         <p>amount of minted NFT: {amountMinted}</p>
       </div>

        <div className='p-5 bg-yellow-200'>
          <p>Check out the NFT info:</p>
          <input onChange={(e:any)=>setTokenId(e.target.value)}></input>
          <button onClick={habdleGetInfo} className='bg-blue-500 px-10 rounded-xl'>TEST</button>
          <p>address: {tokenUri}</p>
          <p>owner: {tokenOwner}</p>

        </div>

        <div className='p-5 bg-orange-400'>
            <h1>Interact with your NFT</h1>
            <input  onChange={(e:any)=>setNumInteract(e.target.value)} type='text' placeholder='token ID'/>
            <button onClick={handleCheckOwnerNft} className='bg-purple-300 px-5'>check</button>
            <h2>In this block The nft card should pops up so u can interact with it</h2>
        </div>
    </div>
    
    {displayNftCard && <NftCard tokenId={numInteract}/>}
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



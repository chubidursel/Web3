import React from 'react'
import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import walletProvider from '../../abi/walletProvider';
import { NftCard } from './ERC721_components/NftCard';
import Header from '../../components/headerNew';
import { contractWithSigner, contract } from './ERC721_components/contract_conection';
import Sidebar from '../../components/Sidebar';

export function ERC721() {
  const [tokenId, setTokenId] = useState(1);
  const [tokenUri, setTokenUri] = useState('');
  const [tokenOwner, setTokenOwner] = useState('');

  const [checkOwnerNft, setCheckOwnerNft] = useState('')
  const [showNumNft, setShowNumNft] = useState()


  const habdleGetPic = async()=>{
    const owner = await contract.ownerOf(tokenId);
    setTokenOwner(owner)

    const urlById = await contract.tokenURI(tokenId)
    setTokenUri(urlById);
  }
//0x98162D17D4d15c945B7418475EdEb4d9c0335684
  const handleCheckOwnerNft = async()=>{

    const amountOfNft = await contract.balanceOf(checkOwnerNft)
    setShowNumNft(amountOfNft.toString() as any);
  }


  return (
    <>
   <Header />
    <div className='flex justify-center'>
    <Sidebar />
    </div>
    <div className='w-1/2 h-full bg-slate-100 rounded-xl m-10 p-2'>
        <div>
         <p className='text-center pt-5 font-bold text-3xl'>INFO</p>
       </div>
       <div className='m-5 bg-orange-200'>
         <a href='https://rinkeby.etherscan.io/address/0x436c7CEe43947A1714914ccc30223C235f8605aF#code' target="_blank">SMART CONTRACT</a><br />
         <a href='https://gateway.pinata.cloud/ipfs/QmNM3ZUzASR78M61PsPF3f63j13ZsXNCACnfMshNroFuKz' target="_blank">IPFS</a>
       </div>

        <div className='p-5 bg-yellow-200'>
          <p>token ID:</p>
          <input onChange={(e:any)=>setTokenId(e.target.value)}></input>
          <button onClick={habdleGetPic} className='bg-blue-500 px-10 rounded-xl'>TEST</button>
          <p>address: {tokenUri}</p>
          <p>owner: {tokenOwner}</p>
        </div>

        <div className='p-5 bg-orange-400'>
            <h1>Check if u have an NFT:</h1>
            <input  onChange={(e:any)=>setCheckOwnerNft(e.target.value)} type='text' placeholder='put an address'/>
            <button onClick={handleCheckOwnerNft} className='bg-purple-300 px-5'>check</button>
            <h2>Your token ID: {showNumNft}</h2>
        </div>


        <p>THIS BLOCK pops up with NFT card and if u have nft, and than u can interact wiht it, like send and other</p>
    </div>
    <NftCard tokenId={2} tokenAddress={tokenUri}/>
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



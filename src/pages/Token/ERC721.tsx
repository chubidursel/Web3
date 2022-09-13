import React from 'react'
import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import walletProvider from '../../abi/walletProvider';
import { NftCard } from './ERC721_components/NftCard';
import { contractWithSigner, contract } from './ERC721_components/contract_conection';

export function ERC721() {
  const [tokenId, setTokenId] = useState();

  const habdleGetPic = async()=>{
    const test = await contract.owner();
    console.log(test)
  }

  return (
    <>
    <div className='w-1/2 h-96 bg-slate-100 rounded-xl m-10'>
        <div className='p-5'>
          <p>token ID:</p>
          <input onChange={(e:any)=>setTokenId(e.target.value)}></input>
          <button onClick={habdleGetPic} className='bg-blue-500 px-10 rounded-xl'>TEST</button>
          <p>INPUT + BUTTON to check if owner has nft</p>
        </div>
        <div>
          <p>THIS BLOCK pops up with NFT card and if u have nft, and than u can interact wiht it, like send and other</p>
          <p>MINT???</p>
        </div>
    </div>
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



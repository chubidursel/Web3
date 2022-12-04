import { useEffect, useState } from 'react';
import Header from '../../components/headerNew';
import HeaderToken from './ERC1155_comp/header1155';
import { contractERC1155 } from '../../components/smart_contract/erc1155';
import Modal from '../../components/modal';

import Gold from "../../../Ethereum/ERC1155/Pic/1.png"
import Silver from "../../../Ethereum/ERC1155/Pic/2.png"
import Bronze from "../../../Ethereum/ERC1155/Pic/3.png"
import Iron from "../../../Ethereum/ERC1155/Pic/4.png"

import NftCard from './ERC1155_comp/nftCard';



export function ERC1155() {
  const [tokenId, setTokenId] = useState();

useEffect((()=>{
  (async()=>{
    try {
        //INFO

    } catch (error) {
      console.log(error)
    }
  })()
}),[])


// BLOCK 2 CHECK OWNER
  const habdlePurchase = async()=>{
    try {
    //   const owner = await contractERC721.ownerOf(tokenId);
    //   setTokenOwner(owner)
  
    //   const urlById = await contractERC721.tokenURI(tokenId)
    //   setTokenUri(urlById);
  
    //   setOpneTokenInfo(true) // display the info below
    //   setTimeout(() => {
    //     setOpneTokenInfo(false)
    //   }, 6500);
    }
    catch (error) {
    //   console.log(error)
    //   setError('This token ID is not valid! 😞')
    //   setTimeout(() => {setError('')}, 6000)
    }  
  }

  return (
    <>
   <Header marginFromTop={2}>
        <div className='text-center py-2'>
            <h1 className='font-bold mb-2'>Demo ERC1155 smart contract</h1>
            <p>📌 There are 8 pictures with metadata jons files stored on IPFS</p>
            📌Function to mint a new token is avalible only for owner, but other users can use function payToMin() to buy token. Or you can get this NFT from Auction if curent holdder has a willing ro sell it.
            <p>🔜There are some features which we want to implement in this block soon:  </p>
            <p>1.On-chain stored NFT <br/> 2. Generator to mint more than 8 tokens 😉</p>
        </div>
    </Header>

    <HeaderToken handleToggle={false} />

    <div className='flex justify-center mt-10 m-10 space-between gap-7'>
                <NftCard pic={Gold} title='Gold'/>
                  <NftCard pic={Silver} title='Silver'/>
                  <NftCard pic={Bronze} title='Bronze' />
                  <NftCard pic={Iron} title='Iron'/>

                  </div>

    </>
  )
}

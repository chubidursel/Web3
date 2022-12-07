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

type Coin = {
  title: string;
  price: string;
  suply: string;
}

export function ERC1155() {
  const [tokenId, setTokenId] = useState();
  const [arrCoins, setCrrCoins] = useState<Coin[]>();

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
            <p>📌 There are 4 coins with metadata Json files stored on IPFS</p>

            <a href='https://goerli.etherscan.io/address/0xa361b53deA0878fe9310B4ac941AFE3ba2C56a63#code' target="_blank" 
                className="font-bold rounded-2xl border-2 border-red-400 px-[15px] py-2 text-xl hover:bg-red-400">Etherscan </a>
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

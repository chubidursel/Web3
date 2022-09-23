import React from 'react'
import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import walletProvider from '../../abi/walletProvider';
import { NftCard } from './ERC721_components/NftCard';
import Header from '../../components/headerNew';
import {Link} from "react-router-dom"
import { contractERC721, contractERC721WithSigner } from '../../components/smart_contract/ERC721';
import HeaderTokenNft from './ERC721_components/headerToken721';
import Modal from '../../components/modal';


export function ERC721() {
  const [tokenId, setTokenId] = useState(1);
  const [tokenUri, setTokenUri] = useState('');
  const [tokenOwner, setTokenOwner] = useState('');
  const [opneTokenInfo, setOpneTokenInfo] = useState(false);

  const [numInteract, setNumInteract] = useState() // toos this number to NFT card
  const [active, setActive] = useState(false);


  const [error, setError] = useState()
  const handleMod = () => setActive(true)

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
    try {
      const owner = await contractERC721.ownerOf(tokenId);
      setTokenOwner(owner)
  
      const urlById = await contractERC721.tokenURI(tokenId)
      setTokenUri(urlById);
  
      setOpneTokenInfo(true) // display the info below
      setTimeout(() => {
        setOpneTokenInfo(false)
      }, 2000);
    }
    catch (error) {
      console.log(error)
      setError('Oii wei, we got problems! 😞')
      setTimeout(() => {setError()}, 2000)
    }  
  }


  return (
    <>
   <Header>info about token ERC721</Header>
   <div className='flex justify-center'>
   <HeaderTokenNft /></div>
   <div className='flex justify-around text-purple-800'>
 
   <div className='bg-blue-100 w-1/2 rounded-2xl border-4 border-red-400 text-xl px-[15px] py-5 m-8'>
   
        <div><h1 className=" text-3xl text-center font-bold m-1">INFO</h1></div>
        <div className='rounded-2xl border-2 border-red-400 px-[15px] p-2 m-2'>
                {/* <p>Это нужно здесь? desciption: simple NFT smart contract with picture store on IPFS</p> */}
              {/* <div className='flex flex-row justify-around rounded-2xl border-2 border-red-400 px-[15px] p-2 m-2'> */}
              <div className='flex flex-row justify-around'><p className='font-semibold'>Total amount of NFT: 8</p>
                <p className='font-semibold'>Minted NFT: {amountMinted}</p></div>
            
          <p className='font-semibold mt-2 text-center'>Check the NFT info by token ID:</p>
          <div className='flex flex-row justify-center m-2'><input className='rounded-xl text-center' type='number' onChange={(e:any)=>setTokenId(e.target.value)} placeholder='token ID'/>
          <button onClick={habdleGetInfo} className='ml-3 className="font-bold rounded-2xl border-2 border-red-400 px-[15px] hover:bg-red-400'>TEST</button>
          </div>
        { opneTokenInfo == true ? <div>
                <p className='font-semibold'>address:</p><p>{tokenUri}</p>
                <p className='font-semibold'>owner:</p><p> {tokenOwner}</p>
              </div> : <div className='flex justify-center text-red-500 font-bold'>{error}</div>}
            </div>
            {/* <p>second block</p> */}
        <div className='rounded-2xl border-2 border-red-400 px-[15px] p-2 m-2'>
            <h1 className='text-center font-bold text-xl mb-3'>Interact with cerrtain NFT</h1>
            <div className='flex flex-row'>
            <input className='rounded-xl text-center w-1/2' type='number' onChange={(e:React.FormEvent)=>setNumInteract(e.target.value)} placeholder='token ID'/>
            <button onClick={handleMod} className='ml-3 w-1/2 className="font-bold rounded-xl border-2 border-red-400 px-[15px] hover:bg-red-400'>Check</button>
            </div>
        </div>
    </div></div>
    <Modal 
    active={active}
    setActive={setActive}
    >
    <NftCard tokenId={numInteract}/> 
    
    </Modal>
    </>
  )
}

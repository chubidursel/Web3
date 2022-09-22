import React from 'react'
import { useState, useEffect } from 'react';
import { contractWithSigner, contract } from './../ERC721_components/contract_conection';
import { useAppContext } from "../../../hooks/useAppContext";

// https://gateway.pinata.cloud/ipfs/ <<<<gateway to ipfs

export function NftCard({tokenId}) {
  const[infoAddressOwner, setInfoAddressOwner ] = useState('')
  const [addressToSend, setAddressToSend] = useState('');
  const [addressToApprove, setAddressToApprove] = useState('');

  const { contextState, updateContextState } = useAppContext();
  const currentAccount = contextState?.currentAccount;
  
  // HOW TO GET PIC FROM LOCAL FOLDER ????
  // import pic from '../ERC721_components/img/1.png'
  const imageLocal = `../img/${tokenId}.png`; //<<< just store all ur img localy in our folder


// >>>>>>> parse data from metaData

//https://gateway.pinata.cloud/ipfs/QmNM3ZUzASR78M61PsPF3f63j13ZsXNCACnfMshNroFuKz/1.json  << ur u can try this gateway
const contentIPFS = 'QmNM3ZUzASR78M61PsPF3f63j13ZsXNCACnfMshNroFuKz';
const metadataURI = `${contentIPFS}/${tokenId}.json`;
const metadataJson = `https://ipfs.io/ipfs/${metadataURI}`;
  const [imgUri, setImgUri] = useState('')
  const [metaName, setMetaName] = useState('')

  async function pasingMetaData(){
    const response = await fetch(metadataJson);
    const data = await response.json();
    return data
  }
  pasingMetaData().then((data)=>{
    const link = data.image; 
    const cutSting = link.substring(7)
    const imgURL = `https://ipfs.io/ipfs/${cutSting}`
    setImgUri(imgURL)
    setMetaName(data.name)
  })

// >>>>>>>> FUNC 1
  const handleTransfer = async(event:any)=>{
    event.preventDefault();

    const txTransfer = await contractWithSigner.transferFrom(currentAccount, addressToSend, tokenId);
    await txTransfer.wait()

    console.log(txTransfer)
  }
// >>>>>>>> FUNC 2
  const handleApprove = async(event:any)=>{
    event.preventDefault();

    const txApprove = await contractWithSigner.approve(addressToApprove, tokenId);
    await txApprove.wait()

    console.log(txApprove)
  }
// GET OWNER
  useEffect((()=>{
    (async()=>{
      try {
        const addressOwner = await contract.ownerOf(tokenId)
        setInfoAddressOwner(addressOwner)
      } catch (error) {
        console.log(error)
      }
    })()
  }),[])


  return (
    <>
 <div className='text-purple-800'>
 <h1 className="text-xl text-center font-bold m-1">NFT INFO</h1>
      <img className='h-32 ml-44' src={imgUri} />
          <div className='rounded-2xl border-2 border-red-400 px-[15px] p-2 m-2'>
            <h1 className='bg-red-100 rounded-2xl text-center font-bold'>Description</h1>
            <div className='flex flex-row'> <p className="font-bold mr-3">name:</p><p>{metaName}</p></div>
            <div className='flex flex-row'> <p className="font-bold mr-3">metadata:</p> <a href={metadataJson} target="_blank">link 🔗</a></div>
            <div className='flex flex-row'> <p className="font-bold mr-3">owner:</p><p>{infoAddressOwner}</p></div>
            <p>if the address is th same like in ur metamask show that</p>
            
          </div>
          <div className='rounded-2xl border-2 border-red-400 px-[15px] p-2 m-2'>
            <h1 className='bg-red-100 rounded-2xl text-center font-bold'>Functions</h1>
              <form onSubmit={handleTransfer}>
                <h1 className='text-center font-bold'>Transfer</h1>
                <div className='flex flex-row'><label className='font-bold mr-3'>send to: </label>
                <input onChange={(e)=>setAddressToSend(e.target.value)} className='rounded' placeholder='Enter address of reciever'></input><br />
                <button type="submit" className="font-bold ml-12 rounded-2xl border-2 border-red-400 px-[15px] hover:bg-red-400">send</button></div>
              </form>
              <form onSubmit={handleTransfer}>
                <h1 className='text-center font-bold'>Aprove</h1>
                <div className='flex flex-row'><label className='font-bold mr-3'>approve to: </label>
                 <input onChange={(e)=>setAddressToApprove(e.target.value)} className='rounded mr-2' placeholder='Enter address of reciever'></input><br />
                <button onClick={handleApprove} type="submit" className="font-bold ml-3 rounded-2xl border-2 border-red-400 px-[15px] hover:bg-red-400">approve</button>
                </div></form>
            </div>
    </div> 
    </>

  )
}


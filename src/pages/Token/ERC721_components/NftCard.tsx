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
 <div className="bg-green-500 w-auto absolute top-20 right-20 p-5 rounded-2xl">
      <p>THERE is ur NFT</p>
      <img className='h-40 p-5' src={imgUri} />
          <div>
            <h1 className='bg-red-100 font-bold underline'>Description</h1>
            <p>name: {metaName}</p>
            <p>metadata: <a href={metadataJson} target="_blank">link 🔗 </a></p>
            <p>owner: {infoAddressOwner}</p>
            <p>if the address is th same like in ur metamask show that</p>
            
          </div>
          <div>
            <h1 className='bg-red-100 font-bold underline mb-2'>functions</h1>
              <form onSubmit={handleTransfer} className='bg-blue-100'>
                <h1 className='text-center font-bold'>Transfer</h1>
                <label>send to: </label>
                <input onChange={(e)=>setAddressToSend(e.target.value)} className='rounded' placeholder='Enter address of reciever'></input><br />
                <button type="submit" className="font-bold ml-3 rounded-2xl border-2 border-red-400 px-[15px] hover:bg-red-400">send</button>
              </form>
              <form onSubmit={handleTransfer} className='bg-blue-100'>
                <h1 className='text-center font-bold'>Aprove</h1>
                <label>approve to: </label>
                <input onChange={(e)=>setAddressToApprove(e.target.value)} className='rounded mr-2' placeholder='Enter address of reciever'></input><br />
                <button onClick={handleApprove} type="submit" className="font-bold ml-3 rounded-2xl border-2 border-red-400 px-[15px] hover:bg-red-400">approve</button>
              </form>
            </div>
    </div> 
    </>

  )
}


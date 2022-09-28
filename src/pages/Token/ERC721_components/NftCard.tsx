import React from 'react'
import { useState, useEffect } from 'react';
import { contractERC721 } from '../../../components/smart_contract/ERC721';
import conectSigner from '../../../components/smart_contract/SIGNER';
import { useAppContext } from "../../../hooks/useAppContext";

// https://gateway.pinata.cloud/ipfs/ <<<<gateway to ipfs
type tokId = number;
export function NftCard({tokenId}) {
  const[infoAddressOwner, setInfoAddressOwner ] = useState('')
  const [addressToSend, setAddressToSend] = useState('');
  const [addressToApprove, setAddressToApprove] = useState('');
  const[ownerOrNot, setOwnrOrNot ] = useState(false)

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
  const [error, setError] = useState('')
  const [errorAp, setErrorAp] = useState('')

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
    try{
      event.preventDefault();
      const contractERC721WithSigner = conectSigner(contractERC721)
      const txTransfer = await contractERC721WithSigner.transferFrom(currentAccount, addressToSend, tokenId);
      await txTransfer.wait()
  
      console.log(txTransfer)
    }catch (error) {
      console.log(error)
      setError('Oii wei, we got problems! 😞')
      setTimeout(() => {setError('')}, 2000)
    }
    
   
  }
// >>>>>>>> FUNC 2
  const handleApprove = async(event:any)=>{
    try {event.preventDefault();
      const contractERC721WithSigner = conectSigner(contractERC721)
      const txApprove = await contractERC721WithSigner.approve(addressToApprove, tokenId);
      await txApprove.wait()
  
      console.log(txApprove)}
    
    catch (error) {
      console.log(error)
      setErrorAp('Oii wei, we got problems! 😞')
      setTimeout(() => {setErrorAp('')}, 2000)
    }
  }
// GET OWNER
  useEffect((()=>{
    (async()=>{
      try {
        const addressOwner = await contractERC721.ownerOf(tokenId)
        setInfoAddressOwner(addressOwner)


        if(currentAccount.toLowerCase() == infoAddressOwner.toLowerCase()){
          setOwnrOrNot(true)
          console.log("Yahooo")
        }

      } catch (error) {
        console.log(error)
      }
    })()
  }),[])

  // ERROOR =(
  // IF INVALID TOKEN RETURN phrase "SORRY THIS TOKEN doesn't exist or hasn't been minted yet!"


  return (
    <>
 <div className='text-purple-800 w-full'>
 <h1 className="text-xl text-center text-gray-200 font-bold m-1">PICTURE</h1>
      <img className='h-32 ml-44' src={imgUri} />
          <div className='rounded-2xl border-2 border-red-400 px-[15px] p-2 m-2'>
            <h1 className='bg-red-100 rounded-2xl text-center font-bold'>Description</h1>
            <div className='flex flex-row'> <p className="font-bold mr-3">name:</p><p>{metaName}</p></div>
            <div className='flex flex-row'> <p className="font-bold mr-3">metadata:</p> <a href={metadataJson} target="_blank">link 🔗</a></div>
            <div className='flex flex-row'> <p className="font-bold mr-3">owner:</p><p>{infoAddressOwner}</p></div>
            {ownerOrNot ? <p className='text-green-600 font-bold'>This is your NFT! You can interact with it!🙂</p> : <p className='text-red-500'>This NFT token doesn't belong to your account</p>}
          </div>
          <div className='rounded-2xl border-2 border-red-400 px-[15px] p-2 m-2'>
            <h1 className='bg-red-100 rounded-2xl text-center font-bold'>Functions</h1>
              <form onSubmit={handleTransfer}>
                <h1 className='text-center font-bold'>Transfer</h1>
                <div className='flex flex-row'><label className='font-bold mr-3'>send to: </label>
                <input onChange={(e)=>setAddressToSend(e.target.value)} className='rounded border-solid w-full border-2 pl-2 border-purple-800' placeholder='Enter address of reciever'></input><br />
                <button disabled={ownerOrNot} type="submit" className="font-bold ml-1 rounded-2xl border-2 border-red-400 px-[15px] hover:bg-red-400">send</button></div>
             {error && <div className='flex justify-center text-red-500 font-bold'>{error}</div>}
              </form>
              <form onSubmit={handleTransfer}>
                <h1 className='text-center font-bold'>Aprove</h1>
                <div className='flex flex-row'><label className='font-bold mr-3'>approve to: </label>
                 <input onChange={(e)=>setAddressToApprove(e.target.value)} className='rounded border-solid w-full border-2 pl-2 border-purple-800' placeholder='Enter address of reciever'></input><br />
                <button onClick={handleApprove} type="submit" className="font-bold ml-1 rounded-2xl border-2 border-red-400 px-[15px] hover:bg-red-400">approve</button>
                </div>{errorAp && <div className='flex justify-center text-red-500 font-bold'>{errorAp}</div>}</form>
            </div>
    </div> 
    </>

  )
}


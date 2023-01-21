import { useState, useEffect } from 'react';
import { contractERC721 } from '../../../components/smart_contract/ERC721';
import conectSigner from '../../../components/smart_contract/SIGNER';
import Loader from '../../../components/loader';
import { useAppContext } from "../../../hooks/useAppContext";

export default function NftCard({tokenId}) {
  const [loader, setLoader] = useState(false)

  const[infoAddressOwner, setInfoAddressOwner ] = useState('')

  const [addressToSend, setAddressToSend] = useState('');
  const [addressToApprove, setAddressToApprove] = useState('');
  const[ownerOrNot, setOwnrOrNot ] = useState(false)
  const { contextState, updateContextState } = useAppContext();
  const currentAccount = contextState?.currentAccount;
  
   const [imgUri, setImgUri] = useState('')
  const [metaName, setMetaName] = useState('')
  const [error, setError] = useState('')
  const [errorAp, setErrorAp] = useState('')

  
  useEffect(() => {
    (async () => {
   try {
    setLoader(true)
     const response = await fetch(`https://ipfs.io/ipfs/QmRB4k8jQNeTRUHQZEvStPzSGBwAJWhqvfYUVHCq9GsKVR/${tokenId}.json`);
     const data = await response.json();
     setMetaName(data.name)     
     setImgUri(`https://ipfs.io/ipfs/${data.image.substring(7)}`)
     setLoader(false)
   } catch (error) {
   console.error(error);
   }
 })();
     }, [tokenId])
 
 // >>>>>>>> FUNC 1
  const handleTransfer = async()=>{
    try{
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
  const handleApprove = async()=>{
    try {
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
        if(currentAccount.toLowerCase() == addressOwner.toLowerCase()){
          setOwnrOrNot(true)
          console.log("Yahooo")
        }
      } catch (error) {
        console.log(error)
      }
    })()
  }),[tokenId, currentAccount])

  async function copyTextToClipboard(text:string) {
    if ('clipboard' in navigator) {
      return await navigator.clipboard.writeText(text);
    } else {
      return document.execCommand('copy', true, text);
    }
  }

  // ERROOR =(
  // IF INVALID TOKEN RETURN phrase "SORRY THIS TOKEN doesn't exist or hasn't been minted yet!"


  return (
    <>
 <div className='text-purple-800 w-full'>
 <h1 className="text-xl text-center text-gray-200 font-bold m-1">PICTURE</h1>
     <div className='flex justify-center'> {loader ? <Loader /> : <img className='h-44' src={imgUri} />}</div>
          <div className='rounded-2xl border-2 border-red-400 px-[15px] p-2 m-2'>  
            <h1 className='bg-red-100 rounded-2xl text-center font-bold'>Description</h1>
            <div className='flex flex-row'> <p className="font-bold mr-3">name:</p><p>{metaName}</p></div>
            <div className='flex flex-row'> <p className="font-bold mr-3">metadata:</p> <a href={`https://ipfs.io/ipfs/QmRB4k8jQNeTRUHQZEvStPzSGBwAJWhqvfYUVHCq9GsKVR/${tokenId}.json`} target="_blank">link 🔗</a></div>
            <div className='flex flex-row'> <p className="font-bold mr-3" >owner:</p><p className="hover:underline cursor-pointer" onClick={()=>{copyTextToClipboard(infoAddressOwner)}}>{infoAddressOwner.toString().slice(0, 7) + "..." + infoAddressOwner.toString().slice(34)}</p></div>
            {ownerOrNot ? <p className='text-green-600 font-bold'>This is your NFT! You can interact with it!🙂</p> : <p className='text-red-500'>This NFT token doesn't belong to your account</p>}
          </div>
          {

          }
        {ownerOrNot && <div className='rounded-2xl border-2 border-red-400 px-[15px] p-2 m-2'>
            <h1 className='bg-red-100 rounded-2xl text-center font-bold'>Functions</h1>

                <h1 className='text-center font-bold'>Transfer</h1>
                <div className='flex flex-row'>
                <input onChange={(e)=>setAddressToSend(e.target.value)} className='rounded-lg hover:shadow-lg border-solid w-2/3 text-center border-2 pl-2 border-purple-800' placeholder="Reciever's  address"></input><br />
                <button onClick={handleTransfer} className="font-bold ml-1 w-1/3 hover:shadow-lg rounded-lg border-2 border-red-400 px-[15px] hover:bg-red-400">send</button></div>
             {error && <div className='flex justify-center text-red-500 font-bold'>{error}</div>}
   

                <h1 className='text-center font-bold'>Aprove</h1>
                <div className='flex flex-row'>
                 <input onChange={(e)=>setAddressToApprove(e.target.value)} className='rounded-lg hover:shadow-lg w-2/3 text-center border-solid w-58 border-2 pl-2 border-purple-800' placeholder="Reciever's  address"></input><br />
                <button onClick={handleApprove} type="submit" className="font-bold ml-1 w-1/3 hover:shadow-lg rounded-lg border-2 border-red-400 px-[15px] hover:bg-red-400">approve</button>
                </div>{errorAp && <div className='flex justify-center text-red-500 font-bold'>{errorAp}</div>}
            </div>
}
    </div> 
    </>

  )
}

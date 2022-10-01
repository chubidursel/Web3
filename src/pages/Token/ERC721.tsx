import { useEffect, useState } from 'react';
import { NftCard } from './ERC721_components/NftCard';
import Header from '../../components/headerNew';
import { contractERC721 } from '../../components/smart_contract/ERC721';
import HeaderTokenNft from './ERC721_components/headerToken721';
// import ModalBig from '../../components/modalBig';
import Modal from '../../components/modal';


export function ERC721() {
  const [tokenId, setTokenId] = useState();
  const [tokenUri, setTokenUri] = useState('');
  const [tokenOwner, setTokenOwner] = useState('');
  const [opneTokenInfo, setOpneTokenInfo] = useState(false);

  const [numInteract, setNumInteract] = useState() // toos this number to NFT card
  const [active, setActive] = useState(false);


  const [error, setError] = useState('')
  const handleMod = () => {
   if(numInteract) setActive(true)
  }
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
      }, 6500);
    }
    catch (error) {
      console.log(error)
      setError('This token ID is not valid! 😞')
      setTimeout(() => {setError('')}, 6000)
    }  
  }

  return (
    <>
   <Header marginFromTop={2}><div className='text-center py-2'>
   <h1 className='font-bold mb-2'>Simple ERC721 smart contract</h1>
   <p>📌 There are 8 pictures with metadata jons files stored on IPFS</p>
   📌Function to mint a new token is avalible only for owner, but other users can use function payToMin() to buy token. Or you can get this NFT from Auction if curent holdder has a willing ro sell it.
   <p>🔜There are some features which we want to implement in this block soon:  </p>
   <p>1.On-chain stored NFT <br/> 2. Generator to mint more than 8 tokens 😉</p>
    </div>
    </Header>
   <div className='flex justify-center'>
   <HeaderTokenNft />
   </div>

   <div className='flex justify-around text-purple-800'>
 
   <div className='bg-blue-100 w-1/3 rounded-2xl border-4 border-red-400 text-xl px-[15px] py-5 m-8'>
   
        <div><h1 className=" text-3xl text-center font-bold m-1">INFO</h1></div>
        <div className='rounded-2xl border-2 border-red-400 px-[15px] p-2 m-2'>
              <p className='font-semibold'>Total amount of NFT: 8</p>
                <p className='font-semibold'>Minted NFT: {amountMinted}</p>
            
                <div className='flex flex-row'>
                  <p className='font-semibold'>Check the NFT info by token ID:</p></div>
                  
                <div className='flex flex-row justify-center'>
          <input className='rounded-xl text-center ml-1' type='number' min={1} onChange={(e:any)=>setTokenId(e.target.value)} placeholder='token ID'/>
          <button onClick={habdleGetInfo} className='ml-2 font-semibold rounded-xl border-2 border-red-400 px-[15px] hover:bg-red-400'>check</button>
          </div>

          { opneTokenInfo == true ? <div>
                <p className='font-semibold'>address:</p><p>{tokenUri.toString().slice(0, 10) + "..." + tokenUri.toString().slice(48)}</p>

                <p className='font-semibold'>owner:</p><p> {tokenOwner.toString().slice(0, 5) + "..." + tokenOwner.toString().slice(38)}</p>
              </div> : <div className='flex justify-center text-red-500 font-bold'>{error}</div>}

              </div><h1 className=" text-3xl text-center font-bold m-1">Interact</h1>
          <div className='bg-blue-100 rounded-xl border-2 border-red-400 text-xl px-[15px] py-5 flex flex-row justify-center'>
           
            <input className='w-1/2 rounded-xl hover:shadow-xl text-center ml-1' type='number' min={1} onChange={(e:any)=>setNumInteract(e.target.value)} placeholder='token ID'/>
            <button onClick={handleMod} className='ml-2 font-semibold rounded-xl border-2 border-red-400 px-[15px] hover:bg-red-400'>show</button>
           
           
            </div>
          </div>
    </div>
    <Modal
    active={active}
    setActive={setActive}
    marginFromTop={2.5}
    >
    <NftCard tokenId={numInteract}/> 
    
    </Modal>
    </>
  )
}

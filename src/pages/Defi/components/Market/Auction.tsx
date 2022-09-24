import React, {useState, useEffect} from 'react'
import Pic from "../../../../assets/unknown.png"
import { ItemAuction } from './components/ItemAuction';
import {Link} from "react-router-dom"
import { ethers } from 'ethers';
import Header from '../../../../components/headerNew';
import defaultProvider from '../../../../abi/defaultProvider';
import walletProvider from '../../../../abi/walletProvider';
import { contractAuctionFactory, contractAuctionFactoryWithSigner } from '../../../../components/smart_contract/AuctionFactory';
import { contractERC721,  contractERC721WithSigner} from '../../../../components/smart_contract/ERC721';
import { auctionPutAddress, auctionPutAddressSigner } from '../../../../components/smart_contract/AuctionSingle';
import { useAppContext } from "../../../../hooks/useAppContext";
import Modal from '../../../../components/modal';

export function Auction() {
    const [showDeploySC, setShowDeploySC] = useState(false);
    const [showDeploySCSecond, setShowDeploySCSecond] = useState(false);
    const [tokenId, setTokenId] = useState();
    const [resCheckOwner, setResCheckOwner] = useState(false);
    const [timeStart, setTimeStart] = useState();
    const [loaderSecond, setLoaderSecond] = useState(false);
    const [loaderThird, setLoaderThird] = useState(false);
    
    const [resultDeployment, setResultDeployment] = useState("");
    const addressAuction = "0xE1D5aFb20a6Fe4bD9139D91C9c833dA4c6AAcF12";
    
    const { contextState, updateContextState } = useAppContext();
    const currentAccount = contextState?.currentAccount;

// !!!!!!!!!!!!  STEP #1  CHECK THE OWNER AND DISPLY MODAL
  const handleCheck = async()=>{
    setShowDeploySC(!showDeploySC)
    const chackOwner = await contractERC721WithSigner.ownerOf(tokenId)
    const res = chackOwner.toLowerCase() === currentAccount
    setResCheckOwner(res);
  }
// !!!!!!!!!!!!!!!!!! STEP #2  DEPLOY THE SMART CONTRACT
    const handleDeploy = async()=>{
      setShowDeploySC(false)
      setShowDeploySCSecond(true)
      try {
        if(resCheckOwner){
          console.log("Creating ur new Auction")
          const createSC = await contractAuctionFactoryWithSigner.createAuction(tokenId)
          await createSC.wait();
      console.log(createSC) 
      setLoaderSecond(true)
      setResultDeployment("🙂 Deployed! Now you can Start your smart contract!")
        }
      } catch (error) {
        console.log(error)
      }
    }

// !!!!!!!!!!!!!!!!! STEP #3  START AUCTION THE AUCTION
    const handleStart = async()=>{
      try {
  // #1 CREATE SC INSTANST AND CONNECT TO SIGNER  GET NEW SMART CONTRACT FROM FACTORY
  setLoaderThird(true)

        const getNewAddr = await contractAuctionFactoryWithSigner.lastDeploed()
        const contractAuctionWithSigner = auctionPutAddressSigner(getNewAddr)
console.log(getNewAddr)
console.log(contractAuctionWithSigner)
  // #2 APPROVING THE NFT TO NEW AUCTION    
 console.log("Aprroving...")
        const approveTx = await contractERC721WithSigner.approve(getNewAddr, tokenId);
        await approveTx.wait();
        console.log(approveTx)
// #2 CALL FUNC FROM NEW SMART CONTRACT
  console.log("Starting..")
        const txStart = contractAuctionWithSigner.start(timeStart)
        setLoaderThird(false)
        console.log(txStart)
  console.log("DONE!!!!..")
      } catch (error) {
        console.log(error)
      }
    }

  return (
    <>
   <Header>
    <div className='text-center py-3'>
      <h1 className='font-bold'>Here you can create a new smart contract and sell NFT!</h1>
      <p>without write a single line of code</p>
      <p>Exited!,isn't it? 🤩</p>
      <p className='pt-2'>How does it work?</p>
      <p>There is factory smart contract with create a Auction contract where you can sell our NFT</p>
      <p>We are going to refresh all functionality soon...</p>
    </div>
   </Header>
   
   <div>
            <h2 className="flex justify-center text-5xl text-blue-100 font-bold m-3">Web3 Auction</h2>
            <div className="flex justify-center space-x-4 text-white m-3">
                <a href='https://goerli.etherscan.io/address/0xab8Ce981A19146d263508855efB3F8B40724288C#code' target="_blank" 
                className="font-bold rounded-2xl border-2 border-red-400 px-[15px] py-2 text-xl hover:bg-red-400">Etherscan </a>  
          <Link to="/Token/ERC721" className='font-bold rounded-2xl border-2 border-red-400 px-[15px] py-2 text-xl hover:bg-red-400'>NFT  </Link>
            </div>
        </div>


   <div className='grid grid-cols-1 justify-items-center'>
   <div className='bg-blue-100 w-1/2 rounded-2xl border-4 border-red-400 text-xl px-[15px] py-5 m-3 text-purple-800'>
        <div className='flex flex-row justify-center mr-20'>
        </div>
            <div className='font-bold text-2xl text-center mb-2'>Create auction</div>
            <div className='flex flex-row justify-center' >

            <label>Token ID: </label>
            <input type="text" className='rounded border-solid border-2 pl-2 border-purple-800' onChange={(e)=>{setTokenId(e.target.value as any)}}/>
            <button className='ml-3 font-bold rounded-2xl border-2 border-red-400 px-[15px] hover:bg-red-400' onClick={handleCheck}>Create Auction</button>
        </div>
  </div>

    <Modal  active={showDeploySC}
    setActive={setShowDeploySC}>
<div className='rounded-2xl border-4 border-red-400 text-xl px-[15px] py-5 m-8 text-purple-800'>
  <h1>Show the result of checkin the owner and connection of metamask</h1>
  <div className='grid grid-cols-1 justify-center'>
    <button disabled={!resCheckOwner} onClick={handleDeploy} className='ml-3 m-3 className="font-bold rounded-2xl border-2 border-red-400 px-[15px] hover:bg-red-400'>DEPLOY</button>
    {resCheckOwner ? <p className='bg-green-300 p-2 text-center'>You are the Owner!</p> : <p className='text-center  bg-red-300 p-2'>You are not an Owner!</p>}
    <div>{resultDeployment}</div>
    </div></div>
 </Modal>

 <Modal  active={showDeploySCSecond}
    setActive={setShowDeploySCSecond}>
<div className='w-full rounded-2xl border-4 border-red-400 text-xl px-[15px] py-5 m-8 text-purple-800'>

      <h1>Congatulation! You just created your own smart contract with Auction</h1>
      <h1>You can started any time, just put time, and than u can see ur smart contract in the list below</h1>
        <label className='font-bold'>Time: </label>
        <input className='m-2 rounded border-solid border-2 pl-2 border-purple-800' type="text" onChange={(e)=>{setTimeStart(e.target.value as any)}} placeholder='How many minutes...' />
        <div className='flex justify-center'><button disabled={!resCheckOwner} onClick={handleStart} className='font-bold rounded-2xl m-2 border-2 border-red-400 px-[15px] hover:bg-red-400'>START</button>
    </div></div>
 </Modal>
    
 <div className='bg-blue-100 w-1/2 rounded-2xl border-4 border-red-400 text-xl px-[15px] py-5 m-8 text-purple-800'>
          <div className='font-bold text-center text-3xl m-1'>Live auction</div>

        <ItemAuction />

    </div></div>
    


    </>
  )
}
// 0x61b593bFC4f84c37DE0553B2F1593B617df9C0f7
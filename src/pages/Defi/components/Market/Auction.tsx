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
   
  <div className="flex flex-col bg-gray-100 w-2/3 m-5 ">
    <h1 className='text-5xl font-bold text-center'>AUCTION</h1>
        <div className="bg-blue-100 rounded-2xl border-4 h-max w-1/2 m-5">
          <a href='https://goerli.etherscan.io/address/0x8DEC16652765ddfD5f8fB7fB3620749b89D9e978#code' target="_blank">SMART CONTRACT</a><br />
          <Link to="/Token/ERC721"><a className=' text-3xl rounded-xl'>NFT</a></Link>
        </div>
        <div className="bg-blue-100 rounded-2xl w-full border-4" >
            <div>CReATE AUCTION</div>
            <label>Token ID: </label>
            <input type="text" onChange={(e)=>{setTokenId(e.target.value as any)}}/>
            <button className='bg-orange-200 p-3 rounded-xl' onClick={handleCheck}>Create Auction</button>
        </div>
  </div>

    <Modal  active={showDeploySC}
    setActive={setShowDeploySC}>
<div className='bg-yellow-300 p-5 w-max m-2 opacity-100 text-center text-xl'>
  <h1>First step to create smart contract we need to check if  the currecnt token belongs to you, otherwise you can deploy</h1>
    <button disabled={!resCheckOwner} onClick={handleDeploy} className='bg-purple-200 p-2 w-full rounded-lg'>DEPLOY</button>
    {resCheckOwner ? <p className='bg-green-300 p-2'>You are the Owner!</p> : <p className='bg-red-300 p-2'>You are not an Owner!</p>}
    <div>{resultDeployment}</div>
    </div>
 </Modal>

 <Modal  active={showDeploySCSecond}
    setActive={setShowDeploySCSecond}>


{!loaderSecond ? 
            <div className='flex justify-center m-10'>
              <svg aria-hidden="true" className="mr-2 w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-red-400" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
              </svg>
              <p className="sr-only">Loading...</p>
            </div> : <div className='bg-yellow-300 p-5 w-max mx-10 opacity-100 text-center'><div>
      <h1>Congatulation!🥳 You just created your own smart contract with Auction</h1>
      <h1>Next step, you need to submit 2 transations. First is approve your NFT to this Auction, Second is start this auction!</h1>
      <h1>If you do not submit both transtion the Auction will be disabled!🥺 </h1>
      <h1>Enjoy!</h1>

    <label>Time: </label>
        <input type="text" onChange={(e)=>{setTimeStart(e.target.value as any)}} placeholder='How many minutes...' />
        <button disabled={!resCheckOwner} onClick={handleStart} className='bg-red-200 p-2 rounded-lg'>START</button>
  
    
    </div> </div>
}

 </Modal>
    
    <div className="bg-blue-100 rounded-2xl border-4 w-auto m-20" >
        <div className='text-5xl font-bold text-center'>LIVE AUCTION</div>

        <ItemAuction />

    </div>
    


    </>
  )
}
// 0x61b593bFC4f84c37DE0553B2F1593B617df9C0f7
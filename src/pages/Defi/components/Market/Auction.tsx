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
      setResultDeployment("🙂 Deployed! Now you can Start your smart contract!")
        }
      } catch (error) {
        console.log(error)
      }
    }

// !!!!!!!!!!!!!!!!! STEP #3  START AUCTION THE AUCTION
    const handleStart = async()=>{
      try {
  // #1 CREATE SC INSTANST AND CONNECT TO SIGNER
   // GET NEW SMART CONTRACT FROM FACTORY
        const addressNew = '0xa1166DFec8eCEBCC21A8e8D25777fF98F577a7b9'
        const contractAuctionWithSigner = auctionPutAddressSigner(addressNew)
console.log(contractAuctionWithSigner)
  // #2 APPROVING THE NFT TO NEW AUCTION    
 console.log("Aprroving...")
        const approveTx = await contractERC721WithSigner.approve(addressNew, tokenId);
        await approveTx.wait();
        console.log(approveTx)
// #2 CALL FUNC FROM NEW SMART CONTRACT
  console.log("Starting..")
        const txStart = contractAuctionWithSigner.start(timeStart)
        await txStart.wait();
        console.log(txStart)
  console.log("DONE!!!!..")
      } catch (error) {
        console.log(error)
      }
    }

  return (
    <>
   <Header />
   
  <div className="flex flex-col bg-gray-100 w-2/3 m-5 ">
    <h1 className='text-5xl font-bold text-center'>AUCTION</h1>
        <div className="bg-blue-100 rounded-2xl border-4 h-max w-1/2 m-5">
          <a href='https://goerli.etherscan.io/address/0xab8Ce981A19146d263508855efB3F8B40724288C#code' target="_blank">SMART CONTRACT</a><br />
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
<div className='bg-yellow-300 p-5 w-max mx-10 opacity-100'>
  <h1>Show the result of checkin the owner and connection of metamask</h1>
    <button disabled={!resCheckOwner} onClick={handleDeploy} className='bg-purple-200 p-2 w-full rounded-lg'>DEPLOY</button>
    {resCheckOwner ? <p className='bg-green-300 p-2'>You are the Owner!</p> : <p className='bg-red-300 p-2'>You are not an Owner!</p>}
    <div>{resultDeployment}</div>
    </div>
 </Modal>

 <Modal  active={showDeploySCSecond}
    setActive={setShowDeploySCSecond}>
<div className='bg-yellow-300 p-5 w-max mx-10 opacity-100'>

      <h1>Congatulation! You just created your own smart contract with Auction</h1>
      <h1>You can started any time, just put time, and than u can see ur smart contract in the list below</h1>
        <label>Time: </label>
        <input type="text" onChange={(e)=>{setTimeStart(e.target.value as any)}} placeholder='How many minutes...' />
        <button disabled={!resCheckOwner} onClick={handleStart} className='bg-red-200 p-2 rounded-lg'>START</button>
    </div>
 </Modal>
    
    <div className="bg-blue-100 rounded-2xl border-4 w-auto m-20" >
        <div className='text-5xl font-bold text-center'>LIVE AUCTION</div>

        <ItemAuction />

    </div>
    


    </>
  )
}

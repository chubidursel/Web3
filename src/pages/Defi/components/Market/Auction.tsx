import React, {useState, useEffect} from 'react'
import { ItemAuction } from './components/ItemAuction';
import Header from '../../../../components/headerNew';
import walletProvider from '../../../../abi/walletProvider';
import { contractAuctionFactory } from '../../../../components/smart_contract/AuctionFactory';
import { contractERC721} from '../../../../components/smart_contract/ERC721';
import { auctionPutAddress } from '../../../../components/smart_contract/AuctionSingle';
import { useAppContext } from "../../../../hooks/useAppContext";
import Modal from '../../../../components/modal';
import conectSigner from '../../../../components/smart_contract/SIGNER';
import Loader from '../../../../components/loader';
import getErrorMessage from '../../../../components/getErrorMessage';

export function Auction() {

    const [showDeploySC, setShowDeploySC] = useState(false); // 1st window
    const [showWaitingDeploy, setShowWaitingDeploy] = useState(false); // 2nd window
    const [showDeploySCSecond, setShowDeploySCSecond] = useState(false); // 3rd window
    const [showWaitingActivate, setShowWaitingActivate] = useState(false); // 4th window
    const [showFinalModal, setShowFinalModal] = useState(false); // 5th window

    const [tokenId, setTokenId] = useState();
    const [resCheckOwner, setResCheckOwner] = useState(false);
    const [timeStart, setTimeStart] = useState();
    const [loaderSecond, setLoaderSecond] = useState(false);
    const [loaderThird, setLoaderThird] = useState(false);
    const [resultDeployment, setResultDeployment] = useState("");
    
    const { contextState, updateContextState } = useAppContext();
    const currentAccount = contextState?.currentAccount;
    const [handleStop, setHandleStop] = useState(false)


// >>>>>>>>>> PUT SIGNER HERE INSTED SEPARETE FILE
function auctionPutAddressSigner(address:string){
  const contract = auctionPutAddress(address)
  const signer = walletProvider.getSigner();
  const contractAuctionWithSigner = contract.connect(signer);
  return contractAuctionWithSigner;
}
// !!!!!!!!!!!!  STEP #1  CHECK THE OWNER AND DISPLY MODAL
  const handleCheck = async()=>{
    setShowDeploySC(true)
    const contractERC721WithSigner = conectSigner(contractERC721)
    const chackOwner = await contractERC721WithSigner.ownerOf(tokenId)
    const res = chackOwner.toLowerCase() === currentAccount
    setResCheckOwner(res);
  }
// !!!!!!!!!!!!!!!!!! STEP #2  DEPLOY THE SMART CONTRACT
    const handleDeploy = async()=>{
      setShowDeploySC(false)
      setShowWaitingDeploy(true)
      setHandleStop(true)
      setLoaderSecond(true)
      try {
          const contractAuctionFactoryWithSigner = conectSigner(contractAuctionFactory)
          const createSC = await contractAuctionFactoryWithSigner.createAuction(tokenId)
          const deploedSC = await createSC.wait(1);
          console.log('👨‍💻DEV (new contract info) >>> ', deploedSC)
          setLoaderSecond(false)
          setShowWaitingDeploy(false)
          setShowDeploySCSecond(true)
      } catch (error) {
        setHandleStop(false)
        setLoaderSecond(false)
        const message = getErrorMessage(error);
        setResultDeployment(message)
        setTimeout(() => {setResultDeployment('')}, 3000)
      }
    }

// !!!!!!!!!!!!!!!!! STEP #3  START AUCTION THE AUCTION
    const handleStart = async()=>{
      try {

        setShowDeploySCSecond(false)
        setShowWaitingActivate(true)

  // #1 CREATE SC INSTANST AND CONNECT TO SIGNER  GET NEW SMART CONTRACT FROM FACTORY
  setLoaderThird(true)
  const contractAuctionFactoryWithSigner = conectSigner(contractAuctionFactory)
        const getNewAddr = await contractAuctionFactoryWithSigner.lastDeploed()
        const contractAuctionWithSigner = auctionPutAddressSigner(getNewAddr)
console.log('👨‍💻DEV (new contract addr) >>> ', getNewAddr)

  // #2 APPROVING THE NFT TO NEW AUCTION    
 console.log("Aprroving...")
        const contractERC721WithSigner = conectSigner(contractERC721)
        const approveTx = await contractERC721WithSigner.approve(getNewAddr, tokenId);
        const approveTxResult =  await approveTx.wait();
        console.log('👨‍💻DEV (transation to approve) >>> ', approveTxResult)

// #2 CALL FUNC FROM NEW SMART CONTRACT
         console.log("👨‍💻DEV >> Starting activation")
        const txStart = await contractAuctionWithSigner.start(timeStart)
        const txStartResult =  await txStart.wait(1);
        console.log("👨‍💻DEV >> Starting activation", txStartResult)

        console.log("👨‍💻DEV >> Yahooo we are at the last step!")
        setShowWaitingActivate(false)
        setShowFinalModal(true)
        setHandleStop(false)
      } catch (error) {
        setHandleStop(false)
        console.log(error)
        const message = getErrorMessage(error);
        setResultDeployment(message)
        setTimeout(() => {setResultDeployment('')}, 3000)

      }
    }

  return (
    <>
   <Header marginFromTop={'mt-10'}>
    <div className='text-center py-3'>
      <h1 className='font-bold'>Here you can create a new smart contract and sell NFT!</h1>
      <p>without write a single line of code</p>
      <p>Exited!,isn't it? 🤩</p>
      <p className='pt-2'>How does it work?</p>
      <p>There is factory smart contract with create a Auction contract where you can sell our NFT</p>
      <p>We are going to refresh all functionality soon...</p>
    </div>
   </Header>
   
   <div className='grid grid-cols-1 justify-items-center mt-10'>
   <div className='bg-blue-100 w-1/2 rounded-2xl border-4 border-red-400 text-xl px-[15px] py-5 m-3 text-purple-900'>
        <div className='flex flex-row justify-center mr-20'>
        </div>
            <div className='font-bold text-5xl text-center mb-2'>Create an Auction</div>
            
            <div className='bg-blue-200 rounded-lg my-3 mx-2 p-3'>
                <h1>Explanation 💁</h1>
                <h2>📍 Put your NFT`s ID and press Create </h2>
                <h2>📍 We check is it your token or not</h2>
                <h2>📍 Sign tx to create new Auction contract</h2>
                <h2>📍 Wait for deploying</h2>
                <h2>📍 Activate your Auction by setting time</h2>
                <h2>📍 Congratulation!</h2>
                <h1 className='hover:underline'><a href='https://goerli.etherscan.io/address/0xE61c44eA153807C05EfB7a9B24a603FFBE65A38D#code' target="_blank" 
                >📑 Etherscan</a></h1>
       </div>


            <div className='flex flex-row justify-center mt-6' >

            <input type="number" min={1} placeholder='write your token ID' className='rounded-xl text-center hover:shadow-xl border-solid border-2 pl-2 border-purple-800' onChange={(e)=>{setTokenId(e.target.value as any)}}/>
            <button className='w-1/3 ml-3 font-bold rounded-xl text-3xl hover:shadow-xl border-2 border-red-400 px-[15px] hover:bg-red-400' onClick={handleCheck}>Create</button>
        </div>
  </div>

{/* ------------ 1st WINDOW  (check ownership) ---------------- */}
    <Modal  
    active={showDeploySC}
    setActive={setShowDeploySC}
    marginFromTop={'1/3'}
    handleStop={handleStop}
    >
    
  <div className='rounded-2xl border-4 border-red-400 text-xl px-2 text-center py-5  text-purple-800'>
  <h1>Before we create a new Auction we have to check the ownership of current NFT 🧐</h1>
  <div className='grid grid-cols-1 justify-center'>
  {resCheckOwner ? <button onClick={handleDeploy} className='ml-3 m-3 className="font-bold rounded-xl border-2 border-red-400 px-[15px] hover:bg-red-400 hover:cursor-pointer'>DEPLOY</button>
    : <p className='text-center rounded-xl bg-red-300 p-2'>You are not an Owner! or maybe you've already used your NFT in one of current auctions. Check it!</p>}
    </div></div>
 </Modal>

 {/* ------------ 2st WINDOW  (waiting to reate auction) ---------------- */}
 <Modal  
active={showWaitingDeploy}
setActive={setShowWaitingDeploy}
marginFromTop={'1/3'}
handleStop={handleStop}
    >
  <div className='rounded-2xl border-4 border-red-400 text-xl px-[15px] text-center py-5  text-purple-800'>
  <h1 className='mb-10'>Sign tx to create Smart contract 📝 Wait for deployment</h1>
  {loaderSecond && <Loader />}
  <div className='bg-yellow-100 rounded-lg'>{resultDeployment}</div>
  </div>
 </Modal>

{/* ------------ 3st WINDOW  (activate auction) ---------------- */}
 <Modal  
active={showDeploySCSecond}
setActive={setShowDeploySCSecond}
marginFromTop={'1/3'}
handleStop={handleStop}
>
<div className='w-full rounded-xl border-4 border-red-400 text-xl  p-5 text-purple-800'>

      <h1 className='font-bold mb-2'>Congatulation! You created your own smart contract with Auction</h1>
      <h1>Now we gonna activate your Auction! Write how many mins do you want the auction is being active for.</h1>
        <label className='font-bold'>Time: </label>
        <input className='m-2 rounded-xl border-solid border-2 pl-2 border-purple-800' type="text" min={0} onChange={(e)=>{setTimeStart(e.target.value as any)}} placeholder='minutes' />
        <div className='flex justify-center'>
        <button disabled={!resCheckOwner} onClick={handleStart} className='font-bold w-full rounded-lg m-2 border-2 border-red-400 px-[15px] hover:bg-red-400'>START</button>
    </div></div>
 </Modal>

  {/* ------------ 4th WINDOW  (waiting to Activate auction) ---------------- */}
  <Modal  
  active={showWaitingActivate}
  setActive={setShowWaitingActivate}
  marginFromTop={'1/3'}
  handleStop={handleStop}
    >
    
  <div className='rounded-2xl border-4 border-red-400 text-xl px-[15px] text-center py-5  text-purple-800'>
  <h1>Here we gonna activate you Contract! 👨‍🔧 </h1>
  <h1>📝 Sign first TX to approve transfer NFT token from your address to Auction contract</h1>
  <h1>📝 Sign second TX to activate it</h1>
  {loaderThird && <Loader />} 
  <div className='bg-yellow-100 rounded-lg'>{resultDeployment}</div>
  </div>
 </Modal>

   {/* ------------ 5th WINDOW  (FINAL congrat) ---------------- */}
   <Modal  
  active={showFinalModal}
  setActive={setShowFinalModal}
  marginFromTop={'1/3'}
  handleStop={handleStop}
    >
  <div className='rounded-2xl border-4 border-red-400 text-xl px-[15px] text-center py-5  text-purple-800'>
  <h1 className='text-bold text-3xl '>🥳 Yahooo 🥳 </h1>
  <h1 className='text-bold text-3xl mb-3'> You created Auction!  </h1>
  <h1>What next?🤔 </h1>
  <h1>Auction has to be triggered to finish. As soon as time passed anyone can click at FINISH button. After that, every participant will recive their funds back if they didnt win, and winer will get current NFT </h1>
  </div>
 </Modal>
    

    {/* ------------ AUCTION TABLE ---------------- */}
 <div className='bg-blue-100 w-max rounded-2xl border-4 border-red-400 text-xl px-[15px] py-5 m-8 text-purple-800'>
          <div className='font-bold text-center text-5xl m-1'>All Auctions</div>

        <ItemAuction />

    </div></div>
    


    </>
  )
}








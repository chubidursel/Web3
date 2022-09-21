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
import { AuctionPutAddress, AuctionPutAddressSigner } from '../../../../components/smart_contract/AuctionSingle';
import { useAppContext } from "../../../../hooks/useAppContext";
import Modal from '../../../../components/modal';

export function Auction() {
    const [showDeploySC, setShowDeploySC] = useState(false);
    const [showDeploySCSecond, setShowDeploySCSecond] = useState(false);
    const [tokenId, setTokenId] = useState();
    const [resCheckOwner, setResCheckOwner] = useState(false);
    const [timeStart, setTimeStart] = useState();
    const [arrayAuction, setArrayAuction] = useState([]);
    const [resultDeployment, setResultDeployment] = useState("");
    const addressAuction = "0xE1D5aFb20a6Fe4bD9139D91C9c833dA4c6AAcF12";
    
    const { contextState, updateContextState } = useAppContext();
    const currentAccount = contextState?.currentAccount;

    const abi = [
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "_nft",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "_seller",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "_nftId",
            "type": "uint256"
          }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "address",
            "name": "sender",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          }
        ],
        "name": "Bid",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "internalType": "address",
            "name": "winner",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          }
        ],
        "name": "End",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [],
        "name": "Start",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "address",
            "name": "bidder",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          }
        ],
        "name": "Withdraw",
        "type": "event"
      },
      {
        "inputs": [],
        "name": "bid",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "name": "bids",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "end",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "endAt",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "ended",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "highestBid",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "highestBidder",
        "outputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "nft",
        "outputs": [
          {
            "internalType": "contract IERC721",
            "name": "",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "nftId",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "seller",
        "outputs": [
          {
            "internalType": "address payable",
            "name": "",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "_time",
            "type": "uint256"
          }
        ],
        "name": "start",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "started",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "withdraw",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      }
    ]
    const handleRefresh = async()=>{
      //const lastIndex = await contractAuctionFactoryWithSigner.getLenght()
      const lastIndex = 2
      let arrAddressAuction = [];
      for (let i = 0; i <= lastIndex; i++) {
        let addr = await contractAuctionFactory.listOfAuctions(i)
        arrAddressAuction.push(addr);
      }
      setArrayAuction(arrAddressAuction as any);
      console.log("Done!")
    }
// STEP #1  CHECK THE OWNER AND DISPLY MODAL
  const handleCheck = async()=>{
    setShowDeploySC(!showDeploySC)
    const chackOwner = await contractERC721WithSigner.ownerOf(tokenId)
    const res = chackOwner.toLowerCase() === currentAccount
    setResCheckOwner(res);
  }
// STEP #2  DEPLOY THE SMART CONTRACT
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

// STEP #3  START AUCTION THE AUCTION
    const handleStart = async()=>{
      try {
  // #1 CREATE SC INSTANST AND CONNECT TO SIGNER
   // GET NEW SMART CONTRACT FROM FACTORY
        const addressNew = '0xc87a28c9d3f69f07ba214daa63fbbc64b85924be'
        const contractAuctionWithSigner = AuctionPutAddressSigner(addressNew)
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
      } catch (error) {
        console.log(error)
      }
    }
// CONNECT SINGLE AUCTION TO ETHERS
        const handleEnd = async() =>{

          const address = "0xc87a28C9d3f69f07BA214daa63fBbC64B85924Be"
          const contractSigner = AuctionPutAddressSigner(address);
          const tx = await contractSigner.seller();
          console.log(tx)

         // const address = "0xc87a28C9d3f69f07BA214daa63fBbC64B85924Be"
          //   const contractAuctionFactory = new ethers.Contract(address, abi, defaultProvider);
          //   const signer = walletProvider.getSigner();
          //   const contractAuctionWithSigner = contractAuctionFactory.connect(signer);
          //   const tx = await contractAuctionWithSigner.seller();
          // console.log(tx)
        }

  return (
    <>
   <Header />
   
  <div className="flex flex-col bg-gray-100 w-2/3 m-5 ">
  <button className='w-full bg-green-300 p-5 ' onClick={handleEnd}>TEST</button>
    <h1 className='text-5xl font-bold text-center'>AUCTION</h1>
        <div className="bg-blue-100 rounded-2xl border-4 h-max w-1/2 m-5">
          <a href='https://goerli.etherscan.io/address/0xE1D5aFb20a6Fe4bD9139D91C9c833dA4c6AAcF12#code' target="_blank">SMART CONTRACT</a><br />
          <Link to="/Token/ERC721"><a className=' text-3xl rounded-xl'>NFT</a></Link>
        </div>
        <div className="bg-blue-100 rounded-2xl w-full border-4" >
            <div>START AUCTION</div>
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
    
    <div className="bg-blue-100 rounded-2xl border-4 w-1/2 m-20" >
        <div>LIVE AUCTION</div>
        <p>useeffect from Auction Factory to see current Auction</p>
        <button className='bg-blue-400 px-3 rounded-xl' onClick={handleRefresh}>refresh</button>
        
        <ItemAuction arr={arrayAuction}/>

    </div>
    


    </>
  )
}

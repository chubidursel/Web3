import React, {useState, useEffect} from 'react'
import {PrposalTable} from './DAO_com/tableProp'
import Modal from '../../components/modal';
import { InitiatePropse } from './DAO_com/initiatePropose';
import { contractDAO} from '../../components/smart_contract/Dao_contract';
import { contractERC721} from '../../components/smart_contract/ERC721';
import Header from '../../components/headerNew';
import {Link} from "react-router-dom";

export function DAO() {
  const [initiateProp, setInitiateProp] = useState(false)
  const [amountVote, setAmountVote] = useState()

  useEffect((()=>{
    (async()=>{
      try {
        const numMinted = await contractERC721.numOfNft()
        setAmountVote(numMinted.toString())
        // const numVote = await contractDAO.nextProposal();
        // console.log(numVote)
      } catch (error) {
        console.log(error)
      }
    })()
  }),[])
  const[amount, setAmount] = useState(false)
  const handleToggle=()=>{setAmount(true)} 

  return (<>
  <Header marginFromTop={'1/3'}>
    <div className='text-center p-4'>
      <h1 className='font-bold'>There is a simple implemetation of DAO</h1>
      <p>How does it work?</p>
      <p>The NFT-holders can create an proposal and vote for them</p>
      <p>If you want to participate and be a member of our DAO you need to get one of our token which u can get in a few different way (buy it on the Auction, in the shop or buy dirrectly from the smart contract)</p>
      <p>PS: We are going to add more feautures here such as a basic standard of Governant contract with TimeLock</p>
    </div>
  </Header>
      <div>
            <h2 className="flex justify-center text-6xl text-blue-100 font-bold m-3 mb-5">DAO</h2>
            <div className="flex justify-center space-x-4 text-white m-6">
                <a href='https://goerli.etherscan.io/address/0x76086675490192222654F93a15761f53a5B96a15#code' target="_blank" 
                className="font-bold rounded-2xl border-2 border-red-400 px-[15px] py-2 text-xl hover:bg-red-400">Etherscan </a>  
             
             <Link to="/Token/ERC721"> <button className="font-bold rounded-2xl border-2 border-red-400 px-[15px] py-2 text-xl hover:bg-red-400">
            NFT token</button> </Link>
            <button onClick={handleToggle} className="font-bold rounded-2xl border-2 border-red-400 px-[15px] py-2 text-xl hover:bg-red-400">
            Amount of votes</button> 
            </div>
            <div className='flex justify-center'>
            <button onClick={()=>{setInitiateProp(!initiateProp)}} className='w-1/3 text-white font-bold rounded-2xl border-2 border-red-400 px-[15px] py-2 text-4xl hover:bg-red-400'>
            Initiate proposal</button> </div>
        </div>
        <div className='flex justify-center mt-5'> 
         
    <PrposalTable /></div>
    <Modal 
    active={initiateProp}
    setActive={setInitiateProp}
    marginFromTop={'1/3'}
    >
      
      <InitiatePropse />
    </Modal>

    <Modal  active={amount} setActive={setAmount} marginFromTop={'1/3'}>
      <div className='text-center'>
        <p className='font-bold text-2xl mt-5 text-purple-800'> Amount of votes: {amountVote}</p> <br />
        <p>Right now this amount of NFT token has been minted.</p>
        <p>In our simple DAO implementation 1 token = 1 vote.</p>
      </div>
    </Modal>
    </>
  )
}

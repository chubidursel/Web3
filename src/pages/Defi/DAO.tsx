import React, {useState, useEffect} from 'react'
import {PrposalTable} from './DAO_com/tableProp'
import Modal from '../../components/modal';
import { InitiatePropse } from './DAO_com/initiatePropose';
import { contractDAO, contractDAOWithSigner} from '../../components/smart_contract/Dao_contract';
import { contractERC721, contractERC721WithSigner} from '../../components/smart_contract/ERC721';
import Header from '../../components/headerNew';

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
  <Header>This is simple DAO project. If you have one of our NFT you can vote or create proposal</Header>
  <div> 
            <h2 className="flex justify-center text-5xl text-blue-100 font-bold m-3 mb-10">Decentralized Autonomous Organisation</h2>
            <div className="flex justify-center space-x-4 text-white m-6">
                <a href='https://goerli.etherscan.io/address/0x76086675490192222654F93a15761f53a5B96a15#code' target="_blank" 
                className="font-bold rounded-2xl border-2 border-red-400 px-[15px] py-2 text-xl hover:bg-red-400">Etherscan </a>  
             <button onClick={()=>{setInitiateProp(!initiateProp)}} className="font-bold rounded-2xl border-2 border-red-400 px-[15px] py-2 text-xl hover:bg-red-400">
            Initiate purpose</button> 
            <button onClick={handleToggle} className="font-bold rounded-2xl border-2 border-red-400 px-[15px] py-2 text-xl hover:bg-red-400">
            Amount of votes</button> 
           
            
            </div>
        </div>
        <div className='flex justify-center'> 
    <PrposalTable /></div>
    <Modal 
    active={initiateProp}
    setActive={setInitiateProp}
    >
      <InitiatePropse />
    </Modal>

    <Modal 
    active={amount}
    setActive={setAmount}
    >
  <p className='font-bold text-xl text-purple-800'> Amount of votes: {amountVote}</p>
    </Modal>
    </>
  )
}

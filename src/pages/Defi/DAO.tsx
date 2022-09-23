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

  return (<>
  <Header>This is simple DAO project. If you have one of our NFT you can vote or create proposal</Header>
    <div>
        <div className='bg-blue-200'>
          <h1>Governance overvview</h1>
          <div className='bg-blue-100 flex flex-col'>
          <a href='https://goerli.etherscan.io/address/0x76086675490192222654F93a15761f53a5B96a15#code' target="_blank" 
                className="font-bold rounded-2xl border-2 border-red-400 px-[15px] py-2 text-xl hover:bg-red-400">Etherscan </a>
            <h1>Info</h1>
            <p>simple DAO project where NFT-holdres can create proposal and vote for it</p>
            <h1>smart contract: 0x76086675490192222654F93a15761f53a5B96a15</h1>
            <h1>amount of votes: {amountVote}</h1>
          </div>
        </div>

              <button className='bg-red-300 py-3 px-5 hover:bg-red-500' onClick={()=>{setInitiateProp(!initiateProp)}}>initiate purpose</button>

        
    </div>
    <PrposalTable />
    <Modal 
    active={initiateProp}
    setActive={setInitiateProp}
    >
      <InitiatePropse />
    </Modal>
    </>
  )
}

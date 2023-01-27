import {useState, useEffect, useRef} from 'react'
import {PrposalTable} from './DAO_com/tableProp'
import Modal from '../../components/modal';
import { InitiatePropse } from './DAO_com/initiatePropose';
import { contractDAO} from '../../components/smart_contract/Dao_contract';
import { contractERC721} from '../../components/smart_contract/ERC721';
import Header from '../../components/headerNew';
import {Link} from "react-router-dom";
import { ethers } from "ethers";

export function DAO() {
  const [initiateProp, setInitiateProp] = useState(false)
  const [amountVote, setAmountVote] = useState()
  const [quorum, setQuorum] = useState("")



  useEffect((()=>{
    (async()=>{
      try {
        const numMinted = await contractERC721.amountMintedNFT()
        setAmountVote(numMinted.toString())

        const q =  await contractDAO.quorum()
        setQuorum(q.toString())
      } catch (error) {
        console.log(error)
      }
    })()
  }),[])

  // --------------GENERETE FUNC SELECTOR------------------------
  const [resSelecotr, setResSelector] = useState('')
  const funcSelRef = useRef<HTMLInputElement>()
  const paramsRef = useRef<HTMLInputElement>()

  const handleFuncSel = ()=>{
console.log(  typeof funcSelRef.current?.value, funcSelRef.current?.value)
    let ABI2 = [
      "function transfer(address to, uint amount)"
      ];
      let ABI = [
        funcSelRef.current?.value
        ];

  let iface = new ethers.utils.Interface(ABI2);
  const res = iface.encodeFunctionData("transfer", [ "0x1234567890123456789012345678901234567890", 21 ])
  console.log("DEV (ABI)>>>", ABI)
  console.log("DEV (ABI2)>>>", ABI2)
  console.log("DEV (iface)>>>", iface)
  // console.log("DEV (bytes)>>>", res)
   

    setResSelector(res)
  }
  async function copyTextToClipboard(text:string) {
    if ('clipboard' in navigator) {
      return await navigator.clipboard.writeText(text);
    } else {
      return document.execCommand('copy', true, text);
    }
  }


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
                <a href='https://goerli.etherscan.io/address/0x6d30cdc795E5036397a21C8F376E2Deb7714f93B#code' target="_blank" 
                className="font-bold rounded-2xl border-2 border-red-400 px-[15px] py-2 text-xl hover:bg-red-400">Etherscan </a>  
             
             <Link to="/Token/ERC721"> <button className="font-bold rounded-2xl border-2 border-red-400 px-[15px] py-2 text-xl hover:bg-red-400">
            NFT token</button> </Link>
            <button onClick={handleToggle} className="font-bold rounded-2xl border-2 border-red-400 px-[15px] py-2 text-xl hover:bg-red-400">
            Votes</button> 
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
    marginFromTop={'top-10'}
    >
      
      <InitiatePropse />
    </Modal>

    <Modal  active={amount} setActive={setAmount} marginFromTop={'top-1/3'}>
      <div className='text-center'>
        <p className='font-bold text-2xl mt-5 text-purple-800'> Amount of Minted NFT: {amountVote}</p>
        <p>In our DAO implementation 1 NFT holder = 1 vote.</p>

        <p className='font-bold text-2xl mt-5 text-purple-800'> Quorum: {quorum}</p>
        <p>Quorum required for a proposal to pass.</p>

        <div className='bg-gray-200 rounded-lg py-2 px-2 my-3 text-xl'>
            <p>⚙️ CREATE FUNC SELECTOR ⚙️</p>
            <input ref={funcSelRef} className='w-full my-2 rounded-lg px-2 text-center' type="text" placeholder='transfer(address, uint256)'/>
            <input ref={paramsRef} className='w-full my-2 rounded-lg px-2 text-center' type="text" placeholder='0x123, 21'/>
            <button onClick={handleFuncSel} className='bg-gray-300 hover:bg-gray-400 w-full rounded-lg text-2xl'>generate</button>
            {resSelecotr && <h1 className='mt-1 text-center bg-slate-100 rounded-lg py-2 hover:underline hover:cursor-copy' onClick={()=>{copyTextToClipboard(resSelecotr)}}>{resSelecotr.slice(0, 10) + "..."}</h1>} 
        </div>
      </div>

      
    </Modal>


    </>
  )
}

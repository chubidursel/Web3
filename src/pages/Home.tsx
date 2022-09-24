import { useState } from "react";
import Coin from "../assets/coin.png"
import Defi from "../assets/Defi.png"
import Tool from "../assets/tool.png"
import {Link} from "react-router-dom"
import Header from '../components/headerNew'
import Sidebar from "../components/Sidebar";




export function Home() {

  const [isToken, setToken] = useState(false);
  const [isDefi, setDefi] = useState(false);
  const [isOther, setOther] = useState(false);

  const desc = (<>
  <div className="">
  <h1 className="text-2xl underline text-center">Desciptions</h1>
  <h1 className="pb-2 ">This projest is made for educatinal purpose and to represent skills of these dudes <a href="https://www.linkedin.com/in/danil-kozhevnikov-a14b66232/" className="hover:animate-ping" target='_blank'>👨</a> 👨 </h1>
  
  <h1>📌Tech stach is used in this project:  </h1>
    <p>Front-end: Typescript, React, Tailwind</p>
    <h1>Back-end: Solidity, Hardhat, Ethers.js</h1>
    <div>
      <div>Smart contract: </div>
      <ul>
        <li>ERC20 </li>
        <li>ERC721 (NFT)</li>
        <li>Exchange (convert ERC20 to testnet ETH)</li>
      </ul>
    </div>
  <h1>This project is always involed and we always add some </h1>
    <h1 className="pt-2 text-gray-400">PS: You always can click at FAQ and see how does certain feature work</h1>
  </div></>)


  return (
    <>
    <Header>{desc}</Header>
 
    <div className="flex  flex-row justify-around mt-40">
    <Link to="Token" onMouseEnter={() => setToken(!isToken)} onMouseLeave={() => setToken(!isToken)}><img src={Coin} alt="coin"  className='h-60 hover:animate-spin'/>
    {isToken && <div className="text-5xl font-bold text-white text-center">Tokens</div>}
    </Link>
    <Link to="Defi" onMouseEnter={() => setDefi(!isDefi)} onMouseLeave={() => setDefi(!isDefi)}><img src={Defi} alt="Defi" className='h-60 hover:animate-bounce'/>
    {isDefi && <div className="text-5xl font-bold text-white text-center">DeFi</div>}
    </Link>
    <Link to="Other" onMouseEnter={() => setOther(!isOther)} onMouseLeave={() => setOther(!isOther)}><img src={Tool} alt="tools" className='h-60 hover:animate-spin'/>
    {isOther && <div className="text-5xl font-bold text-white text-center">Other</div>}
    </Link>
    
    
    </div>




    </>
  )
}


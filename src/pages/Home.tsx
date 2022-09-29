import { useState } from "react";
import Coin from "../assets/coin.png"
import Defi from "../assets/Defi.png"
import Tool from "../assets/tool.png"
import {Link} from "react-router-dom"
import Header from '../components/headerNew'


export function Home() {

  const [isToken, setToken] = useState(false);
  const [isDefi, setDefi] = useState(false);
  const [isOther, setOther] = useState(false);

  const [active, setActive] = useState(false);
  const handleModal = () => setActive(true)


  const desc = (<>
  <div >
    <div className=" text-center mb-2 italic ">
    <p>Heyy user! 👋 </p>
    <p>Nice to see ya here! </p>
    <p>Do you want to see  and interact with the new generation of WEB?</p>
    <p>There are no private server where we store ur data and all code that run ubder the hood you can see on open sourses (like Etherscan) </p>
    <p>check out the whole app on <a href="https://github.com/chubidursel/Web3" className="hover:underline font-semibold">github</a></p>
    </div>
  <h1 className="text-2xl font-bold underline text-center">Desciptions</h1>
  <h1 className="pb-2 ">This projest is made for educatinal purpose and to represent skills of these dudes <a href="https://www.linkedin.com/in/danil-kozhevnikov-a14b66232/" className="hover:animate-ping" target='_blank'>👨</a> 👨</h1>
    <h1 className="pt-4 text-gray-400">PS: You always can click at FAQ and see how does certain feature work</h1>
  </div></>)

  return (
    <>
    <Header>{desc}</Header>
    <div className="flex  flex-row justify-around mt-40 flex-wrap">
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


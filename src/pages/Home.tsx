import React from 'react'
import Coin from "../assets/coin.png"
import Defi from "../assets/Defi.png"
import Tool from "../assets/tool.png"
import {Link} from "react-router-dom"
import Header from '../components/header'
import ReactTooltip from 'react-tooltip';

// CSS how to put them in the center?
// max-width for small devices

export function Home() {
  return (
    <>
    <ReactTooltip type='light' effect="solid" data-event-off='onmouseout'/>
    <Header />
    <div className="flex  flex-row justify-around mt-40">
    <Link to="Token"><img src={Coin} alt="coin" className='h-60 hover:animate-spin' data-tip="Something about token"/></Link>
    <Link to="Defi"><img src={Defi} alt="Defi" className='h-60 hover:animate-bounce' data-tip="Something about DeFi"/></Link>
    <Link to="Other"><img src={Tool} alt="tools" className='h-60 hover:animate-spin' data-tip="Something interesting"/></Link>
    
    
    </div>


    </>
  )
}


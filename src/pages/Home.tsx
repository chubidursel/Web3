import React from 'react'
import Coin from "../assets/coin.png"
import Defi from "../assets/Defi.png"
import Tool from "../assets/tool.png"
import {Link} from "react-router-dom"
import {useState} from 'react'
import { Tooltip, Button } from "@material-tailwind/react";
import Header from '../components/header'


// CSS how to put them in the center?
// max-width for small devices

export function Home() {
  //const [visible, setVisible] = useState(false)
  return (
    <>
    <Header />
    <div className="flex  flex-row justify-around mt-40">
    <Link to="Token"><img src={Coin} alt="coin" className='h-60 hover:animate-spin' /></Link>
    <Link to="Defi"><img src={Defi} alt="Defi" className='h-60 hover:animate-bounce'/></Link>
    <Link to="Other"><img src={Tool} alt="tools" className='h-60 hover:animate-spin'/></Link>
    
    
    </div>


    </>
  )
}


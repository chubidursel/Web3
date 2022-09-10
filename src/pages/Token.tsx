import React from 'react'
import { useState } from "react";
import {Link} from "react-router-dom"


//onClick={prev => setDis(!prev)}
export function Token() {

  return (
    <>
    <div className='flex flex-raw justify-around text-5xl font-bold text-gray-100 mt-40'>
 
      <Link to="/Token/ERC20"><div className="cursor-pointer hover:underline">ERC20</div></Link>
      
      <div>ERC721</div>
      <div>ERC1155</div>
    </div>


    </>
  )
}
// const [dis, setDis] = useState(false)
// import { Tooltip, Button } from "@material-tailwind/react";
// {dis && <TokenCard />}
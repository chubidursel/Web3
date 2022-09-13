import React from 'react'
import { useContext } from "react";
import {Link} from "react-router-dom"
import Header from '../components/header'

//onClick={prev => setDis(!prev)}
export function Token() {
 
  return (
    <>
    <Header />
    <div className='flex flex-raw justify-around text-5xl font-bold text-gray-100 mt-40'>
 
      <Link to="/Token/ERC20"><div className="cursor-pointer hover:underline">ERC20</div></Link>
      
      <Link to="/Token/ERC721" className="hover:underline"> <div>ERC721</div></Link>
      <div>ERC1155</div>
     
    </div>


    </>
  )
}
// const [dis, setDis] = useState(false)
// import { Tooltip, Button } from "@material-tailwind/react";
// {dis && <TokenCard />}
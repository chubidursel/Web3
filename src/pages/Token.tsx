import { useState } from "react";
// import { Modal } from "react-bootstrap"
import {Link} from "react-router-dom"
import Header from '../components/headerNew'


export function Token() {
 
  const [active, setActive] = useState(false);
// const handleModal = () => setActive(true)


  return (
    <>
    <Header>There are 3 most common standart of token implementation</Header>
 
    <div className='flex flex-raw justify-around text-5xl font-bold text-gray-100 mt-40'>
      <Link to="/Token/ERC20"><div className="cursor-pointer hover:underline">ERC20</div></Link>
      <Link to="/Token/ERC721" className="hover:underline"> <div>ERC721</div></Link>
      <Link to="/Coming_soon" className='hover:underline'><h1>ERC1155</h1></Link>
    </div>
    </>
  )
}

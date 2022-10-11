import { useState } from "react";
// import { Modal } from "react-bootstrap"
import {Link} from "react-router-dom"
import Header from '../components/headerNew'


export function Token() {
 
  const [active, setActive] = useState(false);
// const handleModal = () => setActive(true)


  return (
    <>
    <Header marginFromTop={'top-1/3'}>There are 3 most common standart of token implementation</Header>
 
    <h2 className="flex justify-center text-6xl mt-3 text-blue-100 font-bold">Token</h2>

<div className='flex justify-center'>
<div className='grid grid-cols-1 w-1/3 text-5xl text-purple-800 text-center font-bold justify-center mt-5'>
  <Link to="/Token/ERC20"><div className="bg-blue-100 rounded-2xl border-4 hover:shadow-2xl border-red-400 m-2 p-5 hover:bg-blue-200 hover:animate-pulse">ERC20</div></Link>
      <Link to="/Token/ERC721" className="bg-blue-100 rounded-2xl border-4 hover:shadow-2xl border-red-400 m-2 p-5 hover:bg-blue-200 hover:animate-pulse"> <div>ERC721</div></Link>
      <Link to="/Coming_soon" className="bg-blue-100 rounded-2xl border-4 hover:shadow-2xl border-red-400 m-2 p-5 hover:bg-blue-200 hover:animate-pulse"><h1>ERC1155</h1></Link>
    </div>
    </div>


    </>
  )
}

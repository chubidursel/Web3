import { useState, useEffect } from "react";
import {Link} from "react-router-dom"

export default function Sidebar() {
  const [isTokenVisible, setTokenVisible] = useState(false);
  const [isDefiVisible, setDefiVisible] = useState(false);
  const [isOtherVisible, setOtherVisible] = useState(false);
  const [isDropVisible, setDropVisible] = useState(false);


  useEffect(() => {
  if (isTokenVisible){
    setDefiVisible(false)
    setOtherVisible(false)
    setDropVisible(false)
  }
}, [isTokenVisible])
  
  useEffect(() => {
  if (isDefiVisible){
    setTokenVisible(false)
    setOtherVisible(false)
    setDropVisible(false)
  }}, [isDefiVisible])
  
  useEffect(() => {
  if (isOtherVisible){
    setTokenVisible(false)
    setDefiVisible(false)}
}, [isOtherVisible])


    return (
<div>
<nav>
  <div>
          <ul className="flex space-x-8 text-2xl text-white font-semibold">
        <li>
        <Link to="../" className="block py-2 pr-4 pl-3 text-white rounded hover:bg-transparent hover:text-pink-400">Home</Link> 
        </li>
        <li>
        <Link to="../Token" onMouseEnter={() => setTokenVisible(!isTokenVisible)} 
        className="block py-2 pr-4 pl-3 text-white rounded md:hover:bg-transparent md:hover:text-pink-400">Tokens</Link>
        </li>
        <li>
        <Link to="../Defi"  onMouseEnter={() => setDefiVisible(!isDefiVisible)} className="block py-2 pr-4 pl-3 text-white rounded md:hover:bg-transparent md:hover:text-pink-400">DeFi</Link>
        </li>
        <li>
        <button onMouseEnter={() => setOtherVisible(!isOtherVisible)} className="block py-2 pr-4 pl-3 text-white rounded md:hover:bg-transparent md:hover:text-pink-400">Other</button>
        </li>  
      </ul>
    </div>
</nav>

{isTokenVisible && (
        <div onMouseLeave={() => setTokenVisible(!isTokenVisible)}
        className="font-semibold absolute right-2/4 opacity-70 mt-2 rounded-md bg-white"
        >
            <Link to="../Token/ERC20" className="w-full text-pink-700 block px-4 py-2 text-xl  hover:bg-pink-400 rounded-md">ERC20</Link>
            <Link to="../Token/ERC721" className="w-full text-pink-700 block px-4 py-2 text-xl  hover:bg-pink-400 rounded-md">ERC720</Link>
            <Link to="../Coming_soon" className="w-full text-pink-700 block px-4 py-2 text-xl  hover:bg-pink-400 rounded-md">ERC1151</Link>
       </div>
      )}

{isDefiVisible && (
        <div onMouseLeave={() => setDefiVisible(!isDefiVisible)}
        className="font-semibold absolute left-1/2 opacity-70 mt-2 rounded-md bg-white">
            <Link to="../Defi/exchange" className="w-full text-pink-700 block px-4 py-2 text-xl  hover:bg-pink-400 rounded-md">Exchange</Link>
            <Link to="../Defi/vault" className="w-full text-pink-700 block px-4 py-2 text-xl  hover:bg-pink-400 rounded-md">Vault</Link>
            <Link to="../Coming_soon" className="w-full text-pink-700 block px-4 py-2 text-xl  hover:bg-pink-400 rounded-md">Swap</Link>
            <Link to="../Coming_soon" className="w-full text-pink-700 block px-4 py-2 text-xl  hover:bg-pink-400 rounded-md">ChainLink</Link>
            <Link to="../Coming_soon" className="w-full text-pink-700 block px-4 py-2 text-xl  hover:bg-pink-400 rounded-md">DAO</Link>
       </div>
      )}


{isOtherVisible && (
        <div onMouseLeave={() => setOtherVisible(!isOtherVisible)}
        className="font-semibold absolute right-1/3 opacity-70 mt-2 rounded-md bg-white">
            <Link to="../Coming_soon" className="w-full text-pink-700 block px-4 py-2 text-xl  hover:bg-pink-400 rounded-md">Game</Link>
            <Link to="../Coming_soon" className="w-full text-pink-700 block px-4 py-2 text-xl  hover:bg-pink-400 rounded-md">Note</Link>
            <Link to="../Coming_soon" className="w-full text-pink-700 block px-4 py-2 text-xl  hover:bg-pink-400 rounded-md">Converter</Link>
            <Link to="../Coming_soon" className="w-full text-pink-700 block px-4 py-2 text-xl  hover:bg-pink-400 rounded-md">Dropdown</Link>
            <Link to="../Coming_soon" className="w-full text-pink-700 block px-4 py-2 text-xl  hover:bg-pink-400 rounded-md">Social media</Link>
       </div>
      )}


{isDropVisible && (<div className="font-semibold absolute right-1/4 top-1/4 opacity-60 mt-2 rounded-md bg-white">
            <Link to="../Coming_soon" className="w-full text-pink-700 block px-4 py-2 text-xl  hover:bg-pink-400 rounded-md">Game</Link>
            <Link to="../Coming_soon" className="w-full text-pink-700 block px-4 py-2 text-xl  hover:bg-pink-400 rounded-md">Note</Link>
       </div>
      )}

</div>)} 





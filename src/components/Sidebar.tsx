import { useState, useEffect } from "react";
import {Link} from "react-router-dom"

export default function Sidebar() {
//   const [isTokenVisible, setTokenVisible] = useState(false);
//   const [isDefiVisible, setDefiVisible] = useState(false);
//   const [isOtherVisible, setOtherVisible] = useState(false);
//   const [isDropVisible, setDropVisible] = useState(false);
// const tokenMenu = [{nam: "ERC20", path:"../Token/ERC20"}, {nam: 'ERC721', path:'../Token/ERC721'}, {nam: "ERC1151", path:"../Coming_soon"}]
// const defiMenu = [{nam: "Exchange", path:"../Defi/exchange"}, {nam: 'Vault', path:'../Defi/vault'}, {nam: "Swap", path:"../Coming_soon"}, {nam: "ChainLink", path:"../Coming_soon"}, {nam: "DAO", path:"../Coming_soon"}]
// const otherMenu = [{nam: "Game", path:"../Coming_soon"}, {nam: 'Note', path:'../Coming_soon'}, {nam: "Converter", path:"../Coming_soon"}, {nam: "Dropdown", path:"../Coming_soon"}, {nam: "Social media", path:"../Coming_soon"}]

  

//   useEffect(() => {
//   if (isTokenVisible){
//     setDefiVisible(false)
//     setOtherVisible(false)
//     setDropVisible(false)
//   }
// }, [isTokenVisible])
  
//   useEffect(() => {
//   if (isDefiVisible){
//     setTokenVisible(false)
//     setOtherVisible(false)
//     setDropVisible(false)
//   }}, [isDefiVisible])
  
//   useEffect(() => {
//   if (isOtherVisible){
//     setTokenVisible(false)
//     setDefiVisible(false)}
// }, [isOtherVisible])

// const handleToken = () => setTokenVisible(!isTokenVisible)
// const handleDefi = () => setDefiVisible(!isDefiVisible)
// const handleOther = () => setOtherVisible(!isOtherVisible)
    return (
    <div className="bg-green-300">
    <nav>
        <ul className="flex space-x-8 text-2xl text-white font-semibold">
            <li>
            <Link to="../" className="block py-2 pr-4 pl-3 text-white rounded hover:bg-transparent hover:text-pink-400">Home</Link> 
            </li>
            <li>
            <Link to="../Token" 
            className="block py-2 pr-4 pl-3 text-white rounded md:hover:bg-transparent md:hover:text-pink-400">Tokens</Link>
            </li>
            <li>
            <Link to="../Defi" className="block py-2 pr-4 pl-3 text-white rounded md:hover:bg-transparent md:hover:text-pink-400">DeFi</Link>
            </li>
            <li>
            <Link to="../Other" className="block py-2 pr-4 pl-3 text-white rounded md:hover:bg-transparent md:hover:text-pink-400">Other</Link>
            </li>  
        </ul>
    
    </nav>

{/* {isTokenVisible && (
        <div onMouseLeave={() => setTokenVisible(!isTokenVisible)}
        className="font-semibold absolute right-2/4 opacity-100 mt-2 rounded-md bg-white"
        >
           {tokenMenu.map(el => (<Link to={el.path} className="w-full text-pink-700 block px-4 py-2 text-xl  hover:bg-pink-400 rounded-md">{el.nam}</Link>))} 
       </div>
      )}

{isDefiVisible && (
        <div onMouseLeave={() => setDefiVisible(!isDefiVisible)}
        className="font-semibold absolute left-1/2 opacity-100 mt-2 rounded-md bg-white">
            {defiMenu.map(el => (<Link to={el.path} className="w-full text-pink-700 block px-4 py-2 text-xl  hover:bg-pink-400 rounded-md">{el.nam}</Link>))} 
       </div>
      )}

{isOtherVisible && (
        <div onMouseLeave={() => setOtherVisible(!isOtherVisible)}
        className="font-semibold absolute right-1/3 opacity-100 mt-2 rounded-md bg-white">
           {otherMenu.map(el => (<Link to={el.path} className="w-full text-pink-700 block px-4 py-2 text-xl  hover:bg-pink-400 rounded-md">{el.nam}</Link>))} 
       </div>
      )}


{isDropVisible && (<div className="font-semibold absolute right-1/4 top-1/4 opacity-60 mt-2 rounded-md bg-white">
            <Link to="../Coming_soon" className="w-full text-pink-700 block px-4 py-2 text-xl  hover:bg-pink-400 rounded-md">Game</Link>
            <Link to="../Coming_soon" className="w-full text-pink-700 block px-4 py-2 text-xl  hover:bg-pink-400 rounded-md">Note</Link>
       </div>
      )} */}

</div>)} 





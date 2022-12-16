import { Link } from "react-router-dom"
import { useState } from 'react';
import Modal from '../../../components/modal';
import { Faucet } from "./faucet";

const HeaderToken = ({handleToggle}) => {
    const [active, setActive] = useState(false);
   
    return ( <>
        <div>
            <h2 className="text-5xl text-blue-100 font-bold m-5 text-center">CryptoWorldToken</h2>
          
            <div className="flex justify-between text-white gap-4">
                <a href='https://goerli.etherscan.io/address/0x9fa7096177A9eDC1547cCA1345B6a9C9e3A7eA6D#code' target="_blank" 
                className="font-bold rounded-2xl border-2 border-red-400 px-[15px] py-2 text-xl hover:bg-red-400">Etherscan </a>
            
            <Link to="/Defi/exchange" className="font-bold rounded-2xl border-2 border-red-400 px-[15px] py-2 text-xl hover:bg-red-400">
            Exchange</Link>

            <Link to="/Game" className="font-bold rounded-2xl border-2 border-red-400 px-[15px] py-2 text-xl hover:bg-red-400">
            Game</Link>

            <button onClick={()=>setActive(true)} className="font-bold rounded-2xl border-2 border-red-400 px-[15px] py-2 text-xl hover:bg-red-400">
            Faucet</button> 
            
            <button onClick={handleToggle} className="font-bold rounded-2xl border-2 border-red-400 px-[15px] py-2 text-xl hover:bg-red-400">
            Events</button> 
           
            
            </div>
        </div>


<Modal
   active={active}
   setActive={setActive}
   marginFromTop={'top-1/5'}
   >
   <Faucet />
   
   </Modal>
        </> );
}
 
export default HeaderToken;


import { Link } from "react-router-dom"
import {useState} from 'react';

const HeaderToken = () => {
    const [showEvent, setShowEvents] = useState(false)
    return ( <>
        <div className=''>
            <h2 className="text-5xl text-blue-100 font-bold m-3 mb-10">CryptoWorldToken</h2>
          
            <div className="flex justify-around p-2 m-3 text-white">
                <a href='https://goerli.etherscan.io/address/0x9fa7096177A9eDC1547cCA1345B6a9C9e3A7eA6D#code' target="_blank">
                <span className="font-bold rounded-2xl border-2 border-red-400 px-[15px] py-2 text-xl hover:bg-red-400">
                    Etherscan 
                </span></a>
            
            <Link to="/Defi/exchange" ><span className="mr-6 font-bold rounded-2xl border-2 border-red-400 px-[15px] py-2 text-xl hover:bg-red-400">
            Exchange</span> </Link>

            <button onClick={()=>setShowEvents(!showEvent)}
            className="font-bold rounded-2xl active:bg-red-600 border-2 border-red-400 px-[15px] py-2 text-xl hover:bg-red-400">
                Events 
            </button>
            
            </div>
        </div>
        </> );
}
 
export default HeaderToken;


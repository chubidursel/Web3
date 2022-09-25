import { Link } from "react-router-dom"


const HeaderToken = ({handleToggle}) => {
   
    return ( <>
        <div>
            <h2 className="text-5xl text-blue-100 font-bold m-3 mb-10">CryptoWorldToken</h2>
          
            <div className="flex justify-between text-white">
                <a href='https://goerli.etherscan.io/address/0x9fa7096177A9eDC1547cCA1345B6a9C9e3A7eA6D#code' target="_blank" 
                className="font-bold rounded-2xl border-2 border-red-400 px-[15px] py-2 text-xl hover:bg-red-400">Etherscan </a>
            
            <Link to="/Defi/exchange" className="font-bold rounded-2xl border-2 border-red-400 px-[15px] py-2 text-xl hover:bg-red-400">
            Exchange</Link>

            
            <button onClick={handleToggle} className="font-bold rounded-2xl border-2 border-red-400 px-[15px] py-2 text-xl hover:bg-red-400">
            Events</button> 
           
            
            </div>
        </div>
        </> );
}
 
export default HeaderToken;


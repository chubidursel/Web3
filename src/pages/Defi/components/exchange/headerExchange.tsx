import { Link } from "react-router-dom"


const HeaderExchange = ({handleToggle}) => {
   
    return ( <>
        <div>
            <h2 className="text-5xl text-blue-100 font-bold m-3 mb-10">Crypto exchange</h2>
          
            <div className="flex justify-between text-white">
                <a href='https://goerli.etherscan.io/address/0xB93FE087284F4b38535260Ac9B1eC8060Ae9f245' target="_blank" 
                className="font-bold rounded-2xl border-2 border-red-400 px-[15px] py-2 text-xl hover:bg-red-400">Etherscan </a>
            
            <Link to="/Token/ERC20" className="font-bold rounded-2xl border-2 border-red-400 px-[15px] py-2 text-xl hover:bg-red-400">
            Token ERC20</Link>

            
            <button onClick={handleToggle} className="font-bold rounded-2xl border-2 border-red-400 px-[15px] py-2 text-xl hover:bg-red-400">
            Events</button> 
           
            
            </div>
        </div>
        </> );
}
 
export default HeaderExchange;


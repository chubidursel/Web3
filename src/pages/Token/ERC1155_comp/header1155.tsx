import { Link } from "react-router-dom"

const HeaderToken = () => {
   
    return ( <>
        <div>
            <h2 className="text-5xl text-blue-100 font-bold m-3 mb-10 text-center">GAME TOKENS</h2>
          
            <div className="flex justify-center gap-10 text-white">
                <a href='https://goerli.etherscan.io/address/0xa361b53deA0878fe9310B4ac941AFE3ba2C56a63#code' target="_blank" 
                className="font-bold rounded-2xl border-2 border-red-400 px-[15px] py-2 text-xl hover:bg-red-400">Etherscan </a>
            
            <a href='https://testnets.opensea.io/collection/web3-space-coins' target="_blank" 
                className="font-bold rounded-2xl border-2 border-red-400 px-[15px] py-2 text-xl hover:bg-red-400">OpenSea </a>

            
<Link to="/Game" className="font-bold rounded-2xl border-2 border-red-400 px-[15px] py-2 text-xl hover:bg-red-400">
            Game</Link>
           
            
            </div>
        </div>
        </> );
}
 
export default HeaderToken;


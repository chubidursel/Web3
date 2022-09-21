import { Link } from "react-router-dom"


const HeaderTokenNft = () => {
   
    return ( <>
        <div><div className="flex justify-center">
            <h2 className="text-5xl text-blue-100 font-bold m-3 mb-5">NFT Token</h2></div>
          
            <div className=" text-white">
                <a href='https://goerli.etherscan.io/address/0x71aca2815d8237a3bf3db4ace47115666f46a961#code' target="_blank" 
                className="font-bold rounded-2xl border-2 border-red-400 px-[15px] py-2 text-xl hover:bg-red-400">Etherscan</a>
                        <a href='https://gateway.pinata.cloud/ipfs/QmNM3ZUzASR78M61PsPF3f63j13ZsXNCACnfMshNroFuKz' target="_blank" 
                className="font-bold rounded-2xl border-2 border-red-400 px-[15px] py-2 text-xl hover:bg-red-400">IFPS</a>
            <Link to="/Defi/Market" className="font-bold rounded-2xl border-2 border-red-400 px-[15px] py-2 text-xl hover:bg-red-400">
            Buy NFT</Link>

            
           
            
            </div>
        </div>
        </> );
}
 
export default HeaderTokenNft;


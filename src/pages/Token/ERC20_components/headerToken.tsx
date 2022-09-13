import { Link } from "react-router-dom"

const HeaderToken = () => {
    return ( <>
        <div className='bg-blue-100 rounded-2xl border-4 border-red-400 w-full p-3 m-3'>
            <h2 className="text-3xl text-center font-bold m-3">Check out our ERC20 token</h2>
          
<div className="flex justify-center p-3 ml-3">
    <a href='https://etherscan.io/address/0x7C2ED4E6fB642186ec9472813207c902005583D7' target="_blank">
        <span className="font-bold mr-6 flex rounded-2xl border-2 border-red-400 px-[15px] py-2 text-xl hover:bg-red-400">Etherscan </span></a>
        <Link to="/Defi/exchange" ><span className="mr-6 font-bold flex rounded-2xl border-2 border-red-400 px-[15px] py-2 text-xl hover:bg-red-400">
        Exchange</span> </Link>
          </div> 
           </div>
        </> );
}
 
export default HeaderToken;


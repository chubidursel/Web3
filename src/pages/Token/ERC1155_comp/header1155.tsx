
const HeaderToken = ({handleToggle}) => {
   
    return ( <>
        <div>
            <h2 className="text-5xl text-blue-100 font-bold m-3 mb-10">GAME TOKENS</h2>
          
            <div className="flex justify-around text-white">
                <a href='https://goerli.etherscan.io/address/0xc7Afde5bF7011eC415e7107BaA6FF02559E6f44f#code' target="_blank" 
                className="font-bold rounded-2xl border-2 border-red-400 px-[15px] py-2 text-xl hover:bg-red-400">Etherscan </a>
            
            <a href='https://goerli.etherscan.io/address/0xc7Afde5bF7011eC415e7107BaA6FF02559E6f44f#code' target="_blank" 
                className="font-bold rounded-2xl border-2 border-red-400 px-[15px] py-2 text-xl hover:bg-red-400">OpenSea </a>

            
            <button onClick={handleToggle} className="font-bold rounded-2xl border-2 border-red-400 px-[15px] py-2 text-xl hover:bg-red-400">
            Events</button> 
           
            
            </div>
        </div>
        </> );
}
 
export default HeaderToken;


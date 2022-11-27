import Gold from "../../../../Ethereum/ERC1155/Pic/1.png"

const NftCard = () => {

    //get the price from contract?? 
    let price = "0.01 ETH"
    let totalSuply = "1000"
   
    return ( <>

            <div className="flex justify-center flex-col bg-yellow-200 p-2 mx-2">
                <img src={Gold} alt="tools" className='h-40'/>
                <h1>price: {price}</h1>
                <h1>total Supply: {totalSuply}</h1>
                <button className="w-full font-bold py-1 text-2xl hover:shadow-xl hover:cursor-pointer rounded-xl border-2 border-red-400 px-[15px] hover:bg-red-400 active:bg-red-500 active:text-blue-100"
                    >BUY</button>
      
            </div>
        </> );
}
 
export default NftCard;


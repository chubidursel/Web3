import { useState } from 'react';

const NftCard = ({ pic, title }) => {
  const[amount, setAmount] = useState(0);
  const[tempPrice, setTempPrice] = useState(0);

  //get the price from contract??
  let price = 0.02;
  let totalSuply = "1000";

  const handleBuy = async()=>{

    const temp = amount * price
    setTempPrice(temp)

    setTimeout(() => {
      setTempPrice(0)
    }, 6500);
  }

  return (
    <>

<section
      className="bg-transparent flex justify-center items-center text-white rounded-md"
    >
      <div
        className="w-[300px] h-[420px] bg-transparent cursor-pointer group [perspective:500px]"
      >
        <div
          className="relative [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] w-60 h-60 duration-500"
        >
          <div className="absolute [backface-visibility:hidden]">
            <img src={pic} />
            <div className="text-center text-xl font-bold">
             <p>Title: {title}</p> 
            <p>Price: {price}</p>
            <p>Supply: {totalSuply}</p> 

            </div>
          </div>
          <div
            className="absolute [transform:rotateY(180deg)] [backface-visibility:hidden] rounded-md
            w-full h-full bg-blue-100 overflow-hidden"
          >
            <div
              className="text-center flex flex-col items-center justify-center text-purple-800 px-2 pb-24 "
            >
              <h1 className="text-3xl font-semibold m-4">PURCHASE</h1>
              <input onChange={(e:any)=>setAmount(e.target.value)} type="number" min='0' className="w-32 rounded-md text-center"/>

              {amount != 0 && <h1 className="bg-yellow-100 p-2 rounded-lg text-xl font-semibold m-4">Price: {amount * price} ETH</h1>}

              <button onClick={handleBuy}
                className="bg-purple-500 px-10 py-2 font-semibold text-white rounded-lg 
                absolute -bottom-20 delay-500 duration-1000 group-hover:bottom-10 scale-0 group-hover:scale-100 "
              >
              Buy
              </button>
           
            </div>
          </div>
        </div>
      </div>
    </section>

    </>
  );
};

export default NftCard;

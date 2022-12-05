import Gold from "../../../../Ethereum/ERC1155/Pic/1.png";
import Btn from "./btn";


const NftCard = ({ pic, title }) => {
  // https://www.youtube.com/watch?v=9uwZkqoFAfg

  //get the price from contract??
  let price = "0.01 ETH";
  let totalSuply = "1000";

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
              <h1 className="text-xl font-semibold m-4">How much do you want to buy?</h1>
              <input type="number" className="w-32 rounded-md"/>
              <button onClick={() => console.log('click')}
                className="bg-purple-500 px-6 py-2 font-semibold text-white rounded-full 
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

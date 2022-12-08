import { useState, useEffect } from 'react';
import { contractERC1155 } from '../../../components/smart_contract/erc1155';
import conectSigner from '../../../components/smart_contract/SIGNER';
import { ethers } from "ethers"; 
import getErrorMessage from '../../../components/getErrorMessage';
import Loader from '../../../components/loader';

type Coin = {
  title: string;
  price: string;
  suply: string;
}

const NftCard = ({ pic, title, id }) => {
  const[amount, setAmount] = useState(0);

  const [loader, setLoader] = useState(false)
  const[result, setResult ] = useState('')

  const [price, setPrice] = useState([]) // Make an obj??


  let totalSuply = "1000";


  // HOW TO RENDER JUST ONCE!!!!!!
  useEffect((()=>{
    (async()=>{
      try {
        for (let index = 1; index <= 4; index++) {
          const getPriceGold = await contractERC1155.tokenPrice(index)
          setPrice(old => [...old, ethers.utils.formatEther(getPriceGold)])
        }
        //console.log(price)
      } catch (error) {
        console.log(error)
      }
    })()
  }),[])

  const habdlePurchase = async()=>{
    try {
      setLoader(true)
      setResult(' sign the tx 📝')

      const contractWithSigner = conectSigner(contractERC1155)

      const ethToPay = price[Number(id)] * amount;

      const overrides = {
        value: ethers.utils.parseEther(ethToPay.toString()),
    }

      const txTransfer = await contractWithSigner.purchaseNFT(Number(id), amount, overrides);
      const res = await txTransfer.wait()
      console.log("👨‍💻 DEV >>>", res)
 
      setResult('Confirmed')
      setLoader(false)
      setTimeout(() => {setResult('')}, 7000)
    }
    catch (error) {
      console.log("❌ ❌ ❌ DEV >>>", error)
      const message = getErrorMessage(error);
      setResult(message)
      setTimeout(() => {setResult('')}, 7000)
      setLoader(false)
    }  
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
            <p>Price: {price[Number(id)]}</p>
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

              {amount != 0 && <h1 className="bg-yellow-100 p-2 rounded-lg text-xl font-semibold m-4">Price: {price[Number(id)] * amount} ETH</h1>}

              <button onClick={habdlePurchase}
                className="bg-purple-500 px-10 py-2 font-semibold text-white rounded-lg 
                absolute -bottom-20 delay-500 duration-1000 group-hover:bottom-10 scale-0 group-hover:scale-100 "
              >
              {loader ? <Loader /> : "BUY"}
              </button>
              {result && <h1 className='text-center text-xl bg-orange-200 rounded-xl mt-3 py-4 px-2'>{result}</h1> }
            </div>
          </div>
        </div>
      </div>
    </section>

    </>
  );
};

export default NftCard;

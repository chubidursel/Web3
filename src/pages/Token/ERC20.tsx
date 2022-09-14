import defaultProvider from '../../abi/defaultProvider';
import { contractERC20, contractERC20WithSigner } from '../../components/smart_contract/erc20';
import {useState, useContext} from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/header';
import { Context } from "../../contexts/context";
import walletProvider from '../../abi/walletProvider';
import {Info} from "./ERC20_components/info"
import HeaderToken from './ERC20_components/headerToken';

export function ERC20() {
  const [owner, setOwner] = useState()
  const [add, setAdd] = useState("")
  const [balance, setBalance] = useState()

  const [addressTo, setAddressTo] = useState("");
  const [amountTo, setAmountTo] = useState();

  const [amountApprove, setAmountApprove] = useState();
  const [addressToArrpove, setAddressToApporve] = useState("");

  const[result, setResult] = useState(); //result???


//<<<<<<<<<<<<<<<<<<<<<  TESTING
  const currentAccount = useContext(Context);

  async function getData(){
    const blockNum = await defaultProvider.getBlockNumber();
    console.log(walletProvider)

    console.log(currentAccount)

  }

  const hadleSupply = async()=>{
    const balance = await contractERC20.balanceOf(add);
    setBalance(balance.toString())
  }

  const handleTransaction = async(event:any)=>{
    event.preventDefault();
    try {
      const tx = await contractERC20WithSigner.transfer(addressTo, amountTo);
      console.log(tx)

    } catch (error) {
      console.error(error)
    }
  }
  const handleApprove = async(event:any)=>{
    event.preventDefault();
    try {
      const tx = await contractERC20WithSigner.approve(addressToArrpove, amountApprove);
      console.log(tx)
      await tx.wait()
      console.log('Done!') // set up result! 
    } catch (error) {
      console.error(error)
    }
  }



  return (
    <>
    <Header />
<div className="py-6 flex w- auto justify-center text-purple-800">
<div className="py-3 sm:max-w-xl sm:mx-auto ">
{/* <div className="bg-white min-w-1xl flex flex-col rounded-xl shadow-lg m-2"> */}
      
      
      {/* <div className="px-12 py-5 ">
        <h2 className="text-purple-800 text-3xl text-center font-semibold">Check out our ERC20 token</h2>
      </div>



      <div className="bg-gray-200 w-full flex flex-col items-center">


      <div className="flex flex-row space-x-4 items-center py-6 space-y-3">
          <a href='https://etherscan.io/address/0x7C2ED4E6fB642186ec9472813207c902005583D7' target="_blank"><span className="text-gray-800 text-3xl font-semibold hover:underline">Etherscan </span></a>
          <Link to="/Defi/exchange" ><span className="text-gray-800 text-3xl font-semibold hover:underline">Exchange</span> </Link>
      </div> */}
<HeaderToken />
      <Info />

      <div className='bg-blue-100 rounded-2xl border-4 border-red-400 w-full p-3 m-3 text-xl'>
        <h1 className=" text-3xl text-center font-bold m-3">Token function</h1>
        {/* <div className="bg-pink-400 p-2"> */}
          <label>Check your balance: 
            <input placeholder='Enter your address' onChange={(event)=>setAdd(event.target.value)} className = 'ml-3 rounded'/>
            <button onClick={hadleSupply} className="font-bold ml-3 rounded-2xl border-2 border-red-400 px-[15px] hover:bg-red-400">Submit</button>
            <h1 >{balance}</h1>
          </label>
        {/* </div> */}
        <form onSubmit={handleTransaction}>
          <h1 className='text-center font-bold'>Transfer token</h1>
          <label>Send to: </label>
          <input onChange={(e)=>setAddressTo(e.target.value)} className='rounded' placeholder='Enter address of reciever'></input><br />
          <label>Amount:</label>
          <input type='text' className='rounded' onChange={(e:any)=>setAmountTo(e.target.value)} placeholder='Enter amount of tokens' />
          <button type="submit" className="font-bold ml-3 rounded-2xl border-2 border-red-400 px-[15px] hover:bg-red-400">Transfer</button>
        </form>

        <form onSubmit={handleApprove}>
          <h1 className='text-center font-bold'>Approve</h1>
          <label>Approve to: </label>
          <input onChange={(e)=>setAddressToApporve(e.target.value)} className='rounded' placeholder='Enter address of reciever'></input><br />
          <label>Amount:</label>
          <input type='text' className='rounded' onChange={(e:any)=>setAmountApprove(e.target.value)} placeholder='Enter amount of tokens' />
          <button type="submit" className="font-bold ml-3 rounded-2xl border-2 border-red-400 px-[15px] hover:bg-red-400">Approve</button>
        </form>
      </div>

      {result && <div className='bg-green-500'>
          <h1>RESULT</h1>
      </div>}

      </div>
{/* </div> */}
</div>

</>
  )}

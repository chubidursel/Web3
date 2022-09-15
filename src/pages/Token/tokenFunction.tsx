import defaultProvider from '../../abi/defaultProvider';
import { contractERC20, contractERC20WithSigner } from '../../components/smart_contract/erc20';
import {useState, useContext} from 'react';
import { Context } from "../../contexts/context";
import walletProvider from '../../abi/walletProvider';


export default function TokenFunction() {
  const [owner, setOwner] = useState()
  const [add, setAdd] = useState("")
  const [balance, setBalance] = useState()
  const [addressTo, setAddressTo] = useState("");
  const [amountTo, setAmountTo] = useState();

//<<<<<<<<<<<<<<<<<<<<<  TESTING
  const currentAccount = useContext(Context);

  async function getData(){
    const blockNum = await defaultProvider.getBlockNumber();
    console.log(walletProvider)

    console.log(currentAccount)

  }

//<<<<<<<<<<<<<<<<<<<<
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
//0x63018F44E822875Be96e7CE6F5b53cB1dEcA1B96 //my 2nd acc
  const address = "0x354hb23jhb2"
  const tokenAddress = "0xXXXXXXX"
  const tokenAmount = 10000;

  return (
    <>
   

      

      
      <div className='bg-blue-100 rounded-2xl border-4 border-red-400 text-xl px-[15px]'>
        <h1 className=" text-3xl text-center font-bold m-3">Token function</h1>
   
       <div className='rounded-2xl border-2 border-red-400 px-[15px] p-2 m-2'>
          <h1 className='text-center font-bold'>Check your balance</h1>
            <input placeholder='Enter your address' onChange={(event)=>setAdd(event.target.value)} className = 'rounded'/>
            <button onClick={hadleSupply} className="font-bold ml-3 rounded-2xl border-2 border-red-400 px-[15px] hover:bg-red-400">Submit</button>
            {balance && <h1 className='font-bold'>Your balance: {balance}</h1>}
        </div>

        <div className='rounded-2xl border-2 border-red-400 px-[15px] p-2 m-2'>
        <form onSubmit={handleTransaction}>
          <h1 className='text-center font-bold p-1'>Transfer token</h1>
          <label>Send to:</label>
          <input onChange={(e)=>setAddressTo(e.target.value)} className='rounded ml-3' placeholder='Enter address of reciever'></input><br />
          <label>Amount:</label>
          <input type='text' className='rounded ml-3' onChange={(e:any)=>setAmountTo(e.target.value)} placeholder='Enter amount of tokens' />
          <button type="submit" className="font-bold ml-3 rounded-2xl border-2 border-red-400 px-[15px] hover:bg-red-400">Transfer</button>
        </form>
        </div>


        <div className='rounded-2xl border-2 border-red-400 px-[15px] p-2 m-2'> 
        <h1 className='text-center font-bold'>Approve</h1>
            <input placeholder='Enter your address' onChange={(event)=>setAdd(event.target.value)} className = 'rounded'/>
            <button onClick={hadleSupply} className="font-bold ml-3 rounded-2xl border-2 border-red-400 px-[15px] hover:bg-red-400">Approve</button>
        </div>


      </div>



</>
  )}

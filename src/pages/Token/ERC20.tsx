import Header from '../../components/headerNew';
import {Info} from "./ERC20_components/info"
import HeaderToken from './ERC20_components/headerToken';
import TokenFunction from './tokenFunction';

export function ERC20() {
<<<<<<< HEAD

=======
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


>>>>>>> e6314a9c118b9552fecd3206c8db61515cd9d61c

  return (
    <>
    <Header />
    <div className='text-purple-800'>
    <div className="flex justify-center">
    <HeaderToken />
    </div>
    

      <div className="flex justify-center p-3 m-5 space-x-8">
      <Info />
<<<<<<< HEAD
      <TokenFunction />
     
      </div>
      </div>

=======

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
>>>>>>> e6314a9c118b9552fecd3206c8db61515cd9d61c

</>
  )}

import React, {useState} from 'react'
import {SendTx} from './sendTx'
import Loader from '../../../components/loader';

// https://www.youtube.com/watch?v=LeJM-wHWqC8&t=466s
// https://medium.com/zubi-io/send-ether-without-a-wallet-1edea59c7862

export default function Tx() {
    const [result, setResult] = useState(false);

    const [loader, setLoader] = useState(false)

    const [resultTx, setResultTx] = useState('')

    //data for TX
    const [mnemonic, setMnemonic] = useState('')
    const [to, setTo] = useState('')
    const [data, setData] = useState('')
    const [value, setValue] = useState(0)



    const onGenereteTx = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setLoader(true)

      if(to[0] != '0' || mnemonic.length < 30){ // || value == 0
        setResultTx(`Invalid input 😢`)  
        setTimeout(() => {setResultTx('')}, 6000)
        return null
      }

        const res = await SendTx(mnemonic, to, value, data)
        
        setLoader(false)

       
        console.log(">>>>>>> typeof: ", typeof res)
        if(!res){
          setResultTx(`❌ Opps, error. Checkout logs`)
        } else{
          setResultTx(`✅ Complete! TX hash: ${res.toString().slice(0, 20) + "..." + res.toString().slice(55)}`)
        }
        

       // setTimeout(() => {setResultTx('')}, 6000)
       console.log("✅ We are done!")

      }

    

  return (
    <>

<div className="flex justify-center mb-28">
      <div className="bg-blue-100 mt-5 px-5 py-2 text-lg rounded-lg w-1/2 border-4 text-purple-800 border-red-400 hover:bg-blue-200">
      <p className="py-2 font-bold text-3xl hover:text-4xl text-center hover:cursor-pointer " onClick={()=>{setResult(!result)}}>Generete Custom Transation 🔽</p>

    {result && <form onSubmit={onGenereteTx} className="h=30 flex justify-center flex-col">

            <div className="text-start ml-10 mb-3">
                <h2>There is a simple implementaion of Ethereum wallet. In this block you can send transation to another account by creating a custom transation via EtherJs and send it to Alchemy node.</h2>
                <h2>In case you want to interact with smart contract, put the function selector  (check out converter) into data field.</h2>  
              </div>
<div className="flex justify-center items-center flex-col">
    <label htmlFor="sender" className='font-bold text-xl'>Mnemonic phrase</label>
    <input id='sender' value={mnemonic} onChange={(event: React.ChangeEvent<HTMLInputElement>)=>(setMnemonic(event.target?.value))} type="text" placeholder="mnemonic" className='w-2/3 hover:shadow-xl h-30 mr-3 rounded-lg text-center px-3'/>
    
    <label htmlFor="to" className='font-bold text-xl mt-3'>Address recipient</label>
    <input id='to' value={to} onChange={(event: React.ChangeEvent<HTMLInputElement>)=>(setTo(event.target?.value))} type="text" placeholder="address to" className='w-2/3 hover:shadow-xl h-30 mr-3 rounded-lg text-center px-3'/>
    
    <label htmlFor="to" className='font-bold text-xl mt-3'>Data</label>
    <input id='to' value={data} onChange={(event: React.ChangeEvent<HTMLInputElement>)=>(setData(event.target?.value))} type="text" placeholder="function selector" className='w-2/3 hover:shadow-xl h-30 mr-3 rounded-lg text-center px-3'/>
    
    <label htmlFor="num" className='font-bold text-xl mt-3'>Value</label>
    <input id='num' value={value} onChange={(event: any)=>(setValue(event.target?.value))} type="number" step='0.001' min='0' placeholder="ETH amount" className='w-2/3 hover:shadow-xl h-30 mr-3 rounded-lg text-center px-3'/>
    <button className="font-bold py-1 my-4 text-2xl hover:shadow-xl rounded-xl border-2 w-2/3 border-red-400 px-[15px] hover:bg-red-400 active:bg-red-500 active:text-blue-100" type="submit">Send</button>
    
</div>
    
    </form>} {loader ? 
            <Loader /> : resultTx ? <div className='flex justify-center mb-3'>  <h1 className='font-bold mt-3 bg-yellow-100 w-full py-2 text-center  px-1 rounded-xl text-purple-900 text-xl '>{resultTx}</h1></div> :null}
      </div>
      </div>

    </>
  )
  }

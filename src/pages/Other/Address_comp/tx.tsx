import React, {useState} from 'react'

// https://www.youtube.com/watch?v=LeJM-wHWqC8&t=466s
// https://medium.com/zubi-io/send-ether-without-a-wallet-1edea59c7862

export default function Tx() {
    const [result, setResult] = useState(false);
    const [sender, setSender] = useState('')

    const onGenereteTx = () => {
        console.log(21)
    }

  return (
    <>

<div className="flex justify-center ">
      <div className="bg-blue-100 mt-5 px-5 py-2 text-lg rounded-lg w-1/2 border-4 text-purple-800 border-red-400 hover:bg-blue-200">
      <p className="py-2 font-bold text-3xl hover:text-4xl text-center hover:cursor-pointer " onClick={()=>{setResult(!result)}}>Generete Custom Transation 🔽</p>

    {result && <form onSubmit={onGenereteTx} className="h=30 flex justify-center flex-col">

            <div className="text-start ml-10 mb-3">
                <h2>There is a simple implementaion of Ethereum wallet like MetaMask. In this block you can send transation to another account by creating a custom transation via ethreJs. </h2>  
              </div>

    <label htmlFor="sender" className='font-bold text-xl'>Private Key Sender</label>
    <input id='sender' value={sender} onChange={(event: React.ChangeEvent<HTMLInputElement>)=>(setSender(event.target?.value))} type="text" placeholder="write anyhing to generete keys" className='w-1/2 hover:shadow-xl h-30 mr-3 rounded-lg text-center'/>
    
    <label htmlFor="sender" className='font-bold text-xl'>Address recipient</label>
    <input id='sender' value={sender} onChange={(event: React.ChangeEvent<HTMLInputElement>)=>(setSender(event.target?.value))} type="text" placeholder="write anyhing to generete keys" className='w-1/2 hover:shadow-xl h-30 mr-3 rounded-lg text-center'/>
    
    
    
    <button className="font-bold py-1 mt-4 text-2xl hover:shadow-xl w-max mx-10 rounded-xl border-2 border-red-400 px-[15px] hover:bg-red-400 active:bg-red-500 active:text-blue-100" type="submit">Oppp, doesn't work yet 😢 </button>
    </form>}
          {/* <div className='flex justify-center mb-3'> {result && result}</div> */}
      </div>
      </div>

    </>
  )
}

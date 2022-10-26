import React from 'react';
import Header from '../../components/headerNew';

//type addressObject = {prkey: string; pubkey: string; addr: string}

export function Address() {
    const [result, setResult] = React.useState<any>();


    const onCreateAddr = async (event: React.FormEvent<HTMLFormElement>) => {
        try {
            event.preventDefault();

            //How to get value from input in Form ????
            const data = event.target as HTMLFormElement;
            const files = data.input
            console.log(files)



            // FUNCTION TO CREATE PRIVATE KEY

            const privateKey = "0x123nd121212";

            const publicKey = "04123123123123";

            const ethAddress = "0x1233211233123"


            setResult(
            <div className='font-bold mt-3 bg-yellow-100 w-full py-2 text-center  px-1 rounded-xl text-purple-900 text-xl '>
                <h1>Private key: {privateKey}</h1>
                <h1>Public key: {publicKey}</h1>
                <h1>Address: {ethAddress}</h1>
                <button className='reletive top-0 left-0' onClick={()=>setResult('')}>❌</button>  
            </div>
            )
            
        } catch (error) {
            setResult(<p>'Opsss, something went wrong'</p>)
            setTimeout(() => {setResult(null)}, 5000)
        }

    }




  return (
    <>
    <Header marginFromTop={'1/3'}>
        <div className='text-center p-4'>
          <h1 className="font-bold text-3xl">Create Ethreum Address</h1>
          <p>Ethereum address is derived from Public key which is derived from Private key</p>
          <p>In this block you can get them all just in one click</p>
          <img src="" alt="sheme of address" />

          <p className='font-bold mt-3'>Usefull links about this topic: ❔ </p>
          <a href="/" className='hover:underline'>1. bitcoin address</a>
          </div>
       </Header>

       <div className="flex justify-center">
      <div className="bg-blue-100 m-10 px-5 py-2 text-lg rounded-lg w-1/2 border-4 text-purple-800 border-red-400">
      <p className="py-2 font-bold text-3xl text-center">Create New Ethereum Account</p>
      <div className="text-start ml-10 mb-3">
                <h2>🔑 Private key is deriverd from any input you write below (SHA256)</h2>  
                <h2>🔑 Publick key is deriverd from Private via Curve...</h2>
                <h2>📮 Address  is derived from Publick key via  (SHA-256 & last 20 bytes)</h2> 
              </div>
          <form onSubmit={onCreateAddr} className="h=30 flex justify-center">
            <input name="file" type="text" placeholder="write anyhing to generete keys" className='w-1/2 hover:shadow-xl h-30 mr-3 rounded-lg text-center'/>
            <button className="font-bold py-1 text-2xl hover:shadow-xl w-1/3 rounded-xl border-2 border-red-400 px-[15px] hover:bg-red-400 active:bg-red-500 active:text-blue-100" type="submit">create</button>
          </form>
          <div className='flex justify-center mb-3'> {result && result}</div>
      </div>
      </div>

    </>
    
  )
}


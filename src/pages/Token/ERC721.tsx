import Header from '../../components/headerNew';
import { contractERC721 } from '../../components/smart_contract/ERC721';
import { useEffect, useState } from 'react';
import conectSigner from '../../components/smart_contract/SIGNER';
import getErrorMessage from '../../components/getErrorMessage';
import Logo from "../../assets/logoNft.gif"
import Questions from './ERC721_components/questions';
import Usecase from './ERC721_components/usecase';

export function ERC721() {
  const [result, setResult] = useState("");
  const [nftPrice, setNftPrice] = useState("");
  const [amountMinted, setAmountMinted] = useState('');


  useEffect((()=>{
  
    (async()=>{
      try {
        document.title = 'NFT';
        const numMinted = await contractERC721.amountMintedNFT()
        setAmountMinted(numMinted.toString())

        const price = await contractERC721.Rate()
        setNftPrice(price.toString())

        console.log("👨‍💻 DEV useEffect Fetch: ", amountMinted, price)
      } catch (error) {
        console.log(error)
      }
    })()
  }),[])

  const handlePurcase = async()=>{
    try{
      setResult(`Pls sign the tx`);
      const contractERC721WithSigner = conectSigner(contractERC721)
      const txTransfer = await contractERC721WithSigner.purchase({
        value: await contractERC721.Rate(),
      });
      await txTransfer.wait()
      console.log("👨‍💻 DEV >> ", txTransfer)
      setResult(`🥳 Congratulation!, You bought nice NFT`);
      setTimeout(() => {setResult('')}, 4000)
    }catch (error) {
      console.log(error)
      const message = getErrorMessage(error);
      setResult(message)
    }
  }

  return (
    <>
   <Header marginFromTop={2}><div className='text-center py-2'>
   <h1 className='font-bold mb-2'>Simple ERC721 smart contract</h1>
    </div>
    </Header>

<div className='bg-yellow-400 text-4xl text-center'>BETA</div>


    <div className='h-[2000px]'>


    <section id='mint'>
    <div className='grid place-items-center'>
        <img src={Logo} alt="coin"  className='h-80'/>
        rate: {Number(nftPrice) / 1000000000000000000 } ETH
        <br />
        amount Minted: {amountMinted} / 33
        <button onClick={handlePurcase} className='px-10 py-3 text-5xl bg-blue-200 rounded-lg hover:bg-blue-400'>mint</button>

        {result && <h1 className='text-center text-xl bg-yellow-200 rounded-xl mt-3 py-4 px-10'>{result}</h1> }
    </div>
    </section>
  

    <section id='pictures'>
      
    </section>

    <section id='interact'>
      <button>MyNFT</button>
      </section>


    <section id='usecase'>
      <Usecase />
    </section>

    <section id='faq'>
      <Questions />
    </section>

    <section id='links'>
    <div>

            <div className="flex justify-center gap-10 text-white">
                <a href='https://goerli.etherscan.io/address/0x3eEEaEe76C2D5d4a1E72106F13AB82F750b19994' target="_blank" 
                className="font-bold rounded-2xl border-2 border-red-400 px-[15px] py-2 text-xl hover:bg-red-400">Etherscan </a>
            
            <a href='https://testnets.opensea.io/collection/circleart' target="_blank" 
                className="font-bold rounded-2xl border-2 border-red-400 px-[15px] py-2 text-xl hover:bg-red-400">OpenSea </a>
          
            </div>
        </div>
    </section>
 

    </div>
    
    </>
  )
}

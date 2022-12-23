import Header from '../../components/headerNew';
import { contractERC721 } from '../../components/smart_contract/ERC721';
import { useEffect, useState } from 'react';
import conectSigner from '../../components/smart_contract/SIGNER';
import getErrorMessage from '../../components/getErrorMessage';
import Logo from "../../assets/logoNft.gif"

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
        amount Minted: {amountMinted} / 33
        <button onClick={handlePurcase} className='px-10 py-3 text-5xl bg-blue-200 rounded-lg hover:bg-blue-400'>mint</button>

        {result && <h1 className='text-center text-xl bg-yellow-200 rounded-xl mt-3 py-4 px-10'>{result}</h1> }
    </div>
    </section>
  

    <section id='pictures'>
      
    </section>


    <section>
      usecase
    </section>

    <section>
      Faqs
    </section>

    <section>
      footer
    </section>
 

    </div>
    
    </>
  )
}

import Header from '../../components/headerNew';

export function ERC721() {




  return (
    <>
   <Header marginFromTop={2}><div className='text-center py-2'>
   <h1 className='font-bold mb-2'>Simple ERC721 smart contract</h1>
   <p>📌 There are 8 pictures with metadata jons files stored on IPFS</p>
   📌Function to mint a new token is avalible only for owner, but other users can use function payToMin() to buy token. Or you can get this NFT from Auction if curent holdder has a willing ro sell it.
   <p>🔜There are some features which we want to implement in this block soon:  </p>
   <p>1.On-chain stored NFT <br/> 2. Generator to mint more than 8 tokens 😉</p>
    </div>
    </Header>


   <div className='flex justify-around text-purple-800'>
 
   <div className='bg-blue-100 w-1/3 rounded-2xl border-4 border-red-400 text-xl px-[15px] py-5 m-8'>
   
            BETA
          </div>
    </div>



 
    </>
  )
}

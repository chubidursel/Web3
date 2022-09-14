import React from 'react'


export function NftCard({tokenId}) {

  return (
    <>
    <div className="bg-green-500 w-52 absolute top-10 right-20">
      <p>THERE is ur NFT</p>
      <img className='h-40 p-5'
      src= {`https://ipfs.io/ipfs/QmbzXf4jGd5Hwvk6PwLgbKZnKQ8AWMcCvjazKi4qdJ7RXM/${tokenId}.jpg`} />
          <div>
            <h1 className='bg-red-100 font-bold underline'>Description</h1>
            <p>address: LINK</p>
            <p>some more info: ...</p>
          </div>
          <div>
            <h1 className='bg-red-100 font-bold underline'>functions</h1>
            <p>transfer</p>
            <p>approve</p>
          </div>
    </div>

    </>

  )
}


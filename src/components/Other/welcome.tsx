import React from 'react'
import hello from "../../assets/hello.gif"

function Welcome() {
  return (
    <div className='mt-44 ml-44'>
    <div>
        <img src={hello} alt="wait" className='h-60 pl-32 hover:animate-bounce'/>
        <h1 className='text-white text-5xl font-bold'>Welcome to crypto space!</h1>
    </div>

</div>
  )
}

export default Welcome
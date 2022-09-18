import React, {useState} from 'react'
import quetion from "../assets/question.png";

export function Faq({info}) {
  const [display, setDisplay] = useState(false);

    return (
    <>
    <img src={quetion} alt="wait" className='h-12 hover:animate-ping hover:cursor-pointer absolute top-6 right-64' onClick={()=>{setDisplay(!display)}}/>
        <div>
            {display && 
            <div className='bg-yellow-100 w-1/2 h-1/2 absolute top-60 left-64 rounded-2xl p-5'>
            <h1>How does it work? 🤔</h1>
                {info}
            </div>}

        </div>
    </>

  )
}


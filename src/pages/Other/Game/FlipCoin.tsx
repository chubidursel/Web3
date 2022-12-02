import "./style.css"
import Header from "./heads.svg"
import Tail from "./tails.svg"

export function FlipCoin() {
   
    const handleFlip = () => {
// write func here
    }

  return (
    <>
   <div className="container">
        <div className="stats">

        </div>
        <div className="coin" id="coin">
            <div className="heads">
                <img src={Header} />
            </div>
            <div className="tails">
                <img src={Tail} />
            </div>
        </div>
        <div className="buttons">
            <button id="flip-button">
                Flip Coin
            </button>
            <button id="reset-button">
                Reset
            </button>
        </div>
    </div>
    </>
    
  )
}


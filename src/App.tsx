import { Routes, Route} from "react-router-dom";
import { Home } from "./pages/Home"
import  { Token }  from "./pages/Token"
import  { ERC20 }  from "./pages/Token/ERC20"
import { Defi } from "./pages/Defi"
import { Other } from "./pages/Other"
import {Exchange} from "./pages/Defi/exchange"
import { Vault } from "./pages/Defi/vault"
import { ERC721 } from "./pages/Token/ERC721";
import { Wait } from "./components/waiting";
import { ChainLink } from "./pages/Defi/ChainLink";


function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Token" element={<Token />} />
      <Route path="/Token/ERC20" element={<ERC20 />} />
      <Route path="/Token/ERC721" element={<ERC721 />} />
      <Route path="/Defi" element={<Defi />} />
      <Route path="/Defi/exchange" element={<Exchange />} />
      <Route path="/Defi/vault" element={<Vault />} />
      <Route path="/Other" element={<Other />} />
      <Route path="/Coming_soon" element={<Wait />} />
      <Route path="/ChainLink" element={<ChainLink />} />
    </Routes>
  )
}

export default App

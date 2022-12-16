import { Routes, Route} from "react-router-dom";
import { Home } from "./pages/Home"
import  { Token }  from "./pages/Token"
import  { ERC20 }  from "./pages/Token/ERC20"
import  { ERC1155 }  from "./pages/Token/ERC1155"
import { Defi } from "./pages/Defi"
import { Other } from "./pages/Other"
import {Exchange} from "./pages/Defi/exchange"
import { Vault } from "./pages/Defi/vault"
import { ERC721 } from "./pages/Token/ERC721";
import { Wait } from "./components/waiting";
import { ChainLink } from "./pages/Defi/ChainLink";
import { Conveter } from "./pages/Other/converter";
import { Market } from "./pages/Defi/Market";
import {Auction} from "./pages/Defi/components/Market/Auction";
import { ShopNft } from "./pages/Defi/components/Market/ShopNft";
import { DAO } from "./pages/Defi/DAO";
import { Proxy } from "./pages/Other/Proxy";
import {Ipfs} from "./pages/Other/Ipfs"
import { Address } from "./pages/Other/Address";
import { Game } from "./pages/Other/Game";
import { AAVE } from "./pages/Defi/AAVE";
import { Bridge } from "./pages/Defi/bridge";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Token" element={<Token />} />
      <Route path="/Token/ERC20" element={<ERC20 />} />
      <Route path="/Token/ERC721" element={<ERC721 />} />
      <Route path="/Token/ERC1155" element={<ERC1155 />} />
      <Route path="/Defi" element={<Defi />} />
      <Route path="/Defi/exchange" element={<Exchange />} />
      <Route path="/Defi/vault" element={<Vault />} />
      <Route path="/Defi/AAVE" element={<AAVE />} />

      <Route path="/Defi/Bridge" element={<Bridge />} />

      <Route path="/Defi/Market" element={<Market />} />
      <Route path="/Defi/Market/Auction" element={<Auction />} />
      <Route path="/Defi/Market/Shop" element={<ShopNft />} />
      <Route path="/DAO" element={<DAO />} />
      <Route path="/Tools" element={<Other />} />
      <Route path="/Coming_soon" element={<Wait />} />
      <Route path="/ChainLink" element={<ChainLink />} />
      <Route path="/Other/Converter" element={<Conveter />} />
      <Route path="/Other/Proxy" element={<Proxy />} />
      <Route path="/Other/Ipfs" element={<Ipfs />} />
      <Route path="/Other/Address" element={<Address />} />
      <Route path="/Game" element={<Game />} />

    </Routes>
  )
}

export default App

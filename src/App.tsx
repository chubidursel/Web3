import { Routes, Route} from "react-router-dom";
import { Home } from "./pages/Home"
import  { Token }  from "./pages/Token"
import  { ERC20 }  from "./pages/Token/ERC20"
import { Defi } from "./pages/Defi"
import { Other } from "./pages/Other"


function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Token" element={<Token />} />
      <Route path="/Token/ERC20" element={<ERC20 />} />
      <Route path="/Defi" element={<Defi />} />
      <Route path="/Other" element={<Other />} />
    </Routes>
  )
}

export default App

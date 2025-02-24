import { BrowserRouter , Routes , Route } from "react-router-dom";
import Navbar from "./Navbar";
import Body from "./Body"
import Login from "./Login";
function App() {
  return (
    
    <>
    <BrowserRouter basename = "/">
    <Routes>
     <Route path = "/" element = {<Body/>} >
       <Route path = "/login" element ={<Login/>} />

     
     </Route>

    </Routes>
    
    
    </BrowserRouter>
    </>
    
  )
}

export default App;

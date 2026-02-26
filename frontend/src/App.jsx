import {BrowserRouter,Routes,Route} from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Editor from "./pages/Editor";
import Detail from "./pages/Detail";

export default function App(){
 return(
 <BrowserRouter>
  <Navbar/>
  <Routes>
   <Route path="/" element={<Home/>}/>
   <Route path="/write" element={<Editor/>}/>
   <Route path="/edit/:id" element={<Editor/>}/>
   <Route path="/blog/:id" element={<Detail/>}/>
  </Routes>
 </BrowserRouter>
 );
}
import { Route } from "react-router";
import {Routes} from 'react-router-dom'
import TableData from './table_data'
import Signup from "./signup";
import Login from "./login";
import Home from "./home"



const Routing=()=>{
    return(
    <>
   <Routes>
        <Route path="/" element={<Home/>} />  
        <Route path="/signup" element={<Signup/>} />
        <Route path="/login" element={<Login/>} />
      </Routes>
    </>
    )
}

export default Routing;
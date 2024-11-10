import { Route } from "react-router";
import {Routes} from 'react-router-dom'
import Signup from "./signup";
import Login from "./login";
import Home from "./home"
import HotelDetails from './property_details'
import BookingPage from './booking_page'
import AddProperty from "./add_property";
import UpdateProperty from './update_property'
import AllUsers from './all_user'


const Routing=()=>{
    return(
    <>
   <Routes>
        <Route path="/" element={<Home/>} />  
        <Route path="/property_listing" element={<Home/>} />  
        <Route path="/update_property/:id" element={<UpdateProperty/>} />  
        <Route path="/add_property" element={<AddProperty/>} />  
        <Route path="/signup" element={<Signup/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/hotel_details/:id" element={<HotelDetails/>} />
        <Route path="/booking/:id" element={<BookingPage/>} />
        <Route path="/all_users" element={<AllUsers/>} />
      </Routes>
    </>
    )
}

export default Routing;
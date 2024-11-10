import React, { useState } from "react";
import "./Navbar.css";
import { FaSearch, FaShoppingCart, FaRegUser } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { toggleLogin } from "../login/LoginSlice";
import Login from "../login/Login";
import Signup from "../signup/SignUp";
import { NavLink ,useNavigate,useLocation} from "react-router-dom";


function Navbar({ children }) {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const dispatch = useDispatch();
  const showLogin = useSelector((state) => state.login.showLogin);
  const [showSearch, setShowSearch] = useState(false);
  const location=useLocation()
const navigate=useNavigate();
  const handleMobileMenuToggle = () => {
    setShowMobileMenu(!showMobileMenu);
  };
  const goToDash=()=>{
    navigate('/admin-dashboard')
  }
  const handleLoginClick = () => {
    dispatch(toggleLogin());
  };
  const handleTestHair=()=>{
    storedUserData?navigate('/hair-test'):handleLoginClick()
  }
  const handleSignupClick = () => {
    setShowSignup(!showSignup);
  };
  let storedUserData = JSON.parse(localStorage.getItem("User343"));
  return (
    <>
      <div className="nav-container container">
        <div>
          <img 
            alt="logo"
            className="nav-logo"
            src="/assets/img/logo.png"
          />
        </div>
        <div className={`nav-link ${showMobileMenu ? "show" : ""}`}>
          <a>
            <NavLink to="/" activeClassName="active">
              HOME
            </NavLink>
          </a>
          <a className="who-we-link">
            <NavLink to="/about-us" activeClassName="active">
              WHO WE ARE+
            </NavLink>
            <div className="sub-link-2">
               
                <p onClick={()=>navigate('/about-us')}>About Us</p>
                <p onClick={()=>navigate('/our-specialist')}>Our specialists</p>
              </div>
          </a>
          <a>
            <NavLink to="/our-expertise" activeClassName="active">
              OUR EXPERTISE
            </NavLink>
          </a>
          <a>
            <NavLink to="/shop" activeClassName="active">
              PRODUCTS
            </NavLink>
          </a>
          <a>
            <NavLink to="/book" activeClassName="active">
              CONTACT US
            </NavLink>
          </a>
        </div>
        <div className="nav-right">
         {!location.pathname.includes("/hair-test")&& <button onClick={handleTestHair} className="btn-test">TAKE HAIR TEST</button>}
          <div className="nav-icons">
            <div className="user-svg">
              {showSearch ? (
                <IoMdClose
                  onClick={() => setShowSearch(!showSearch)}
                  size={20}
                />
              ) : (
                <FaSearch
                  onClick={() => setShowSearch(!showSearch)}
                  size={20}
                />
              )}
              <div className={`show-search ${showSearch ? 'search-open' : ''}`}>
               <form className="input-wrap"> <input placeholder="Search the product here"/> <FaSearch size={25}/></form>
              </div>
            </div>
            <FaShoppingCart onClick={goToDash} size={20} />
            <div className="user-svg">
              <FaRegUser size={20} />
              <div className="sub-link">
               
               {storedUserData?(<div><p onClick={()=>navigate('/user-profile')}>Profile</p><p onClick={()=>localStorage.removeItem("User343")}>Logout</p></div>):( <div><p onClick={handleLoginClick}>Login</p>
                <p onClick={handleSignupClick}>Signup</p></div>)}
              </div>
            </div>
            <div className="menubar" onClick={handleMobileMenuToggle}>
              <FiMenu />
            </div>

            {showLogin && <Login onClose={handleLoginClick} />}
            {showSignup && <Signup onClose={handleSignupClick} />}
          </div>
        </div>
      </div>
      {children}
    </>
  );
}

export default Navbar;

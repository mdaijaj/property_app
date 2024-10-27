import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';


const Signup = () => {
    const navigate = useNavigate();
    const [userInf, setUserInf] = useState({ email: "", password: "", mobile: "", first_name: "", role: "" });

    const inputHandle = (e) => {
        setUserInf({ ...userInf, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const regInf = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: userInf.email,
                password: userInf.password,
                mobile: userInf.mobile,
                first_name: userInf.first_name,
                role: userInf.role
            })
        };
        
        const res = await fetch('/api/signup', regInf);
        const result = await res.json();
        console.log("result", result);
        
        if (result.status === "success") {
            toast.success('User signup successful!', { autoClose: 1000 })
            navigate('/login');
        } else {
            toast.info('Email is already registered', { autoClose: 1000 })
        }
    };

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-2"></div>
                    <div className="col-6">
                        <div className="main" style={{ textAlign: "left", margin: "auto", padding: "30px 30px", border: "2px solid black", borderRadius: "5px" }}>
                            <h2 style={{ textAlign: "center" }}>Signup Page</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="user-name" className="col-form-label">Name:</label>
                                    <input type="text" className="form-control" onChange={inputHandle} name="first_name" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email" className="col-form-label">Email:</label>
                                    <input type="email" className="form-control" onChange={inputHandle} name="email" required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="mobile" className="col-form-label">Mobile No.:</label>
                                    <input type="number" className="form-control" onChange={inputHandle} name="mobile" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="col-form-label">Password:</label>
                                    <input type="password" className="form-control" onChange={inputHandle} name="password" minLength={5} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="role" className="col-form-label">Role:</label>
                                    <select className="form-control" onChange={inputHandle} name="role" required>
                                        <option value="">Select Role</option>
                                        <option value="admin">Admin</option>
                                        <option value="seller">Seller</option>
                                        <option value="user">User</option>
                                        <option value="agent">Agent</option>
                                        <option value="buyer">Buyer</option>
                                    </select>
                                </div>
                                <center><button type="submit" className="btn btn-primary">Submit</button></center>
                            </form>
                        </div>
                    </div>
                    <div className="col-4"></div>
                </div>
                <ToastContainer />
            </div>
        </>
    );
};

export default Signup;

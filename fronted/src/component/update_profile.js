import React, { useState } from "react";
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';


const UpdateProfile = ({ user, onClose }) => {

  console.log("aijaj", user)
  const [updatedUser, setUpdatedUser] = useState({
    username: user.username,
    email: user.email,
    role: user.role,
    mobile: user.mobile || "",         
    address: user.address || {
      city: "",
      state: "",
      zip: ""
    },
    status: user.status || "active"  
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser((prev) => ({
      ...prev,
      address: { ...prev.address, [name]: value }
    }));
  };

  const handleUpdateUser = async () => {
    try {
      const userDetails = JSON.parse(localStorage.getItem('user'));
      if(userDetails.userInfo.role!="admin"){
        toast.success('you have not access only admin access.', { autoClose: 1000 })
      }
  
      let response= await axios.put(`/api/update_details/${user._id}`, updatedUser,
          {
              headers: {
                  "Authorization": `Bearer ${userDetails.token}`, // Include token in Authorization header
                  "Content-Type": "application/json"
              }
          }
      );
      toast.success('User profile updated successfully!', { autoClose: 1000 })
      onClose();
  } catch (error) {
      toast.danger('Failed to update user profile.', { autoClose: 1000 })

  }  
  };

  return (
    <div className="modal show d-block" tabIndex="-1" role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Update Profile</h5>
            <button type="button" className="close" onClick={onClose}>
              <span>&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <form>
              <div className="mb-3">
                <label className="form-label">Username</label>
                <input
                  type="text"
                  name="first_name"
                  value={updatedUser.first_name}
                  onChange={handleInputChange}
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  name="email"
                  value={updatedUser.email}
                  onChange={handleInputChange}
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Phone Number</label>
                <input
                  type="text"
                  name="mobile"
                  value={updatedUser.mobile}
                  onChange={handleInputChange}
                  className="form-control"
                  placeholder="Enter Phone Number"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Role</label>
                <select
                  name="role"
                  value={updatedUser.role}
                  onChange={handleInputChange}
                  className="form-control"
                >
                  <option value="user">User</option>
                  <option value="seller">Seller</option>
                  <option value="buyer">Buyer</option>
                  <option value="agent">Agent</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              
              <h5>Address</h5>
              <div className="row mb-3">
                <div className="col">
                  <label className="form-label">Street</label>
                  <input
                    type="text"
                    name="street"
                    value={updatedUser.address.street}
                    onChange={handleAddressChange}
                    className="form-control"
                    placeholder="Street"
                  />
                </div>
                <div className="col">
                  <label className="form-label">City</label>
                  <input
                    type="text"
                    name="city"
                    value={updatedUser.address.city}
                    onChange={handleAddressChange}
                    className="form-control"
                    placeholder="City"
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col">
                  <label className="form-label">State</label>
                  <input
                    type="text"
                    name="state"
                    value={updatedUser.address.state}
                    onChange={handleAddressChange}
                    className="form-control"
                    placeholder="State"
                  />
                </div>
                <div className="col">
                  <label className="form-label">Zip Code</label>
                  <input
                    type="text"
                    name="zip"
                    value={updatedUser.address.zip}
                    onChange={handleAddressChange}
                    className="form-control"
                    placeholder="Zip Code"
                  />
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">Status</label>
                <select
                  name="status"
                  value={updatedUser.status}
                  onChange={handleInputChange}
                  className="form-control"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="banned">Banned</option>
                </select>
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-success"
              onClick={handleUpdateUser}
            >
              Save Changes
            </button>
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default UpdateProfile;

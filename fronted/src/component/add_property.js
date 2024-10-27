import React, { useState } from "react";
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

const AddProperty = () => {
  const [property, setProperty] = useState({
    property_name: "",
    description: "",
    price: 0,
    property_area_price: 0,
    property_type: "",
    furnishing: "",
    address: {
      country: "",
      state: "",
      city: "",
      address1: ""
    },
    rating: 0,
    amenities: []
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProperty((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setProperty((prev) => ({
      ...prev,
      address: { ...prev.address, [name]: value }
    }));
  };

  const handleAmenitiesChange = (e) => {
    const amenitiesArray = e.target.value.split(",").map(item => item.trim());
    setProperty((prev) => ({ ...prev, amenities: amenitiesArray }));
  };

  const handleAddProperty = async () => {
    try {
      const response = await axios.post("/api/addproperty", property);
      toast.success('Property added successfully', { autoClose: 1500 })
      
      // Reset form after successful submission
      setProperty({
        property_name: "",
        description: "",
        price: 0,
        property_area_price: 0,
        property_type: "",
        furnishing: "",
        address: {
          country: "",
          state: "",
          city: "",
          address1: ""
        },
        rating: 0,
        amenities: []
      });
    } catch (error) {
      console.error("Error adding property:", error);
      toast.info('Failed to add property. Please try again.', { autoClose: 1500 })
    }
  };

  
  return (
    <div className="container" style={{ padding: "25px" }}>
      <h3 className="mb-4">Add Property</h3>
      <form>
        <div className="mb-3">
          <label className="form-label">Property Name</label>
          <input type="text" name="property_name" onChange={handleInputChange} className="form-control" placeholder="Enter Property Name" />
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea name="description" onChange={handleInputChange} className="form-control" placeholder="Enter Property Description" rows="3"></textarea>
        </div>
        <div className="row mb-3">
          <div className="col">
            <label className="form-label">Price</label>
            <input type="number" name="price" onChange={handleInputChange} className="form-control" placeholder="Enter Price" />
          </div>
          <div className="col">
            <label className="form-label">Price per Area</label>
            <input type="number" name="property_area_price" onChange={handleInputChange} className="form-control" placeholder="Price per Area" />
          </div>
        </div>
        <div className="mb-3">
        <label>Property Type</label><br />
          <select className="form-select" id="property_type" onChange={handleInputChange} name="property_type" aria-label="select example">
            <option value="">Select Property Type</option>
            <option value="flat">Flat</option>
            <option value="office space">Office Space</option>
            <option value="commercial shop">Commercial Shop</option>
            <option value="plot">Plot</option>
            <option value="apartment">Apartment</option>
            <option value="house">House</option>
            <option value="villa">Villa</option>
          </select></div>
        <div className="mb-3">
          <label className="form-label">Furnishing</label>
          <input type="text" name="furnishing" onChange={handleInputChange} className="form-control" placeholder="Enter Furnishing Type" />
        </div>
        
        <h5>Address</h5>
        <div className="row mb-3">
          <div className="col">
            <label className="form-label">Country</label>
            <input type="text" name="country" onChange={handleAddressChange} className="form-control" placeholder="Country" />
          </div>
          <div className="col">
            <label className="form-label">State</label>
            <input type="text" name="state" onChange={handleAddressChange} className="form-control" placeholder="State" />
          </div>
          <div className="col">
            <label className="form-label">City</label>
            <input type="text" name="city" onChange={handleAddressChange} className="form-control" placeholder="City" />
          </div>
        </div>
        <div className="mb-3">
          <label className="form-label">Address Line</label>
          <input type="text" name="address1" onChange={handleAddressChange} className="form-control" placeholder="Address Line" />
        </div>
        
        <div className="row mb-3">
          <div className="col">
            <label className="form-label">Rating</label>
            <input type="number" name="rating" onChange={handleInputChange} className="form-control" placeholder="Rating" />
          </div>
          <div className="col">
            <label className="form-label">Amenities</label>
            <input type="text" name="amenities" onChange={handleAmenitiesChange} className="form-control" placeholder="Amenities (comma separated)" />
          </div>
        </div>

        <button type="button" onClick={handleAddProperty} className="btn btn-success w-50">Save</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default AddProperty;

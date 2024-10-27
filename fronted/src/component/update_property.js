import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

const UpdateProperty = () => {
  const {id}= useParams()
  const navigate= useNavigate();

  console.log(id)
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

  useEffect(() => {
    const fetchProperty = async () => {
      try {

        const response = await axios.get(`/api/propertyDetails/${id}`);
        console.log("response", response)
        setProperty(response.data.data);
      } catch (error) {
        console.error("Error fetching property data:", error);
      }
    };

    fetchProperty();
  }, [id]);

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
  

  const handleUpdateProperty = async () => {
    try {
      const userDetails = JSON.parse(localStorage.getItem('user'));
      if(userDetails.userInfo.role!="admin"){
        toast.danger('you have not access only admin access', { autoClose: 1000 })
      }

      const config = {
        headers: {
            "Authorization": `Bearer ${userDetails.token}`, // Include token in Authorization header
            "Content-Type": "application/json"
        }
      }
      let response= await axios.put(`/api/update_property/${id}`, property,config);
      toast.success('User profile updated successfully!', { autoClose: 1000 })
      navigate("/property_listing")
    } catch (error) {
      toast.success('Failed to update property.', { autoClose: 1000 })
    }
  };
  

  return (
    <div className="container mt-5">
      <h3 className="text-center mb-4">Update Property</h3>
      <form className="row g-3">
        <div className="col-md-6">
          <label className="form-label">Property Name</label>
          <input
            name="property_name"
            value={property.property_name}
            onChange={handleInputChange}
            className="form-control"
            placeholder="Property Name"
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Price</label>
          <input
            name="price"
            value={property.price}
            onChange={handleInputChange}
            type="number"
            className="form-control"
            placeholder="Price"
          />
        </div>
        <div className="col-12">
          <label className="form-label">Description</label>
          <textarea
            name="description"
            value={property.description}
            onChange={handleInputChange}
            className="form-control"
            placeholder="Description"
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Price per Area</label>
          <input
            name="property_area_price"
            value={property.property_area_price}
            onChange={handleInputChange}
            type="number"
            className="form-control"
            placeholder="Price per Area"
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Property Type</label>
          <input
            name="property_type"
            value={property.property_type}
            onChange={handleInputChange}
            className="form-control"
            placeholder="Property Type"
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Furnishing</label>
          <input
            name="furnishing"
            value={property.furnishing}
            onChange={handleInputChange}
            className="form-control"
            placeholder="Furnishing"
          />
        </div>
        
        <h4 className="mt-4">Address</h4>
        <div className="col-md-4">
          <label className="form-label">Country</label>
          <input
            name="country"
            value={property.address.country}
            onChange={handleAddressChange}
            className="form-control"
            placeholder="Country"
          />
        </div>
        <div className="col-md-4">
          <label className="form-label">State</label>
          <input
            name="state"
            value={property.address.state}
            onChange={handleAddressChange}
            className="form-control"
            placeholder="State"
          />
        </div>
        <div className="col-md-4">
          <label className="form-label">City</label>
          <input
            name="city"
            value={property.address.city}
            onChange={handleAddressChange}
            className="form-control"
            placeholder="City"
          />
        </div>
        <div className="col-12">
          <label className="form-label">Address Line</label>
          <input
            name="address1"
            value={property.address.address1}
            onChange={handleAddressChange}
            className="form-control"
            placeholder="Address Line"
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Rating</label>
          <input
            name="rating"
            value={property.rating}
            onChange={handleInputChange}
            type="number"
            className="form-control"
            placeholder="Rating"
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Amenities</label>
          {console.log("amenities", property.amenities)}
          <input
            name="amenities"
            value={property?.amenities?.join(", ")}
            onChange={(e) =>
              setProperty((prev) => ({
                ...prev,
                amenities: e.target.value.split(",")
              }))
            }
            className="form-control"
            placeholder="Amenities (comma separated)"
          />
        </div>

        <div className="col-12 text-center mt-4">
          <button type="button" onClick={handleUpdateProperty} className="btn btn-primary">
            Update Property
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default UpdateProperty;

import { useEffect, useState } from 'react';
import '../App.css'
import { NavLink } from 'react-router-dom';
import axios from "axios";
import { useParams } from "react-router-dom";

const Cart = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [findRest, setFindRest] = useState([])
  const [access, setAccess] = useState(false)
  const { id } = useParams()


  const accessAuth = () => {
    const userDetails = JSON.parse(localStorage.getItem('user'));
    if (userDetails?.userInfo?.role == "admin") {
      setAccess(true)
    }
  }
  const itemDetails = () => { }


  useEffect(() => {
    accessAuth()
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, [])


  return (
    <>
      <div className="container">
        {isLoading ? (
          <div className="text-center my-3">Please wait, data is loading...</div>
        ) : (
          <div className="row" >
            {props?.data?.map((rest, index) => {
              return (
                <>
                  <div className='row' style={{ border: "3px solid black", width: "90%", margin: "5px" }}>
                    <div className="col-3">
                      <img
                        src="https://img.staticmb.com/mbphoto/property/cropped_images/2024/Aug/28/Photo_h300_w450/74581551_4_a32215f65344daaab550b5687e4f0dd_300_450.jpg"
                        className="img-fluid rounded-start"
                        alt="..."
                        style={{ width: "350px", height: "220px", borderRadius: "5px", marginTop: "5px" }}
                      />
                    </div>

                    {/* Content Column */}
                    <div className="col-6">
                      <div className="card-body">
                        <h5 className="card-title">{rest?.property_name}</h5>
                        <p className="card-text">{`rating: ${rest?.rating}`}    {`city: ${rest?.address?.city}`}</p>
                        <p className="card-text">{`status: ${rest?.status ? "Available" : "Not Available"}`}</p>
                        <p className="card-text">   {`numOfReviews: 4`}</p>
                        <button className="btn btn-danger" onClick={() => itemDetails(rest._id)} style={{ marginLeft: "10px" }}>Add to Favourite</button>
                        <NavLink to={`/hotel_details/${rest?._id}`} className="btn btn-success" style={{ marginLeft: "10px" }}>Property Details</NavLink>
                        {
                          access ? <>
                            <NavLink to={`/update_property/${rest?._id}`} className="btn btn-secondary" style={{ marginLeft: "10px" }}>Edit Property</NavLink>
                          </> : ""
                        }
                      </div>
                    </div>

                    {/* Price Column */}
                    <div className="col-3">
                      <h5 className="card-title">{`Price : ₹ ${rest?.price} Lakh`}</h5>
                      <p className="card-text"> ₹ {rest.property_area_price}  per sqft </p>
                      <button className="btn btn-success" onClick={() => itemDetails()} >Contact Agent</button> <br /><br />
                      <button className="btn btn-primary" onClick={() => itemDetails()} >Inquiry Now</button>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        )}
      </div>
    </>
  )
};

export default Cart;
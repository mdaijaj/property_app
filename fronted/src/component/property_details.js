import { useNavigate } from "react-router-dom";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './product_details.css';
import MoreDetails from './more_details'


const HotelDetails = () => {
  const [findRest, setFindRest] = useState(null);
  const [showPanorama, setShowPanorama] = useState(false);
  const [quantity, setQuantity] = useState(1); // Initialize quantity state with 1

  const navigate = useNavigate();
  const { id } = useParams();

  const singleHotelDetails = async () => {
    const response = await axios.get(`/api/propertyDetails/${id}`);
    console.log("response2", response);
    setFindRest(response.data.data);
  };

  const bookingDetails = (id) => {
    navigate(`/booking/${id}`)
  }

  const incrementQuantity = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prevQuantity => prevQuantity - 1);
    }
  };

  useEffect(() => {
    singleHotelDetails();
  }, []);


  return (
    <>


      <div className="barr">
        <div className="container">
          <h4 className="hoem">Home &gt; Hotel &gt; {findRest?.property_name}</h4>
        </div>
      </div>
      <div className='container'>
        <div className='product-section' style={{ padding: "20px" }}>
          <div className='product-image'><img alt='hair' src="https://www.hoteltheroyalplaza.com/images/room_banner_1.jpg" style={{ height: "400px", width: "550px", borderRadius: "10px" }} />

            <div class="card-group">
              <div class="card">
                <img alt='hair' src='https://img.staticmb.com/mbimages/project/Photo_h310_w462/2024/03/06/Project-Photo-24-Kensington-Park-Plot-Phase-I-Noida-5010159_1125_2000_310_462.jpg' style={{ width: "150px", height: "120px" }} />
              </div>
              <div class="card">
                <img alt='hair' src='https://img.staticmb.com/mbimages/project/Photo_h310_w462/Project-Photo-1-RWA-Sector-122-Noida-5065776_480_1366_310_462.jpg' style={{ width: "150px", height: "120px" }} />
              </div>
              <div class="card">
                <img alt='hair' src='https://img.staticmb.com/mbphoto/property/cropped_images/2024/Aug/28/Photo_h300_w450/74581551_4_a32215f65344daaab550b5687e4f0dd_300_450.jpg' style={{ width: "150px", height: "120px" }} />
              </div>
            </div>
            <div class="card-group">
              <div class="card">
                <img alt='hair' src='https://img.staticmb.com/mbphoto/property/cropped_images/2024/Jul/25/Photo_h300_w450/74016959_1_ungalowinteriordesign2_300_450.jpg' style={{ width: "150px", height: "120px" }} />
              </div>
              <div class="card">
                <img alt='hair' src='https://img.staticmb.com/mbphoto/property/cropped_images/2024/Aug/28/Photo_h300_w450/74581073_3_7fabulousbedroomdecorideasFB1200x700compressedCopy_300_450.jpg' style={{ width: "150px", height: "120px" }} />
              </div>
              <div class="card">
                <img alt='hair' src='https://www.hoteltheroyalplaza.com/images/room_banner_1.jpg' style={{ width: "150px", height: "120px" }} />
              </div>
            </div>
          </div>


          <div className='product-detail'>
            <h2>{findRest?.property_name}</h2>
            <p className="card-text">{`rating: ${findRest?.rating}`}</p>
            <p className="card-text">{`country: ${findRest?.address?.country}`}</p>
            <p className="card-text">{`state: ${findRest?.address?.state}`}</p>
            <p className="card-text">{`city: ${findRest?.address?.city}`}</p>
            <p className="card-text">{`aminites: ${findRest?.aminites}`}</p>
            <p className="card-text">{`aminites: ${findRest?.status}`}</p>
            <p className="card-text">   {`numOfReviews: 4`}</p>
            <p>{findRest?.description}</p>
            <div className="quantity-input">
              <h3 style={{ marginLeft: "85px" }}>Price ₹ {findRest?.price} Lakh</h3>
              <div className='cout-cont'> <input type="number" value={quantity} readOnly />
                <div className='count-item'> <button onClick={incrementQuantity}>+</button>
                  <button onClick={decrementQuantity}>-</button></div></div>
            </div>
            <div>
              <button className="shop-btn1 btn-success" onClick={() => bookingDetails(findRest._id)}>Book Now</button>
              <button className="shop-btn1 btn-info">Get Contact No.</button>
            </div>
          </div>
        </div>
        <MoreDetails />
      </div>
    </>
  );
};

export default HotelDetails;

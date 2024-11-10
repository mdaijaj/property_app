import { useState } from "react";
import ReviewModal from "./review_model"; // Adjust the import path if needed
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';


const MoreDetails = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleSubmitReview = async (review) => {
    try {
      const response = await axios.post("https://api.example.com/reviews", { review });
      console.log("Review submitted:", response.data);
      toast.success('Review submitted successfully!', { autoClose: 1000 })
    } catch (error) {
      toast.info('Failed to submit review. Please try again!', { autoClose: 1000 })
    }
    handleCloseModal();
  };

  return (
    <>
      <div className="container detail-cont">
        <h1>Property More Detail</h1>
        <button type="button" className="btn btn-primary">
          Offer <span className="badge bg-danger">Save up to 40% on your Dream Home Interiors from Top Brands</span>
        </button>
        <p>Contrary to popular belief, Lorem Ipsum is not simply random text...</p>
      </div>

      <div className="container">
        <img
          alt="property"
          src="https://www.hoteltheroyalplaza.com/images/room_banner_1.jpg"
          style={{ width: "150px", height: "120px" }}
        />
      </div>

      <button className="shop-btn1 btn-success" style={{ marginLeft: "16px" }}>
        Contact Agent
      </button>

      <div>
        <h3>Amenities</h3>
      </div>

      <div>
        <button className="btn btn-info">All Reviews</button>
        <button
          className="btn btn-primary"
          onClick={handleOpenModal}
          style={{ marginLeft: "16px" }}
        >
          Write Review
        </button>

        <ReviewModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSubmit={handleSubmitReview}
        />
      <ToastContainer />
      </div>
    </>
  );
};

export default MoreDetails;

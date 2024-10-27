import React, { useState } from "react";
import './review_model.css'; 

const ReviewModal = ({ isOpen, onClose, onSubmit }) => {
  const [review, setReview] = useState("");

  const handleReviewChange = (e) => setReview(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(review); 
    setReview("");
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Write a Review</h2>
        <form onSubmit={handleSubmit}>
          <textarea
            value={review}
            onChange={handleReviewChange}
            placeholder="Write your review here"
            rows="4"
            style={{ width: "100%", marginBottom: "10px" }}
          />
          <button type="submit" className="btn btn-primary">Submit Review</button>
          <button type="button" className="btn btn-secondary" onClick={onClose} style={{ marginLeft: "10px" }}>
            Close
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReviewModal;

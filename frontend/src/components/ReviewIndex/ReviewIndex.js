import { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import * as reviewActions from '../../store/reviews';
import { Modal } from '../../context/Modal';
import ReviewFormModal from '../ReviewForm/ReviewFormModal.js';
import ReviewItem from '../ReviewItem/ReviewItem.js';
import './ReviewIndex.css';


const ReviewIndex = ({users, reviews, listing}) => {
  const dispatch = useDispatch();

  const user = useSelector(state => state.session.user); 

  return (
    <div className="review-show-container">
      
      {reviews.map(review => (
        <ReviewItem 
          key={review.id} 
          users={users}
          review={review} 
          listing={listing} 
        />
      ))}


    </div>
  )
}

export default ReviewIndex;
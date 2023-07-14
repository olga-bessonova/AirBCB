import { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import * as reviewActions from '../../store/reviews';
import { Modal } from '../../context/Modal';
import ReviewFormModal from '../ReviewForm/ReviewFormModal.js';
import './ReviewItem.css';


const ReviewItem = ({ users, review, listing }) => {
  const dispatch = useDispatch();
  const [reviewModal, setReviewModal] = useState(false)

  const user = useSelector(state => state.session.user); 

  return (
    <div className="review_show_container">      
        <div className="review_show_header">
          <div className="review_show_header_img_name">
            <div>
              {/* <img className="show-review-image" src={require("../../assets/avatar/man1.jpg")} alt="" /> */}
              <img className="show_review_image" src={users[review.userId].photoUrl} alt="" />
            </div>            
            <div className='review_user_info'>
              <span>{users[review.userId].firstName}</span>
            </div>
          </div>

          <div className='listing_review_delete_button_container'>
          {user && review.userId === user.id && (
              <button className='listing_review_edit_button' onClick={() => {setReviewModal(true)}}>
                <i className="fa-solid fa-pen"></i>
              </button>              
            )}

            {reviewModal && (
              <Modal onClose={(e) => {setReviewModal(false)}}>
                <ReviewFormModal user={user} listing={listing} review={review} setReviewModal={setReviewModal}/>
              </Modal>
            )}
            
            {user && review.userId === user.id && (
              <button className='listing_review_delete_button' onClick={() => dispatch(reviewActions.deleteReview(review.id))}>
                <i className="fa-solid fa-trash-can"></i> 
              </button> 
                            
            )}            
          </div>  

        </div>
        <div className="review_body_container">{review.body}</div>  
    </div>
  )
}

export default ReviewItem;
import { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import * as reviewActions from '../../store/reviews';
import { Modal } from '../../context/Modal';
import ReviewFormModal from '../ReviewForm/ReviewFormModal.js';
import './ListingReview.css';


const ListingReview = ({users, reviews, listing}) => {
  const dispatch = useDispatch();
  const [reviewModal, setReviewModal] = useState(false)

  const user = useSelector(state => state.session.user); 

  return (
    <div className="review-show-container">
      
      {reviews.map(review => (
        <div className='review-show-container2'>

          <div className="review-show-header">
            <div className="review-show-header-img-name">
              <div>
                {/* <img className="show-review-image" src={require("../../assets/avatar/man1.jpg")} alt="" /> */}
                <img className="show-review-image" src={users[review.userId].photoUrl} alt="" />
              </div>            
              <div className='review-user-info'>
                <span>{users[review.userId].firstName}</span>
              </div>
            </div>

            <div className='listing-review-delete-button-container'>
              {user && review.userId === user.id && (
                <button className='listing-review-edit-button' onClick={() => {setReviewModal(true)}}>
                  <i className="fa-solid fa-pen"></i>
                </button>              
              )}

              {reviewModal && (
                <Modal onClose={(e) => {setReviewModal(false)}}>
                  <ReviewFormModal user={user} listing={listing} review={review} setReviewModal={setReviewModal}/>
                </Modal>
              )}
              {user && review.userId === user.id && (
                <button className='listing-review-delete-button' onClick={() => dispatch(reviewActions.deleteReview(review.id))}>
                  <i className="fa-solid fa-trash-can"></i> 
                </button>                            
              )}

            
          </div>  

          </div>


          <div className="review-body-container">{review.body}</div>  
    
        </div>
      ))}


    </div>
  )
}

export default ListingReview;
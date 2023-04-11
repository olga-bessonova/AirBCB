import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { fetchListing, getListing } from "../../store/listings"
import { fetchUser, fetchUsers } from "../../store/users"
import { fetchReview, fetchReviews, getReviews } from "../../store/reviews"
import { restoreSession } from "../../store/session"
import ReviewForm from '../ReviewForm';
import ListingReview from '../ListingReview';
import { Modal } from '../../context/Modal';
import './ListingShow.css'

export const ListingShow = ({showLoginModal, setShowLoginModal}) => {
  const { listingId } = useParams();
  const dispatch = useDispatch();
  const listing = useSelector(getListing(listingId)); 
  const userId = listing ? listing.userId : null 
  const user = useSelector(state => state.users ? state.users[userId] : null);
  const users = useSelector(state => state.users);
  const reviews = useSelector(state => Object.values(state.reviews));
  const reviewsSelected = reviews.filter(review => review.listingId == listingId);
  const currentUser = useSelector(state => state.session.user);
  const [reviewModal, setReviewModal] = useState(false);


  useEffect(() => {
    dispatch(fetchListing(listingId));
    }, [listingId, dispatch])

  useEffect(() => {
    dispatch(restoreSession())
    }, []);

  const writeReview = (e) => {
    e.preventDefault();
    if (currentUser) setReviewModal(true)
    else setShowLoginModal(true);
  };

    if (!listing || !user || !reviews) {
      return null
  }

  if (user) return (
    <div className="listing-show-container">
      <div className="listing-show-header">
        <h1>{listing.title}</h1>
        &#9733;
        <span className='review-score'>4.9</span>
        <span className='review-dot'>·</span>
        <span className='review-amount'>26 reviews</span>
        <span className='review-dot'>·</span>
        <span>{`${listing.city}, ${listing.country}`}</span>
      </div>

      <div className="images-container"> 
        <img id="listing-image1" src={require("../../assets/listings/1/1.jpg")}></img>
      </div>

      {/* <div className="images-container">
        <div className='image-one'>
          <img src={require("../../assets/listings/1/1.jpg")}></img>
        </div>
        <div className='images-column-two'>
          <img src={require("../../assets/listings/1/1.jpg")}></img>
          <img src={require("../../assets/listings/1/1.jpg")}></img>
        </div>
        <div className='images-column-three'>
          <img src={require("../../assets/listings/1/1.jpg")}></img>
          <img src={require("../../assets/listings/1/1.jpg")}></img>
        </div>
      </div> */}

      <div>
        <h2>{`${listing.placeType
          .split('_')
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ')} hosted by ${user.firstName}`}
        </h2>
        <div className="divider-container"><hr className="divider"></hr></div>
        <p>{listing.description}</p>
        <h2></h2>
      </div>

      <div className="divider-container"><hr className="divider"></hr></div>
      {(!currentUser || (currentUser.id !== listing.userId)) && (
        <button className="write-review-button" onClick={writeReview}>Write a review</button>)}

      {reviewModal && (
        <Modal onClose={() => setReviewModal(false)}>
          <ReviewForm user={user} listing={listing} setReviewModal={setReviewModal} />
        </Modal>
      )}
      

      <div className = "reviews-container">
        <ListingReview 
          users={users}
          reviews={reviewsSelected}
        />
      </div>
    </div>    
  )
}

export default ListingShow;
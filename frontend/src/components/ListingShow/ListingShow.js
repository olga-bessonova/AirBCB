import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { fetchListing, getListing } from "../../store/listings"
import { fetchUser, fetchUsers } from "../../store/users"
import { fetchReview, fetchReviews, getReviews } from "../../store/reviews"
import { restoreSession } from "../../store/session"
// import ReviewForm from '../ReviewForm';
import ReviewFormModal from '../ReviewForm/ReviewFormModal.js';
import ListingReviewVisual from '../ListingReviewVisual';
import ListingReview from '../ListingReview';
import GoogleMap from '../GoogleMap'
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


  let aveRating = 0;
  if (reviewsSelected.length > 0) {
    reviewsSelected.forEach(review => {
      aveRating += review.rating;
    })
    aveRating = (aveRating/reviewsSelected.length).toFixed(2)
  }

  

  if (user) return (
    <div className="listing-show-container">
      <div className="listing-show-header">

        <h1>{listing.title}</h1>
        <div  className="listing-show-header-details-row">
          <span className="review-star">&#9733;</span>        
          <span className='review-score'>{aveRating}</span>
          <span className='review-dot'>·</span> 
          <span className='review-amount'>{reviewsSelected.length} reviews</span>
          <span className='review-dot'>·</span>
          <span className='review-location'>{`${listing.city}, ${listing.country}`}</span>
        </div>
      </div>

      
      <div className="listing-show-visuals">
        <div className='first-col-photo'>
          {/* <img className="listing-show-image main" src={require("../../assets/listings/1/1.jpg")}/> */}
          <img className="listing-show-image main" src={listing.photosUrl[0]}/>
        </div>
        <div className='second-col-photos'>
          <img className="listing-show-image main" src={listing.photosUrl[1]}/>
          <img className="listing-show-image main" src={listing.photosUrl[2]}/>
        </div>
        <div className='third-col-photos'>
          <img className="listing-show-image main" src={listing.photosUrl[3]}/>
          <img className="listing-show-image main" src={listing.photosUrl[4]}/>

          {/* <img className="listing-show-image" src={require("../../assets/listings/1/4.jpg")}/>
          <img className="listing-show-image" src={require("../../assets/listings/1/5.jpg")}/> */}

       </div>
      </div>


      <div className="hosted-by-container">
        <div className="hosted-by-details-header">
          <div className="hosted-by-left-side">

          <span className="hosted-by">{`${listing.placeType
            .split('_')
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ')} hosted by ${user.firstName}`}
          </span>
          <div className='hosted-by-details'>
            <span>{`${listing.maxGuests} guests`}</span>
            <span>·</span>
            <span>{`${listing.numOfBed}`}{listing.numOfBed > 1 ? ' bedrooms' : ' bedroom'}</span>
            <span>·</span>
            <span>{`${listing.numOfBath}`} {listing.numOfBath > 1 ? 'baths' : 'bath'}</span>
          </div>
          </div>
          <div className='listing-detail-avatar'>
            {/* <img className='owner-avatar' src={require("../../assets/avatar/girl2.jpg")}/> */}
            <img className='owner-avatar' src={user.photoUrl}/>
          </div>
        </div>
        <div className="divider-container"><hr className="divider"></hr></div>
        <p className="description-p">{listing.description}</p>
      </div>
      

      <div className="divider-container"><hr className="divider"></hr></div>
      {(!currentUser || (currentUser.id !== listing.userId)) && (
        <button className="write-review-button" onClick={writeReview}>Write a review</button>)}

      {reviewModal && (
        <Modal onClose={() => setReviewModal(false)}>
          {/* <ReviewForm user={user} listing={listing} setReviewModal={setReviewModal} /> */}
          <ReviewFormModal user={user} listing={listing} setReviewModal={setReviewModal} />
        </Modal>
      )}
      

      <div className = "reviews-container">
        <div  className="reviews-container-header">
          <span className="review-star">&#9733;</span> 
          <span className='review-score'>{aveRating}</span>
          <span className='review-dot'>·</span>
          <span className='review-amount'>{reviewsSelected.length} reviews</span>       
        </div>

        <div className="visual-container">
          <ListingReviewVisual reviewsSelected={reviewsSelected} />
        </div>

        <ListingReview 
          users={users}
          reviews={reviewsSelected}
          listing={listing}
        />
      </div>

      <div className="divider-container"><hr className="divider"></hr></div>

      <div className="where-youll-be">Where you’ll be</div>

      <div>
        <GoogleMap lng={listing.longitude} lat={listing.latitude}/>
      </div>


    </div>    
  )
}

export default ListingShow;
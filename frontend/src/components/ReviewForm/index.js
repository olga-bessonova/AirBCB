import { useState } from 'react';
import { useDispatch } from 'react-redux';
import * as reviewActions from '../../store/reviews';
import StarRating from './StarRating';
import './ReviewForm.css';


const ReviewForm = ({user, listing, setReviewModal}) => {

  const dispatch = useDispatch();
  const [body, setBody] = useState("");
  const [cleanliness, setCleanliness] = useState(5);
  const [communication, setCommunication] = useState(5);
  const [checkin, setCheckin] = useState(5);
  const [accuracy, setAccuracy] = useState(5);
  const [location, setLocation] = useState(5);
  const [value, setValue] = useState(5);
  
  const handlePostReview = (e) => {
      e.preventDefault();
      dispatch(reviewActions.createReview({
        userId: user.id,
        listingId: listing.id,
        body,
        cleanliness,
        communication,
        checkin,
        accuracy,
        location,
        value
      }))
      .then(setReviewModal(false))
  }

  return (
    <div className='review-container'>
      <form onSubmit={handlePostReview} className='review-form'>
        <label>Cleanliness
          <div className='rating'>
            <StarRating rating={cleanliness} setRating={setCleanliness}/>
          </div>
        </label>

        <label>Communication
          <div className='rating'>
            <StarRating rating={communication} setRating={setCommunication}/>

          </div>
        </label>

        <label>Check-in
          <div className='rating'>
          <StarRating rating={checkin} setRating={setCheckin}/>

          </div>
        </label>

        <label>Accuracy
          <div className='rating'>
          <StarRating rating={accuracy} setRating={setAccuracy}/>

          </div>
        </label>

        <label>Location
          <div className='rating'>
          <StarRating rating={location} setRating={setLocation}/>

            </div>
        </label> 

        <label>Value
          <div className='rating'>
          <StarRating rating={value} setRating={setValue}/>
            </div>
        </label>

        {/* <div className='review-write-container'>Write a review</div> */}
        {/* <div className='review-howwas-container'>How was your stay?</div> */}

        <textarea className='review-box'
          placeholder='How was your stay?'
          value={body}
          onChange={(e)=> setBody(e.target.value)}
          required
        >
        </textarea>

        <button className='post-review-button' onClick={handlePostReview}>Post review</button>
      </form>
    </div>

  );
}

export default ReviewForm;
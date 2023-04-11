import { useState } from 'react';
import { useDispatch } from 'react-redux';
import * as reviewActions from '../../store/reviews';
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
  
  const handleSubmit = (e) => {
      e.preventDefault();
      dispatch(reviewActions.createReview({
          listingId:listing.id,
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
      <div className='review-modal-header'>How was your stay</div>
      <form onSubmit={handleSubmit} className='review-form'>
        <label>Cleanliness
          <div className='rating'>
            1
          </div>
        </label>

        <label>Communication
          <div className='rating'>
            2
          </div>
        </label>

        <label>Check-in
          <div className='rating'>
            3
          </div>
        </label>

        <label>Accuracy
          <div className='rating'>
            4
          </div>
        </label>

        <label>Location
          <div className='rating'>5</div>
        </label> 

        <label>Value
          <div className='rating'>6</div>
        </label>

        <div className='review-write-container'>Write a review</div>
        <div className='review-howwas-container'>How was your stay?</div>

        <textarea className='review-box'
          placeholder='How was your stay?'
          value={body}
          onChange={(e)=> setBody(e.target.value)}
          required
        >
        </textarea>

        <button>Post review</button>
      </form>
    </div>

  );
}

export default ReviewForm;
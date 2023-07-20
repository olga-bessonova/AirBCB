import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import * as reviewActions from '../../store/reviews';
import StarRating from './StarRating';
import './ReviewForm.css';

// ReviewFormModal handles Update and Create a review
const ReviewFormModal = ({user, listing, review, setReviewModal}) => {

  const dispatch = useDispatch();
  
  let formType;
  if (typeof review === 'undefined') {
    formType = 'Create Review'
    review = { 
      userId: user.id,
      listingId: listing.id,
      body: '',
      cleanliness: 5,
      communication: 5,
      checkin: 5,
      accuracy: 5,
      location: 5,
      value: 5
    };
  } else {
    formType = 'Update Review'
  };
  

  // console.log(review.body)
  // debugger
  const [body, setBody] = useState(review.body);
  const [cleanliness, setCleanliness] = useState(review.cleanliness);
  const [communication, setCommunication] = useState(review.communication);
  const [checkin, setCheckin] = useState(review.checkin);
  const [accuracy, setAccuracy] = useState(review.accuracy);
  const [location, setLocation] = useState(review.location);
  const [value, setValue] = useState(review.value);

  const [errors, setErrors] = useState([]);

  useEffect(() => {
    if (review.id) dispatch(reviewActions.fetchReview(review.id));
  }, [dispatch, review.id]);

  const update = (field) => {
    return e => {
      switch (field) {
        case 'body':
          setBody(e.currentTarget.value);
          break;
        case 'cleanliness':
          setCleanliness(e.currentTarget.value);
          break;
        case 'communication':
          setCommunication(e.currentTarget.value);
          break;
        case 'checkin':
          setCheckin(e.currentTarget.value);
          break;
        case 'accuracy':
          setAccuracy(e.currentTarget.value);
          break;
        case 'location':
          setLocation(e.currentTarget.value);
          break;
        case 'value':
          setValue(e.currentTarget.value);
          break;
        default:
          console.error('Field name error');
          break;
      }
    }
  }

  
  // const handlePostReview = (e) => {
  //     e.preventDefault();
  //     review = {...review, body, cleanliness, communication, checkin, accuracy, location, value};
  //     formType === 'Create Review' ?
  //       dispatch(reviewActions.createReview(review)) 
  //     .then(setReviewModal(false))
  //       :
  //       dispatch(reviewActions.updateReview(review))
  //     .then(setReviewModal(false))
  // }

//   const handlePostReview = async (e) => {
//     e.preventDefault();
//     review = {...review, body, cleanliness, communication, checkin, accuracy, location, value};
//       {
//         formType === 'Create Review' ?
//         await dispatch(reviewActions.createReview(review)) :
//         await dispatch(reviewActions.updateReview(review))
//       }
//     setReviewModal(false)      
// }

const handlePostReview = async (e) => {
  e.preventDefault();
  setErrors([]);
  review = {...review, body, cleanliness, communication, checkin, accuracy, location, value};
  if (formType === 'Create Review') {
    return dispatch(reviewActions.createReview(review))
    .finally(() => setReviewModal(errors.length === 0))
    .catch(async (res) => {
      let data;
      try{
        data = await res.clone().json();
      } catch {
        data = await res.text();
      }
      if (data?.errors) setErrors(data.errors);
      else if (data) setErrors([data])
      else setErrors([res.statusText]);
    })
  } else {
    return dispatch(reviewActions.updateReview(review))
    .finally(() => setReviewModal(errors.length === 0))
    .catch(async (res) => {
      let data;
      try{
        data = await res.clone().json();
      } catch {
        data = await res.text();
      }
      if (data?.errors) setErrors(data.errors);
      else if (data) setErrors([data])
      else setErrors([res.statusText]);
    })          
  }
}

  return (
    <div className='review-container'>
      <form onSubmit={handlePostReview} className='review-form'>
        <h2 className='review_container_header'>{formType}</h2>
        <label>Cleanliness
          <div className='rating'>
            <StarRating rating={cleanliness} setRating={setCleanliness} onChange={update('cleanliness')}/>
          </div>
        </label>

        <label>Communication
          <div className='rating'>
            <StarRating rating={communication} setRating={setCommunication} onChange={update('communication')}/>

          </div>
        </label>

        <label>Check-in
          <div className='rating'>
          <StarRating rating={checkin} setRating={setCheckin} onChange={update('checkin')}/>

          </div>
        </label>

        <label>Accuracy
          <div className='rating'>
          <StarRating rating={accuracy} setRating={setAccuracy} onChange={update('accuracy')}/>

          </div>
        </label>

        <label>Location
          <div className='rating'>
          <StarRating rating={location} setRating={setLocation} onChange={update('location')}/>

            </div>
        </label> 

        <label>Value
          <div className='rating'>
          <StarRating rating={value} setRating={setValue} onChange={update('value')}/>
            </div>
        </label>

        {/* <div className='review-write-container'>Write a review</div> */}
        {/* <div className='review-howwas-container'>How was your stay?</div> */}

        <div className="error-message">
          <ul>
            {errors.map(error => <li key={error}>{error}</li>)}
          </ul>
        </div>

        <textarea className='review-box'
          placeholder='How was your experience?'
          value={body}
          onChange={update('body')}
          required
        >
        </textarea>

        <button className='post-review-button' onClick={handlePostReview}>{formType}</button>
      </form>
    </div>

  );
}

export default ReviewFormModal;
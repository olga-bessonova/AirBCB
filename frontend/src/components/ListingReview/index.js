import { useSelector, useDispatch } from "react-redux";
import * as reviewActions from '../../store/reviews';


const ListingReview = ({users, reviews}) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user); 

  return (
    <div className="review-show-container">
      
      {reviews.map(review => (
        <div className='review-show-container2'>
          <div className='review-user-info'>
            <span>{users[review.userId].firstName}</span>
          </div>
          <div>{review.body}</div>  
          <div className='listing-review-delete-button-container'>
            {user && review.userId === user.id && (
              <button className='listing-review-delete-button' onClick={() => dispatch(reviewActions.removeReview(review.id))}>
                Delete
              </button>
            )}
          </div>      
        </div>
      ))}
    </div>
  )
}

export default ListingReview;
import { useSelector, useDispatch } from "react-redux";
import * as reviewActions from '../../store/reviews';
import './ListingReview.css';


const ListingReview = ({users, reviews}) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user); 

  return (
    <div className="review-show-container">
      
      {reviews.map(review => (
        <div className='review-show-container2'>

          <div className="review-show-header">
            <div className="review-show-header-img-name">
              <div>
                <img className="show-review-image" src={require("../../assets/avatar/man1.jpg")} alt="" />
                {/* <img className="show-review-image" src={user.photoUrl} alt="" /> */}
              </div>            
              <div className='review-user-info'>
                <span>{users[review.userId].firstName}</span>
              </div>
            </div>

            <div className='listing-review-delete-button-container'>
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
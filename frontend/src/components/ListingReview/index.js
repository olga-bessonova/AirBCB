import { useSelector, useDispatch } from "react-redux";
import * as reviewActions from '../../store/reviews';


const ListingReview = ({users, reviews}) => {
  // const dispatch = useDispatch();
  // const user = useSelector(state => state.session.user); 

  return (
    <div className="review-show-container">
      {reviews.map(review => (
        <div>{review.body}</div>        
      ))}
    </div>
  )
}

export default ListingReview;
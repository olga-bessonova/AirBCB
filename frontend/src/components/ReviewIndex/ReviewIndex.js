import ReviewItem from '../ReviewItem/ReviewItem.js';
import './ReviewIndex.css';


const ReviewIndex = ({users, reviews, listing}) => {
  // const dispatch = useDispatch();
  // const user = useSelector(state => state.session.user); 

  return (
    <div className="review_show_container">
      
      {reviews.map(review => (
        <ReviewItem 
          key={review.id} 
          users={users}
          review={review} 
          listing={listing} 
        />
      ))}


    </div>
  )
}

export default ReviewIndex;
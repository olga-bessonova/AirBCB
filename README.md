# WELCOME TO AIRBCB!

[Live Site](https://airbcb.onrender.com/)

### Introduction
Airbcb is a clone of Airbnb and inspired by the movie The Holiday. Airbnb is a service that provides a platform for users for lease their apartments for short-term. The idea behind Airbcb (air bed, car & breakfast) is to provide both an apartment as well as a car to another user for short-term use.

The technologies that were used during the production of Airbcb
* Languages: Javascript, Ruby on Rails, HTML, CSS
* Frontend: React-Redux
* Database: PostgreSQL
* Hosting: Render
* Asset Storage: AWS Simple Cloud Storage (S3)

# MVPs

## Profiles
A user is able to create a profile that persist to both front and backend. A user can also log in as a demo user.

![gif of profiles](frontend/src/assets/production_readme_gif/demo-login.gif)

There are login and signup error handling:
![gif of error handling](frontend/src/assets/production_readme_gif/signup-error-handling.gif)

![gif of error handling](frontend/src/assets/production_readme_gif/login-error-handling.gif)

## Reviews
A user who is not the owner of the apartment can create and delete review. Number of reviews and visual component of an apartment is being updated dynamically:

![gif of reviews](frontend/src/assets/production_readme_gif/review.gif)

## Search
There is a dynamic search that searches for a specified word in a title:

![gif of reviews](frontend/src/assets/production_readme_gif/search.gif)

## Backend
Listing's controller
```javascript
class Api::ListingsController < ApplicationController
  wrap_parameters include: Review.attribute_names + ['userId']

  def index
    @listings = Listing.all
    render :index
  end

  def show
    @listing = Listing.find(params[:id])
    @users = User.all
    @reviews = Review.where(listing_id: @listing[:id])

    render :show    
  end

  def create
    @listing = Listing.new(
      title: params[:title],
      description: params[:description],
      place_type: params[:place_type],
      feature: params[:feature],
      num_of_bath: params[:num_of_bath],
      num_of_bed: params[:num_of_bed],
      max_guests: params[:max_guests],
      city: params[:city],
      country: params[:country],
      latitude: params[:latitude],
      longitude: params[:longitude],
      price: params[:price]
    )
    @listing.user_id = current_user.id
    if @listing.save
      render :show
    else
      render json: {errors: @listing.errors.full_messages}, status: :unprocessable_entity
    end
  end

  def update
    @listing = Listing.find(params[:id])
    if @listing.update(
      title: params[:title],
      description: params[:description],
      place_type: params[:place_type],
      feature: params[:feature],
      num_of_bath: params[:num_of_bath],
      num_of_bed: params[:num_of_bed],
      max_guests: params[:max_guests],
      city: params[:city],
      country: params[:country],
      latitude: params[:latitude],
      longitude: params[:longitude],
      price: params[:price]
    )
      @listing.save
      render :show
    else
      render json: {errors: @listing.errors.full_messages}, status: :unprocessable_entity
    end
  end

  def destroy
    @listing = Listing.find(params[:id])
    if current_user.id == @listing.iser_id 
      @listing.destroy
    end
  end

  def search 
    @listings = Listing.where("lower(title) LIKE ?", "%#{params[:q]}%")
    render :search
  end

end
```
## Frontend
Listings store:

```javascript
import csrfFetch from "./csrf";

export const RECEIVE_LISTINGS = 'listings/RECEIVE_LISTINGS';
export const RECEIVE_LISTING = 'listings/RECEIVE_LISTING';
export const REMOVE_LISTING = 'listings/REMOVE_LISTING';

export const receiveListings = (listings) => ({
  type: RECEIVE_LISTINGS,
  listings
});

export const receiveListing = (data) => ({
  type: RECEIVE_LISTING,
  data
});

export const removeListing = (listingId) => ({
  type: REMOVE_LISTING,
  listingId
});

export const getListing = listingId => state => {
  return state?.listings ? state.listings[listingId] : null;
}

export const getListings = state => {
  return state?.listings ? Object.values(state.listings) : [];
}

export const fetchListings = () => async (dispatch) => {
  const response = await csrfFetch ('/api/listings');

  if (response.ok) {
    const listings = await response.json();
    dispatch(receiveListings(listings));
  }
};

export const fetchListing = listingId => async (dispatch) => {
  const response = await csrfFetch (`/api/listings/${listingId}`);

  if (response.ok) {
    const data = await response.json();
    dispatch(receiveListing(data));
  }
};

export const createListing = listing => async (dispatch) => {
  const response = await csrfFetch(`/api/listings/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(listing)
  });

  if (response.ok) {
    const listing = await response.json();
    dispatch(receiveListing(listing));
  }
};

export const updateListing = listing => async (dispatch) => {
  const response = await csrfFetch(`/api/listings/${listing.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(listing)
  });
    
  if (response.ok) {
    const listing = await response.json();
    dispatch(receiveListing(listing));
  }
};

export const deleteListing = listingId => async (dispatch) => {
  const response = await csrfFetch (`/api/listings/${listingId}`, {
    method: 'DELETE'
  });

  if (response.ok) {
    dispatch(removeListing(listingId));
  }
};

const listingsReducer = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_LISTINGS:
      return { ...action.listings };
    case RECEIVE_LISTING:
      return { ...state, [action.data.listing.id]: action.data.listing };
    case REMOVE_LISTING:
      const newState = { ...state };
      delete newState[action.listingId];
      return newState;
    default:
      return state;
  }
}

export default listingsReducer;
```

Listing's show page
```javascript
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { fetchListing, getListing } from "../../store/listings"
import { restoreSession } from "../../store/session"
import ReviewFormModal from '../ReviewForm/ReviewFormModal.js';
import ReviewIndex from '../ReviewIndex/ReviewIndex.js';
import ReviewVisual from '../ReviewVisual/ReviewVisual.js';
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
          <img className="listing-show-image main" src={listing.photosUrl[0]}/>
        </div>
        <div className='second-col-photos'>
          <img className="listing-show-image main" src={listing.photosUrl[1]}/>
          <img className="listing-show-image main" src={listing.photosUrl[2]}/>
        </div>
        <div className='third-col-photos'>
          <img className="listing-show-image main" src={listing.photosUrl[3]}/>
          <img className="listing-show-image main" src={listing.photosUrl[4]}/>
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
          <ReviewVisual reviewsSelected={reviewsSelected} />
        </div>

        <ReviewIndex 
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
```
### Thank you

__airbcb__ was created in 2 weeks. I hope you will enjoy using it. Please feel free to contact me. My contact information can be found on the site using the live link above.




import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
// import { deletePost,fetchListing } from '../store/posts';
import { fetchListing } from '../../store/listings';
import './ListingIndex.css';




const ListingIndexItem = ({ listing }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleCLick = (e) => {
    e.preventDefault();
    dispatch(fetchListing(listing.id))
  }

  return (
    <div onClick={()=> history.push(`/listings/${listing.id}`)}>

    <Link to={`listings/${listing.id}`}>
      <div className='listing-div' onClick={handleCLick}>
        
        <div className="listing-image"> 
					<img id="listing-image" src={require("../../assets/listings/1/1.jpg")}></img>
					{/* <img id="listing-image" src={listing.photosUrl[0]}></img> */}
				</div>
        
        <div>
          <p>{listing.title.length < 25 ? listing.title : `${listing.title.slice(0,25)}...`}</p>
          <p>{listing.description.length < 35 ? listing.description : `${listing.description.slice(0,35)}...`}</p>
          <p><span>{`$${listing.price}`}</span> night</p>           
        </div>

      </div>
    </Link>
    </div>
      
  );
};

export default ListingIndexItem;
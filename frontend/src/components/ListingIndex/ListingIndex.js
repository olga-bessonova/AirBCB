import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ListingIndexItem from './ListingIndexItem';
import Feature from '../Feature';
import { getListings, fetchListings } from '../../store/listings';
import './ListingIndex.css';

const ListingIndex = () => {
  const dispatch = useDispatch();
  const listings = useSelector(getListings);
  
  useEffect(() => {
    dispatch(fetchListings());
  }, [dispatch]);
  
  return (
    <>
      {/* <Feature /> */}
      <div className='listings-div'>
        {
          listings.map(listing => <ListingIndexItem listing={listing} key={listing.id}/>)
        }
      </div>
    </>
  );
}

export default ListingIndex;
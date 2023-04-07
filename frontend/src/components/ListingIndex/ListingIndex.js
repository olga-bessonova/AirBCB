import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ListingIndexItem from './ListingIndexItem';
import { getListings, fetchListings } from '../../store/listings';

const ListingIndex = () => {
  const dispatch = useDispatch();
  const listings = useSelector(getListings);
  
  useEffect(() => {
    dispatch(fetchListings());
  }, [dispatch]);
  
  return (
    <>
    <p>banana</p>
      <ul>
        {
          listings.map(listing => <ListingIndexItem listing={listing} key={listing.id}/>
          )
        }
      </ul>
    </>
  );
}

export default ListingIndex;
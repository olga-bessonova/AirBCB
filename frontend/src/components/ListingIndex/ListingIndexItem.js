import React from 'react';
// import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
// import { deletePost } from '../store/posts';

const ListingIndexItem = ({ listing }) => {

  return (
    <li>
      <p>{listing.title}</p>
    </li>
  );
};

export default ListingIndexItem;
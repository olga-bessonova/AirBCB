import { useSelector } from 'react-redux';
import { fetchSearchResults } from '../../store/search';
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import ListingIndexItem from '../ListingIndex/ListingIndexItem';

const Search = () => {

    const dispatch = useDispatch();
    const history = useHistory();

    // debugger;
    useEffect(() => {
        const query = history.location.search.split("=")[1];
        dispatch(fetchSearchResults(query))
    }, []);
    
    const searchResults = useSelector((state) => state.search );
    
    return(
        <div className='listings-div'>
        {/* {Object.values(searchResults).map((ele) => {
            return <div>{ele.title}</div>
        })} */}

        {Object.values(searchResults).map((ele) => {
            return <ListingIndexItem listing={ele} key={ele.id}/>
        })}
        </div>
    );
}
export default Search;
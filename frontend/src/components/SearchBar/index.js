import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import {fetchSearchResults} from "../../store/search"
import './SearchBar.css';


const SearchBar = () => {

  const dispatch = useDispatch();
  const history = useHistory();
  const [searchText, setSearchText] = useState("");

  async function handleSearch(e) {
    // debugger
    e.preventDefault();
    const query = e.target.value;
    await setSearchText(query);
    dispatch(fetchSearchResults(query));
  }

  function handleSearchSubmit(e) {
    e.preventDefault();
    if (searchText.length > 0) {
      history.push(`/search?listings=${searchText}`);
    }
  }
  return (
    // <>
    // <input onChange={handleSearch} type="text" placeholder="Search..."/>
    //   <button id="search_button_wrapper" onClick={handleSearchSubmit}>
    //     <div  id="search_button_background">

    //     <i className="fa-sharp fa-solid fa-magnifying-glass"></i>
    //     </div>
      
    //   </button>
    // </>

<form className="search-container">
<input className="search-bar-input" onChange={handleSearch} type="text" placeholder="Search..."/>
  <div id="search_button_wrapper" onClick={handleSearchSubmit}>
    <button  className="search-button-button">
      <i className="fa-sharp fa-solid fa-magnifying-glass"></i>
    </button>  
  </div>
</form>
  )
};

export default SearchBar;
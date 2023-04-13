import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import {fetchSearchResults} from "../../store/search"


const SearchBar = () => {

  const dispatch = useDispatch();
  const history = useHistory();
  const [searchText, setSearchText] = useState("");

  async function handleSearch(e) {
    // debugger
    e.preventDefault();
    const query = e.target.value;
    await setSearchText(query);
    dispatch(fetchSearchResults());
  }

  function handleSearchSubmit(e) {
    e.preventDefault();
    if (searchText.length > 0) {
      history.push(`search?listings=${searchText}`);
    }
  }
  return (
    <>
    <input onChange={handleSearch} type="text" placeholder="Search..."/>
      <button onClick={handleSearchSubmit}>search</button>
    </>
  )
};

export default SearchBar;
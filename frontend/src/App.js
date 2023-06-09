import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";
import { useSelector } from "react-redux";
import Navigation from "./components/Navigation";
import Search from "./components/SearchShowPage/SearchShowPage.js";
import ListingIndex from './components/ListingIndex/ListingIndex.js'
import ListingShow from './components/ListingShow/ListingShow.js'

function App() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const user = useSelector(({session}) => session.user);

  return (
    <>
      <Navigation 
         showLoginModal={showLoginModal} 
         setShowLoginModal={setShowLoginModal}
      />
      <Switch>
        <Route exact path="/" component={ListingIndex} />
        <Route exact path={'/listings/:listingId'}>
          <ListingShow 
            showLoginModal={showLoginModal}
            setShowLoginModal={setShowLoginModal}
          />
        </Route> 

        <Route path="/search">
          <Search />
        </Route>
      </Switch>
      
    </>
  );
}

export default App;
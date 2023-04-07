import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";
import { useSelector } from "react-redux";
import Navigation from "./components/Navigation";
import ListingIndex from './components/ListingIndex/ListingIndex.js'

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
      </Switch>
      
    </>
  );
}

export default App;
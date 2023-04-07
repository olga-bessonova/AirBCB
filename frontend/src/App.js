import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";
import { useSelector } from "react-redux";
import Navigation from "./components/Navigation";

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
        <Route path="/">
          <ListingIndex/>
        </Route>
      </Switch>
      
    </>
  );
}

export default App;
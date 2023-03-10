import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { hot } from "react-hot-loader/root";

import getCurrentUser from "../services/getCurrentUser";
import "../assets/scss/main.scss";
import RegistrationForm from "./registration/RegistrationForm";
import SignInForm from "./authentication/SignInForm";
import TopBar from "./layout/TopBar";

import PizzaPlaceList from "./PizzaPlaceList.js";
import PizzaPlaceShow from "./PizzaPlaceShow.js";
import NewPizzaPlaceForm from "./NewPizzaPlaceForm.js";
import ChangeUserImage from "./uploads/ChangeUserImage"

const App = (props) => {
  const [currentUser, setCurrentUser] = useState(undefined);
  const fetchCurrentUser = async () => {
    try {
      const user = await getCurrentUser()
      setCurrentUser(user)
    } catch(err) {
      setCurrentUser(null)
    }
  }

  useEffect(() => {
    fetchCurrentUser()
  }, [])

  return (
    <Router>
      <TopBar user={currentUser} />

      <Switch>
        <Route
          exact path={["/", "/pizza-places"]} 
          render={props => <PizzaPlaceList {...props} currentUser={currentUser}/>}
        />
        <Route exact path="/pizza-places/new" component={NewPizzaPlaceForm} />
        <Route 
          exact path="/pizza-places/:id" 
          render={props => <PizzaPlaceShow {...props} currentUser={currentUser}/>}
        />
        <Route exact path="/users/new" component={RegistrationForm} />
        <Route exact path="/user-sessions/new" component={SignInForm} />
        <Route exact path="/users/image" component={ChangeUserImage}/>
      </Switch>
    </Router>
  );
};

export default hot(App);

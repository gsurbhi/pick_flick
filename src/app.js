import React from "react";
import LoginComponent from "./components/LoginComponent";
import Home from "./containers/Home";
import {BrowserRouter as Router, Route} from 'react-router-dom';
import UserHomeContainer from "./containers/UserHomeContainer";
import UserProfile from "./containers/UserProfile";

export default class App extends React.Component{

    render() {
        return (
            <div>
                <Router>
                    <div>
                        <Route exact path="/"
                               component={Home} />

                        <Route path="/login"
                               component={LoginComponent} />
                        <Route path="/:userid/home"
                               component={UserHomeContainer} />
                        <Route path="/:userid/profile"
                               component={UserProfile} />
                    </div>
                </Router>
            </div>
        )
    }
}
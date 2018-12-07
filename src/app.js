import React from "react";
import LoginComponent from "./components/LoginComponent";
import Home from "./containers/Home";
import {BrowserRouter as Router, Route} from 'react-router-dom';

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
                    </div>
                </Router>
            </div>
        )
    }
}
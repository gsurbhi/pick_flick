import React from "react";
import LoginComponent from "./components/LoginComponent";
import Home from "./containers/Home";
import {BrowserRouter as Router, Route} from 'react-router-dom';
import UserHomeContainer from "./containers/UserHomeContainer";
import UserProfile from "./containers/UserProfile";
import CriticHomeContainer from "./containers/CriticHomeContainer";
import RegisterUserContainer from "./containers/RegisterUserContainer";
import AdminContainer from "./containers/AdminContainer";
import SearchResultsPage from "./components/SearchResultsPage";
import CriticReviewContainer from "./containers/CriticReviewContainer";
import DetailsPage from "./components/DetailsPage";
import CriticReview from "./components/CriticReview";
import ReviewsByCritic from "./components/ReviewsByCritic";
import ExploreMoviesContainer from "./containers/ExploreMoviesContainer";

export default class App extends React.Component{

    render() {
        return (
            <div>
                <Router>
                    <div>
                        <Route exact path="/"
                               component={Home} />
                        <Route path="/register"
                               component={RegisterUserContainer}/>
                        <Route path="/login"
                               component={LoginComponent} />
                        <Route path="/:userid/home"
                               component={UserHomeContainer} />
                        <Route path="/critic/:userid/home"
                               component={CriticHomeContainer} />
                        <Route path="/profile/:userid"
                               component={UserProfile} />
                       <Route path="/admin"
                               component={AdminContainer}/>
                        <Route path="/search/:term"
                               component={SearchResultsPage}/>
                        <Route path="/movie/:movieid/review"
                               component={CriticReviewContainer}/>
                        <Route path="/critic/:userId/reviews"
                               component={ReviewsByCritic}/>
                        <Route path="/details/:movieId"
                               component={DetailsPage}/>
                        <Route exact path='/explore' component={ExploreMoviesContainer}/>
                    </div>
                </Router>
            </div>
        )
    }
}
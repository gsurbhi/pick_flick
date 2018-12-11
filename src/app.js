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
import FanExploreContainer from "./containers/FanExploreContainer";
import UserPublicProfile from "./components/UserPublicProfile";
import Favorites from "./components/Favorites";

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
                        <Route path="/critic/:userid/critic-home"
                               component={CriticHomeContainer} />
                        <Route path="/profile/:userid"
                               component={UserProfile} />
                        <Route path="/favorites/:userid"
                            component={Favorites} />
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
                        <Route path="/fan/explore" component={FanExploreContainer} />
                        <Route path="/public/profile/:userId" component={UserPublicProfile}/>
                    </div>
                </Router>
            </div>
        )
    }
}
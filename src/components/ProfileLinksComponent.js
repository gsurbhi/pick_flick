import UserServiceClient from "../services/user.service.client";
import {Link} from "react-router-dom";
import React from "react";
import UserService from '../services/user.service.client'

export default class UserHomeNavbar extends Component {
    constructor(props){
        super(props);
        this.state = {


        };



    }

    setUser(user){
        this.setState({user:user})
    }
    componentWillMount(){

       UserService.getProfile().then(user => {
            this.setUser(user)
        });
    }

    goToFav(){
         window.location.href='/favourites/' + user._id
    }

    goToWatchList(){
        window.location.href='/watchlist/' + user._id
    }
    goToFollowers(){
        window.location.href='/follower/' + user._id
    }
    goToFollowing(){
        window.location.href='/following/' + user._id
    }

    render(){
        return(
            <ul className="list-group">

                <li className="list-group-item"
                onClick={()=>this.goToFav()}>Favourites</li>
                <li className="list-group-item"
                onClick={()=>this.goToWatchList}>Watchlist</li>
                <li className="list-group-item"
                onClick={()=>this.goToFollowers()}>Followers</li>
                <li className="list-group-item"
                    onClick={()=>this.goToFollowing()}>Following</li>

            </ul>
        )
    }
}
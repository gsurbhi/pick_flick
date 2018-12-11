import UserServiceClient from "../services/user.service.client";
import {Link} from "react-router-dom";
import React, {Component} from "react";
import UserService from '../services/user.service.client'

export default class ProfileLinksComponent extends Component {
    constructor(props){
        super(props);
        this.state = {
            user:''
        };
        this.goToFollowers=this.goToFollowers.bind(this)
        this.goToFollowing=this.goToFollowing.bind(this)
    }

    setUser(user){
        this.setState({user:user})
    }
    componentWillMount(){
       UserService.getProfile().then(user => {
            this.setUser(user)
        });
    }

    goToFollowers(){
        window.location.href='/follower/' + this.state.user._id
    }
    goToFollowing(){
        window.location.href='/following/' + this.state.user._id
    }

    render(){
        return(
            <ul className="list-group">
                { this.state.user.type === 'Critic' &&
                    <Link to={"/critic/"+this.state.user._id+"/critic-home"} >
                        <li className="list-group-item"> My Home </li>
                    </Link>
                }
                { this.state.user.type !== 'Critic' &&
                    <Link to={"/"+this.state.user._id+"/home"} >
                        <li className="list-group-item"> My Home </li>
                    </Link>
                }
                <Link to={'/favorites/' + this.state.user._id}>
                    <li className="list-group-item">My Favorites</li>
                </Link>
                <Link to={'/watchlist/' + this.state.user._id}>
                    <li className="list-group-item">My Watchlist</li>
                </Link>
                <li className="list-group-item">
                    Followers: {this.state.user.followers && this.state.user.followers.length}</li>
                <li className="list-group-item"
                    onClick={()=>this.goToFollowing()}>Following: {}</li>

            </ul>
        )
    }
}
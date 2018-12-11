import React, {Component} from 'react'
import UserHomeNavbar from "../components/UserHomeNavbar";
import UserServiceClient from "../services/user.service.client";
import {Link} from "react-router-dom";
import '../styles/fan.explore.container.client.css';
import FanServiceClient from "../services/fan.service.client";

export default class FanExploreContainer extends Component {

    constructor(props){
        super(props)
        this.state = {
            user:'',
            userList:[]
        }
        this.setUser = this.setUser.bind(this)
        this.setUserList = this.setUserList.bind(this)
        this.setLoginToggle = this.setLoginToggle.bind(this)
        this.followUser = this.followUser.bind(this)
        this.unfollowUser = this.unfollowUser.bind(this)
    }

    setLoginToggle(flag){
        this.setState({
            loggedIn: flag
        })

    }

    componentDidMount() {

        UserServiceClient.isloggedIn().then(response => {
            if(response.status === 200){
                this.setLoginToggle(true)
                UserServiceClient.getProfile().then(user => this.setUser(user))
            }
            else{
                this.setLoginToggle(false)
            }
        })

        /* old code, before explore was made available to ALL
        UserServiceClient.getProfile().then(user => {
            this.setUser(user)
        })*/

        setTimeout(() => {
            UserServiceClient.findAllUsers().then(userList =>  this.setUserList(userList))
        }, 500)

    }

    setUser(user){
        this.setState({
            user:user
        })
    }

    setUserList(listOfUsers){
        this.setState({
            userList: listOfUsers
        })
    }

    followUser(user){
        FanServiceClient.followFan(user._id).then(response => console.log(response.status))
        alert("followed user" + user.firstName)
    }

    unfollowUser(user){
        FanServiceClient.unfollowFan(user).then(response => console.log(response.status))
        alert("unfollowed user" + user.firstName)
    }


    render(){
        return (
            <div>
                <div hidden={!this.state.loggedIn}>
                    <UserHomeNavbar/>
                </div>
                <div hidden={this.state.loggedIn}>
                    <nav className="navbar navbar-light bg-light">

                        <Link to="/" className="navbar-brand">
                            <i className="fa fa-video-camera pr-1 text-warning"></i>
                            PickFlick
                        </Link>
                        <ul className="nav mr-auto">
                            <li className="nav-item">
                                <Link to="/login" className="nav-link text-dark">
                                    Login
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/register" className="nav-link text-dark">
                                    Sign up!
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/fan/explore" className="nav-link">Explore</Link>
                            </li>
                        </ul>
                    </nav>
                </div>

                <div className="mt-2 container">
                    <div className="row">
                    {
                        this.state.userList && this.state.userList.map((user,index) => {
                            return <div className="col-lg-2 col-md-4 col-sm-12">
                                <div className="card">
                                    <img className="card-img"
                                         src="http://icons.iconarchive.com/icons/graphicloads/100-flat/72/contact-icon.png"/>
                                    <div className="card-body">
                                        <h5 className="card-title">{user.firstName} {user.lastName}</h5>
                                        <p className="card-text">
                                            <Link to={`/public/profile/${user._id}`}>
                                                Profile
                                            </Link>
                                            <div hidden={!this.state.loggedIn}>
                                            <button className="btn btn-outline-success"
                                                    onClick={()=> this.followUser(user)}>
                                                Follow
                                            </button>
                                            <button className="btn btn-outline-danger"
                                                    onClick={()=> this.unfollowUser(user)}>
                                                Unfollow
                                            </button>
                                            </div>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        })
                    }
                    </div>
                </div>
            </div>
        )
    }
}
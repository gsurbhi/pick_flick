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
        this.followUser = this.followUser.bind(this)
        this.unfollowUser = this.unfollowUser.bind(this)
    }
    componentDidMount() {

        UserServiceClient.isloggedIn().then(response => {
            if(response.status === 200){
                UserServiceClient.getProfile().then(user => this.setUser(user))
            }
            /* else{
                 alert("not logged in")
             }*/
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
                <UserHomeNavbar/>
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
                                            <button className="btn btn-outline-success"
                                                    onClick={()=> this.followUser(user)}>
                                                Follow
                                            </button>
                                            <button className="btn btn-outline-danger"
                                                    onClick={()=> this.unfollowUser(user)}>
                                                Unfollow
                                            </button>
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
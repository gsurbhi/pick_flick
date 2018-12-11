import React, {Component} from 'react'
import UserHomeNavbar from "../components/UserHomeNavbar";
import UserServiceClient from "../services/user.service.client";
import {Link} from "react-router-dom";
import '../styles/fan.explore.container.client.css';
import CriticServiceClient from "../services/critic.service.client";

export default class UserPublicProfile extends Component {

    constructor(props){
        super(props)
        this.state = {
            user:'',
            reviews:''
        }
        this.setUser = this.setUser.bind(this)
        this.setUserList = this.setUserList.bind(this)
    }
    componentDidMount() {
        UserServiceClient.findUserById(this.props.match.params.userId).then(user => {
            this.setUser(user)
        })
    }

    setUser(user){
        console.log(user)
        this.setState({
            user:user
        })

        if(user.type==="Critic"){

        }
    }

    setUserList(listOfUsers){
        this.setState({
            userList: listOfUsers
        })
    }


    render(){
        return (
            <div>
                <UserHomeNavbar/>
                <ul className="list-group m-5">

                    <li className="list-group-item">
                        <i className="fa fa-user fa-5x"></i>
                        <div>
                            Name: {this.state.user.firstName} {this.state.user.lastName}
                        </div>
                        <div>
                            Username: {this.state.user.username}
                        </div>
                        <div>
                            Followers: {this.state.user.followers && this.state.user.followers.length}
                        </div>
                        <div>
                            Following: {this.state.user.following && this.state.user.following.length}
                        </div>
                    </li>
                </ul>
            </div>
        )
    }
}
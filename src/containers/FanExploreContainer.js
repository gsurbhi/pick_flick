import React, {Component} from 'react'
import UserHomeNavbar from "../components/UserHomeNavbar";
import UserServiceClient from "../services/user.service.client";
import {Link} from "react-router-dom";
import '../styles/fan.explore.container.client.css';
import AdminServiceClient from "../services/admin.service.client";

export default class FanExploreContainer extends Component {

    constructor(props){
        super(props)
        this.state = {
            user:'',
            userList:[]
        }
        this.setUser = this.setUser.bind(this)
        this.setUserList = this.setUserList.bind(this)
    }
    componentDidMount() {
        UserServiceClient.getProfile().then(user => {
            this.setUser(user)
            /*if(this.state.user.type !== 'Fan'){
                console.log(this.state.user)
                window.location.href='/profile/' + this.state.user._id
            }*/
        })

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
                                                Reviews
                                            </Link>
                                            <i className="btn m-1 fa fa-plus"></i>
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
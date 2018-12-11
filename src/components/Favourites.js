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


    render(){
        return(
            <ul className="list-group">

            </ul>
        )
    }
}
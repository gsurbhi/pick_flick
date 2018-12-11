import React, {Component} from 'react'
import UserHomeNavbar from "../components/UserHomeNavbar";
import UserServiceClient from "../services/user.service.client";
import '../styles/fan.explore.container.client.css';
import FanServiceClient from "../services/fan.service.client"

export default class UserPublicProfile extends Component {

    constructor(props){
        super(props);
        this.state = {
            user:'',
            reviews:'',
            nFollowers:'',
            nFollowing:''
        };
        this.setUser = this.setUser.bind(this);
        this.setUserList = this.setUserList.bind(this)
    }
    componentDidMount() {
        UserServiceClient.findUserById(this.props.match.params.userId).then(res => {


            FanServiceClient.findMyFollowing(this.props.match.params.userId).then(res_1 => {
                FanServiceClient.findMyFollowers(this.props.match.params.userId).then(res_2 => {
                    console.log("something" , res_1)
                    console.log("something else" , res_2)
                    this.setState({
                        nFollowers: res_2 ? res_2.length :0 ,
                        nFollowing: res_1 ? res_1.length :0,
                        user:res
                    })
                })
            })
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
        console.log("renderin" , this.state)
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
                            Followers: {this.state.nFollowers}
                        </div>
                        <div>
                            Following: {this.state.nFollowing}
                        </div>
                    </li>
                </ul>
            </div>
        )
    }
}
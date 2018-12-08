import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import UserServiceClient from "../services/user.service.client"
export default class UserProfile extends Component{

    constructor(props) {
        super(props)
        this.userService = UserServiceClient.instance;
        this.state = {
            user: {
                id:'',
                username: '',
                firstName: '',
                lastName: '',
                email: '',
                dob: '',
                city: '',
                phone: '',
            }
        }
        this.updateField = this.updateField.bind(this);
    }
    componentDidMount(){
       /* return fetch("http://sheltered-lowlands-30899.herokuapp.com/api/profile")
            .then(response => response.json()).then(user => {
                this.setState({
                    id:user.id,
                    username:user.username,
                    firstName:user.firstName,
                    lastName:user.lastName,
                    courses:user.courses
                })
            })*/
       UserServiceClient.getProfile().then(user=> this.setState({user:user}))
    }

    updateField(portion,target){
        console.log(portion)
        console.log(target)
    }


    render(){
        return(
            <div>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <Link to="/" className="navbar-brand" >
                        <i className="fa fa-video-camera pr-1 text-warning">
                        </i>
                        PickFlick
                        Hey {this.state.user.firstName}!
                    </Link>
                </nav>
                <div className="container">
                    <h1>Profile</h1>
                    <form>

                        <div className="form-group row">
                            <label htmlFor="username"
                                   className="col-sm-2 col-form-label">
                                Username
                            </label>
                        </div>
                        <div className="form-group row">
                            <div className="col-sm-8">
                                <input className="form-control"
                                       id="username"
                                       value={this.state.user.firstName}
                                       readOnly />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="password"
                                   className="col-sm-2 col-form-label">
                                Password
                            </label>
                        </div>
                        <div className="form-group row">
                            <div className="col-sm-8">
                                <input className="form-control"
                                       type="password"
                                       id="password"
                                       onChange={(e)=> this.updateField("password",e.target.value)}
                                       value={this.state.user.password}/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="fName"
                                   className="col-sm-2 col-form-label">
                                First Name
                            </label>
                        </div>
                        <div className="form-group row">
                            <div className="col-sm-8">
                                <input className="form-control"
                                       type="text"
                                       id="firstName"
                                       onChange={(e)=> this.updateField("firstName",e.target.value)}
                                       value={this.state.user.firstName}/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="lName"
                                   className="col-sm-2 col-form-label">
                                Last Name
                            </label>
                        </div>
                        <div className="form-group row">
                            <div className="col-sm-8">
                                <input className="form-control"
                                       type="text"
                                       id="lName"
                                       value={this.state.user.lastName}/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="email"
                                   className="col-sm-2 col-form-label">
                                Email
                            </label>
                        </div>
                        <div className="form-group row">
                            <div className="col-sm-8">
                                <input className="form-control"
                                       type="email"
                                       id="email"
                                       value={this.state.user.email}/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="dob"
                                   className="col-sm-2 col-form-label">
                                Date of birth
                            </label>
                        </div>
                        <div className="form-group row">
                            <div className="col-sm-8">
                                <input className="form-control"
                                       type="date"
                                       id="dob"
                                       value={this.state.user.dob}/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="phone"
                                   className="col-sm-2 col-form-label">
                                Phone
                            </label>
                        </div>
                        <div className="form-group row">
                            <div className="col-sm-8">
                                <input className="form-control"
                                       type="phone"
                                       id="phone"
                                       value={this.state.user.phone}/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="city"
                                   className="col-sm-2 col-form-label">
                                City
                            </label>
                        </div>
                        <div className="form-group row">
                            <div className="col-sm-8">
                                <input className="form-control"
                                       type="text"
                                       id="city"
                                       value={this.state.user.city}/>
                            </div>
                        </div>

                        <div className="form-group row">
                            <div className="col-sm-8 my-2">
                                <Link to={"/"+this.state.user.id+"/home"}>
                                    <button className="btn btn-success btn-block">
                                        Home
                                    </button>
                                </Link>
                            </div>
                            <div className="col-sm-8">
                                <Link to="/">
                                    <button className="btn btn-danger btn-block">
                                        Logout
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }

}
import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import UserServiceClient from "../services/user.service.client"

export default class RegisterUserContainer extends Component{

    constructor(props) {
        super(props)
        this.userService = UserServiceClient.instance;
        this.state = {
            user: {
                username: '',
                firstName: '',
                lastName: '',
                email: '',
                dob: '',
                city: '',
                phone: '',
            }
        }
    }
    componentDidMount(){ }


    register(user){
        let e = UserServiceClient.register(user)
        console.log(e)
    }

    updatefields(type,e){

        if(type=='username'){
            this.state.user.username = e;
            let nuser = this.state.user;
            this.setState({user: nuser})
        }
        if(type=='password'){
            this.state.user.password = e;
            let nuser = this.state.user;
            this.setState({user: nuser})
        }
        if(type=='firstname'){
            this.state.user.firstName = e;
            let nuser = this.state.user;
            this.setState({user: nuser})
        }
        if(type=='lastname'){
            this.state.user.lastName = e;
            let nuser = this.state.user
            this.setState({user: nuser})
        }
        if(type=='email'){
            this.state.user.email = e;
            let nuser = this.state.user
            this.setState({user: nuser})
        }
        if(type=='phone'){
            this.state.user.phone = e;
            let nuser = this.state.user
            this.setState({user: nuser})
        }
        if(type=='city'){
            this.state.user.city = e;
            let nuser = this.state.user
            this.setState({user: nuser})
        }
        if(type=='dob'){
            this.state.user.dob = e;
            let nuser = this.state.user
            this.setState({user: nuser})
        }



    }



    render(){
        return(
            <div>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <Link to="/" className="navbar-brand" >
                        <i className="fa fa-video-camera pr-1 text-warning">
                        </i>
                        PickFlick
                    </Link>
                </nav>
                <div className="container">
                    <h1>Fill in your details</h1>
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
                                       onChange={(e)=> this.updatefields('username',e.target.value)}
                                       value={this.state.user.username}/>
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
                                       onChange={(e)=> this.updatefields("password",e.target.value)}
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
                                       onChange={(e)=> this.updatefields("firstname",e.target.value)}
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
                                       onChange={(e)=> this.updatefields('lastname',e.target.value)}
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
                                       onChange={(e)=> this.updatefields('email',e.target.value)}
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
                                       onChange={(e)=> this.updatefields('dob',e.target.value)}
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
                                       onChange={(e)=> this.updatefields('phone',e.target.value)}
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
                                       onChange={(e)=> this.updatefields('city',e.target.value)}
                                       value={this.state.user.city}/>
                            </div>
                        </div>

                        <div className="form-group row">
                            <div className="col-sm-8 my-2">
                                <Link to={"/profile/"+this.state.userId}>
                                    <button className="btn btn-success btn-block"
                                    onClick={() => this.register(this.state.user)}>
                                        Sign up
                                    </button>
                                </Link>
                            </div>
                            <div className="col-sm-8">
                                <Link to="/login">
                                        Sign In
                                </Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }

}
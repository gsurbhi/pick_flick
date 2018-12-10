import React, {Component} from 'react'
import { Jumbotron, Container } from 'reactstrap';
import UserServiceClient from '../services/user.service.client'
import {Redirect} from 'react-router-dom'
export default class LoginComponent extends Component{
    username = '';
    password = '';

    state = {
        redirect: false,
        user:''
    }
    login(username,password){

        (UserServiceClient.login(username,password)).then(response=>
        {
            if (response.status === 500) {
            alert("Wrong username or password")
        }
        else {
            response.json().then(user=>
            {if (user){
                this.setState({
                    redirect:true,
                    user:user
                })}})}
        })
        
    }

    render() {
        if (this.state.redirect === true) {
            return (
                <Redirect to={{
                    pathname: "/profile/" + this.state.user._id,
                }}/>)
        }
            return (
                <div>
                    <Jumbotron fluid className="bg-light">
                        <Container>

                            <h1 className="display-3">
                                <i className="fa fa-video-camera pr-1 text-warning"></i>
                                Pick Flick
                            </h1>
                            <p className="lead text-secondary">The one stop hub for movie aficionados </p>
                        </Container>
                    </Jumbotron>
                    <Container>
                        <h1>
                            Sign In
                        </h1>
                        <form>
                            <div className="form-group row">
                                <label htmlFor="username"
                                       className="col-sm-2 col-form-label">
                                    Username
                                </label>
                                <div className="col-sm-8">
                                    <input className="form-control"
                                           id="username"
                                           placeholder="alice"
                                           onChange={(e) => this.username = e.target.value}/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="password"
                                       className="col-sm-2 col-form-label">
                                    Password
                                </label>
                                <div className="col-sm-8">
                                    <input type="password"
                                           className="form-control"
                                           id="password"
                                           placeholder="123qwe#$%"
                                           onChange={(e) => this.password = e.target.value}
                                           required/>
                                </div>
                            </div>

                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label"></label>
                                <div className="col-sm-8">
                                    <button className="btn btn-primary btn-block"
                                            type="button"
                                            id="signInBtn"
                                            onClick={() => this.login(this.username, this.password)}>
                                        Sign in
                                    </button>
                                </div>
                            </div>
                        </form>
                    </Container>
                </div>
            )
        }
    }
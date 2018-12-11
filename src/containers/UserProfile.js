import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import UserServiceClient from "../services/user.service.client"
import UserHomeNavbar from "../components/UserHomeNavbar";
import ProfileLinksComponent from "../components/ProfileLinksComponent"
export default class UserProfile extends Component{

    constructor(props) {
        super(props)

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
                type:'Fan'
            }
        }
    }
    componentDidMount(){
       UserServiceClient.getProfile().then(user=> this.setUser(user))

    }

    setUser(user){
        this.setState({user:user})
    }

    updatefields(type,e){
        if(type==='username'){
            this.state.user.username = e;
            let nuser = this.state.user
            this.setState({user: nuser})
        }
        if(type==='type'){
            this.state.user.type = e;
            let nuser = this.state.user
            this.setState({user: nuser})
        }
        if(type==='password'){
            this.state.user.password = e;
            let nuser = this.state.user
            this.setState({user: nuser})
        }
        if(type==='firstname'){
            this.state.user.firstName = e;
            let nuser = this.state.user
            this.setState({user: nuser})
        }
        if(type==='lastname'){
            this.state.user.lastName = e;
            let nuser = this.state.user
            this.setState({user: nuser})
        }
        if(type==='email'){
            this.state.user.email = e;
            let nuser = this.state.user
            this.setState({user: nuser})
        }
        if(type==='phone'){
            this.state.user.phone = e;
            let nuser = this.state.user
            this.setState({user: nuser})
        }
        if(type==='city'){
            this.state.user.city = e;
            let nuser = this.state.user
            this.setState({user: nuser})
        }
        if(type==='dob'){
            this.state.user.dob = e;
            let nuser = this.state.user
            this.setState({user: nuser})
        }
    }

    logout(){
        UserServiceClient.logout().then(()=>{
            window.location.href='/'
        })
    }

    updateProfile(){
         UserServiceClient.updateProfile(this.state.user).then(response => console.log(response.status))
        alert("Successfully updated profile")
        setTimeout(()=>UserServiceClient.getProfile().then(user=> this.setUser(user)), 500)

    }

    render(){
        return(
            <div>
                <UserHomeNavbar/>
                <div className="container">
                    <div className="row">
                    <h1>Hey {this.state.user.firstName}!</h1>
                    <h5>My Profile</h5>
                        <div className="row col-sm">
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
                                       value={this.state.user.username}
                                       onChange={(e)=> this.updatefields('username',e.target.value)}
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
                                       onChange={(e)=> this.updatefields('password',e.target.value)}
                                       value={this.state.user.password}/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="password"
                                   className="col-sm-2 col-form-label">
                                User Type
                            </label>
                        </div>
                        <div className="form-group row">
                            <div className="col-sm-8">
                                <select name="userType"
                                        className="form-control"
                                        type="dropdown"
                                        id="type"
                                        onChange={(e)=> this.updatefields('type',e.target.value)}>
                                        value={this.state.user.password}/>
                                    <option value="fan">Fan</option>
                                    <option value="critic">Critic</option>
                                </select>

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
                                       onChange={(e)=> this.updatefields('firstname',e.target.value)}
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
                                <Link to={"/"+this.state.user.id+"/home"}>
                                    <button className="btn btn-success btn-block">
                                        Home
                                    </button>
                                </Link>
                            </div>
                            <div className="col-sm-8 my-2">
                                <Link to="/">
                                    <button className="btn btn-danger btn-block"
                                    onClick={this.logout}>
                                        Logout
                                    </button>
                                </Link>
                            </div>


                        </div>

                    </form>
                    <div className="form-group row">
                        <div className="col-sm-8">
                            <button className="btn btn-warning btn-block"
                                    onClick={()=>this.updateProfile()}>
                                Update
                            </button>
                        </div>
                    </div>
                        </div>
                        <div className="row col-sm">
                            <ProfileLinksComponent
                                userId ={this.state.user._id}
                            />
                        </div>
                </div>
                </div></div>
        )
    }

}
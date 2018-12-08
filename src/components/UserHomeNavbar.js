import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import UserServiceClient from '../services/user.service.client'
export default class UserHomeNavbar extends Component {
    constructor(props){
        super(props);
        this.state = {

            userId:''
        };

        this.setUserId = this.setUserId.bind(this)


    }

    setUserId(userId){
        this.setState({userId:userId})
    }
    componentDidMount() {
        UserServiceClient.getProfile().then(user => this.setUserId(user._id))

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
                    <button className="navbar-toggler" type="button" data-toggle="collapse"
                            data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <Link to="/" className="nav-link">Series <span className="sr-only">(current)</span></Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/" className="nav-link">Movies</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/" className="nav-link">Recently Added</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/" className="nav-link">My List</Link>
                            </li>
                        </ul>
                        <form className="form-inline my-2 my-lg-0">
                            <input className="form-control mr-sm-2"
                                   type="search"
                                   placeholder="type something.."
                                   aria-label="Search" />
                                <button className="btn btn-outline-success my-2 my-sm-0"
                                        type="submit">
                                    Search
                                </button>
                        </form>
                        <div className="float-right">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <Link to={'/'+this.state.userId+'/profile'}
                                      className="nav-link">
                                    <i className="fa fa-user"></i>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <button className="btn nav-link bg-dark">
                                    <i className="fa fa-power-off"></i>
                                </button>
                            </li>
                        </ul>
                        </div>
                    </div>
                </nav>

            </div>
        )
    }
}
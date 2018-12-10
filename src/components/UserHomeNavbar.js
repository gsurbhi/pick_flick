import React, {Component} from 'react';
import {Redirect,Link} from 'react-router-dom';
import UserServiceClient from '../services/user.service.client'

export default class UserHomeNavbar extends Component {
    constructor(props){
        super(props);
        this.state = {

            userId:'',
            userType:'',
            searchTerm:'',
            movies:[]
        };

        this.setUserId = this.setUserId.bind(this)
        this.logout = this.logout.bind(this)
        this.getSearchTerm = this.getSearchTerm.bind(this)
        this.searchResults = this.searchResults.bind(this)

    }

    setUserId(userId,type){
        this.setState({
            userId:userId,
            userType: type
        });
    }
    componentDidMount() {
        UserServiceClient.getProfile().then(user => this.setUserId(user._id,user.type))
    }

    logout(){
        UserServiceClient.logout().then(()=>{
            window.location.href='/'
        })

    }

    getSearchTerm(term){
        console.log(term)
        this.setState({
            searchTerm:term
        });
    }

    searchResults(){
        console.log("Sfdsfs")
        window.location.href='/search/'+this.state.searchTerm
    }

    render(){
        return(
            <div>

                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    {
                        this.state.userType === 'Critic' &&
                        <Link to={"/critic/"+this.state.userId+"/home"} className="navbar-brand" >
                            <i className="fa fa-video-camera pr-1 text-warning"></i>
                            PickFlick
                        </Link>
                    }

                    {
                        this.state.userType !== 'Critic' &&
                    <Link to={"/" + this.state.userId + "/home"} className="navbar-brand">
                        <i className="fa fa-video-camera pr-1 text-warning"></i>
                        PickFlick
                    </Link>
                    }
                    <button className="navbar-toggler" type="button" data-toggle="collapse"
                            data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <Link to="/" className="nav-link">Series <span className="sr-only">(current)</span></Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/" className="nav-link">Movies</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/" className="nav-link">Favorites</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/" className="nav-link">Explore</Link>
                            </li>
                            {
                                this.state.userType === 'Critic' &&
                                <li>
                                    <Link to={"/critic/"+this.state.userId+"/reviews"} className="nav-link">My Reviews</Link>
                                </li>
                            }

                        </ul>
                        <form className="form-inline my-2 my-lg-0">
                            <input className="form-control mr-sm-2"
                                   type="search"
                                   placeholder="type something.."
                                   aria-label="Search"
                                   onChange={(e) => this.getSearchTerm(e.target.value)} />
                        </form>
                        <button className="btn btn-outline-success my-2 my-sm-0"
                                onClick={() => this.searchResults()}>
                            Search
                        </button>
                        <div className="float-right">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <Link to={'/profile/'+this.state.userId}
                                      className="nav-link">
                                    <i className="fa fa-user"></i>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <button className="btn nav-link bg-dark" onClick={this.logout}>
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
import React from 'react'
import Search from '../components/Search'
import {Link} from "react-router-dom";

class Home extends React.Component {
    render() {
        return (
                <div>
                    <nav className="navbar navbar-light bg-light">
                        <a className="navbar-brand">
                            <i className="fa fa-video-camera pr-1 text-warning"></i>
                            PickFlick
                        </a>
                        <ul className="nav mr-auto">
                            <li className="nav-item">
                                <Link to="/login" className="nav-link text-dark">
                                    Login
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/register" className="nav-link text-dark">
                                    Sign up!
                                </Link>
                            </li>
                            <li className="nav-item">
                            <Link to= '/explore' className="nav-link text-dark">
                                    Explore
                            </Link>
                            </li>
                        </ul>
                    </nav>
                    <form className="form-inline">
                        <Search/>
                    </form>

                </div>

        )
    }
}

export default Home;
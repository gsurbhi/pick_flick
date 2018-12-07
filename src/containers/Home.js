import React from 'react'
import Search from '../components/Search'

class Home extends React.Component {
    render() {
        return (
                <div>
                    <nav className="navbar navbar-light bg-light">
                        <a className="navbar-brand">PickFlick</a>
                    <form className="form-inline">
                        <Search/>
                    </form>
                    </nav>

                </div>


        )
    }
}

export default Home;
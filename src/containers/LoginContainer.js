import {connect} from 'react-redux'
import LoginComponent from "../components/LoginComponent";


const stateToPropertyMapper = state => ({
    username: state.username,
    password: state.password
});

const dispatchToPropertyMapper = dispatch => ({

    login: (username, password) => dispatch({
        type:"LOGIN",
        username: username,
        password: password
    })
});



const LoginContainer = connect(stateToPropertyMapper, dispatchToPropertyMapper)(LoginComponent);
export default LoginContainer;
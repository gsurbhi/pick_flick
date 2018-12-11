import React from 'react'
import AdminServiceClient from '../services/admin.service.client';
import UserServiceClient from "../services/user.service.client";
import UserHomeNavbar from "../components/UserHomeNavbar";


export default class AdminContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userId: '',
            users: [],
            editingFlag:false,
            newUsername:'',
            newUser:[]
        };

        this.renderUsers = this.renderUsers.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
        this.setUsers = this.setUsers.bind(this);
        this.toggleToEditMode = this.toggleToEditMode.bind(this);
        this.updateUser = this.updateUser.bind(this);
        this.usernameEdit = this.usernameEdit.bind(this);
        this.createUser = this.createUser.bind(this)
    }

    setUsers(users){
        this.setState({users:users})
    }

    componentDidMount(){
        UserServiceClient.getProfile().then(user=> this.setState({userId:user._id}));
        AdminServiceClient.getUsers().then(users=> this.setUsers(users))

    }

    username;
    firstName;
    lastName;
    type = 'Fan';
    email;
    city;
    phone;
    password;

    render() {
        return (
            <div>
                <UserHomeNavbar/>
                <table className="table">

                    <thead className='thead-dark'>
                    <tr>
                        <th className="col" style={{width: '12%'}}>Username</th>
                        <th className="col" style={{width: '7%'}}>Password</th>
                        <th className="col" style={{width: '12%'}}>Firstname</th>
                        <th className="col" style={{width: '12%'}}>Lastname</th>
                        <th className="col" style={{width: '12%'}}>Type</th>
                        <th className="col" style={{width: '14%'}}>Email</th>
                        <th className="col" style={{width: '12%'}}>City</th>
                        <th className="col" style={{width: '19%'}}>Phone</th>
                        <th style={{width: '10%'}}></th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>
                            <input placeholder='Username'
                                   className="form-control"
                                   onChange={(event) => this.username = event.target.value}/>
                        </td>
                        <td>
                            <input placeholder='Password'
                                   className="form-control"
                                   onChange={(event) => this.password = event.target.value}/>
                        </td>
                        <td>
                            <input placeholder='FirstName'
                                   className="form-control"
                                   onChange={(event) => this.firstName = event.target.value}/>
                        </td>
                        <td>
                            <input placeholder='LastName'
                                   className="form-control"
                                   onChange={(event) => this.lastName = event.target.value}/>
                        </td>
                        <td>
                            <select onChange={(event) => {this.type = event.target.value}}
                                    className="form-control">
                                <option value="Fan">Fan</option>
                                <option value="Critic">Critic</option>
                                <option value="Admin">Admin</option>
                            </select>
                        </td>
                        <td>
                            <input placeholder='Email'
                                   className="form-control"
                                   onChange={(event) => this.email = event.target.value}/>
                        </td>
                        <td>
                            <input placeholder='City'
                                   className="form-control"
                                   onChange={(event) => this.city = event.target.value}/>
                        </td>
                        <td>
                            <input placeholder='Phone'
                                   className="form-control"
                                   onChange={(event) => this.phone = event.target.value}/>
                        </td>
                        <td>
                            <button type='btn'
                                    className="btn btn-success"
                                    onClick={() => this.createUser()}>
                                Create
                            </button>
                        </td>
                    </tr>


                    {this.renderUsers()}
                    </tbody>
                </table>
            </div>
        )
    }

    createUser(){
        let user ={
            "username":this.username,
            "firstName":this.firstName,
            "lastName":this.lastName,
            "type":this.type,
            "email":this.email,
            "city":this.city,
            "phone":this.phone,
            "password":this.password
        }
        console.log(user)
        UserServiceClient.createUser(user)
        setTimeout(() => {AdminServiceClient.getUsers().then(users1 =>  this.setState({users:users1}))}, 500)
    }

    toggleToEditMode(username){
        this.setState({
            editingFlag:true,
            newUsername: username
        });
    }

    renderUsers() {

        if (this.state.users) {
            return this.state.users.map(user => {
                let input;
                    return (
                        <tr>
                            <td>
                                <div style={{display:this.state.editingFlag?'none':'block'}}>
                                    {user.username}
                                    <button className="m-1 btn btn-sm rounded-circle btn-outline-info"
                                            onClick={()=> this.toggleToEditMode(user.username)}>
                                        <i className="fa fa-pencil"></i>
                                    </button>
                                </div>
                                <div style={{display:this.state.editingFlag?'block':'none'}}>
                                    <input className="form-control"
                                           value={this.state.newUsername}
                                           onChange={e => this.usernameEdit(e.target.value)}
                                           ref={node => {input = node;}}/>
                                    <button className="m-1 btn btn-sm rounded-circle btn-outline-success"
                                            onClick={() => this.updateUser(user)}>
                                        <i className="fa fa-check"></i>
                                    </button>
                                </div>
                                </td>
                            <td>{}</td>
                            <td>{user.firstName}</td>
                            <td>{user.lastName}</td>
                            <td>{user.type}</td>
                            <td>{user.email}</td>
                            <td>{user.city}</td>
                            <td>{user.phone}</td>
                            <td>

                                <button type='btn'
                                        className="btn btn-danger"
                                        onClick={() => this.deleteUser(user._id)}>
                                    <i className="fa fa-trash"></i>
                                </button>
                            </td>
                        </tr>
                    )
               // }
            })
        }
    }

    deleteUser(id) {
        if(id != this.state.userId) {
            AdminServiceClient.deleteUser(id);
            setTimeout(() => {AdminServiceClient.getUsers().then(users1 =>  this.setState({users:users1}))}, 500)


        }
        else {
            alert("You cannot delete your account")
        }
        this.username = '';
        this.firstName = '';
        this.lastName = '';
        this.type = 'Fan';
        this.email = '';
        this.city = '';
        this.phone = '';
        this.password = '';
    }

    updateUser(user) {
        user.username = this.state.newUsername;
        AdminServiceClient.updateUser(user);
        setTimeout(() => {AdminServiceClient.getUsers().then(users1 =>  this.setState({users:users1}))}, 500)
    }

    usernameEdit(txt){
        console.log(txt)
        this.setState({
            newUsername: txt
        });
    }

    selectUser(user) {
        console.log(user)
        this.setState({userId: user._id});
    }
}
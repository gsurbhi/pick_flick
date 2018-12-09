import React from 'react'
import AdminServiceClient from '../services/admin.service.client';
import UserServiceClient from "../services/user.service.client";
import UserHomeNavbar from "../components/UserHomeNavbar";


export default class AdminContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userId: '',
            users: []
        };

        this.renderUsers = this.renderUsers.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
        this.setUsers = this.setUsers.bind(this);
    }

    setUsers(users){
        console.log(users)
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
                <table className="table w-100">

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
                    <tr className="table-dark p-3">
                        <td>
                            <input placeholder='Username'
                                   className="w-100 form-control"
                                   onChange={(event) => this.username = event.target.value}/>
                        </td>
                        <td>
                            <input placeholder='Password'
                                   className="w-100 form-control"
                                   onChange={(event) => this.password = event.target.value}/>
                        </td>
                        <td>
                            <input placeholder='FirstName'
                                   className="w-100 form-control"
                                   onChange={(event) => this.firstName = event.target.value}/>
                        </td>
                        <td>
                            <input placeholder='LastName'
                                   className="w-100 form-control"
                                   onChange={(event) => this.lastName = event.target.value}/>
                        </td>
                        <td>
                            <select value={this.type}
                                    onChange={(event) => this.type = event.target.value}>
                                <option value="Fan">Fan</option>
                                <option value="Actor">Actor</option>
                                <option value="Critic">Critic</option>
                                <option value="Admin">Admin</option>
                            </select>
                        </td>
                        <td>
                            <input placeholder='Email'
                                   className="w-100 form-control"
                                   onChange={(event) => this.email = event.target.value}/>
                        </td>
                        <td>
                            <input placeholder='City'
                                   className="w-100 form-control"
                                   onChange={(event) => this.city = event.target.value}/>
                        </td>
                        <td>
                            <input placeholder='Phone'
                                   className="w-100 form-control"
                                   onChange={(event) => this.phone = event.target.value}/>
                        </td>
                        <td>
                            <button type='btn'
                                    className="btn btn-success btn-block"
                                    onClick={() => this.updateUser()}>
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

    renderUsers() {
        if (this.state.users) {
            return this.state.users.map(user => {
                    return (
                        <tr>
                            <td>{user.username}</td>
                            <td>{}</td>
                            <td>{user.firstName}</td>
                            <td>{user.lastName}</td>
                            <td>{user.type}</td>
                            <td>{user.email}</td>
                            <td>{user.city}</td>
                            <td>{user.phone}</td>
                            <td>
                                <button type='btn'
                                        className="btn btn-outline-info w-100"
                                        onClick={() => this.selectUser(user)}>
                                    <i className="fa fa-pencil"></i>
                                </button>
                                <button type='btn'
                                        className="btn btn-danger w-100 my-1"
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

    updateUser(id) {
        let user = {
            _id: id,
            username: this.username,
            firstName: this.firstName,
            lastName: this.lastName,
            type: this.type,
            email: this.email,
            city: this.city,
            phone: this.phone,
            password: this.password
        };
        AdminServiceClient.updateUser(user);
        this.selectUser('');
    }

    selectUser(user) {
        console.log(user)
        this.setState({userId: user._id});
    }
}
import React from 'react'
import AdminServiceClient from '../services/admin.service.client';
import UserServiceClient from "../services/user.service.client";


export default class AdminContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userId: '',
            users: ''
        };

    }
    componentDidMount(){
        UserServiceClient.getProfile().then(user=> this.setState({userId:user._id}));
        AdminServiceClient.getUsers().then(users=> this.setState({users:users}))
        console.log("abs"+this.state.users);

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
            <div className='container-fluid'>
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
                                    onClick={() => this.UpdateUser()}>
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
        if (this.props.users) {
            return this.props.users.map(user => {
                // if (this.state.userId === user._id) {
                //     this.username = user.username;
                //     return (
                //         <tr className="table-active p-3">
                //             <td>
                //                 <input placeholder={this.username}
                //                        className="w-100 form-control"
                //                        onChange={(event) => this.username = event.target.value}/>
                //                 {user.username}
                //             </td>
                //             <td></td>
                //             <td>
                //                 <input placeholder={this.firstName}
                //                        className="w-100 form-control"
                //                        onChange={(event) => this.firstName = event.target.value}/>
                //                 {user.firstName}
                //             </td>
                //             <td>
                //                 <input placeholder={this.lastName}
                //                        className="w-100 form-control"
                //                        onChange={(event) => this.lastName = event.target.value}/>
                //                 {user.lastName}
                //             </td>
                //             <td>
                //                 <select value={this.type}
                //                         onChange={(event) => this.type = event.target.value}>
                //                     <option value="Fan">Fan</option>
                //                     <option value="Actor">Actor</option>
                //                     <option value="Critic">Critic</option>
                //                     <option value="Admin">Admin</option>
                //                 </select>
                //                 {user.type}
                //             </td>
                //             <td>
                //                 <input placeholder={this.email}
                //                        className="w-100 form-control"
                //                        onChange={(event) => this.email = event.target.value}/>
                //                 {user.email}
                //             </td>
                //             <td>
                //                 <input placeholder={this.city}
                //                        className="w-100 form-control"
                //                        onChange={(event) => this.city = event.target.value}/>
                //                 {user.city}
                //             </td>
                //             <td>
                //                 <input placeholder={this.phone}
                //                        className="w-100 form-control"
                //                        onChange={(event) => this.phone = event.target.value}/>
                //                 {user.phone}
                //             </td>
                //             <td>
                //                 <button type='btn' className="btn btn-dark"
                //                         onClick={() => this.UpdateUser(user._id)}>
                //                     Update
                //                 </button>
                //             </td>
                //         </tr>
                //     )
               // }
               //  else {
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
                                        onClick={() => this.selectUser(user._id)}>
                                    Edit
                                </button>
                                <button type='btn'
                                        className="btn btn-danger w-100"
                                        onClick={() => this.props.deleteUser(user._id)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    )
               // }
            })
        }
    }

    deleteUser(id) {
        this.props.deleteUser(id);
        this.username = '';
        this.firstName = '';
        this.lastName = '';
        this.type = 'Fan';
        this.email = '';
        this.city = '';
        this.phone = '';
        this.password = '';
    }

    UpdateUser(id) {
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
        this.props.updateUser(user);
        this.selectUser('');
    }

    selectUser(id) {
        this.setState({userId: id});
    }
}
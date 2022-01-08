import React, { Component } from 'react';
import { getUsersRequest, createUserRequest, deleteUserRequest } from '../actions/users';
import { connect } from 'react-redux';
import UserList from './UserList';
import NewUserForm from './NewUserForm';
import { Alert } from 'reactstrap';

class App extends Component {

    constructor(props) {
        super(props);
        this.props.getUsersRequest();
    }

    handleSubmit = ({firstName, lastName }) => {
        this.props.createUserRequest({
            firstName,
            lastName
        })
    }

    handleDeleteUserClick = (userId) => {
        this.props.deleteUserRequest(userId);
    }

    render() {
        const users = this.props.users;
        return (
            <div style={{ margin: '0 auto', padding: '20px', maxWidth: '600px' }}> 
                <Alert isOpen={!!this.props.users.error}>
                    {this.props.users.error}
                </Alert>
                <NewUserForm onSubmit={this.handleSubmit} />
                <UserList users={users.items} onDeleteUser={this.handleDeleteUserClick} />
            </div>
        );   
    }       
}

export default connect(({users})=>({users}), {
    getUsersRequest,
    createUserRequest,
    deleteUserRequest
})(App);
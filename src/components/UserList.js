import React from "react";
import { ListGroup, ListGroupItem, Button } from 'reactstrap';

const UserList = ({users, onDeleteUser}) => {
    return (
        <ListGroup>
            {
                users.map( (user) => {
                    return (
                    <ListGroupItem key={user.id} style={{border: '1px solid black'}}>
                        { user.firstName + ' ' + user.lastName}
                        <Button outline color="danger" style={{ marginLeft: '50px'}} onClick={() => onDeleteUser(user.id)}>Delete</Button>
                    </ListGroupItem>)
                })
            }
        </ListGroup>
    )
}

export default UserList;
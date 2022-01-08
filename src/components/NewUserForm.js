import React, { Component } from 'react';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';

class NewUserForm extends Component {

    state = {
        firstName: '',
        lastName: ''
    }

    handleFristNameChange = e => {
        this.setState({
            firstName: e.target.value
        })
    }

    handleLastNameChange = e => {
        this.setState({
            lastName: e.target.value
        })
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.onSubmit(this.state);
        this.setState({
            firstName: '',
            lastName: ''
        })
    }

    render() {
        return (<Form onSubmit={ this.handleSubmit }>
            <FormGroup>
                <Label>
                    First Name
                </Label>
                <Input required placeholder="First Name" onChange={ this.handleFristNameChange } value={this.state.firstName}/>
            </FormGroup>
            <FormGroup>
                <Label>
                    Last Name
                </Label>
                <Input required placeholder="Last Name" onChange={ this.handleLastNameChange } value={this.state.lastName}/>
            </FormGroup>
            <FormGroup>
                <Button type="submit">
                    Create
                </Button>
            </FormGroup>
        </Form>)
    }
}

export default NewUserForm;
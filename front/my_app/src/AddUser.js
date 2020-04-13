import React, { Component } from 'react'

export default class AddUser extends Component {
    state = {
        name: "",
        email: "",
        submitDisabled: false,
    };

    //changeState = (x) => this.setState({ [x.target.name]: x.target.value });

    changeState = (event) => {
        let min = 5;
        let nam = event.target.name;
        let val = event.target.value;
        this.state.submitDisabled = (
            this.state.name.length > min
            && this.state.email.length > min
        ) ? false : true;
        this.setState({ [nam]: val });
    }


    postObject = async (e) => {
        e.preventDefault();
        let newObject = {
            name: this.state.name,
            email: this.state.email
        };

        let options = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(newObject)
        };

        try {
            let url = await fetch("http://localhost:3000/users", options);
            let res = await url.json();
            console.log(res);
            alert("User added");
            this.props.history.push('/users');

        } catch (error) {
            console.log(error);
        }
    }

    render() {

        return (
            <div className="container-fluid">
                <h1 align="center">New user</h1>

                <form onSubmit={this.postObject}>
                    <div className="form-row">
                        <div className="col">
                            Name:<input id="name" className="form-control" onChange={this.changeState} name="name" placeholder="Mininum of 5 characters"></input>
                            <small id="name" class="form-text text-muted">Characters: {this.state.name.length}</small>

                        </div>
                        <div className="col">
                            Email:<input id="email" type="email" className="form-control" onChange={this.changeState} name="email" placeholder="Mininum of 5 characters"></input>
                            <small id="email" class="form-text text-muted">Characters: {this.state.email.length}</small>
                        </div>
                    </div>
                    <br></br>
                    <div className="form-row">
                        <input className="btn btn-primary" disabled={this.state.submitDisabled} type="submit"></input>
                    </div>
                </form>
            </div>
        )
    }
}

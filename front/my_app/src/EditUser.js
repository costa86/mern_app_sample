import React, { Component } from 'react'

export default class EditUser extends Component {
    state = {
        name: "",
        email: "",
        submitDisabled: true,
        id: "",
    };

    getUser = async () => {
        try {
            let url = await fetch("http://localhost:3000/users/" + this.props.match.params.id);
            let res = await url.json();
            console.log(res.name);

            this.setState({
                name: res.name,
                email: res.email,
                id: res._id
            });

        } catch (error) {
            console.log(error);
        }

    }

    componentDidMount() {
        this.getUser();
    }


    changeState = (event) => {
        this.setState({ msg: "" });
        let min = 5;
        let nam = event.target.name;
        let val = event.target.value;
        this.state.submitDisabled = (
            this.state.name.length > min
            && this.state.email.length > min
        ) ? false : true;
        this.setState({ [nam]: val });
    }

    postUser = async (e) => {
        e.preventDefault();
        let newUser = {
            name: this.state.name,
            email: this.state.email,
            id: this.state.id
        };

        let options = {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(newUser)
        };

        try {
            let url = await fetch("http://localhost:3000/users/" + this.state.id, options);
            let res = await url.json();
            console.log(res);

            alert("User edited");
            this.props.history.push('/users');
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        return (
            <div className="container-fluid">
                <form onSubmit={this.postUser}>
                    <div className="form-row">
                        <div className="col">
                            Name:<input value={this.state.name} id="name" className="form-control" onChange={this.changeState} name="name" placeholder="Mininum of 5 characters"></input>
                            <small id="name" className="form-text text-muted">Characters: {this.state.name.length}</small>

                        </div>
                        <div className="col">
                            Email:<input value={this.state.email} id="email" type="email" className="form-control" onChange={this.changeState} name="email" placeholder="Mininum of 5 characters"></input>
                            <small id="email" className="form-text text-muted">Characters: {this.state.email.length}</small>
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

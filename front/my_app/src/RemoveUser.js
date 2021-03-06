import React, { Component } from 'react'

export default class RemoveUser extends Component {

    deleteUser = async () => {

        let options = {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
        };

        try {
            let url = await fetch("http://localhost:3000/users/" + this.props.id, options);
            let res = await url.json();
            console.log(res);
            alert("User deleted");
            window.location.reload();
            //this.props.history.push('/');

        } catch (error) {
            console.log(error);
        }
    }

    render() {
        return (
            <button className="btn btn-danger mr-1" onClick={this.deleteUser}>DELETE</button>
        );
    }
}

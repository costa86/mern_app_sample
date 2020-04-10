import React, { Component } from 'react'

export default class RemovePost extends Component {

    deletePost = async () => {

        let options = {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
        };

        try {
            let url = await fetch("http://localhost:3000/posts/" + this.props.id, options);
            let res = await url.json();
            console.log(res);
            alert("Post deleted");
            window.location.reload();

        } catch (error) {
            console.log(error);
        }
    }

    render() {
        return (
            <button onClick={this.deletePost}>DELETE</button>
        );
    }
}

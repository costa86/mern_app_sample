import React, { Component } from 'react'
import RemovePost from "./RemovePost";
import EditPost from "./EditPost";

export default class Posts extends Component {
    state = {
        title: null,
        description: null,
        posts: []
    };

    getPosts = async () => {
        try {
            let url = await fetch("http://localhost:3000/posts");
            let res = await url.json();
            this.setState({ posts: res });
        } catch (error) {
            console.log(error);
        }

    }


    displayPostsTable = (posts) => {
        let res;

        let records = posts.map((post) =>
            (<tr key={post._id}>
                <td>{post.title}</td>
                <td>{post.description}</td>
                <td>
                    <RemovePost id={post._id} />
                </td>
            </tr>)
        );
        if (posts.length) {
            res = (
                <table className="table table-bordered">
                    <th>TITLE</th>
                    <th>DESCRIPTION</th>
                    <th>ACTIONS</th>
                    {records}
                </table>
            );
        }
        return res;
    };

    componentDidMount() {
        this.getPosts();
    }

    render() {
        return (
            <>
                <div className="container-fluid">
                    {this.displayPostsTable(this.state.posts)}
                </div>
            </>
        )
    }
}

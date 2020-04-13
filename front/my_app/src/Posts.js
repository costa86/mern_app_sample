import React, { Component } from 'react'
import RemovePost from "./RemovePost";
import { Link } from "react-router-dom";

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
        document.title = "Posts | Posts Web App" ;

        let res;

        let records = posts.map((post, index) =>
            (<tr key={post._id}>
                <td>{index + 1}</td>
                <td>{post.title}</td>
                <td>{post.description}</td>
                <td>
                    <RemovePost id={post._id} />
                    <button className="btn btn-dark mr-1"><Link to={"/edit-post/" + post._id}>EDIT</Link></button>
                </td>
            </tr>)
        );
        if (posts.length) {
            res = (
                <>
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>TITLE</th>
                                <th>DESCRIPTION</th>
                                <th>ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {records}
                        </tbody>
                    </table>
                </>
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
                <h1 align="center">Posts ({this.state.posts.length})</h1>
                <div className="container-fluid">
                    {this.displayPostsTable(this.state.posts)}

                </div>
            </>
        )
    }
}

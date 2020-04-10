import React, { Component } from 'react'

export default class EditPost extends Component {
    state = {
        title: "",
        description: "",
        submitDisabled: true,
        id: "",
    };

    getPost = async () => {
        try {
            let url = await fetch("http://localhost:3000/posts/" + this.props.match.params.id);
            let res = await url.json();
            console.log(res.title);

            this.setState({
                title: res.title,
                description: res.description,
                id: res._id
            });

        } catch (error) {
            console.log(error);
        }

    }

    componentDidMount() {
        this.getPost();
    }


    changeState = (event) => {
        this.setState({ msg: "" });
        let min = 5;
        let nam = event.target.name;
        let val = event.target.value;
        this.state.submitDisabled = (
            this.state.title.length > min
            && this.state.description.length > min
        ) ? false : true;
        this.setState({ [nam]: val });
    }

    postPost = async (e) => {
        e.preventDefault();
        let newPost = {
            title: this.state.title,
            description: this.state.description,
            id: this.state.id
        };

        let options = {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(newPost)
        };

        try {
            let url = await fetch("http://localhost:3000/posts/" + this.state.id, options);
            let res = await url.json();
            console.log(res);

            alert("Post edited");
            this.props.history.push('/');
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        return (
            <div className="container-fluid">
                <form onSubmit={this.postPost}>
                    <div className="form-row">
                        <div className="col">
                            Title:<input value={this.state.title} id="title" className="form-control" onChange={this.changeState} name="title" placeholder="Mininum of 5 characters"></input>
                            <small id="title" class="form-text text-muted">Characters: {this.state.title.length}</small>

                        </div>
                        <div className="col">
                            Description:<input value={this.state.description} id="desc" className="form-control" onChange={this.changeState} name="description" placeholder="Mininum of 5 characters"></input>
                            <small id="desc" class="form-text text-muted">Characters: {this.state.description.length}</small>
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

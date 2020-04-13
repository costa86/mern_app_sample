import React, { Component } from 'react'
import { Link } from "react-router-dom";
import RemoveUser from './RemoveUser';

export default class Users extends Component {
    state = {
        name: null,
        email: null,
        records: []
    };

    getAll = async () => {

        try {
            let url = await fetch("http://localhost:3000/users");
            let res = await url.json();
            this.setState({ records: res });
        } catch (error) {
            console.log(error);
        }

    }


    displayRecordsTable = (records) => {
        document.title = "Users | Posts Web App" ;

        let res;

        let rec = records.map((each, index) =>
            (<tr key={each._id}>
                <td>{index + 1}</td>
                <td>{each.name}</td>
                <td>{each.email}</td>
                <td>
                    <RemoveUser id={each._id} />
                    <button className="btn btn-dark mr-1"><Link to={"/edit-user/" + each._id}>EDIT</Link></button>
                </td>
            </tr>)
        );
        if (rec.length) {
            res = (
                <>
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>NAME</th>
                                <th>EMAIL</th>
                                <th>ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rec}
                        </tbody>
                    </table>
                Records: {rec.length}
                </>
            );
        }
        return res;
    };

    componentDidMount() {
        this.getAll();
    }



    render() {
        return (
            <>
                <h1 align="center">Users</h1>

                <div className="container-fluid">
                    {this.displayRecordsTable(this.state.records)}

                </div>
            </>
        )
    }
}

import React, { Component } from 'react'
import RemovePost from "./RemovePost";
import { Link } from "react-router-dom";

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
        let res;

        let rec = records.map((each, index) =>
            (<tr key={each._id}>
                <td>{index + 1}</td>
                <td>{each.name}</td>
                <td>{each.email}</td>
                <td>
{/*                     <RemovePost id={post._id} />
                    <button className="btn btn-dark mr-1"><Link to={"/edit-post/" + post._id}>EDIT</Link></button>
 */}                </td>
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
                <div className="container-fluid">
                    {this.displayRecordsTable(this.state.records)}

                </div>
            </>
        )
    }
}

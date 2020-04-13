import React from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import ReactDOM from 'react-dom';
import './index.css';
import Posts from './Posts';
import AddPost from "./AddPost";
import EditPost from './EditPost';
import Users from './Users';


class Header extends React.Component {
  render() {
    return (
      <div>
        <BrowserRouter>
            <Route exact path="/" component={Posts} />
            <Route path="/add-post" component={AddPost} />
            <Route path="/edit-post/:id" component={EditPost} />
            <Route path="/users" component={Users} />

        </BrowserRouter>
      </div>
    );
  }
}

ReactDOM.render(
  <React.StrictMode>
    <Header />
  </React.StrictMode>,
  document.getElementById('root')
);


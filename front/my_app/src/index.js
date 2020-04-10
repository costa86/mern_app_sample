import React from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import ReactDOM from 'react-dom';
import './index.css';
import Posts from './Posts';
import AddPost from "./AddPost";
import EditPost from './EditPost';

class MyApp extends React.Component {
  render() {
    return (
      <div>
        <BrowserRouter>
            <Route exact path="/" component={Posts} />
            <Route path="/add-post" component={AddPost} />
            <Route path="/edit-post/:id" component={EditPost} />
        </BrowserRouter>
      </div>
    );
  }
}

ReactDOM.render(
  <React.StrictMode>
    <MyApp />
  </React.StrictMode>,
  document.getElementById('root')
);


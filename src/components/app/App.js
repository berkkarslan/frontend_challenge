import React from "react";
import logo from "../../images/hepsiburada.jpg";
import "./App.css";
import { Route, Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import { List, Add } from "../index";

const history = createBrowserHistory();
function App() {
  return (
    <Router history={history}>
      <div>
        <div className="header">
          <img src={logo} alt="hepsiburada" height={100} />
          <div>LinkVOTE Challenge</div>
        </div>
        <div className="content">
          <Route path="/" exact component={List} />
          <Route path="/add" component={Add} />
        </div>
      </div>
    </Router>
  );
}

export default App;

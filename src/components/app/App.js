import React from "react";
import logo from "../../images/hepsiburada.jpg";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { HashRouter, Route } from "react-router-dom";
import { List, Add } from "../index";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <HashRouter>
      <div>
        <ToastContainer />
        <div className="header">
          <img src={logo} alt="hepsiburada" height={100} />
          <div>LinkVOTE Challenge</div>
        </div>
        <div className="content">
          <Route path="/" exact component={List} />
          <Route path="/add" component={Add} />
        </div>
      </div>
    </HashRouter>
  );
}

export default App;

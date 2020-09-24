import React from "react";
import "./Add.css";
import { NavLink } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";

class Add extends React.Component {
  constructor() {
    super();
    this.state = {
      linkName: "",
      linkUrl: "",
      validated: false,
    };
  }

  handleSubmit() {
    if (this.state.linkName !== '' && this.state.linkUrl !== '') {
      let items = JSON.parse(localStorage.getItem("listItems"));
      items.push({ title: this.state.linkName, link: this.state.linkUrl, point: 0});
      localStorage.setItem("listItems", JSON.stringify(items));
      toast.success(this.state.linkName.toUpperCase() + " added.", {
        position: toast.POSITION.TOP_CENTER,
      });
      this.setState({linkName:'',linkUrl:''});
    }
    else{
      toast.error("Error", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
    
  }

  render() {
    return (
      <div>
        <NavLink to="/">Return to List</NavLink>
        <div>
          <div>
            <p>Add New Link</p>
          </div>
          <div>
            <Form.Label>Link Name:</Form.Label>
            <Form.Control
              required
              type="text"
              value={this.state.linkName}
              onChange={(val) => this.setState({ linkName: val.target.value })}
              placeholder="e.g Alpabet"
            />
          </div>
          <div className="mt-3">
            <Form.Label>Link URL:</Form.Label>
            <Form.Control
              required
              value={this.state.linkUrl}
              type="text"
              onChange={(val) => this.setState({ linkUrl: val.target.value })}
              placeholder="e.g. http://abc.xyz"
            />
          </div>

          <div className="mt-3">
            <Button onClick={() => this.handleSubmit()}>Add</Button>
          </div>
        </div>
      </div>
    );
  }
}

export default Add;

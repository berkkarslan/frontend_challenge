import React from "react";
import "./List.css";
import { Form } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import {ListItem} from '../index';

class List extends React.Component {
  constructor(properties) {
    super(properties);
    this.state = {
      items: [],
    };
  }

  componentDidMount() {   
    this.getData();
  }

  getData() {
    try {
      const items = JSON.parse(localStorage.getItem("listItems"));
      this.setState({ items: items });
    } catch (error) {
      toast.error("Error", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  }

  renderList = () => {
    if (Array.isArray(this.state.items)) {
      return this.state.items.map(function (data,index) {
        return <ListItem key={index} item={data} index={index}/>;
      });
    }
  };

  render() {
    return (
      <div>
        <div className="header-container">
          <div className="submit-link">
            <NavLink to="/add" className="link-button">
              SUBMIT A LINK
            </NavLink>
          </div>
        </div>
        <div className="filter-container">
          <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Control defaultValue="Order by" as="select">
              <option disabled>Order by</option>
              <option value="point">Most Voted (Z - A)</option>
              <option value="point">Less Voted (A - Z)</option>
            </Form.Control>
          </Form.Group>
        </div>
        <div className="list-container">{this.renderList()}</div>
      </div>
    );
  }
}

export default List;

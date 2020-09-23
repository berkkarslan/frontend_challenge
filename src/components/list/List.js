import React from "react";
import "./List.css";
import { Form } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { ListItem } from "../index";

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
      return this.state.items.map(function (data, index) {
        return <ListItem key={index} item={data} index={index} />;
      });
    }
  };

  filterChanged(val) {
    let sortedItems = [];
    if (val.target.value === "most") {
      sortedItems = this.state.items.sort(function (a, b) {
        return b.point - a.point;
      });
    } else {
      sortedItems = this.state.items.sort(function (a, b) {
        return a.point - b.point;
      });
    }
    this.setState({ items: sortedItems });
  }

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
            <Form.Control
              onChange={(val) => this.filterChanged(val)}
              defaultValue="Order by"
              as="select"
            >
              <option disabled>Order by</option>
              <option value="most">Most Voted (Z - A)</option>
              <option value="less">Less Voted (A - Z)</option>
            </Form.Control>
          </Form.Group>
        </div>
        <div className="list-container">{this.renderList()}</div>
      </div>
    );
  }
}

export default List;

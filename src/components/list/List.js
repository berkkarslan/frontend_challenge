import React from "react";
import "./List.css";
import { Form,Modal,Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { ListItem } from "../index";

class List extends React.Component {
  constructor(properties) {
    super(properties);
    this.state = {
      items: [],
      isVisible:false,
      removeText:''
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

  handleClose(){
    this.setState({isVisible:false});
  }
  deleteItem(){

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
        <Modal show={this.state.isVisible} onHide={()=>this.handleClose()}>
        <Modal.Header closeButton>
          <Modal.Title>Remove Link </Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-content">Do you want to remove:
    <p>{this.state.removeText}</p>
        </Modal.Body>
        <Modal.Footer className="modal-footer">
          <Button variant="secondary" onClick={()=>this.deleteItem()}>
            OK
          </Button>
          <Button variant="secondary" onClick={()=>this.handleClose()}>
            CANCEL
          </Button>
        </Modal.Footer>
      </Modal>
      </div>
    );
  }
}

export default List;

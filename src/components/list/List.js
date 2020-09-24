import React from "react";
import "./List.css";
import { Form, Modal, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { ListItem } from "../index";
import ReactPaginate from 'react-paginate';

class List extends React.Component {
  constructor(properties) {
    super(properties);
    this.state = {
      items: [],
      isVisible: false,
      removeText: "",
      removeId: 0,
      currentPage: 1,
      PerPage: 5,
    };
    this.deleteShowItem = this.deleteShowItem.bind(this);
  }

  componentDidMount() {
    this.getData();
  }

  getData() {
    try {
      const items = JSON.parse(localStorage.getItem("listItems")).reverse();      
      this.setState({ items: items });
    } catch (error) {
      toast.error("Error", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  }

  renderList() {
    const component = this;
    
    if (Array.isArray(this.state.items)) {
      const indexOfLastTodo = this.state.currentPage * this.state.PerPage;
      const indexOfFirstTodo = indexOfLastTodo - this.state.PerPage;
      const currentTodos = this.state.items.slice(indexOfFirstTodo, indexOfLastTodo);
      return currentTodos.map(function (data, index) {
        return (
          <ListItem
            deleteFunc={component.deleteShowItem}
            key={index}
            item={data}
            index={index}
          />
        );
      });
    }
  }

  filterChanged(val) {
    let sortedItems = JSON.parse(localStorage.getItem("listItems"));
    if (val.target.value === "most") {
      sortedItems = sortedItems.sort(function (a, b) {
        if(b.point === a.point)
        return b.id - a.id
        return b.point - a.point;
      });
    } else {
      sortedItems = sortedItems.sort(function (a, b) {
        if(b.point === a.point)
        return a.id - b.id
        return a.point - b.point;
      });
    }
    this.setState({ items: sortedItems });
  }

  handleClose() {
    this.setState({ removeId: null, removeText: "", isVisible: false });
  }

  deleteShowItem(item) {
    this.setState({
      removeId: item.id,
      removeText: item.title,
      isVisible: true,
    });
  }

  confirmDelete() {
    let Items = JSON.parse(localStorage.getItem("listItems")).reverse();
    let index = Items.findIndex((x) => x.id === this.state.removeId);
    Items.splice(index,1);
    localStorage.setItem("listItems", JSON.stringify(Items));
    this.setState({ items: Items, isVisible: false });
    toast.success(this.state.removeText.toUpperCase() + " removed.", {
      position: toast.POSITION.TOP_CENTER,
    });
  }

  handlePageClick(e){
    this.setState({ currentPage: e.selected+1 })
  }

  render() {
    return (
      <div className="main-container">
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
        <ReactPaginate
              previousLabel={'<'}
              nextLabel={'>'}
              pageCount={this.state.items ? Math.ceil(this.state.items.length/this.state.PerPage): 1}
              marginPagesDisplayed={5}
              pageRangeDisplayed={5}
              onPageChange={(e) =>this.handlePageClick(e)}
              containerClassName={'pagination'}
              subContainerClassName={'pages pagination'}
              activeClassName={'active'}
        />
        <Modal show={this.state.isVisible} onHide={() => this.handleClose()}>
          <Modal.Header closeButton>
            <Modal.Title>Remove Link </Modal.Title>
          </Modal.Header>
          <Modal.Body className="modal-content">
            Do you want to remove:
            <p className="delete-text">{this.state.removeText}</p>
          </Modal.Body>
          <Modal.Footer className="modal-footer">
            <Button variant="secondary" onClick={() => this.confirmDelete()}>
              OK
            </Button>
            <Button variant="secondary" onClick={() => this.handleClose()}>
              CANCEL
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default List;

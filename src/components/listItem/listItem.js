import React from "react";
import "./listItem.css";
import { Button } from "react-bootstrap";

class listItem extends React.Component {
  constructor() {
    super();
    this.state = {
      point: 0,
      isMouseInside: false,
    };
  }

  upvote() {
    let items = JSON.parse(localStorage.getItem("listItems"));
    let index = items.findIndex((x) => x.id === this.props.item.id);
    items[index].point++;
    this.setState({ point: items[index].point });
    localStorage.setItem("listItems", JSON.stringify(items));
  }

  downVote() {
    let items = JSON.parse(localStorage.getItem("listItems"));
    let index = items.findIndex((x) => x.id === this.props.item.id);
    items[index].point--;
    this.setState({ point: items[index].point });
    localStorage.setItem("listItems", JSON.stringify(items));
  }

  componentDidMount() {
    this.setState({ point: this.props.item.point });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.item !== prevProps.item) {
      this.setState({ point: this.props.item.point });
    }
  }

  mouseEnter() {
    this.setState({ isMouseInside: true });
  }
  mouseLeave() {
    this.setState({ isMouseInside: false });
  }

  click() {
    this.props.deleteFunc(this.props.item);
  };

  render() {
    return (
      <div
        onMouseEnter={() => this.mouseEnter()}
        onMouseLeave={() => this.mouseLeave()}
        className="item-container"
      >
        <div className="points-container">
          <span className="point">{this.state.point}</span>
          <span>Points</span>
        </div>
        <div className="item">
          <div className="title-container">
            <div className="title">{this.props.item.title}</div>
            <div className="link">{this.props.item.link}</div>
          </div>
          <div className="btns">
            <div className="btn-up" onClick={() => this.upvote()}>
              Up Vote{" "}
            </div>
            <div className="btn-down" onClick={() => this.downVote()}>
              Down Vote
            </div>
          </div>
        </div>
        <div className="delete-button">
          {this.state.isMouseInside ? (
            <Button onClick={() => this.click()} variant="danger">
              x
            </Button>
          ) : null}
        </div>
      </div>
    );
  }
}

export default listItem;

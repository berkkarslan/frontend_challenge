import React from "react";
import "./listItem.css";

class listItem extends React.Component {
  constructor(){
    super();
    this.state = {
      point:0
    }
  }

   upvote(){
    let items=JSON.parse(localStorage.getItem('listItems')); 
    items[this.props.index].point++;
    this.setState({point:this.state.point+1});
    localStorage.setItem('listItems',JSON.stringify(items));
  }

   downVote(){
    let items=JSON.parse(localStorage.getItem('listItems')); 
    items[this.props.index].point--;
    this.setState({point:this.state.point-1});
    localStorage.setItem('listItems',JSON.stringify(items));
  }

  componentDidMount() {
    this.setState({point:this.props.item.point});
  }

  render(){
    return (
      <div className="item-container">
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
            <div onClick={() =>this.upvote()}>Up Vote </div>
            <div onClick={() =>this.downVote()}>Down Vote</div>
          </div>
        </div>
      </div>
    );
  }
  
}

export default listItem;

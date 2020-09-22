import React from "react";
import "./listItem.css";

function listItem(item) {
  console.log(item);
  return (
    <div className="col-md-6 item-container">
      <div className="points-container">
        <span className="point">{item.item}</span>
        <span>Points</span>
      </div>
      <div className="item">
        <div className="title-container">
          <div className="title">Hacker News</div>
          <div className="link">(https://news.ycombinator.com/)</div>
        </div>
        <div className="btns">
          <div>Up Vote </div>
          <div>Down Vote</div>
        </div>
      </div>
    </div>
  );
}
export default listItem;

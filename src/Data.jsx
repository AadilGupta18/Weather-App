import React from "react";
import "./data.css";

const Data = (props) => {
  return (
    <div className="main">
      <div className="image">
        <img src={props.image} alt="" />
      </div>
      <div className="text">
        <p>city: {props.city}</p>
        <p>Weather: {props.weather}</p>
        <p>Temperature: {props.temperature} degrees</p>
      </div>
    </div>
  );
};

export default Data;

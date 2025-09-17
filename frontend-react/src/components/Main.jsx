import React, { useContext } from "react";
import Button from "./Button";
import "../App.css"; // import external CSS
const Main = () => {
  return (
    <>
      <div className="container">
        <div className="p-5 text-center bg-light-dark rounded">
          <h1 className="text-light">Stock Prediction Portal</h1>
          <p className="text-light lead">
            Welcome to the Stock Prediction Portal — a modern interface where data meets simplicity. Track live market
            trends, explore AI-powered forecasts, and visualize insights with clean, interactive charts. Built with React
            for speed and Django for reliability, the platform delivers a smooth experience that makes complex stock data
            easy to understand
          </p>
          <Button class={"btn-outline-info"} url={"/dashboard"} text={"Explore"} />
        </div>
      </div>
    </>
  );
};

export default Main;

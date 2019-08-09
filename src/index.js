import React from "react";
import ReactDOM from "react-dom";
import CartesianPlane from "./components/CartesianPlane/CartesianPlane";

import "./styles.css";

function App() {
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>

      <CartesianPlane />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

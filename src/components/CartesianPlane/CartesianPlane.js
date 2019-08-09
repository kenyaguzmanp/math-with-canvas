import React, { Component } from "react";
// import PropTypes from "prop-types";
// import Point from "../primitives-models/point-model";
import { drawCoordinateSystem, drawPartition } from "./draw-utils";

import "./style.scss";

export default class CartesianPlane extends Component {
  /**
   * Definition of the prop types
   */
  static propTypes = {};

  /**
   * Default Props
   */
  static defaultProps = {};

  constructor(props) {
    super(props);

    this.canvas = {
      elem: null,
      context: null,
      width: null,
      height: null
    };
    // this.context = null;
    // this.canvasWidth = null;
    // this.canvasHeight = null;
  }

  componentDidMount = () => {
    console.log("canvas elem", this.canvas);
    this.canvas.context = this.canvas.elem.getContext("2d");
    this.canvas.width = this.canvas.elem.width;
    this.canvas.height = this.canvas.elem.height;

    this.draw();
  };

  draw = () => {
    drawCoordinateSystem({
      canvas: this.canvas
    });

    drawPartition({
      canvas: this.canvas,
      partitionX: 10,
      partitionY: 10,
      originPoint: {
        xPos: 0,
        yPos: 0
      },
      finalPoint: {
        xPos: this.canvas.width,
        yPos: this.canvas.height
      }
    });
  };

  render() {
    return (
      <div className="container">
        <h1>canvas</h1>
        <canvas
          ref={ref => {
            this.canvas.elem = ref;
          }}
          width="500px"
          height="500px"
          className="canvas"
        />
      </div>
    );
  }
}

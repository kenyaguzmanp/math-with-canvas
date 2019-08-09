import { isEmpty } from "../../utils/object-utils";

export default class Point {
  constructor({
    canvas = {},
    context = null,
    xPos = 0,
    yPos = 0,
    radius = 5,
    text = {},
    cartesianPlane = {},
    style
  } = {}) {
    this.canvas = canvas;
    this.context = context;
    this.xPos = xPos;
    this.yPos = yPos;
    this.radius = radius;
    this.cartesianPlane = cartesianPlane;
    this.text = text;
    this.style = { ...style };

    if (!isEmpty(this.cartesianPlane)) {
      const { height } = this.canvas;
      const { yPos: originY } = this.cartesianPlane.origin;
      this.xPosInCoords = this.xPos;
      this.yPosInCoords =
        this.yPos < originY
          ? Math.abs(this.yPos - originY) + height / 2
          : height / 2 - Math.abs(this.yPos - originY);
    }
  }

  /**
   * Draw the current Point in the plane based in canvas
   * @param { Point } point - a point class to draw
   */
  drawIt() {
    this.context.beginPath();
    // TODO refactor use correct values
    if (!isEmpty(this.cartesianPlane)) {
      this.context.arc(
        this.xPosInCoords,
        this.yPosInCoords,
        this.radius,
        0,
        2 * Math.PI
      );
    } else {
      this.context.arc(this.xPos, this.yPos, this.radius, 0, 2 * Math.PI);
    }

    if (this.style) {
      const { fillStyle } = this.style;
      this.context.fillStyle = fillStyle ? fillStyle : "blue";
    }
    this.context.fill();

    if (!isEmpty(this.text) && !isEmpty(this.canvas)) {
      this.drawText();
    }
  }

  drawText() {
    // console.log("text ", this.canvas.width);
    this.context.font = "20px Georgia";
    const { width, height } = this.canvas;
    if (
      this.text.showCoordinatesInCartesianPlane &&
      !isEmpty(this.cartesianPlane)
    ) {
      const { xPos: originX, yPos: originY } = this.cartesianPlane.origin;
      const xPosValue =
        this.xPos < originX ? this.xPos - originX : originX + this.xPos - width;
      const yPosValue =
        this.yPos < originY
          ? this.yPos - originY
          : originY + this.yPos - height;
      const coordinateString = `(${xPosValue},${yPosValue})`;

      this.context.fillText(
        coordinateString,
        this.xPosInCoords + 8,
        this.yPosInCoords - 8
      );
    }

    if (this.text.showRegularCoordinates) {
      const xPos = this.xPos;
      const yPos = this.yPos;
      const coordinateString = `(${xPos},${yPos})`;
      this.context.fillText(coordinateString, this.xPos + 10, this.yPos - 10);
    }

    if (this.text.content) {
      this.context.fillText(this.text.content, this.xPos + 10, this.yPos + 10);
    }
  }
}

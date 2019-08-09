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
  }

  /**
   * Draw the current Point in the plane based in canvas
   * @param { Point } point - a point class to draw
   */
  drawIt() {
    this.context.beginPath();
    // this.context.arc(this.xPos, this.yPos, this.radius, 0, 2 * Math.PI);
    // TODO: FIXING
    if (!isEmpty(this.cartesianPlane)) {
      console.log("here", this.yPos);
      const { width, height } = this.canvas;
      const { xPos: originX, yPos: originY } = this.cartesianPlane.origin;
      console.log("originY", originY);
      const xPos = this.xPos;
      const yPos =
        this.yPos < originY
          ? Math.abs(this.yPos - originY) + height / 2
          : height / 2 - Math.abs(this.yPos - originY);

      this.context.arc(xPos, yPos, this.radius, 0, 2 * Math.PI);
      console.log("yPos ", yPos);
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
      const yPos =
        this.yPos < originY
          ? Math.abs(this.yPos - originY) + height / 2
          : height / 2 - Math.abs(this.yPos - originY);
      this.context.fillText(coordinateString, this.xPos + 10, yPos - 10);
    }

    if (this.text.showXCoordinate) {
      const xPos = this.xPos;
      // const yPos = height / 2 - this.yPos;
      const coordinateString = `${xPos}`;
      this.context.fillText(coordinateString, this.xPos + 10, this.yPos - 10);
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

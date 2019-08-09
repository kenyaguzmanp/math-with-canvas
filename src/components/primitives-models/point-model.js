export default class Point {
  constructor({ context = null, xPos = 0, yPos = 0, radius = 5, style } = {}) {
    this.context = context;
    this.xPos = xPos;
    this.yPos = yPos;
    this.radius = radius;
    this.style = { ...style };
  }

  /**
   * Draw the current Point in the plane based in canvas
   * @param { Point } point - a point class to draw
   */
  drawIt() {
    this.context.beginPath();
    this.context.arc(this.xPos, this.yPos, this.radius, 0, 2 * Math.PI);
    if (this.style) {
      const { fillStyle } = this.style;
      this.context.fillStyle = fillStyle ? fillStyle : "blue";
    }
    this.context.fill();
  }
}

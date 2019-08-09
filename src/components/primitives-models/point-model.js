export default class Point {
  constructor({ context = null, xPos = 0, yPos = 0, radius = 5, style } = {}) {
    this.context = context;
    this.xPos = xPos;
    this.yPos = yPos;
    this.radius = radius;
    this.style = { ...style };
  }
}

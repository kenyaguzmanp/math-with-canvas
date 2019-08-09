export default class Line {
  constructor({
    context = null,
    xPos = 0,
    yPos = 0,
    width = 10,
    height = 10,
    style
  } = {}) {
    this.context = context;
    this.xPos = xPos;
    this.yPos = yPos;
    this.width = width;
    this.height = height;
    this.style = { ...style };
  }
}

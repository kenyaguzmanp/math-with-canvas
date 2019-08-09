export default class Line {
  constructor({
    context = null,
    from,
    to,
    // xPos = 0,
    // yPos = 0,
    // width = 10,
    // height = 10,
    style
  } = {}) {
    this.context = context;
    this.from = from;
    this.to = to;

    // this.xPos = xPos;
    // this.yPos = yPos;
    // this.width = width;
    // this.height = height;

    this.style = { ...style };
  }
}

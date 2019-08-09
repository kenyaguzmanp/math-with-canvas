export default class Line {
  constructor({ context = null, from, to, style } = {}) {
    this.context = context;
    this.from = from;
    this.to = to;
    this.style = { ...style };
  }
  drawIt() {
    const { xPos: xPosFrom, yPos: yPosFrom } = this.from;
    const { xPos: xPosTo, yPos: yPosTo } = this.to;

    this.context.beginPath();
    this.context.moveTo(xPosFrom, yPosFrom);
    this.context.lineTo(xPosTo, yPosTo);
    this.context.stroke();
  }
}

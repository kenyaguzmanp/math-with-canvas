import Point from "./point-model";
import Line from "./line-model";

export default class CartesianPlane {
  constructor({ canvas, context, origin }) {
    this.origin = origin;
    this.context = context;
    this.canvas = canvas;
    this.abscissa = this.getAbscissa();
    this.ordinate = this.getOrdinate();
  }

  getAbscissa() {
    const { width, height } = this.canvas;
    return new Line({
      context: this.context,
      from: new Point({
        xPos: width / 2,
        yPos: 0
      }),
      to: new Point({
        xPos: width / 2,
        yPos: height
      })
    });
  }

  getOrdinate() {
    const { width, height } = this.canvas;
    return new Line({
      context: this.context,
      from: new Point({
        xPos: 0,
        yPos: width / 2
      }),
      to: new Point({
        xPos: width,
        yPos: height / 2
      })
    });
  }

  drawIt() {
    this.abscissa.drawIt();
    this.ordinate.drawIt();
    this.origin.drawIt();
  }
}

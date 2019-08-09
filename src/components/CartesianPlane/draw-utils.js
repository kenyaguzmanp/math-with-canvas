import Point from "../primitives-models/point-model";
import Line from "../primitives-models/line-model";
import CartesianPlane from "../primitives-models/cartesian-plane-model";

export const drawCoordinateSystem = ({ canvas }) => {
  const { context, width: canvasWidth, height: canvasHeight } = canvas;

  // style
  context.fillStyle = "black";

  const origin = new Point({
    canvas: canvas,
    context: context,
    xPos: canvasWidth / 2,
    yPos: canvasHeight / 2,
    // text: {
    //   showCoordinates: true
    //   // content: "origin"
    // },
    style: {
      fillStyle: "red"
    }
  });

  const cartesianPlane = new CartesianPlane({
    canvas: canvas,
    context: context,
    origin: origin
  });
  console.log("cartesian plane", cartesianPlane);

  cartesianPlane.drawIt();

  const otherPoint = new Point({
    canvas: canvas,
    context: context,
    cartesianPlane: cartesianPlane,
    xPos: cartesianPlane.origin.xPos + 50,
    yPos: cartesianPlane.origin.yPos,
    text: {
      showCoordinatesInCartesianPlane: true
      // showRegularCoordinates: true
    },
    style: {
      fillStyle: "purple"
    }
  });

  console.log("otherPoint", otherPoint, otherPoint.xCoordPos);

  otherPoint.drawIt();
};

export const drawPartition = ({
  canvas,
  partitionX,
  partitionY,
  originPoint,
  finalPoint
}) => {
  const { context, width: canvasWidth, height: canvasHeight } = canvas;
  const { xPos: xOrigin, yPos: yOrigin } = originPoint;
  const { xPos: xFinal, yPos: yFinal } = finalPoint;

  const deltaX = Math.abs(xFinal - xOrigin) / partitionX;
  const deltaY = Math.abs(yFinal - yOrigin) / partitionY;
  let newX = xOrigin;
  let newY = yOrigin;

  // Partition in X
  for (let countX = 1; countX <= partitionX; countX++) {
    newX = countX * deltaX;

    const startPoint = new Point({
      canvas: canvas,
      context: context,
      xPos: newX,
      yPos: canvasHeight / 2,
      text: {
        showXCoordinate: true
        // content: "origin"
      }
    });

    const endPoint = new Point({
      xPos: newX,
      yPos: canvasHeight / 2 + 5
    });

    // startPoint.drawIt();

    let line = new Line({
      context: context,
      from: startPoint,
      to: endPoint
    });

    line.drawIt();
  }

  // Partition in Y
  for (let countY = 1; countY <= partitionX; countY++) {
    newY = countY * deltaY;

    let lineY = new Line({
      context: context,
      from: new Point({
        xPos: canvasWidth / 2,
        yPos: newY
      }),
      to: new Point({
        xPos: canvasWidth / 2 + 5,
        yPos: newY
      })
    });

    lineY.drawIt();
  }
};

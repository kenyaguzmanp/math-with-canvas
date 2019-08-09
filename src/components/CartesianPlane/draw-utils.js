import Point from "../primitives-models/point-model";
import Line from "../primitives-models/line-model";

export const drawCoordinateSystem = ({ canvas }) => {
  const { context, width: canvasWidth, height: canvasHeight } = canvas;

  // style
  context.fillStyle = "black";

  const abscissaLine = new Line({
    context: context,
    from: new Point({
      xPos: canvasWidth / 2,
      yPos: 0
    }),
    to: new Point({
      xPos: canvasWidth / 2,
      yPos: canvasHeight
    })
  });

  const ordinateLine = new Line({
    context: context,
    from: new Point({
      xPos: 0,
      yPos: canvasHeight / 2
    }),
    to: new Point({
      xPos: canvasWidth,
      yPos: canvasHeight / 2
    })
  });

  abscissaLine.drawIt();

  ordinateLine.drawIt();

  const origin = new Point({
    context: context,
    xPos: canvasWidth / 2,
    yPos: canvasHeight / 2,
    style: {
      fillStyle: "red"
    }
  });

  origin.drawIt();
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

    let line = new Line({
      context: context,
      from: new Point({
        xPos: newX,
        yPos: canvasHeight / 2
      }),
      to: new Point({
        xPos: newX,
        yPos: canvasHeight / 2 + 5
      })
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

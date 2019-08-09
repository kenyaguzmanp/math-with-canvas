import Point from "../primitives-models/point-model";

/**
 * Draw a Point in the plane based in canvas
 * @param { Point } point - a point class to draw
 */
export const drawPoint = point => {
  const { xPos, yPos, radius, style, context } = point;
  context.beginPath();
  context.arc(xPos, yPos, radius, 0, 2 * Math.PI);
  if (style) {
    const { fillStyle } = style;
    context.fillStyle = fillStyle ? fillStyle : "red";
  }
  context.fill();
};

/**
 * Draw the origin point in the plane based in canvas
 * @param { Object } canvas - the current canvas
 */
export const drawOrigin = ({ canvas }) => {
  const { context, width: canvasWidth, height: canvasHeight } = canvas;
  const origin = new Point({
    xPos: canvasWidth / 2,
    yPos: canvasHeight / 2,
    style: {
      fillStyle: "red"
    },
    context: context
  });
  console.log("Origin: ", origin);
  drawPoint(origin);
};

export const drawLine = ({ context, line } = {}) => {
  console.log("line: ", line);
  const { from: fromPoint, to: toPoint } = line;
  const { xPos: xPosFrom, yPos: yPosFrom } = fromPoint;
  const { xPos: xPosTo, yPos: yPosTo } = toPoint;
  // context.fillRect(xPosFrom, yPosFrom, xPosTo, yPosTo);

  context.beginPath();
  context.moveTo(xPosFrom, yPosFrom);
  context.lineTo(xPosTo, yPosTo);
  context.stroke();
};

export const drawCoordinateSystem = ({ canvas }) => {
  const { context, width: canvasWidth, height: canvasHeight } = canvas;

  // style
  context.fillStyle = "black";

  const abscissaLine = {
    from: new Point({
      xPos: canvasWidth / 2,
      yPos: 0
    }),
    to: new Point({
      xPos: canvasWidth / 2,
      yPos: canvasHeight
    })
  };

  const ordinateLine = {
    from: new Point({
      xPos: 0,
      yPos: canvasHeight / 2
    }),
    to: new Point({
      xPos: canvasWidth,
      yPos: canvasHeight / 2
    })
  };

  drawLine({
    context: context,
    line: abscissaLine
  });

  drawLine({
    context: context,
    line: ordinateLine
  });

  drawOrigin({
    canvas: canvas
  });
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

    let line = {
      from: new Point({
        xPos: newX,
        yPos: canvasHeight / 2
      }),
      to: new Point({
        xPos: newX,
        yPos: canvasHeight / 2 + 5
      })
    };

    drawLine({
      context: context,
      line
    });
  }

  // Partition in Y
  for (let countY = 1; countY <= partitionX; countY++) {
    newY = countY * deltaY;

    let lineY = {
      from: new Point({
        xPos: canvasWidth / 2,
        yPos: newY
      }),
      to: new Point({
        xPos: canvasWidth / 2 + 5,
        yPos: newY
      })
    };

    drawLine({
      context: context,
      line: lineY
    });
  }
};

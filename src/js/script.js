const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Draw the ellipse
// ctx.beginPath();
// ctx.ellipse(100, 100, 50, 75, Math.PI / 4, 0, 2 * Math.PI);
// ctx.stroke();

const CIRCLE_CENTER_X = 400;
const CIRCLE_CENTER_Y = 300;

const drawCircle = (radius,
    centerX = CIRCLE_CENTER_X,
    centerY = CIRCLE_CENTER_Y) => {
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.stroke();
}

// recursive circles with same center
const addCircle = (radius) => {
  drawCircle(radius);
  if(radius > 2) {
    radius *= 0.75;
    addCircle(radius);
  }
}
// addCircle(400);

// For every circle displayed, draw a circle
// half its size to the left and right of that circle.
const addTwoCircles = (radius, centerX, centerY) => {
    drawCircle(radius, centerX, centerY);
    if (radius > 2) {
        const newRadius = radius * 0.5;
        addTwoCircles(newRadius, centerX - radius, centerY);
        addTwoCircles(newRadius, centerX + radius, centerY);
    }
}
// addTwoCircles(400, CIRCLE_CENTER_X, CIRCLE_CENTER_Y);

const drawLine = (x0, y0, x1, y1, width = 1) => {
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.moveTo(x0, y0);
    ctx.lineTo(x1, y1);
    if (width < 2) {
        ctx.strokeStyle = "#469105";
    } else {
        ctx.strokeStyle = "black";
    }
    ctx.stroke();
}

const TURN_ANGLE_DEGREES = 35;
const TURN_ANGLE_RAD = TURN_ANGLE_DEGREES * Math.PI / 180;

const drawTree = (x0, y0, len, angle, width) => {
    const x1 = x0 + Math.sin(angle) * len;
    const y1 = y0 - Math.cos(angle) * len;
    drawLine(x0, y0, x1, y1, width);

    const newLen = len * 0.75;
    const newWidth = width * 0.75 > 1 ? width * 0.75 : 1;
    if (newLen > 3) {
        drawTree(x1, y1, newLen, angle + TURN_ANGLE_RAD, newWidth);
        drawTree(x1, y1, newLen, angle - TURN_ANGLE_RAD, newWidth);
    }
}

// drawTree(390, 550, 120, 0, 10);

const getRandomLenCoef = (min = 0.40, max = 0.95) => {
    return Math.random() * (max - min) + min;
}

const getRandomAngle = (min = 20 * Math.PI / 180, max = 65 * Math.PI / 180) => {
    return Math.random() * (max - min) + min;
};

const drawRandomTree = (x0, y0, len, angle, width) => {
    const x1 = x0 + Math.sin(angle) * len;
    const y1 = y0 - Math.cos(angle) * len;
    drawLine(x0, y0, x1, y1, width);

    const newWidth = width * 0.75 > 1 ? width * 0.75 : 1;
    if (len > 4) {
        drawRandomTree(x1, y1, len * getRandomLenCoef(), angle + getRandomAngle(), newWidth);
        drawRandomTree(x1, y1, len * getRandomLenCoef(), angle - getRandomAngle(), newWidth);
        if (Math.random() > 0.7) {
            drawRandomTree(x1, y1, len * getRandomLenCoef(), (angle - getRandomAngle()) / 2, newWidth);
        }
        if (Math.random() > 0.7) {
            drawRandomTree(x1, y1, len * getRandomLenCoef(), (angle + getRandomAngle()) / 2, newWidth);
        }
    }
}

//drawRandomTree(390, 550, 120, 0, 10);

const generateBtn = document.querySelector('.controls__generate-btn');
generateBtn.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    drawRandomTree(390, 550, 120, 0, 10);
});

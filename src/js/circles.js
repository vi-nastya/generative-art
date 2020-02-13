const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

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
const drawLine = (ctx, x0, y0, x1, y1, color, width = 1) => {
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.moveTo(x0, y0);
    ctx.lineTo(x1, y1);
    ctx.strokeStyle = color;
    ctx.stroke();
}

const getRandomLenCoef = (min = 0.40, max = 0.95) => {
    return Math.random() * (max - min) + min;
}

const getRandomAngle = (minDeg, maxDeg) => {
    const minRad = minDeg * Math.PI / 180;
    const maxRad = maxDeg * Math.PI / 180;
    return Math.random() * (maxRad - minRad) + minRad;
}

const PADDING = 15;

const generateRandomTree = (branches, x0, y0, len, angle, width, minAngle, maxAngle) => {
    const x1 = x0 + Math.sin(angle) * len;
    const y1 = y0 - Math.cos(angle) * len;

    const newWidth = width * 0.75 > 1 ? width * 0.75 : 1;

    if (len > 3 && (x1 > PADDING) && (y1 > PADDING)
            && (x1 < canvas.width - PADDING) && (y1 < canvas.height - PADDING)) {
        branches.push({x0, y0, x1, y1, width});
        generateRandomTree(branches, x1, y1, len * getRandomLenCoef(), angle + getRandomAngle(minAngle, maxAngle), newWidth, minAngle, maxAngle);
        generateRandomTree(branches, x1, y1, len * getRandomLenCoef(), angle - getRandomAngle(minAngle, maxAngle), newWidth, minAngle, maxAngle);
        if (Math.random() > 0.7) {
            generateRandomTree(branches, x1, y1, len * getRandomLenCoef(), (angle - getRandomAngle(minAngle, maxAngle)) / 2, newWidth, minAngle, maxAngle);
        }
        if (Math.random() > 0.7) {
            generateRandomTree(branches, x1, y1, len * getRandomLenCoef(), (angle + getRandomAngle(minAngle, maxAngle)) / 2, newWidth, minAngle, maxAngle);
        }
    }
}

const drawTree = (ctx, tree, leavesWidth, leavesColor, branchesColor) => {
    tree.map((branch) => drawLine(ctx, branch.x0, branch.y0, branch.x1, branch.y1, branch.width > leavesWidth ? branchesColor : leavesColor, branch.width));
}

// not a random tree
// const TURN_ANGLE_DEGREES = 35;
// const TURN_ANGLE_RAD = TURN_ANGLE_DEGREES * Math.PI / 180;
// const drawNotTree = (x0, y0, len, angle, width) => {
//     const x1 = x0 + Math.sin(angle) * len;
//     const y1 = y0 - Math.cos(angle) * len;
//     drawLine(x0, y0, x1, y1, width);

//     const newLen = len * 0.75;
//     const newWidth = width * 0.75 > 1 ? width * 0.75 : 1;
//     if (newLen > 3) {
//         drawTree(x1, y1, newLen, angle + TURN_ANGLE_RAD, newWidth);
//         drawTree(x1, y1, newLen, angle - TURN_ANGLE_RAD, newWidth);
//     }
// }
// drawTree(390, 550, 120, 0, 10);


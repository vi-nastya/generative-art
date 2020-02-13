$(document).ready(() => {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

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

    const MIN_ANGLE = $( "#slider-range" ).slider( "values", 0 );
    const MAX_ANGLE = $( "#slider-range" ).slider( "values", 1 );

    const getRandomLenCoef = (min = 0.40, max = 0.95) => {
        return Math.random() * (max - min) + min;
    }

    // const getRandomAngle = (min = MIN_ANGLE * Math.PI / 180, max = MAX_ANGLE * Math.PI / 180) => {
    //     return Math.random() * (max - min) + min;
    // };

    const getRandomAngle = () => {
        const MIN_ANGLE = $( "#slider-range" ).slider( "values", 0 );
        const MAX_ANGLE = $( "#slider-range" ).slider( "values", 1 );
        const min = MIN_ANGLE * Math.PI / 180;
        const max = MAX_ANGLE * Math.PI / 180;
        return Math.random() * (max - min) + min;
    }

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

    $('.controls__generate-btn').click(() => {
        $('.controls-wrapper').slideDown("slow");
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        drawRandomTree(390, 550, 120, 0, 10);
      });
});

//drawRandomTree(390, 550, 120, 0, 10);



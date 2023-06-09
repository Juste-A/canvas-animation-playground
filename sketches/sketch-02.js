const canvasSketch = require('canvas-sketch');
const math = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');

const settings = {
  dimensions: [ 1080, 1080 ]
};

// const degToRad = (degrees) => {
//   return degrees / 180 * Math.PI
// }

// const randomRange = (min, max) => {
//   return Math.random() * (max - min) + min;
// }

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    context.fillStyle = 'black';

    const cx = width * 0.5; // cx and cy are the center values
    const cy = height * 0.5;
    const w = width * 0.01;
    const h = height * 0.1;

    let x, y;

    const num = 12;
    const radius = width * 0.3;

    for (let i = 0; i < num; i++) {
      const slice = math.degToRad(360 / num);
      const angle = slice * i;

      x = cx + radius * Math.sin(angle);
      y = cy + radius * Math.cos(angle);

      context.save(); //saves the current state of the canvas
      context.translate(x, y);
      context.rotate(-angle); //angle in radians, not in degrees. To get the degrees in radians we need to divide the degrees by 180 and then multiply it by Math.PI (45 / 180 * Math.PI = 45 degrees in radians)
      
      context.scale(random.range(1, 3), 1);

      context.beginPath();
      context.rect(-w * 0.5, -h * 0.5, w, h);
      context.fill();
      context.restore(); //goes back to the saved state of canvas. we use it if we don't want that transformations above affect the drawings below

      context.save();
      context.translate(cx, cy);
      context.rotate(-angle);

      context.beginPath();
      context.arc(0, 0, radius, 0, slice);
      context.stroke();
      context.restore();
    }
  };
};

canvasSketch(sketch, settings);

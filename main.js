import * as dat from "dat.gui";
console.log(dat);

const gui = new dat.GUI();

const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

//objects --
//just change th3e values of these objects after using dat.gui
// by defaul the screen will use
const wave = {
  y: canvas.height / 2,
  length: 0.01,
  amplitude: 100,
  frequency: 0.01,
};

const strokeColor = {
  h: 125,
  s: 40,
  l: 50,
};

const backgroundColor = {
  r: 0,
  g: 0,
  b: 0,
  a: 0.01,
};

//These are actual values how we want to stay our wave look like ----
// and to remove gui just comment these lines ---> 35 - 54
const waveFolder = gui.addFolder("wave");
waveFolder.add(wave, "y", 0, canvas.height);
waveFolder.add(wave, "length", -0.01, 0.01);

// Amplitude: Wave's intensity/strength.
waveFolder.add(wave, "amplitude", -300, 500);
// Frequency: Wave's repetition rate.
// so much of repretition make it ugly
waveFolder.add(wave, "frequency", -0.01, 1);
waveFolder.open();

const strokeFolder = gui.addFolder("stroke");
// hsl stands for Hue, Saturation, and Lightness. It's a color model commonly used in computer graphics and design to represent colors.
// Hue: Type of color on a wheel.
// Saturation: Color intensity.
// Lightness: Brightness level.
strokeFolder.add(strokeColor, "h", 0, 255);
strokeFolder.add(strokeColor, "s", 0, 100);
strokeFolder.add(strokeColor, "l", 40, 60);
strokeFolder.open();

const backgroundFolder = gui.addFolder("background");
backgroundFolder.add(backgroundColor, "r", 0, 255);
backgroundFolder.add(backgroundColor, "g", 0, 255);
backgroundFolder.add(backgroundColor, "b", 0, 255);
backgroundFolder.add(backgroundColor, "a", 0, 1);

backgroundFolder.open();
//----

// Try and use Dat.gui and whatever values you like on the wave make sure to add them on the object

let increment = wave.frequency;
function animate() {
  requestAnimationFrame(animate);
  //background color
  c.fillStyle = `rgba(${backgroundColor.r}, ${backgroundColor.g}, ${backgroundColor.b}, ${backgroundColor.a})`;
  c.fillRect(0, 0, canvas.width, canvas.height);

  //creatting our wave :) and effect
  c.beginPath();
  c.moveTo(0, canvas.height / 2);
  for (let i = 0; i < canvas.width; i++) {
    c.lineTo(
      i,
      //getting and elongating our sineWaves effect ; nice and smooth
      wave.y + Math.sin(i * wave.length + increment) * wave.amplitude
    );
  }

  //This is what dynaically change the color of the wave
  c.strokeStyle = `hsl(${Math.abs(strokeColor.h * Math.sin(increment))}, ${
    strokeColor.s
  }%, ${strokeColor.l}%)`;
  c.stroke();

  increment += wave.frequency;
}

animate();

//resize
addEventListener("resize", () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
});

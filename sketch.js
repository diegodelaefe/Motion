/*
//  Detector de movimiento
//
*/
let walk = [];
let video;
let vidPix = [];
let prevPix = [];
let escala = 24;
let motionX = 0,
  motionY = 0;
let lerpX = 0;
let lerpY = 0;

function setup() {
  createCanvas(640, 480, P2D);
  background(20);
  pixelDensity(1);
  ellipseMode(CENTER);  rectMode(CENTER);
  noStroke();

  video = createCapture(VIDEO);
  video.size(width / escala, height / escala);

  for (let i = 0; i < width / escala; i++) {
    vidPix[i] = [];
    prevPix[i] = [];
  }
  prev = createImage(width / escala, height / escala);
  video.hide();

  for (let i = 0; i < 20; i++) {
    walk[i] = new caminante();
  }
}


function draw() {

  background(50);

  pixelar();

  for (let i = 0; i < walk.length; i++) {
    walk[i].actualizar();
    walk[i].mostrar();
  }
}

function pixelar() {

  let avgX = 0;
  avgY = 0, count = 0;

  let umbral = 50;
  video.loadPixels();
  loadPixels()
  for (let y = 0; y < video.height; y++) {
    for (let x = 0; x < video.width; x++) {
      this.index = ((video.width - x - 1) + y * video.width) * 4;
      this.r = video.pixels[index + 0];
      this.g = video.pixels[index + 1];
      this.b = video.pixels[index + 2];

      this.brillo = (r + g + b) / 3; //brillo a partir de suma de colores
      vidPix[x][y] = brillo;

      let dif = abs(prevPix[x][y] - brillo);

      if (dif > umbral) {
        fill(brillo);

        rect(x * escala, y * escala, escala, escala);
      }
      prevPix[x][y] = vidPix[x][y];
    }
  }

}

class caminante {

  constructor() {
    this.x = random(0, width);
    this.y = random(0, height);
    this.size = 10;
    this.vel = 10;
    this.acel = 0;
    this.col = color(127, 127, 127);
  }

  mostrar() {
    fill(this.col);
    rect(this.x, this.y, this.size,this.size);
  }

  setColor(_col) {
    this.col = _col;
  }

  actualizar() {
    this.x = lerp(this.x, (this.x + random(-5,5)), 0.3);
    this.y = lerp(this.y, (this.y + random(-5,5)), 0.3);
  }
}

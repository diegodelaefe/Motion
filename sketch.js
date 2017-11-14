let video;
let vidPix = [];
let escala = 32;

function setup() {
  createCanvas(640, 480, P2D);
  background(20);
  pixelDensity(1);

  video = createCapture(VIDEO);
  video.size(width / escala, height / escala);

  for (let i = 0; i < width / escala; i++) {
    vidPix[i] = [];
  }

  video.hide();
}

function draw() {
  background(50);

  pixelar();

  for (let y = 0; y < video.height; y++) {
    for (let x = 0; x < video.width; x++) {

      fill(vidPix[x][y]);
      rect(x * escala, y * escala, escala, escala);
    }
  }

}

function pixelar(){
  video.loadPixels();
  loadPixels()

  for (let y = 0; y < video.height; y++) {
    for (let x = 0; x < video.width; x++) {
      this.index = (x + y * video.width) * 4;
      this.r = video.pixels[index + 0];
      this.g = video.pixels[index + 1];
      this.b = video.pixels[index + 2];

      this.brillo = (r + g + b) / 3; //brillo a partir de suma de colores
      vidPix[x][y] = brillo;

      fill(brillo);
      rect(x * escala, y * escala, escala, escala);
    }
  }
}

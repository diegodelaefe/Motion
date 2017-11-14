let capture;

function setup() {
  createCanvas(390, 240);
  webcam = createCapture(VIDEO);
  webcam.size(320, 240);
  //capture.hide();
}

function draw() {
  background(255);
  image(capture, 0, 0, 320, 240);
  filter('INVERT');
}

let player;
let balls = [];
let bonusBall;
let score = 0;
let highScore = 0;
let gameOver = false;

function setup() {
  createCanvas(windowWidth, windowHeight);

  player = {
    x: width / 2,
    y: height - 80,
    size: 60
  };

  for (let i = 0; i < 5; i++) {
    balls.push(makeBall());
  }

  bonusBall = makeBonusBall();

  textAlign(CENTER, CENTER);
}

function draw() {
  background(20);

  if (gameOver) {
    fill(255);
    textSize(50);
    text("Game Over", width / 2, height / 2 - 30);

    textSize(26);
    text("Skor: " + floor(score), width / 2, height / 2 + 20);
    text("En Yüksek: " + floor(highScore), width / 2, height / 2 + 60);
    text("Tekrar başlamak için dokun / tıkla", width / 2, height / 2 + 110);
    return;
  }

  updatePlayer();
  drawPlayer();

  updateBalls();
  drawBalls();

  updateBonusBall();
  drawBonusBall();

  checkCollision();
  checkBonusCatch();

  score += 0.05;

  if (score > highScore) {
    highScore = score;
  }

  fill(255);
  textSize(24);
  text("Skor: " + floor(score), width / 2, 35);
  text("En Yüksek: " + floor(highScore), width / 2, 65);
}

function updatePlayer() {
  player.x = mouseX;
  player.x = constrain(player.x, player.size / 2, width - player.size / 2);
}

function drawPlayer() {
  rectMode(CENTER);
  noStroke();
  fill(0, 200, 255);
  rect(player.x, player.y, player.size, player.size, 12);
}

function updateBalls() {
  let speedBoost = 1 + score * 0.01;

  for (let b of balls) {
    b.y += b.speed * speedBoost;

    if (b.y > height + 60) {
      b.y = -60;
      b.x = random(width);
      b.size = random(30, 50);
      b.speed = random(3, 7);
    }
  }
}

function drawBalls() {
  noStroke();
  fill(255, 80, 80);

  for (let b of balls) {
    ellipse(b.x, b.y, b.size);
  }
}

function updateBonusBall() {
  bonusBall.y += bonusBall.speed;

  if (bonusBall.y > height + 40) {
    resetBonusBall();
  }
}

function drawBonusBall() {
  noStroke();
  fill(255, 220, 0);
  ellipse(bonusBall.x, bonusBall.y, bonusBall.size);
}

function checkCollision() {
  for (let b of balls) {
    let d = dist(player.x, player.y, b.x, b.y);

    if (d < player.size / 2 + b.size / 2) {
      gameOver = true;
    }
  }
}

function checkBonusCatch() {
  let d = dist(player.x, player.y, bonusBall.x, bonusBall.y);

  if (d < player.size / 2 + bonusBall.size / 2) {
    score += 10;
    resetBonusBall();
  }
}

function makeBall() {
  return {
    x: random(width),
    y: random(-height),
    size: random(30, 50),
    speed: random(3, 7)
  };
}

function makeBonusBall() {
  return {
    x: random(width),
    y: random(-height * 2, -100),
    size: 25,
    speed: 4
  };
}

function resetBonusBall() {
  bonusBall.x = random(width);
  bonusBall.y = random(-height * 2, -100);
  bonusBall.size = 25;
  bonusBall.speed = random(4, 6);
}

function mousePressed() {
  if (gameOver) {
    restartGame();
  }
}

function touchStarted() {
  if (gameOver) {
    restartGame();
  }
  return false;
}

function restartGame() {
  score = 0;
  gameOver = false;

  player.x = width / 2;

  balls = [];
  for (let i = 0; i < 5; i++) {
    balls.push(makeBall());
  }

  bonusBall = makeBonusBall();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  player.y = height - 80;
}
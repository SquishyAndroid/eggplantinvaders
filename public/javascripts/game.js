var game = new Phaser.Game(980, 1740, Phaser.CANVAS, 'game', { preload: preload, create: create, update: update });
//default 980 x 1750 or 750 x 1480
var bulletTime = 0,
  initialPlayerPosition = 512;
  lives = 1,
  score = 0,
  highScore = 0;
  maxVelocity = 500;
  left = false;
  right = false;
  bombRate = 56;
  descentSpeed = 10;
  movementSpeed = 6000;
  waveNumber = 1;
  isScoreHigher = false;
  currentStudentName = Cookies.get("studentName");

var style = { font: "900 34px Orbitron", fill: "#b1b1b1", align: "center"},
  boldStyle = { font: "900 40px Orbitron", fill: "#ffffff", align: "center", wordWrap: true, wordWrapWidth: 800};

function truncate (string) {
  if (string.length > 23){
    return string.substring(0,23)+'...';
  } else {
    return string;
  }
};

function setupExplosion (explosion) {
  explosion.animations.add('explode');
}

function setupCondom (condom) {
  condom.animations.add('condom');
}

function setupBomb (bomb) {
  bomb.animations.add('bomb', [0, 5], 10 , true);
}

function fireBullet () {
  if (lives > 0 && player.alive && aliens.countLiving() != 0) {
    if (game.time.now > bulletTime) {
      bullet = bullets.getFirstExists(false);

      if (bullet) {
        // And fire it
        shootSound.play();
        bullet.reset(player.x, player.y - 16);
        bullet.body.velocity.y = -400;
        bullet.body.velocity.x = player.body.velocity.x / 4
        bulletTime = game.time.now + 400;
      }
    }
  }
}

function bulletHitsAlien (bullet, alien) {
  bullet.kill();
  condom(alien);
  score += 10;
  updateScore();

  if (aliens.countLiving() == 0) {
    bomb.kill();
    updateCurrentWave();
    newWave();
  }
}

function updateCurrentWave () {
  if (bombRate >= 10){
    bombRate -= 2;
  }

  if (descentSpeed <= 50){
    descentSpeed += 2;
  }

  if (movementSpeed >= 1000){
    movementSpeed -= 100
  }

  waveNumber++;

  newWaveText = game.add.text(game.world.centerX, game.world.centerY - 100, "WAVE " + waveNumber, boldStyle);
  newWaveText.anchor.set(0.5, 0.5);

  setTimeout(function(){
    newWaveText.destroy();
    bombRateText.destroy();
    descentSpeedText.destroy();
  }, 2000)
}

function bombHitsPlayer (bomb, player) {
  bomb.kill();
  explode(player);
  moanSound.play();
  lives -= 1;
  if (lives > 0) {
    respawnPlayer();
  }
  else {
    document.getElementById('game-over-message').style.display = 'block';
    gameOver();
  }
}

function alienHitsPlayer (alien, player) {
  alien.kill();
  explode(player);
  moanSound.play();
  lives -= 1;
  if (lives > 0) {
    respawnPlayer();
  }
  else {
    gameOver();
  }
}

// Game ends if aliens pass gamebase
function alienHitsBase (alien, gameBase) {
  // Only initialize if player is alive when aliens hit base
  if (lives > 0 && player.alive){
    explode(player);
    gameOver();
    lives -= 1;
  }
}

function explode (entity) {
  entity.kill();

  // And create an explosion :)
  explodeSound.play();
  var explosion = explosions.getFirstExists(false);
  explosion.reset(entity.body.x + (entity.width / 2), entity.body.y + (entity.height / 2));
  explosion.play('explode', 30, false, true);
}

function condom (entity) {
  entity.kill();

  // And create an explosion :)
  explodeSound.play();
  var condom = condoms.getFirstExists(false);
  condom.reset(entity.body.x + (entity.width / 2), entity.body.y + (entity.height / 2));
  condom.play('condom', 30, false, true);
}

function getHighScore () {
  savedHighScore = Cookies.get('highScore');
  if (savedHighScore != undefined) {
    highScore = savedHighScore;
  }
}

function updateScore () {
  if (score > highScore) {
    document.getElementById('high-score').innerHTML = "+" + score;
    document.getElementById('high-score-secondary').innerHTML = "+" + score;
    isScoreHigher = true;
    highScore = score;
  }
  scoreText.text = "SCORE " + score;
  highScoreText.text = "HI-SCORE " + highScore;
}

function respawnPlayer () {
  player.body.x = initialPlayerPosition;
  setTimeout(function () {
    player.revive();
  }, 1000);
}

function newWave () {
  setTimeout(function () {
    aliens.removeAll();
    createAliens();
    animateAliens();
  }, 1500);
}

function restartGame () {
  //hide all partials
  document.getElementById('new-high-score').style.display = 'none';
  document.getElementById('game-over').style.display = 'none';
  document.querySelector('.score-wrapper').style.display = 'block';
  document.getElementById('game-over-message').style.display = 'none';

  restartButton.destroy();
  buttonsVisible(true);
  displayGameOverMessage();

  lives = 1
  score = 0
  bombRate = 56;
  descentSpeed = 10;
  movementSpeed = 6000;
  waveNumber = 1;
  isScoreHigher = false;
  updateScore();

  respawnPlayer();
  newWave();
}

function buttonsVisible (boolean) {
  fireButton.visible = boolean;
  moveLeftButton.visible = boolean;
  moveRightButton.visible = boolean;
}

function gameOver () {

  setTimeout(function() {
    aliens.destroy();
    buttonsVisible(false);

    //display all partials
    if (isScoreHigher == true){
      document.getElementById('new-high-score').style.display = 'block';
    } else {
      document.getElementById('game-over').style.display = 'block';
      document.getElementById('new-score').innerHTML = "+" + score;
      document.getElementById('new-score-secondary').innerHTML = "+" + score;
    }

    restartButton = game.add.button(game.world.centerX - 320, game.world.centerY + 420, 'restartButton', restartGame);
    restartButton.scale.setTo(2.5,2.5);

    Cookies.set('highScore', highScore, { expires: '2078-12-31' });
    Cookies.set('lastScore', score, { expires: '2078-12-31' });

  }, 2500);

  //play the condom drop video a second time
  setTimeout(function(){
    document.querySelector('.score-wrapper').style.display = 'none';
  }, 6000);
}

function createAliens () {
  document.getElementById('home-screen').style.display = 'none';
  aliens = game.add.group();
  aliens.scale.setTo(1.4, 1.4);
  aliens.enableBody = true;
  aliens.physicsBodyType = Phaser.Physics.ARCADE;

  //adjust # of rows and columns of aliens
  for (var y = 0; y < 4; y++) {
    for (var x = 0; x < 6; x++) {
      var alien = aliens.create(x * 75, y * 85, 'alien');
      alien.anchor.setTo(0.5, 0.5);
      alien.body.moves = false;
    }
  }
  //position of aliens on game screen
  aliens.x = 400;
  aliens.y = 180;

  aliens.forEach(function (alien, i) {
    //alien bodies wobble { y: alien.body.y + how far down}, speed, ...
    game.add.tween(alien).to( { y: alien.body.y + 5 }, 500, Phaser.Easing.Sinusoidal.InOut, true, game.rnd.integerInRange(0, 500), 1000, true);
  })
}

function animateAliens () {
  // All this does is basically start the invaders moving. Notice we're moving the Group they belong to, rather than the invaders directly.
  // { x: how far left and right aliens move}, speed, ...
  var tween = game.add.tween(aliens).to( { x: 40 }, movementSpeed, Phaser.Easing.Sinusoidal.InOut, true, 0, 1000, true);

  // When the tween loops it calls descend
  tween.onLoop.add(descend, this);
}

function handleBombs () {
  aliens.forEachAlive(function (alien) {
    chanceOfDroppingBomb = game.rnd.integerInRange(0, bombRate * aliens.countLiving());
    if (chanceOfDroppingBomb == 0) {
      dropBomb(alien);
    }
  }, this)
}

function dropBomb (alien) {
  bomb = bombs.getFirstExists(false);

  if (player.alive) {

    bombSound.play('',0,0.3);
    // And drop it
    bomb.play('bomb');
    bomb.reset(alien.x + aliens.x, alien.y + aliens.y + 16);
    bomb.body.velocity.y = +100;
    bomb.body.gravity.y = 250
  }
}

//descend aliens
function descend () {
  if (player.alive) {
    //speed of descension
    // aliens.y += 18;
    game.add.tween(aliens).to( { y: aliens.y + descentSpeed }, 2500, Phaser.Easing.Linear.None, true, 0, 0, false);
  }
}

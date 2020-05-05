function preload () {
  game.load.image('ship', '/images/8-bit-peach.png');
  game.load.image('bullet', '/images/condom.png');
  game.load.image('alien', '/images/8-bit-eggplant.png');
  game.load.spritesheet('bomb', '/images/sperm.png', 28, 64);
  game.load.spritesheet('explosion', '/images/explosion.png', 80, 80);
  game.load.spritesheet('condom', '/images/condomAnimation.png', 88, 148);
  game.load.image('gameBase', '/images/gamebase.png');
  game.load.image('background', '/images/bg.png');

  game.load.audio('shoot', '/sounds/shoot.wav');
  game.load.audio('explode', '/sounds/rubbermoan.wav');
  game.load.audio('moan', '/sounds/moan.wav');
  game.load.audio('bomb', '/sounds/water-drop.wav');
  game.load.audio('music', '/sounds/background-music.mp3');

  game.load.image('moveLeftButton', '/images/move_left_button.png');
  game.load.image('moveRightButton', '/images/move_right_button.png');
  game.load.image('fireButton', '/images/shoot_button.png');
  game.load.image('restartButton','/images/play-again-button.png');
}
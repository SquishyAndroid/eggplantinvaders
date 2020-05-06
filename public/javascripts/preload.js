function preload () {
  game.load.image('ship', 'public/images/8-bit-peach.png');
  game.load.image('bullet', 'public/images/condom.png');
  game.load.image('alien', 'public/images/8-bit-eggplant.png');
  game.load.spritesheet('bomb', 'public/images/sperm.png', 28, 64);
  game.load.spritesheet('explosion', 'public/images/explosion.png', 80, 80);
  game.load.spritesheet('condom', 'public/images/condomAnimation.png', 88, 148);
  game.load.image('gameBase', 'public/images/gamebase.png');
  game.load.image('background', 'public/images/bg.png');

  game.load.audio('shoot', 'public/sounds/shoot.wav');
  game.load.audio('explode', 'public/sounds/rubbermoan.wav');
  game.load.audio('moan', 'public/sounds/moan.wav');
  game.load.audio('bomb', 'public/sounds/water-drop.wav');
  game.load.audio('music', 'public/sounds/background-music.mp3');

  game.load.image('moveLeftButton', 'public/images/move_left_button.png');
  game.load.image('moveRightButton', 'public/images/move_right_button.png');
  game.load.image('fireButton', 'public/images/shoot_button.png');
  game.load.image('restartButton','public/images/play-again-button.png');
}

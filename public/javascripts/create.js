function create () {
  game.physics.startSystem(Phaser.Physics.ARCADE);
  background = game.add.tileSprite(0, 0, game.width, game.height, 'background');
  music = game.add.audio('music');
  music.play('',0,0.4,true);

  //autoalign the game stage
  game.scale.pageAlignHorizontally = true;
  game.scale.pageAlignVertically = true;
  game.scale.setScreenSize(true);

  // Initialize player
  player = game.add.sprite(initialPlayerPosition, 980, 'ship');
  player.scale.setTo(0.16,0.16);
  player.anchor.setTo(0.5, 0.5);
  game.physics.enable(player, Phaser.Physics.ARCADE);

  player.body.bounce.x = 0.5;
  player.body.collideWorldBounds = true;

  // Initialize bullets
  bullets = game.add.group();
  bullets.enableBody = true;
  bullets.physicsBodyType = Phaser.Physics.ARCADE;
  bullets.createMultiple(10, 'bullet');
  bullets.setAll('anchor.x', 0.5);
  bullets.setAll('anchor.y', 1);
  bullets.setAll('checkWorldBounds', true);
  bullets.setAll('outOfBoundsKill', true);

  // Initialize aliens
  createAliens();
  animateAliens();

  // Initialize bombs
  bombs = game.add.group();
  bombs.scale.setTo(1.4,1.4);
  bombs.enableBody = true;
  bombs.physicsBodyType = Phaser.Physics.ARCADE;
  bombs.createMultiple(100, 'bomb');
  bombs.setAll('anchor.x', 0.5);
  bombs.setAll('anchor.y', 0.5);
  bombs.setAll('checkWorldBounds', true);
  bombs.setAll('outOfBoundsKill', true);
  bombs.forEach(setupBomb, this);

  // Initialize explosions
  explosions = game.add.group();
  explosions.createMultiple(10, 'explosion');
  explosions.setAll('anchor.x', 0.5);
  explosions.setAll('anchor.y', 0.5);
  explosions.forEach(setupExplosion, this);

  // Initialize condom animation
  condoms = game.add.group();
  condoms.createMultiple(20, 'condom');
  condoms.setAll('anchor.x', 0.5);
  condoms.setAll('anchor.y', 0.5);
  condoms.forEach(setupCondom, this);

  // Text bits
  scoreText = game.add.text(game.world.centerX + 250, 25, '', style);
  scoreText.anchor.set(0.5, 0);

  highScoreText = game.add.text(90, 25, '', style);
  highScoreText.anchor.set(0, 0);

  getHighScore();
  updateScore();

  // Initialize sounds
  shootSound = game.add.audio('shoot', 0.4, false);
  explodeSound = game.add.audio('explode', 0.4, false);
  moanSound = game.add.audio('moan', 10, false);
  bombSound = game.add.audio('bomb', 0.4, false);

  // Initialize gamebase 
  gameBase = game.add.sprite(game.world.centerX, 960,'gameBase');
  gameBase.anchor.setTo(0.5, 0.5);
  gameBase.enableBody = true;
  game.physics.enable(gameBase, Phaser.Physics.ARCADE);

  // Initialize shoot button
  fireButton = game.add.button(game.world.centerX - 400, 1180, 'fireButton', fireBullet);
  fireButton.scale.setTo(1.5,1.5);

  // Initialize move left button
  moveLeftButton = game.add.button(game.world.centerX - 70, 1180, 'moveLeftButton', null, this, 0,1,0,1);
  moveLeftButton.scale.setTo(1.5,1.5);
  moveLeftButton.events.onInputOver.add(function(){left=true;});
  moveLeftButton.events.onInputOut.add(function(){left=false;});
  moveLeftButton.events.onInputDown.add(function(){left=true;});
  moveLeftButton.events.onInputUp.add(function(){left=false;});

  // Initialize move right button
  moveRightButton = game.add.button(game.world.centerX + 200, 1180, 'moveRightButton', null, this, 0,1,0,1);
  moveRightButton.scale.setTo(1.5,1.5);
  moveRightButton.events.onInputOver.add(function(){right=true;});
  moveRightButton.events.onInputOut.add(function(){right=false;});
  moveRightButton.events.onInputDown.add(function(){right=true;});
  moveRightButton.events.onInputUp.add(function(){right=false;});
}

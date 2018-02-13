/* globals Phaser _ game */
/* eslint no-console: 0 */

var mainState = {
    preload: function() {
      // Here we preload the assets
      game.load.tilemap('tilemap', 'assets/test_tilemap.json', null, Phaser.Tilemap.TILED_JSON);
      game.load.image('tiles', 'assets/sprites/test_tileset.png');
      game.load.image('player', 'assets/sprites/base.png');

      // game scaling
      game.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;
      game.scale.setUserScale(3, 3);

      game.renderer.renderSession.roundPixels = true;
      Phaser.Canvas.setImageRenderingCrisp(this.game.canvas);
    },

    create: function() {
      // Here we create the game
      game.stage.backgroundColor = '#3598db';
      game.world.setBounds(0, 0, 1920, 1920);


      // Start the Arcade physics system (for movements and collisions)
      game.physics.startSystem(Phaser.Physics.ARCADE);
      game.world.enableBody = true;

      // load the tilemap
      this.map = game.add.tilemap('tilemap');
      this.map.addTilesetImage('test_tileset', 'tiles');

      this.backgroundLayer1 = this.map.createLayer('tile1');
      this.backgroundLayer2 = this.map.createLayer('tile2');
      this.collisionLayer = this.map.createLayer('blocker');

      //Before you can use the collide function you need to set what tiles can collide
      this.map.setCollisionBetween(1, 200, true, 'blocker');

      // sets the size of the game world, doesn't affect the canvas...
      this.collisionLayer.resizeWorld();

      // player
      this.cursor = game.input.keyboard.createCursorKeys();
      this.player = game.add.sprite(70, 100, 'player');
      game.camera.follow(this.player, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);
    },

    update: function() {
      // Here we update the game 60 times per second
      game.physics.arcade.collide(this.player, this.collisionLayer);

      if (this.cursor.left.isDown)
        this.player.body.velocity.x = -200;
      else if (this.cursor.right.isDown)
        this.player.body.velocity.x = 200;
      else
        this.player.body.velocity.x = 0;


      if (this.cursor.up.isDown)
        this.player.body.velocity.y = -200;
      else if (this.cursor.down.isDown)
        this.player.body.velocity.y = 200;
      else
        this.player.body.velocity.y = 0;
    },
};


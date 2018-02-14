/* globals Phaser _ game utils*/
/* eslint no-console: 0 */

var mainState = {
    preload: function() {
      // Here we preload the assets
      game.load.tilemap('tilemap', 'assets/tilemap_main.json', null, Phaser.Tilemap.TILED_JSON);
      game.load.image('tiles', 'assets/sprites/tileset_main.png');
      game.load.image('player', 'assets/sprites/base.png');
      game.load.image('tree', 'assets/sprites/tree.png');
      game.load.image('home', 'assets/sprites/home_full.png');
      game.load.image('npc1', 'assets/sprites/npc1.png');
      game.load.image('npc2', 'assets/sprites/npc2.png');
      game.load.image('npc3', 'assets/sprites/npc3.png');
      game.load.image('npc4', 'assets/sprites/npc4.png');

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
      this.map.addTilesetImage('tileset_main_16_16', 'tiles');
      this.map.addTilesetImage('tileset_main_16_32', 'tiles');

      this.backgroundLayer1 = this.map.createLayer('tile1');
      this.backgroundLayer2 = this.map.createLayer('tile2');
      this.collisionLayer = this.map.createLayer('blocker');

      // collide with these tiles
      this.map.setCollisionBetween(1, 2000, true, 'blocker');

      // sets the size of the game world, doesn't affect the canvas...
      this.collisionLayer.resizeWorld();

      // player
      this.cursor = game.input.keyboard.createCursorKeys();

      this.player = game.add.sprite(70, 100, 'home');
      this.npcs = [
        new Phaser.Sprite(game, 30, 20, 'npc1'),
        new Phaser.Sprite(game, 30, 20, 'npc2'),
        new Phaser.Sprite(game, 30, 20, 'npc3'),
        new Phaser.Sprite(game, 30, 20, 'npc4'),
      ];

      this.npcs.forEach((npc) => {
        this.player.addChild(npc);
        game.physics.enable(npc, Phaser.Physics.ARCADE);
      });
      game.camera.follow(this.player, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);

      // resources
      this.resourceHolders = game.add.group()
      this.resourceHolders.enableBody = true;
      createResources(this.resourceHolders, this.map);
      this.resourceHolders.children.forEach((sprite) => {
        sprite.body.immovable = true;
      });
    },

    update: function() {
      // Here we update the game 60 times per second
      game.physics.arcade.collide(this.player, this.collisionLayer);
      this.updateNPCs(this.npcs);
      this.updateMomentum(this.npcs, this.player);
      this.clampNPCs(this.npcs, 3, 53, 3, 32);

      this.player.body.velocity.x = 0;
      this.player.body.velocity.y = 0;

      // resource collection
      game.physics.arcade.collide(this.player, this.resourceHolders);
      // game.physics.arcade.overlap(this.player, this.resourceHolders, this.collect, null, this);

      if (this.cursor.left.isDown) {
        this.player.body.velocity.x = -200;
      }
      else if (this.cursor.right.isDown) {
        this.player.body.velocity.x = 200;
      }

      if (this.cursor.up.isDown) {
        this.player.body.velocity.y = -200;
      }
      else if (this.cursor.down.isDown) {
        this.player.body.velocity.y = 200;
      }
    },

    randInt: function(a, b) {
      return Math.round(a + Math.random() * (b-a));
    },

    updateMomentum: function(npcs, home) {
      const vX = home.body.velocity.x;
      const vY = home.body.velocity.y;
      npcs.forEach((npc) => {
        npc.body.velocity.x = -1 * Math.sign(vX) * this.randInt(1, 5) + (npc._intentionX || 0);
        npc.body.velocity.y = -1 * Math.sign(vY) * this.randInt(1, 5) + (npc._intentionY || 0);
      });
    },

    updateNPCs: function(npcs) {
      const time = Date.now();
      npcs.forEach((npc) => {
        // TODO: better NPC AI
        const willCheckUpdate = !npc._lastUpdate || ((npc._lastUpdate + 2000) < time);
        const willUpdate = willCheckUpdate && Math.random() > 0.3;


        if (willUpdate) {
          npc._lastUpdate = time;
          const move = Math.random() > 0.4;
          npc._intentionX = move ? this.randInt(-20, 20) : 0;
          npc._intentionY = move ? this.randInt(-20, 20) : 0;
        }
      });
    },

    clampNPCs: function(npcs, left, right, top, bottom) {
      npcs.forEach((npc) => {
        if (npc.x < left) npc.x = left;
        if (npc.x > right) npc.x = right;
        if (npc.y < top) npc.y = top;
        if (npc.y > bottom) npc.y = bottom;
      });
    },

    collect() {
      console.log('collecting resource');
    },
};

// adds resources to the group
const createResources = (group, map) => {
  result = findObjectsByType('tree', map, 'resource');
  result.forEach((element) => {
    createFromTiledObject(element, group);
  });
};
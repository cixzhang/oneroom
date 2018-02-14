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

      game.load.image('title', 'assets/sprites/title.png');
      game.load.spritesheet('black', 'assets/sprites/black.png', 1, 1);


      // game scaling
      game.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;
      game.scale.setUserScale(3, 3);

      game.renderer.renderSession.roundPixels = true;
      Phaser.Canvas.setImageRenderingCrisp(this.game.canvas);
    },

    create: function() {
      // Here we create the game
      game.stage.backgroundColor = '#ffffff';
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
      this.bgLayers = [
        this.backgroundLayer1,
        this.backgroundLayer2,
        this.collisionLayer,
      ];

      // collide with these tiles
      this.map.setCollisionBetween(1, 2000, true, 'blocker');

      // sets the size of the game world, doesn't affect the canvas...
      this.collisionLayer.resizeWorld();

      // player
      this.cursor = game.input.keyboard.createCursorKeys();

      this.player = game.add.sprite(100, 100, 'home');
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

      // health
      this.health = 100;
      this.healthBounds = [75, 50, 25, 0];

      // resources
      this.resourceHolders = game.add.group()
      this.resourceHolders.enableBody = true;
      createResources(this.resourceHolders, this.map);
      this.resourceHolders.children.forEach((sprite) => {
        sprite.body.immovable = true;
      });

      // Game Start
      this.state = 'title';
      this.title = game.add.sprite(0, 0, 'title');
      this.title.alpha = 0;

      this.bgLayers.forEach(layer => layer.alpha = 0);

      this.black = game.add.sprite(0, 0, 'black', 0);
      this.black.width = game.width * 5;
      this.black.height = game.height * 5;
      game.add.tween(this.black).to({ alpha: 0 }, 500, Phaser.Easing.Linear.None, true, 800)
        .onComplete.addOnce(() => {
          game.add.tween(this.title).to({ alpha: 1 }, 500, Phaser.Easing.Linear.None, true, 0)
            .onComplete.addOnce(() => { this.canPlay = true; });
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

      if (this.state === 'title') {
        game.add.tween(this.title).to({ alpha: 1 }, 500, Phaser.Easing.Linear.None, true, 0);
        if (this.cursor.up.isDown) {
          this.state = 'play';
          game.add.tween(this.title).to({ alpha: 0 }, 500, Phaser.Easing.Linear.None, true, 0);
          this.bgLayers.forEach(layer => {
            game.add.tween(layer).to({ alpha: 1 }, 500, Phaser.Easing.Linear.None, true, 0);
          });
        }
      }

      if (this.state !== 'play') return;


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

      // Check health
      const checkHealth = this.healthBounds[0];
      if (this.health < checkHealth) {
        this.healthBounds.shift();
        const dyingNPC = this.npc[this.healthBounds.length];
        this.killNPC(dyingNPC);
      }

      if (!this.healthBounds.length) {
        this.handleEnd(false);
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
        const willUpdate = !npc._isDead && willCheckUpdate && Math.random() > 0.3;


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

    killNPC: function(npc) {
      npc._isDead = true;
      npc._intentionX = 0;
      npc._intentionY = 0;
      npc.rotation = Math.PI;
      npc.x += 8;
      npc.y += 16;
      npc.tint = 0x000000;
    },

    collect() {
      console.log('collecting resource');
    },

    handleEnd(win) {
      // TODO: win/lose message
      game.add.tween(this.black).to({ alpha: 1 }, 4000, Phaser.Easing.Linear.None, true, 0)
                  .onComplete.addOnce(() => { game.state.start('credit'); });
    },
};

// adds resources to the group
const createResources = (group, map) => {
  result = findObjectsByType('tree', map, 'resource');
  result.forEach((element) => {
    createFromTiledObject(element, group);
  });
};

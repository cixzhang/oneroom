/* globals Phaser _ game utils*/
/* eslint no-console: 0 */

var mainState = {
    preload: function() {
      // Here we preload the assets
      game.load.tilemap('tilemap', 'assets/tilemap_main.json', null, Phaser.Tilemap.TILED_JSON);
      game.load.image('tiles', 'assets/sprites/tileset_main.png');
      game.load.image('tree', 'assets/sprites/tree.png');
      game.load.image('home', 'assets/sprites/home_full.png');
      game.load.image('npc1', 'assets/sprites/npc1.png');
      game.load.image('npc2', 'assets/sprites/npc2.png');
      game.load.image('npc3', 'assets/sprites/npc3.png');
      game.load.image('npc4', 'assets/sprites/npc4.png');
      game.load.image('radio', 'assets/sprites/radio.png');

      game.load.image('title', 'assets/sprites/title.png');
      game.load.spritesheet('black', 'assets/sprites/black.png', 1, 1);
      game.load.spritesheet('palette', 'assets/sprites/palette.png', 14, 14, 18);
      game.load.spritesheet('resources', 'assets/sprites/resources.png', 16, 16);
      game.load.spritesheet('leg', 'assets/sprites/walk.png', 24, 16, 4);

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

      // Title Screen
      this.state = 'title';
      this.title = game.add.sprite(0, 0, 'title');
      this.title.alpha = 0;

      // collide with these tiles
      this.map.setCollisionBetween(1, 2000, true, 'blocker');

      // sets the size of the game world, doesn't affect the canvas...
      this.collisionLayer.resizeWorld();

      // player
      this.cursor = game.input.keyboard.createCursorKeys();

      this.legs = [
        game.add.sprite(-32, -32, 'leg', 0),
        game.add.sprite(-32, -32, 'leg', 0),
        game.add.sprite(-32, -32, 'leg', 0),
        game.add.sprite(-32, -32, 'leg', 0),
      ];
      this.legs.forEach((leg) => {
        leg.anchor.setTo(0, .5);
        leg.animations.add('forward0', [0, 1, 2, 3]);
        leg.animations.add('forward1', [3, 0, 1, 2]);
        leg.animations.add('backward0', [3, 2, 1, 0]);
        leg.animations.add('backward1', [2, 1, 0, 3]);
      });
      this.player = game.add.sprite(100, 100, 'home');
      this.npcs = [
        new Phaser.Sprite(game, 30, 20, 'npc1'),
        new Phaser.Sprite(game, 30, 20, 'npc2'),
        new Phaser.Sprite(game, 30, 20, 'npc3'),
        new Phaser.Sprite(game, 30, 20, 'npc4'),
      ];
      this.radio = new Phaser.Sprite(game, 39, 22, 'radio');
      this.player.addChild(this.radio);

      this.npcs.forEach((npc) => {
        this.player.addChild(npc);
        npc.anchor.setTo(.5, 1);
        game.physics.enable(npc, Phaser.Physics.ARCADE);
      });
      game.camera.follow(this.player, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);

      // resources
      this.resources = game.add.group()
      this.resources.enableBody = true;
      this.resources.physicsBodyType = Phaser.Physics.ARCADE;

      // resource holders
      this.resourceHolders = game.add.group()
      this.resourceHolders.enableBody = true;
      createResourceHolders(this.resourceHolders, this.map);
      this.resourceHolders.children.forEach((sprite) => {
        sprite.body.immovable = true;
        // this is ugly...if you have any other ideas, please let me know
        sprite.onDestroy = this.dropResources.bind(this);
      });

      // Bars
      this.humanHealth = 100;
      this.humanHealthBounds = [75, 50, 25, 0];
      this.humanHealthBoundColors = [5, 1, 14, 10];
      this.humanHealthBar = game.add.tileSprite(game.width / 4, 4, game.width / 2, 3, 'palette', 11); // darker green
      this.humanHealthBarAmt = new Phaser.Sprite(game, 1, 1, 'palette', 9); // green
      this.humanHealthBar.addChild(this.humanHealthBarAmt);
      this.humanHealthBarAmt.height = 1;
      this.humanHealthBar.fixedToCamera = true;

      this.humanHealthBoundColors.forEach((colorIndex, i) => {
        const boundLocation = this.humanHealthBounds[i];
        const indicator = new Phaser.Sprite(game, this.humanHealthBar.width * boundLocation / 100, 0, 'palette', colorIndex);
        indicator.height = 3;
        indicator.width = 1;
        this.humanHealthBar.addChild(indicator);
      });

      this.collectedResources = {
        food: 10,
        wood: 0,
        metal: 0,
      };

      // Curtains
      this.black = game.add.sprite(0, 0, 'black', 0);
      this.black.width = game.width * 5;
      this.black.height = game.height * 5;
      game.add.tween(this.black).to({ alpha: 0 }, 500, Phaser.Easing.Linear.None, true, 800)
        .onComplete.addOnce(() => {
          game.add.tween(this.title).to({ alpha: 1 }, 500, Phaser.Easing.Linear.None, true, 0)
            .onComplete.addOnce(() => { this.canPlay = true; });
          });

      this.hiddenAtIntro = [
        this.backgroundLayer1,
        this.backgroundLayer2,
        this.collisionLayer,
        this.humanHealthBar,
        this.resources,
        ...this.legs,
      ];

      this.hiddenAtIntro.forEach(layer => layer.alpha = 0);
      this.lastTime = Date.now();
      this.frame = 0;
    },

    update: function() {
      // TODO: put this in its own function
      this.time = Date.now();
      if (this.time - this.lastTime > 14) {
        this.frame++;
        this.lastTime = this.time;
      }

      game.physics.arcade.collide(this.player, this.collisionLayer);
      this.updateNPCs(this.npcs, this.player);

      this.player.body.velocity.x = 0;
      this.player.body.velocity.y = 0;

      if (!this.canPlay) return;
      if (this.state === 'title') {
        game.add.tween(this.title).to({ alpha: 1 }, 500, Phaser.Easing.Linear.None, true, 0);
        if (this.cursor.up.isDown) {
          this.state = 'play';
          game.add.tween(this.title).to({ alpha: 0 }, 500, Phaser.Easing.Linear.None, true, 0);
          this.hiddenAtIntro.forEach(layer => {
            game.add.tween(layer).to({ alpha: 1 }, 500, Phaser.Easing.Linear.None, true, 0);
          });
        }
      }

      if (this.state !== 'play') return;

      // TODO: make this just a sprite animation
      // make the resources flash
      this.resources.forEach((resource) => {
        if (this.frame % 16 == 0) {
          tmp = resource.lastFrame;
          resource.lastFrame = resource.frame;
          resource.frame = tmp;
        }
        
        if (resource.body.velocity.x !== 0 || resource.body.velocity.y !== 0) {
          resource.framesAlive++;
          if (resource.framesAlive > 32) {
            resource.body.velocity.x = 0;
            resource.body.velocity.y = 0;
          }
        }
      });

      // resource collection
      //game.physics.arcade.collide(this.player, this.resourceHolders);
      game.physics.arcade.collide(this.player, this.resourceHolders, this.destroyOther);

      if (this.cursor.left.isDown) {
        this.player.body.velocity.x = -100;
      }
      else if (this.cursor.right.isDown) {
        this.player.body.velocity.x = 100;
      }

      if (this.cursor.up.isDown) {
        this.player.body.velocity.y = -100;
      }
      else if (this.cursor.down.isDown) {
        this.player.body.velocity.y = 100;
      }

      this.updateLegs(this.legs, this.player);
      this.updateHumanHealth();
      this.updateFood();
    },

    randInt: function(a, b) {
      return Math.round(a + Math.random() * (b-a));
    },

    updateLegs: function(legs, home) {
      const legProps = [
        { x: 3, y: 8, scaleX: -1 },
        { x: 3, y: home.height - 4, scaleX: -1 },
        { x: home.width - 3, y: home.height - 4, scaleX: 1 },
        { x: home.width - 3, y: 8, scaleX: 1 },
      ];

      const vX = home.body.velocity.x;
      const vY = home.body.velocity.y;

      legs.forEach((leg, i) => {
        leg.x = home.x + legProps[i].x + vX / 60;
        leg.y = home.y + legProps[i].y + vY / 60;
        leg.scale.x = legProps[i].scaleX;

        if (vX || vY) {
          let direction = 'forward';
          let motion = '0';
          if (i < 2 && vX > 0) direction = 'backward';
          if ((i == 0 || i == 3) && vY > 0) direction = 'backward';
          if (i % 2) motion = '1';
          leg.animations.play(direction + motion, 6);
        }
      });
    },

    updateFood: function() {
      const time = Date.now();
      const foodUpdateCheck = 2000 / this.humanHealthBounds.length;

      this.foodUpdateTime = this.foodUpdateTime || time;

      if (time > this.foodUpdateTime + foodUpdateCheck) {
        this.foodUpdateTime = time;
        this.collectedResources.food = Math.max(this.collectedResources.food - 1, 0);
        console.log('Food:', this.collectedResources.food);
      }
    },

    updateHumanHealth: function() {
      const time = Date.now();

      this.humanHealthUpdateCheck = 1000; // Check every second
      this.humanHealthUpdateTime = this.humanHealthUpdateTime || time;

      if (time > this.humanHealthUpdateTime + this.humanHealthUpdateCheck) {
        this.humanHealthUpdateTime = time;
        const dyingNPC = this.npcs[this.humanHealthBounds.length - 1];

        // Going hungry
        if (!this.collectedResources.food) {
          this.humanHealth -= 1;
          this.hurtNPC(dyingNPC);
        }

        // Check health
        const checkHealth = this.humanHealthBounds[0];
        if (this.humanHealth < checkHealth) {
          this.humanHealthBounds.shift();
          this.killNPC(dyingNPC);
        }

        if (!this.humanHealthBounds.length) {
          this.handleEnd(false);
        }
      }

      this.humanHealthBarAmt.width = (this.humanHealthBar.width - 2) * (this.humanHealth / 100);
    },

    updateNPCs: function(npcs, home) {
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

          npc.scale.x = 1;
          if (npc._intentionX > 0) npc.scale.x = -1;
        }
      });
      this.updateMomentum(npcs, home);
      this.clampNPCs(this.npcs, 6, home.width - 6, 16, home.height - 16);
    },

    updateMomentum: function(npcs, home) {
      const vX = home.body.velocity.x;
      const vY = home.body.velocity.y;
      npcs.forEach((npc) => {
        npc.body.velocity.x = -1 * Math.sign(vX) * this.randInt(1, 5) + (npc._intentionX || 0);
        npc.body.velocity.y = -1 * Math.sign(vY) * this.randInt(1, 5) + (npc._intentionY || 0);
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

    hurtNPC: function(npc) {
      game.add.tween(npc).to({ tint: 0xFF0000 }, 250, Phaser.Easing.Linear.None, true, 0)
        .onComplete.addOnce(() => {
          if (npc._isDead) return;
          game.add.tween(npc).to({ tint: 0xFFFFFF }, 250, Phaser.Easing.Linear.None, true, 0);
        });
    },

    killNPC: function(npc) {
      npc._isDead = true;
      npc._intentionX = 0;
      npc._intentionY = 0;

      game.add.tween(npc.scale).to({
        x: 1, y: -1,
      }, 500, Phaser.Easing.Linear.None, true, 0);

      game.add.tween(npc).to({
        tint: 0x000000,
      }, 500, Phaser.Easing.Linear.None, true, 0);
    },

    // used for destroying resources...we'll make this better soon
    destroyOther: function(player, other) {
      if (!other.destroying) {
        window.setTimeout(() => {
          other.onDestroy(other, 'wood', 4);
          other.kill();
        }, 250);
        other.destroying = true;
      }
    },

    dropResources(callingSprite, resourceType, number) {
      const resourceMap = {
        food: [0,1],
        wood: [2,3],
        metal: [4,5]
      };

      originX = callingSprite.centerX;
      originY = callingSprite.centerY;

      // TODO: spawn multiple around the area
      for (i = 0; i < number; i++) {
        velocityX = this.randInt(-80, 80);
        velocityY = this.randInt(-80, 80);
        resource = this.resources.create(originX, originY, 'resources');
        resource.kind = resourceType;
        resource.frame = resourceMap[resourceType][0];
        resource.lastFrame = resourceMap[resourceType][1];
        resource.body.velocity.x = velocityX;
        resource.body.velocity.y = velocityY;
        resource.framesAlive = 0;
      }
    },

    collectResource() {
      console.log('collecting resource');
    },

    handleEnd(win) {
      // TODO: win/lose message
      game.add.tween(this.black).to({ alpha: 1 }, 4000, Phaser.Easing.Linear.None, true, 0)
                  .onComplete.addOnce(() => { game.state.start('credit'); });
    },
};

// adds resources to the group
const createResourceHolders = (group, map) => {
  result = findObjectsByType('tree', map, 'resource');
  result.forEach((element) => {
    createFromTiledObject(element, group);
  });
};

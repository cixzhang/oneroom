/* globals Phaser _ game utils*/
/* eslint no-console: 0 */

// constants/globals go here
const RESOURCE_VALUE = 5;
const ENEMIES_DATA = window.enemies;

var mainState = {
    preload: function() {
      // sprites
      game.load.tilemap('tilemap', 'assets/tilemap_main.json', null, Phaser.Tilemap.TILED_JSON);
      game.load.image('tiles', 'assets/sprites/tileset_main.png');
      game.load.image('tree', 'assets/sprites/tree.png');
      game.load.spritesheet('cow', 'assets/sprites/cow.png', 32, 16, 2);
      game.load.image('car', 'assets/sprites/car.png');
      game.load.image('home', 'assets/sprites/home_full.png');
      game.load.spritesheet('home_sprites', 'assets/sprites/home.png', 8, 8);
      game.load.image('npc1', 'assets/sprites/npc1.png');
      game.load.image('npc2', 'assets/sprites/npc2.png');
      game.load.image('npc3', 'assets/sprites/npc3.png');
      game.load.image('npc4', 'assets/sprites/npc4.png');
      game.load.image('radio', 'assets/sprites/radio.png');

      game.load.image('title', 'assets/sprites/title.png');
      game.load.spritesheet('black', 'assets/sprites/black.png', 1, 1);
      game.load.spritesheet('clear', 'assets/sprites/clear.png', 1, 1);
      game.load.spritesheet('palette', 'assets/sprites/palette.png', 14, 14, 18);
      game.load.spritesheet('resources', 'assets/sprites/resources.png', 16, 16);
      game.load.spritesheet('leg', 'assets/sprites/walk.png', 24, 16, 4);
      game.load.image('bullet', 'assets/sprites/bullet.png');
      game.load.spritesheet('fire', 'assets/sprites/fire.png', 8, 16, 12);
      game.load.spritesheet('symbols', 'assets/sprites/symbols.png', 9, 12);
      game.load.spritesheet('symbols_small', 'assets/sprites/symbols_small.png', 4, 6);
      // sounds
      game.load.audio('collect', 'assets/sound/collect.wav');
      game.load.audio('walk1', 'assets/sound/walk1.wav');
      game.load.audio('walk2', 'assets/sound/walk2.wav');
      game.load.audio('moo', 'assets/sound/moo.wav');
      game.load.audio('gun', 'assets/sound/gun.wav');

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
      this.keys = game.input.keyboard.createCursorKeys();
      this.keys.w = game.input.keyboard.addKey(Phaser.Keyboard.W);
      this.keys.s = game.input.keyboard.addKey(Phaser.Keyboard.S);
      this.keys.d = game.input.keyboard.addKey(Phaser.Keyboard.D);
      this.keys.a = game.input.keyboard.addKey(Phaser.Keyboard.A);

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
      this.player.fireWaitTime = 15;
      this.player.nextFire = 0;

      // resources
      this.resources = game.add.group();
      this.resources.enableBody = true;
      this.resources.physicsBodyType = Phaser.Physics.ARCADE;

      this.resourceCounters = new Phaser.Group(game, this.player, 'resourceCounters');
      this.resourceCounters.x = 3;
      this.resourceCounters.y = 53;

      const resourceNames = ['food', 'wood', 'metal'];
      [0, 2, 4].forEach((resource, i) => {
        const counter = new Phaser.Group(game, this.resourceCounters);
        const icon = new Phaser.Sprite(game, 0, 0, 'resources', resource);
        icon.scale.x = 0.25;
        icon.scale.y = 0.25;
        counter.addChild(icon);
        counter.x = 20 * i + 2;
        counter.y = 2;

        this[resourceNames[i]+'Counter'] = new Phaser.Group(game, counter);
        this[resourceNames[i]+'Counter'].x = 2;
        this[resourceNames[i]+'Counter'].y = -2;
      });

      this.player.addChild(this.resourceCounters);

      // resource holders
      this.resourceHolders = game.add.group();
      this.resourceHolders.enableBody = true;
      createResourceHolders(this.resourceHolders, this.map);
      this.resourceHolders.children.forEach((sprite) => {
        sprite.body.immovable = true;
        // this is ugly...if you have any other ideas, please let me know
        sprite.onDestroy = this.dropResources.bind(this);
      });

      // projectiles
      this.playerBullets = game.add.group();
      this.playerBullets.enableBody = true;
      this.playerBullets.physicsBodyType = Phaser.Physics.ARCADE;
      this.playerBullets.sprite = 'bullet';
      this.playerBullets.fireSprite = 'fire';
      this.playerBullets.velocity = 600;
      this.playerBullets.damage = 10;


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
        food: 16,
        wood: 0,
        metal: 10,
      };

      // Enemies
      this.enemies = {};

      _.each(ENEMIES_DATA, (enemy, name) => {
        const width = enemy.map.tileswide * enemy.map.tilewidth;
        const height = enemy.map.tileshigh * enemy.map.tileheight;
        const sprite = new Phaser.TileSprite(game, 0, 0, width, height, 'clear', 0);
        const layers = [];
        enemy.map.layers.forEach(layer => layers.unshift(layer)); // reversing the layers, not in place!
        layers.forEach(layer => {
          layer.tiles.forEach(tile => {
            // draw each tile
            if (tile.tile === -1) return;
            const tSprite = new Phaser.Sprite(game, tile.x * enemy.map.tilewidth, tile.y * enemy.map.tileheight, 'home_sprites', tile.tile);
            tSprite.anchor.setTo(0.5, 0.5);
            if (tile.flipX) {
              tSprite.scale.x = -1;
            }
            sprite.addChild(tSprite);
          });
        });

        this.enemies[name] = sprite;
      });

      this.enemy = game.add.tileSprite(0, 0, 0, 0, 'clear', 0);

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
        this.resourceCounters,
        this.enemy,
        ...this.legs,
      ];

      this.hiddenAtIntro.forEach(layer => layer.alpha = 0);
      this.lastTime = Date.now();
      this.frame = 0;

      // register any sounds needed
      this.walkSound = soundManager.add('walk1', 0.7);
      this.walkSound2 = soundManager.add('walk2', 0.7);
      this.walkSounds = [this.walkSound, this.walkSound2];
      this.walkSoundIndex = 0;
      this.walkSounds.forEach((sound) => {
        sound.onStop.add(() => {
          this.walkSoundIndex = (this.walkSoundIndex + 1) % 2;
        });
      });
      this.mooSound = soundManager.add('moo');

      // TESTING
      this.spawnEnemy(99, 99, 'doghouse');
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
      if (this.player.nextFire > 0) this.player.nextFire--;

      if (!this.canPlay) return;
      if (this.state === 'title') {
        game.add.tween(this.title).to({ alpha: 1 }, 500, Phaser.Easing.Linear.None, true, 0);
        if (this.keys.up.isDown) {
          this.state = 'play';
          game.add.tween(this.title).to({ alpha: 0 }, 500, Phaser.Easing.Linear.None, true, 0);
          this.hiddenAtIntro.forEach(layer => {
            game.add.tween(layer).to({ alpha: 1 }, 500, Phaser.Easing.Linear.None, true, 0);
          });
        }
      }

      if (this.state !== 'play') return;

      // update resource holders (function?)
      this.resourceHolders.forEach((resourceHolder) => {
        if (resourceHolder.health <= 0) {
          resourceHolder.onDestroy(resourceHolder, resourceHolder.resource, 4);
        }
        const freq = _.random(500, 1200);
        if (resourceHolder.spriteKey === 'cow' && this.frame % freq == 0 && !this.mooSound.isPlaying) {
          this.mooSound.play();
        }
      });

      // resourceHolder destruction
      game.physics.arcade.overlap(this.playerBullets, this.resourceHolders, this.damageOther);
      // resource collection
      game.physics.arcade.overlap(this.player, this.resources, this.collectResource);

      if (this.keys.left.isDown) {
        this.player.body.velocity.x = -100;
      }
      else if (this.keys.right.isDown) {
        this.player.body.velocity.x = 100;
      }

      if (this.keys.up.isDown) {
        this.player.body.velocity.y = -100;
      }
      else if (this.keys.down.isDown) {
        this.player.body.velocity.y = 100;
      }

      // firing keys
      this.checkFire();


      this.updateLegs(this.legs, this.player);
      this.updateHumanHealth();
      this.updateFood();
      this.updateCounters();
      this.player.bringToTop();
    },

    despawnEnemy() {
      this.enemy.removeChildren();
      this.enemy.x = 0;
      this.enemy.y = 0;
      this.enemy.width = 0;
      this.enemy.height = 0;
      this.enemy.spawned = false;
    },

    spawnEnemy(x, y, enemyName) {
      this.enemy.addChild(this.enemies[enemyName]);
      this.enemy.width = this.enemies[enemyName].width;
      this.enemy.height = this.enemies[enemyName].height;
      this.enemy.x = x;
      this.enemy.y = y;
      this.enemy.spawned = true;
    },

    makeTextSprite: function(text, width, height, color, useSmall) {
      const sizeX = useSmall ? 4 : 9;
      const sizeY = useSmall ? 6 : 12;
      const sheet = useSmall ? 'symbols_small' : 'symbols';

      const getCodeSprite = (char) => {
        let index = 0;
        const code = char.charCodeAt(0);
        if (char === ',') index = 62;
        else if (char === '.') index = 63;
        else if (char === '!') index = 64;
        else if (char === ' ') index = 65;
        else if (code < 65) {
          // numerics
          index = code - 48;
        }
        else if (code < 97) {
          // capital letters
          index = code - 65 + 10;
        }
        else {
          // lowercase letters
          index = code - 97 + 10 + 26;
        }
        return new Phaser.Sprite(game, 0, 0, sheet, index);
      };

      const textSprite = new Phaser.TileSprite(game, 0, 0, width, height, 'clear', 0);
      let currentX = 0;
      let currentY = 0;
      String(text).split('').forEach((char) => {
        const charSprite = getCodeSprite(char);
        charSprite.tint = color;

        if (currentX + sizeX < width) {
          currentX += sizeX;
        } else {
          currentY += sizeY;
        }

        charSprite.x = currentX;
        charSprite.y = currentY;
        textSprite.addChild(charSprite);
      });
      return textSprite;
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
          if (!this.walkSounds[this.walkSoundIndex].isPlaying) {
            this.walkSounds[this.walkSoundIndex].play();

          }
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
      }
    },

    updateCounters: function() {
      const color = 0xFFFFFF;
      const width = 24;
      const height = 12;
      this.foodCounter.removeChildren();
      this.woodCounter.removeChildren();
      this.metalCounter.removeChildren();

      this.foodCounter.addChild(this.makeTextSprite(this.collectedResources.food, width, height, color, true));
      this.woodCounter.addChild(this.makeTextSprite(this.collectedResources.wood, width, height, color, true));
      this.metalCounter.addChild(this.makeTextSprite(this.collectedResources.metal, width, height, color, true));
    },

    healHumanHealth: function() {
      this.humanHealth = this.humanHealthBounds.length * 25;
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
          this.humanHealth -= this.humanHealthBounds.length;
          this.hurtNPC(dyingNPC);
        } else {
          this.healHumanHealth();
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
          npc._intentionX = move ? _.random(-20, 20) : 0;
          npc._intentionY = move ? _.random(-20, 20) : 0;

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
        npc.body.velocity.x = -1 * Math.sign(vX) * _.random(1, 5) + (npc._intentionX || 0);
        npc.body.velocity.y = -1 * Math.sign(vY) * _.random(1, 5) + (npc._intentionY || 0);
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

    damageOther: function(bullet, other) {
      other.health -= bullet.damage;
      bullet.kill();
    },

    dropResources: function(callingSprite, resourceType, number) {
      const resourceMap = {
        food: [0,1],
        wood: [2,3],
        metal: [4,5]
      };

      originX = callingSprite.centerX;
      originY = callingSprite.centerY;

      for (i = 0; i < number; i++) {
        resource = this.resources.create(originX, originY, 'resources');
        resource.kind = resourceType;
        resource.animations.add('flash', resourceMap[resourceType], 4, true);
        resource.animations.play('flash');
        game.add.tween(resource).to({
          x: _.random(resource.x - 50, resource.x + 50),
          y: _.random(resource.y - 50, resource.y + 50),
        }, 200, Phaser.Easing.Linear.None, true);
      }
      callingSprite.destroy();
    },

    collectResource: function(player, resource) {
      if (!resource.destroying) {
        const resourceTween = game.add.tween(resource);
        resourceTween.onComplete.add((obj, tween) => {
          resource.animations.add('collect', [6,7,8,9], 30, false);
          const collectAnimation = resource.animations.play('collect');
          mainState.collectedResources[resource.kind] += RESOURCE_VALUE;
          if (resource.kind === 'food') mainState.healHumanHealth();
          soundManager.play('collect');
          player.tint = '0xd7e894';
          collectAnimation.onComplete.add((resource) => {
            resource.destroy();
            player.tint = '0xffffff';
          }, this);
        }, this);
        resourceTween.to( {
          x: player.body.center.x - 8,
          y: player.body.center.y - 8,
        }, 200, Phaser.Easing.Cubic.None, true);
      }
      resource.destroying = true;
    },

    checkFire: function() {
      if (this.keys.w.isDown) {
        if (this.keys.a.isDown) {
          this.fireBullet(this.player, this.playerBullets, this.player.x - 4, this.player.y - 4, -135);
        }
        else if (this.keys.d.isDown) {
          this.fireBullet(this.player, this.playerBullets, this.player.right + 4, this.player.y - 4, -45);
        }
        else {
          this.fireBullet(this.player, this.playerBullets, this.player.centerX, this.player.y - 4, -90);
        }
      }
      else if (this.keys.s.isDown) {
        if (this.keys.a.isDown) {
          this.fireBullet(this.player, this.playerBullets, this.player.x - 4, this.player.bottom + 4, 135);
        }
        else if (this.keys.d.isDown) {
          this.fireBullet(this.player, this.playerBullets, this.player.right + 4, this.player.bottom + 4, 45);
        }
        else {
          this.fireBullet(this.player, this.playerBullets, this.player.centerX, this.player.bottom + 4, 90);
        }
      }
      else if (this.keys.d.isDown) {
        this.fireBullet(this.player, this.playerBullets, this.player.right + 4, this.player.centerY, 0);
      }
      else if (this.keys.a.isDown) {
        this.fireBullet(this.player, this.playerBullets, this.player.x - 4, this.player.centerY, 180);
      }
    },

    fireBullet: function(callingSprite, bulletGroup, x, y, angle) {
      if (callingSprite.nextFire === 0) {
        if (callingSprite === mainState.player) {
          // consume metal
          if (!mainState.collectedResources.metal) return;
          mainState.collectedResources.metal -= 1;
        }
        soundManager.play('gun');
        // slight modification is fun
        angle = angle + _.random(-4, 4);

        // firing sprite
        let fireSprite = game.add.sprite(x, y, bulletGroup.fireSprite);
        // TODO: see if this animation can live on the group instead
        fireSprite.animations.add('fire', _.range(12), 30, false);
        const fireAnimation = fireSprite.animations.play('fire');
        fireAnimation.onComplete.add((fireSprite) => {
          fireSprite.destroy();
        });

        let bullet = bulletGroup.create(x, y, bulletGroup.sprite);
        fireSprite.alignIn(bullet, Phaser.TOP_CENTER, 2);
        fireSprite.anchor.setTo(0.5, 0.5);
        fireSprite.angle = angle + 90;
        const startingHeight = bullet.height;
        bullet.height = 64;
        // make the bullet trail longer over time
        game.add.tween(bullet).to({
          height: startingHeight + 60,
        }, 200, Phaser.Easing.Linear.None, true);
        bullet.angle = angle + 90;
        bullet.damage = bulletGroup.damage;
        game.physics.arcade.velocityFromAngle(angle, bulletGroup.velocity, bullet.body.velocity);
        callingSprite.nextFire = callingSprite.fireWaitTime;
      }
    },

    handleEnd(win) {
      // TODO: win/lose message
      game.add.tween(this.black).to({ alpha: 1 }, 4000, Phaser.Easing.Linear.None, true, 0)
                  .onComplete.addOnce(() => { game.state.start('credit'); });
    },
};

// adds resources to the group
const createResourceHolders = (group, map) => {
  let result = [];
  let trees = findObjectsByType('tree', map, 'resource');
  let cows = findObjectsByType('cow', map, 'resource');
  let cars = findObjectsByType('car', map, 'resource');
  result = result.concat(trees);
  result = result.concat(cows);
  result = result.concat(cars);
  result.forEach((element) => {
    createFromTiledObject(element, group);
  });
};

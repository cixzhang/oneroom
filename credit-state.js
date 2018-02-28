/* globals Phaser game */
var creditState = {
  preload: function() {
    // game scaling
    game.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;
    game.scale.setUserScale(3, 3);

    game.renderer.renderSession.roundPixels = true;
    Phaser.Canvas.setImageRenderingCrisp(this.game.canvas);

    game.load.spritesheet('goodEnd', 'assets/sprites/goodend.png', 200, 200);
    game.load.spritesheet('badEnd', 'assets/sprites/badend.png', 200, 200);
    // game.load.audio('credits', 'assets/sound/--.ogg');
  },
  create: function() {
    const didWin = window.WIN;
    game.stage.backgroundColor = '#000000';
    this.thanks = game.add.sprite(game.canvas.width/2 - 100, game.canvas.height/2 - 100, didWin ? 'goodEnd' : 'badEnd', 0);
    this.startTime = null;
    // this.creditsTheme = game.add.audio('credits');
    // this.creditsTheme.play();
  },
  update: function() {
    var now = Date.now();

    this.startTime = this.startTime || now;

    if (now - this.startTime > 5000) {
      window.WIN = false;
      game.state.start('main');
    }
  }
};


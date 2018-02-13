/* globals Phaser _ game */
/* eslint no-console: 0 */

var mainState = {
    preload: function() {
        // Here we preload the assets

        // game scaling
        game.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;
        game.scale.setUserScale(3, 3);

        game.renderer.renderSession.roundPixels = true;
        Phaser.Canvas.setImageRenderingCrisp(this.game.canvas);
    },

    create: function() {
        // Here we create the game

        // Start the Arcade physics system (for movements and collisions)
        game.physics.startSystem(Phaser.Physics.ARCADE);
    },

    update: function() {
        // Here we update the game 60 times per second
    },
};

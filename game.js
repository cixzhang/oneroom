var game = new Phaser.Game(333, 230, Phaser.AUTO, '', this, false, false);
var soundManager = new Phaser.SoundManager(game);
game.state.add('main', mainState);
game.state.add('credit', creditState);
game.state.start('main');

Game.Preloader = function(game) {
};

Game.Preloader.prototype = {
    preload: function() {
        this.load_1 = this.add.sprite(this.world.centerX - 178, this.world.centerY - 128, 'load1');
        this.load_2 = this.add.sprite(this.world.centerX - 178, this.world.centerY - 128, 'load2');

        this.load.setPreloadSprite(this.load_1);

        //this.load.image('bg', 'assets/bg.png');

        this.load.image('red', 'assets/red.png');
        this.load.image('placeholder', 'assets/pixel.png');
        this.load.image('green', 'assets/green.png');
        this.load.image('red_h', 'assets/red_h.png');
        this.load.image('red_v', 'assets/red_v.png');
        this.load.image('green_h', 'assets/green_h.png');
        this.load.image('green_v', 'assets/green_v.png');
        this.load.image('red_block', 'assets/red_block.png');
        this.load.image('green_block', 'assets/green_block.png');
        this.load.image('black_v', 'assets/black_v.png');
        this.load.image('black_h', 'assets/black_h.png');
        this.load.image('black_block', 'assets/black_block.png');
        this.load.image('green_small', 'assets/green_small.png');
        this.load.image('red_small', 'assets/red_small.png');
        this.load.image('red_particle', 'assets/red_particle.png');
        this.load.image('green_particle', 'assets/green_particle.png');
        this.load.image('black_particle', 'assets/black_particle.png');
        this.load.image('tw', 'assets/twitter.png');
        this.load.image('control_panel', 'assets/controls.png');
        this.load.image('button', 'assets/button.png');
        this.load.image('button_h', 'assets/button_h.png');
        this.load.image('button_v', 'assets/button_v.png');
        this.load.image('button_block', 'assets/button_block.png');
        

        this.load.audio('gameover', 'assets/gameover.wav');
        this.load.audio('lvlup', 'assets/lvlup.wav');
        this.load.audio('hit', 'assets/hit.wav');

    },
    create: function() {
        this.state.start('MainMenu');

    }
};
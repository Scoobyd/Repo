Game.MainMenu = function(game) {
};
Game.MainMenu.prototype = {
    create: function() {

        upIsDown = 0;
        this.input.keyboard.addKeyCapture([Phaser.Keyboard.LEFT, Phaser.Keyboard.RIGHT, Phaser.Keyboard.SPACEBAR, Phaser.Keyboard.UP]); // prevent default...

        this.stage.backgroundColor = "#123";

        ph = this.add.sprite(55, 55, 'placeholder');
        ph.anchor.set(0.5);
        this.physics.arcade.enable(ph);
        ph.name = 'green';

        green = this.add.sprite(ph.x, ph.y, 'green_small');
        green.anchor.set(0.5);
        green.pivot.x = 23;
        green.pivot.y = 0;
        this.physics.arcade.enable(green);
        green.name = 'green';

        red = this.add.sprite(ph.x, ph.y, 'red_small');
        red.anchor.set(0.5);
        this.physics.arcade.enable(red);
        red.pivot.x = -23;
        red.pivot.y = 0;
        red.name = 'red';

        this.add.tween(ph).to({x: this.world.width - 50, y: 50}, 5000, Phaser.Easing.Linear.None)
                .to({x: this.world.width - 50, y: this.world.height - 50}, 3000, Phaser.Easing.Linear.None)
                .to({x: 50, y: this.world.height - 50}, 5000, Phaser.Easing.Linear.None)
                .to({x: 50, y: 50}, 3000, Phaser.Easing.Linear.None)
                .loop()
                .start();

        this.time.events.loop(Phaser.Timer.SECOND * 0.025, function() {
            red.body.x = ph.x;
            red.body.y = ph.y;
            red.angle += 1;
            green.angle += 1;
        }, this);

        share = this.add.text(this.world.centerX, this.world.centerY - 70, "Share this game on", {
            font: "18px \"Press Start 2P\"",
            fill: "#FFA500",
            align: "center"
        });
        share.anchor.setTo(0.5);
        share.inputEnabled = true;
        share.events.onInputDown.add(this.shareClicked, this);

        share2 = this.add.text(this.world.centerX, this.world.centerY - 45, "Twitter!", {
            font: "20px \"Press Start 2P\"",
            fill: "#4099FF",
            align: "center"
        });
        share2.anchor.setTo(0.5);

        text = this.add.text(this.world.centerX, this.world.centerY + 55, "TAP to Play!", {
            font: "22px \"Press Start 2P\"",
            fill: "#fff",
            align: "center"
        });
        text.anchor.setTo(0.5);

        this.add.tween(share2).to({angle: 1}, 500).to({angle: -1}, 500).loop().start();

        text.alpha = 0.2;
        this.add.tween(text).to({alpha: 1}, 1500, Phaser.Easing.Linear.None, true, 0, 1000, true);


    },
    update: function() {


        if (this.input.activePointer.isDown) {
            upIsDown = 1;
            this.state.start('Game');
        }

        if (this.input.keyboard.isDown(Phaser.Keyboard.R) && this.input.keyboard.isDown(Phaser.Keyboard.C)) {
            document.cookie = "2cx=" + 80;
            document.cookie = "2cy=" + 76;
            this.state.start('Game');
        }

        red.x = ph.body.x;
        red.y = ph.body.y;
        green.x = ph.body.x;
        green.y = ph.body.y;
    },
    gameStart: function() {
        this.state.start('Game');
    },
    shareClicked: function() {
        window.open("https://twitter.com/intent/tweet?url=http://svejkgames.com/game/red-and-green/&text=I'm+playing+Red+and+Green+on+SvejkGames!+@SvejkGames", "_system");
    }
};

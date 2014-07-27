Game.Game = function(game) {
    this.game = game;
};
Game.Game.prototype = {
    create: function() {
        this.game.input.maxPointers = 5;

        direction = 'none';
        pressed = false;
        tapCount = 0;
        gOver = false;

        this.input.keyboard.addKeyCapture([Phaser.Keyboard.LEFT, Phaser.Keyboard.RIGHT, Phaser.Keyboard.SPACEBAR, Phaser.Keyboard.UP, Phaser.Keyboard.DOWN]); // prevent default...
        this.stage.backgroundColor = "#123";
        points = 0;
        score = 0;
        gOver = false;
        go_sound = this.add.sound('gameover');
        lvlup = this.add.sound('lvlup');
        hit = this.add.sound('hit');
        speed = 115;
        cSpeed = 1;
        timer = 1.1;
        traps = this.add.group();
        traps.enableBody = true;
        traps.physicsBodyType = Phaser.Physics.ARCADE;
        traps.setAll('checkWorldBounds', true);
        traps.setAll('outOfBoundsKill', true);
        emitter_green = this.add.emitter(0, 0, 100);
        emitter_green.makeParticles('green_particle');
        emitter_red = this.add.emitter(0, 0, 100);
        emitter_red.makeParticles('red_particle');
        emitter_black = this.add.emitter(0, 0, 100);
        emitter_black.makeParticles('black_particle');
        ph = this.add.sprite(this.world.centerX, this.world.centerY - 120, 'placeholder');
        ph.anchor.set(0.5);
        this.physics.arcade.enable(ph);
        ph.name = 'green';
        ph.body.collideWorldBounds = true;
        green = this.add.sprite(ph.x, ph.y, 'green');
        green.anchor.set(0.5);
        green.pivot.x = 59;
        green.pivot.y = 0;
        this.physics.arcade.enable(green);
        green.name = 'green';
        red = this.add.sprite(ph.x, ph.y, 'red');
        red.anchor.set(0.5);
        this.physics.arcade.enable(red);
        red.pivot.x = -59;
        red.pivot.y = 0;
        red.name = 'red';

        this.time.events.loop(Phaser.Timer.SECOND * 0.025, function() {
            if (pressed === true) {
                red.angle += cSpeed * 5;
                green.angle += cSpeed * 5;
            } else {
                red.angle += cSpeed;
                green.angle += cSpeed;
            }

        }, this);
        this.time.events.add(Phaser.Timer.SECOND * timer, this.createTraps, this);
        score_text = this.add.text(this.world.width - 105, 18, "Points: " + score, {
            font: "14px \"Press Start 2P\"",
            fill: "#FFA500",
            align: "center"
        });
        score_text.anchor.setTo(0.5);
        bonus_text = this.add.text(this.world.centerX, 287, "2.5x speed!", {
            font: "16px \"Press Start 2P\"",
            fill: "#D8C358",
            align: "center"
        });
        bonus_text.anchor.setTo(0.5);
        bonus_text.visible = false;
        gameOver_text = this.add.text(this.world.centerX, this.world.centerY - 120, "", {
            font: "18px \"Press Start 2P\"",
            fill: "#FFF",
            align: "center"
        });
        gameOver_text.anchor.setTo(0.5);

        this.time.events.loop(Phaser.Timer.SECOND * 2, function() {
            traps.forEachAlive(function(a) {
                a.damage(1);
            }, this);
        }, this);


        control_panel = this.add.sprite(0, 452, 'control_panel');
        this.physics.arcade.enable(control_panel);
        control_panel.body.immovable = true;

        button = this.add.button(30, 480, 'button');
        button.alpha = 0.5;

        speed_text = this.add.text(button.x + 75, button.y + 75, "Speed", {
            font: "18px \"Press Start 2P\"",
            fill: "#FFF",
            align: "center"
        });
        speed_text.anchor.setTo(0.5);
        button.events.onInputDown.add(function() {
            pressed = true;
            button.alpha = 0.9;
        }, this);

        button.events.onInputOver.add(function() {
            pressed = true;
            button.alpha = 0.9;
        }, this);

        button.events.onInputOut.add(function() {
            pressed = false;
            button.alpha = 0.5;
        }, this);

        button.events.onInputUp.add(function() {
            pressed = false;
            button.alpha = 0.5;
        }, this);
        this.createArrows();

        this.input.onDown.add(this.reset, this);
    },
    createArrows: function() {
        aRU = this.add.button(337, 452, 'button_block');
        aRU.alpha = 0.5;
        aRU.events.onInputDown.add(function() {
            direction = "rightUp";
        }, this);
        aRU.events.onInputOver.add(function() {
            direction = "rightUp";
        }, this);
        aRU.events.onInputOut.add(function() {
            direction = "none";
        }, this);
        aRU.events.onInputUp.add(function() {
            direction = "none";
        }, this);


        aLU = this.add.button(212, 452, 'button_block');
        aLU.alpha = 0.5;
        aLU.events.onInputDown.add(function() {
            direction = "leftUp";
        }, this);
        aLU.events.onInputOver.add(function() {
            direction = "leftUp";
        }, this);
        aLU.events.onInputOut.add(function() {
            direction = "none";
        }, this);
        aLU.events.onInputUp.add(function() {
            direction = "none";
        }, this);

        aRD = this.add.button(337, 577, 'button_block');
        aRD.alpha = 0.5;
        aRD.events.onInputDown.add(function() {
            direction = "rightDown";
        }, this);
        aRD.events.onInputOver.add(function() {
            direction = "rightDown";
        }, this);
        aRD.events.onInputOut.add(function() {
            direction = "none";
        }, this);
        aRD.events.onInputUp.add(function() {
            direction = "none";
        }, this);

        aLD = this.add.button(212, 577, 'button_block');
        aLD.alpha = 0.5;
        aLD.events.onInputDown.add(function() {
            direction = "leftDown";
        }, this);
        aLD.events.onInputOver.add(function() {
            direction = "leftDown";
        }, this);
        aLD.events.onInputOut.add(function() {
            direction = "none";
        }, this);
        aLD.events.onInputUp.add(function() {
            direction = "none";
        }, this);



        aLeft = this.add.button(212, 527, 'button_h');
        aLeft.alpha = 0.5;
        aLeft.events.onInputDown.add(function() {
            direction = "left";
        }, this);
        aLeft.events.onInputOver.add(function() {
            direction = "left";
        }, this);
        aLeft.events.onInputOut.add(function() {
            direction = "none";
        }, this);
        aLeft.events.onInputUp.add(function() {
            direction = "none";
        }, this);

        aRight = this.add.button(337, 527, 'button_h');
        aRight.alpha = 0.5;
        aRight.events.onInputDown.add(function() {
            direction = "right";
        }, this);
        aRight.events.onInputOver.add(function() {
            direction = "right";
        }, this);
        aRight.events.onInputOut.add(function() {
            direction = "none";
        }, this);
        aRight.events.onInputUp.add(function() {
            direction = "none";
        }, this);

        aUp = this.add.button(287, 452, 'button_v');
        aUp.alpha = 0.5;
        aUp.events.onInputDown.add(function() {
            direction = "up";
        }, this);
        aUp.events.onInputOver.add(function() {
            direction = "up";
        }, this);
        aUp.events.onInputOut.add(function() {
            direction = "none";
        }, this);
        aUp.events.onInputUp.add(function() {
            direction = "none";
        }, this);

        aDown = this.add.button(287, 577, 'button_v');
        aDown.alpha = 0.5;
        aDown.events.onInputDown.add(function() {
            direction = "down";
        }, this);
        aDown.events.onInputOver.add(function() {
            direction = "down";
        }, this);
        aDown.events.onInputOut.add(function() {
            direction = "none";
        }, this);
        aDown.events.onInputUp.add(function() {
            direction = "none";
        }, this);
    },
    shareClicked: function() {
        window.open("https://twitter.com/intent/tweet?url=http://svejkgames.com/game/red-and-green/&text=I+made+" + score * 15 + "+points+on+Red+and+Green!+@SvejkGames", "_system");
    },
    update: function() {
        this.physics.arcade.overlap(traps, red, function(b, a) {
            if (a.name !== "red_v" && a.name !== "red_h" && a.name !== "red_block") {
                this.gameOver();
                emitter_red.x = red.body.x;
                emitter_red.y = red.body.y;
                emitter_red.start(true, 2200, null, 55);
            } else {
                hit.play();
                score++;
                score_text.setText("Points: " + score * 15);
                emitter_red.x = red.body.x;
                emitter_red.y = red.body.y;
                emitter_red.start(true, 1200, null, 25);
                a.kill();
            }
        }, null, this);
        this.physics.arcade.overlap(traps, green, function(b, a) {
            if (a.name !== "green_v" && a.name !== "green_h" && a.name !== "green_block") {
                this.gameOver();
                emitter_green.x = green.body.x;
                emitter_green.y = green.body.y;
                emitter_green.start(true, 2200, null, 55);
            } else {
                hit.play();
                score++;
                score_text.setText("Points: " + score * 15);
                emitter_green.x = green.body.x;
                emitter_green.y = green.body.y;
                emitter_green.start(true, 1200, null, 25);
                a.kill();
            }
        }, null, this);
        this.physics.arcade.overlap(traps, red, function(b, a) {
            if (a.name === "black_v" && a.name === "black_h" && a.name === "black_block") {
                this.gameOver();
                emitter_red.x = red.body.x;
                emitter_red.y = red.body.y;
                emitter_red.start(true, 2200, null, 55);
            }
        }, null, this);
        this.physics.arcade.overlap(traps, green, function(b, a) {
            if (a.name === "black_v" && a.name === "black_h" && a.name === "black_block") {
                this.gameOver();
                emitter_green.x = green.body.x;
                emitter_green.y = green.body.y;
                emitter_green.start(true, 2200, null, 55);
            }
        }, null, this);

        this.physics.arcade.collide(control_panel, ph);

        this.controls();
    },
    reset: function() {
        if (gOver === true) {
            tapCount++;
            if (tapCount > 1) {

                //### RESET ###\\

                gameOver_text.setText('');
                traps.forEachAlive(function(a) {
                    a.kill();
                }, this);
                points = 0;
                timer = 1.1;
                ph.body.x = this.world.width;
                ph.body.y = 326;
                red.body.x = ph.body.x;
                red.body.y = ph.body.y;
                green.body.x = ph.body.x;
                green.body.y = ph.body.y;
                ph.revive(1);
                red.revive(1);
                green.revive(1);
                red.scale.x = 1;
                red.scale.y = 1;
                green.scale.x = 1;
                green.scale.y = 1;
                bonus_text.visible = false;
                bonus_text.setText('2.5x speed!');
                cSpeed = 1;

                gOver = false;
                tapCount = 0;
            }
        }
    },
    gameOver: function() {
        go_sound.play();
        gOver = true;
        this.stage.backgroundColor = "#123";
        ph.kill();
        red.kill();
        green.kill();
        gameOver_text.setText("Game Over!\nYou made " + score * 15 + " points!\nDouble TAP to restart!")
    },
    controls: function() {
        switch (direction) {
            case "left":
                aLeft.alpha = 0.9;
                ph.body.velocity.setTo(-100, 0);
                break;
            case "right":
                aRight.alpha = 0.9;
                ph.body.velocity.setTo(100, 0);
                break;
            case "up":
                aUp.alpha = 0.9;
                ph.body.velocity.setTo(0, -100);
                break;
            case "down":
                aDown.alpha = 0.9;
                ph.body.velocity.setTo(0, 100);
                break;
            case "leftUp":
                aLU.alpha = 0.9;
                ph.body.velocity.setTo(-100, -100);
                break;
            case "rightUp":
                aRU.alpha = 0.9;
                ph.body.velocity.setTo(100, -100);
                break;
            case "leftDown":
                aLD.alpha = 0.9;
                ph.body.velocity.setTo(-100, 100);
                break;
            case "rightDown":
                aRD.alpha = 0.9;
                ph.body.velocity.setTo(100, 100);
                break;
            case "none":
                aDown.alpha = 0.5;
                aUp.alpha = 0.5;
                aRight.alpha = 0.5;
                aLeft.alpha = 0.5;
                aRD.alpha = 0.5;
                aLD.alpha = 0.5;
                aRU.alpha = 0.5;
                aLU.alpha = 0.5;
                ph.body.velocity.setTo(0, 0);
                break;
        }

        red.x = ph.body.x;
        red.y = ph.body.y;
        green.x = ph.body.x;
        green.y = ph.body.y;
    },
    createTraps: function() {
        points++;
        xRnd = this.rnd.integerInRange(25, 452 - 25);
        yRnd = this.rnd.integerInRange(25, 452 - 25);
        rnd = this.rnd.integerInRange(1, 23);
        switch (rnd) {
            case 1:
                this.upShoot(xRnd, 502, 'red_h');
                break;
            case 2:
                this.downShoot(xRnd, -50, 'red_h');
                break;
            case 3:
                this.leftShoot(this.world.width + 50, yRnd, 'red_v');
                break;
            case 4:
                this.rightShoot(-50, yRnd, 'red_v');
                break;
            case 5:
                this.upShoot(xRnd, 502, 'red_v');
                break;
            case 6:
                this.downShoot(xRnd, -50, 'red_v');
                break;
            case 7:
                this.leftShoot(this.world.width + 50, yRnd, 'red_h');
                break;
            case 8:
                this.rightShoot(-50, yRnd, 'red_h');
                break;
            case 9:
                this.upShoot(xRnd, 502, 'green_h');
                break;
            case 10:
                this.downShoot(xRnd, -50, 'green_h');
                break;
            case 11:
                this.leftShoot(this.world.width + 50, yRnd, 'green_v');
                break;
            case 12:
                this.rightShoot(-50, yRnd, 'green_v');
                break;
            case 13:
                this.upShoot(xRnd, 502, 'green_v');
                break;
            case 14:
                this.downShoot(xRnd, -50, 'green_v');
                break;
            case 15:
                this.leftShoot(this.world.width + 50, yRnd, 'green_h');
                break;
            case 16:
                this.rightShoot(-50, yRnd, 'green_h');
                break;
            case 17:
                this.leftShoot(this.world.width + 50, yRnd, 'green_block');
                break;
            case 18:
                this.rightShoot(-50, yRnd, 'red_block');
                break;
            case 19:
                this.upShoot(xRnd, 502, 'green_block');
                break;
            case 20:
                this.downShoot(xRnd, -50, 'red_block');
                break;
            case 21:
                this.rightShoot(-50, yRnd, 'black_block');
                break;
            case 22:
                this.upShoot(this.world.width + 50, yRnd, 'black_h');
                break;
            case 23:
                this.downShoot(xRnd, -50, 'black_v');
                break;
        }
        trap.health = 5;

        if (gOver === false) {
            if (points === 25) {
                lvlup.play();
                bonus_text.visible = true;
                cSpeed = 2.5;
            } else if (points === 35) {
                lvlup.play();
                bonus_text.setText("1/2 size!");
                cSpeed = 1;
                this.stage.backgroundColor = "#3B5323";
                red.scale.x = 0.5;
                red.scale.y = 0.5;
                green.scale.x = 0.5;
                green.scale.y = 0.5;
                timer = 1.0;
            } else if (points === 70) {
                lvlup.play();
                bonus_text.setText("4/5 size + 1.5x speed!");
                cSpeed = 1.5;
                this.stage.backgroundColor = "#CD5555";
                red.scale.x = 0.8;
                red.scale.y = 0.8;
                green.scale.x = 0.8;
                green.scale.y = 0.8;
                timer = 0.8;
            } else if (points === 130) {
                cSpeed = 1;
                lvlup.play();
                bonus_text.visible = false;
                this.stage.backgroundColor = "#FF6600";
                red.scale.x = 1;
                red.scale.y = 1;
                green.scale.x = 1;
                green.scale.y = 1;
                timer = 0.7;
            } else if (points === 250) {
                lvlup.play();
                bonus_text.visible = true;
                bonus_text.setText("2x speed!");
                this.stage.backgroundColor = "#222";
                cSpeed = 2;
                timer = 0.6;
            } else if (points === 320) {
                lvlup.play();
                bonus_text.visible = false;
                this.stage.backgroundColor = "#222";
                cSpeed = 1;
                timer = 0.5;
            }
        }

        this.time.events.add(Phaser.Timer.SECOND * timer, this.createTraps, this);
    },
    upShoot: function(x, y, type) { /* Shooting upwards */
        trap = traps.create(x, y, type);
        trap.name = type;
        trap.anchor.setTo(0.5);
        trap.body.velocity.y = -90;
    },
    downShoot: function(x, y, type) { /* Shooting downwards */
        trap = traps.create(x, y, type);
        trap.name = type;
        trap.anchor.setTo(0.5);
        trap.body.velocity.y = 90;
    },
    rightShoot: function(x, y, type) { /* Shooting rightwards */
        trap = traps.create(x, y, type);
        trap.name = type;
        trap.anchor.setTo(0.5);
        trap.body.velocity.x = 90;
    },
    leftShoot: function(x, y, type) { /* Shooting leftwards */
        trap = traps.create(x, y, type);
        trap.name = type;
        trap.anchor.setTo(0.5);
        trap.body.velocity.x = -90;
    },
    render: function() {

    }
};
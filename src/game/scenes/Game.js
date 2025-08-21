import {
  GAME_HEIGHT,
  GAME_OVER,
  GAME_START,
  GAME_WIDTH,
  hideShowControls,
  hideShowUI,
  LOAD_ASSETS,
  setPower,
  setScore,
} from '../const';

export class Game extends Phaser.Scene {
    constructor() {
        super(GAME_START);
    }

    init() {
        this.game = this;
        this.player = null;
        this.bars = null;
        this.power = 100;
        this.score = 0;
        this.gameOver = false;
        this.isPaused = false;
        hideShowControls(true);
        hideShowUI(true);
    }

    create() {
        // Create player
        this.player = this.add
            .sprite(GAME_WIDTH / 2, GAME_HEIGHT, LOAD_ASSETS.KEY.PLAYER)
            .setScale(0.12, 0.15);
        this.physics.add.existing(this.player);
        this.player.body.setCollideWorldBounds(true);

        // Create separate groups for power and score boxes
        this.powerBoxes = this.physics.add.group();
        this.scoreBoxes = this.physics.add.group();

        // Cursor keys
        this.cursors = this.input.keyboard.createCursorKeys();
        this.wasd = this.input.keyboard.addKeys("W,S,A,D");
        this.spaceKey = this.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.SPACE
        );

        // Spawn boxes periodically
        this.spawnTimer = this.time.addEvent({
            delay: 2500,
            callback: this.spawnBoxes,
            callbackScope: this,
            loop: true,
        });

        // Collision detection for both types of boxes
        this.physics.add.overlap(
            this.player,
            this.powerBoxes,
            this.collectPowerBox,
            null,
            this
        );
        this.physics.add.overlap(
            this.player,
            this.scoreBoxes,
            this.collectScoreBox,
            null,
            this
        );

        // Pause/Resume controls
        this.input.on("pointerdown", this.togglePause, this);
        this.spaceKey.on("down", this.togglePause, this);

        // Create pause text (initially hidden)
        this.pauseText = this.add
            .text(400, 300, "PAUSED", {
                fontSize: "48px",
                fill: "#ffffff",
                fontWeight: "bold",
            })
            .setOrigin(0.5)
            .setVisible(false);

        this.pauseInstructions = this.add
            .text(400, 360, "Click or Press SPACE to Resume", {
                fontSize: "20px",
                fill: "#3498db",
                fontWeight: "bold",
            })
            .setOrigin(0.5)
            .setVisible(false);
    }

    update() {
        if (this.gameOver || this.isPaused) return;

        // Player movement
        let speed = this.power <= 100 ? 300 : this.power;

        if (this.cursors.left.isDown || this.wasd.A.isDown) {
            this.player.body.setVelocityX(-speed);
        } else if (this.cursors.right.isDown || this.wasd.D.isDown) {
            this.player.body.setVelocityX(speed);
        } else {
            this.player.body.setVelocityX(0);
        }

        if (this.cursors.up.isDown || this.wasd.W.isDown) {
            this.player.body.setVelocityY(-speed);
        } else if (this.cursors.down.isDown || this.wasd.S.isDown) {
            this.player.body.setVelocityY(speed);
        } else {
            this.player.body.setVelocityY(0);
        }

        // Update text positions to follow boxes
        this.powerBoxes.children.entries.forEach((box) => {
            if (box.textObj) {
                box.textObj.x = box.x;
                box.textObj.y = box.y;
            }
            if (box.y > 650) {
                if (box.textObj) box.textObj.destroy();
                box.destroy();
            }
        });

        this.scoreBoxes.children.entries.forEach((box) => {
            if (box.textObj) {
                box.textObj.x = box.x;
                box.textObj.y = box.y;
            }
            if (box.y > 650) {
                if (box.textObj) box.textObj.destroy();
                box.destroy();
            }
        });

        // Check game over
        if (this.power <= 0) {
            this.scene.start(GAME_OVER, {
                score: this.score,
                ui: false,
                controls: false,
            });
            this.restartGame();
        }
    }

    spawnBoxes() {
        if (this.gameOver || this.isPaused) return;

        // Random positions, but ensure some separation
        const x1 = Phaser.Math.Between(80, 350);
        const x2 = Phaser.Math.Between(450, 720);

        // Randomly decide which side gets which type
        const leftIsPower = Phaser.Math.Between(0, 1) === 0;

        const powerX = leftIsPower ? x1 : x2;
        const scoreX = leftIsPower ? x2 : x1;

        // Create power box (purple)
        const powerBox = this.add.rectangle(powerX, -50, 60, 60, 0x9b59b6);
        this.physics.add.existing(powerBox);
        this.powerBoxes.add(powerBox);

        // Create score box (orange)
        const scoreBox = this.add.rectangle(scoreX, -50, 60, 60, 0xe67e22);
        this.physics.add.existing(scoreBox);
        this.scoreBoxes.add(scoreBox);

        // Generate power operation and value
        const powerOp = Phaser.Math.RND.pick(["x", "/"]);
        let powerValue;
        if (powerOp === "x") {
            powerValue = Phaser.Math.Between(2, 4);
        } else {
            powerValue = Phaser.Math.Between(2, 3);
        }
        powerBox.operation = powerOp;
        powerBox.value = powerValue;

        // Generate score operation and value
        const scoreOp = Phaser.Math.RND.pick(["+", "-"]);
        let scoreValue;
        if (scoreOp === "+") {
            scoreValue = Phaser.Math.Between(50, 150);
        } else {
            scoreValue = Phaser.Math.Between(20, 80);
        }
        scoreBox.operation = scoreOp;
        scoreBox.value = scoreValue;

        // Add text to boxes
        const powerText = this.add
            .text(powerX, -50, `${powerOp}${powerValue}`, {
                fontSize: "16px",
                fill: "#ffffff",
                fontWeight: "bold",
            })
            .setOrigin(0.5);

        const scoreText = this.add
            .text(scoreX, -50, `${scoreOp}${scoreValue}`, {
                fontSize: "16px",
                fill: "#ffffff",
                fontWeight: "bold",
            })
            .setOrigin(0.5);

        // Store text references for cleanup
        powerBox.textObj = powerText;
        scoreBox.textObj = scoreText;

        // Set velocities
        powerBox.body.setVelocityY(120);
        scoreBox.body.setVelocityY(120);
    }

    togglePause() {
        if (this.gameOver) return;

        this.isPaused = !this.isPaused;

        if (this.isPaused) {
            // Pause the game
            this.physics.pause();
            this.spawnTimer.paused = true;
            this.pauseText.setVisible(true);
            this.pauseInstructions.setVisible(true);
        } else {
            // Resume the game
            this.physics.resume();
            this.spawnTimer.paused = false;
            this.pauseText.setVisible(false);
            this.pauseInstructions.setVisible(false);
        }
    }

    collectPowerBox(player, powerBox) {
        // Apply power operation
        if (powerBox.operation === "x") {
            this.power *= powerBox.value;
        } else if (powerBox.operation === "/") {
            this.power = Math.floor(this.power / powerBox.value);
        }

        // Create power collection effect
        this.createPowerEffect(
            powerBox.x,
            powerBox.y,
            powerBox.operation,
            powerBox.value,
            this.power
        );

        // Update UI
        setPower(this.power);

        // Clean up
        if (powerBox.textObj) powerBox.textObj.destroy();
        powerBox.destroy();
    }

    collectScoreBox(player, scoreBox) {
        // Apply score operation
        if (scoreBox.operation === "+") {
            this.score += scoreBox.value;
        } else if (scoreBox.operation === "-") {
            this.score = Math.max(0, this.score - scoreBox.value);
        }

        // Create score collection effect
        this.createScoreEffect(
            scoreBox.x,
            scoreBox.y,
            scoreBox.operation,
            scoreBox.value,
            this.score
        );

        // Update UI
        setScore(this.score);

        // Clean up
        if (scoreBox.textObj) scoreBox.textObj.destroy();
        scoreBox.destroy();
    }

    createPowerEffect(x, y, operation, value, oldPower) {
        // Light effect for power (purple particles)
        const particles = this.add.particles(x, y, "particle", {
            speed: { min: 50, max: 150 },
            scale: { start: 0.5, end: 0 },
            lifespan: 600,
            quantity: 12,
            tint: 0x9b59b6,
            blendMode: "ADD",
        });

        // Remove particles after animation
        this.time.delayedCall(700, () => {
            particles.destroy();
        });

        // Popup message
        const changeText =
            operation === "x" ? `Power x${value}!` : `Power ÷${value}`;
        const resultText = `${oldPower} → ${this.power}`;

        const popup = this.add
            .text(x, y - 30, changeText, {
                fontSize: "20px",
                fill: "#9b59b6",
                fontWeight: "bold",
                stroke: "#ffffff",
                strokeThickness: 2,
            })
            .setOrigin(0.5);

        const result = this.add
            .text(x, y - 10, resultText, {
                fontSize: "14px",
                fill: "#ffffff",
                fontWeight: "bold",
            })
            .setOrigin(0.5);

        // Animate popup
        this.tweens.add({
            targets: [popup, result],
            y: y - 80,
            alpha: 0,
            duration: 800,
            ease: "Power2",
            onComplete: () => {
                popup.destroy();
                result.destroy();
            },
        });

        // Screen flash for power
        const flash = this.add.rectangle(400, 300, 800, 600, 0x9b59b6, 0.3);
        this.tweens.add({
            targets: flash,
            alpha: 0,
            duration: 200,
            onComplete: () => flash.destroy(),
        });
    }

    createScoreEffect(x, y, operation, value, oldScore) {
        // Light effect for score (orange particles)
        const particles = this.add.particles(x, y, "particle", {
            speed: { min: 50, max: 150 },
            scale: { start: 0.5, end: 0 },
            lifespan: 600,
            quantity: 12,
            tint: 0xe67e22,
            blendMode: "ADD",
        });

        // Remove particles after animation
        this.time.delayedCall(700, () => {
            particles.destroy();
        });

        // Popup message
        const changeText =
            operation === "+" ? `Score +${value}!` : `Score -${value}`;
        const resultText = `${oldScore} → ${this.score}`;

        const popup = this.add
            .text(x, y - 30, changeText, {
                fontSize: "20px",
                fill: "#e67e22",
                fontWeight: "bold",
                stroke: "#ffffff",
                strokeThickness: 2,
            })
            .setOrigin(0.5);

        const result = this.add
            .text(x, y - 10, resultText, {
                fontSize: "14px",
                fill: "#ffffff",
                fontWeight: "bold",
            })
            .setOrigin(0.5);

        // Animate popup
        this.tweens.add({
            targets: [popup, result],
            y: y - 80,
            alpha: 0,
            duration: 800,
            ease: "Power2",
            onComplete: () => {
                popup.destroy();
                result.destroy();
            },
        });

        // Screen flash for score
        const flash = this.add.rectangle(400, 300, 800, 600, 0xe67e22, 0.2);
        this.tweens.add({
            targets: flash,
            alpha: 0,
            duration: 200,
            onComplete: () => flash.destroy(),
        });
    }

    restartGame() {
        this.power = 100;
        this.score = 0;
        this.gameOver = false;
        this.isPaused = false;

        setPower(this.power);
        setScore(this.score);
    }
}

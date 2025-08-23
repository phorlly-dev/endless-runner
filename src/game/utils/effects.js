import {
  success_color,
  warning_color,
  white_color,
} from '../consts/colors';

const createPowerEffect = (scene, x, y, operation, value, oldPower) => {
    const particles = scene.add.particles(x, y, "particle", {
        speed: { min: 50, max: 150 },
        scale: { start: 0.5, end: 0 },
        lifespan: 600,
        quantity: 12,
        tint: 0x9b59b6,
        blendMode: "ADD",
    });

    scene.time.delayedCall(700, () => particles.destroy());

    const changeText = operation === "x" ? `Power x${value}!` : `Power ÷${value}`;
    const resultText = `${oldPower} → ${scene.power}`;

    popupText(scene, x, y, changeText, resultText, warning_color);
    flashScreen(scene, 0x9b59b6, 0.3);
}

const createScoreEffect = (scene, x, y, operation, value, oldScore) => {
    const particles = scene.add.particles(x, y, "particle", {
        speed: { min: 50, max: 150 },
        scale: { start: 0.5, end: 0 },
        lifespan: 600,
        quantity: 12,
        tint: 0xe67e22,
        blendMode: "ADD",
    });

    scene.time.delayedCall(700, () => particles.destroy());

    const changeText = operation === "+" ? `Score +${value}!` : `Score -${value}`;
    const resultText = `${oldScore} → ${scene.score}`;

    popupText(scene, x, y, changeText, resultText, success_color);
    flashScreen(scene, 0xe67e22, 0.2);
}

// Helpers
const popupText = (scene, x, y, changeText, resultText, color) => {
    const popup = scene.add.text(x, y - 30, changeText, {
        fontSize: "20px",
        fill: color,
        fontWeight: "bold",
        stroke: white_color,
        strokeThickness: 2,
    }).setOrigin(0.5);

    const result = scene.add.text(x, y - 10, resultText, {
        fontSize: "14px",
        fill: white_color,
        fontWeight: "bold",
    }).setOrigin(0.5);

    scene.tweens.add({
        targets: [popup, result],
        y: y - 80,
        alpha: 0,
        duration: 800,
        ease: "Power2",
        onComplete: () => { popup.destroy(); result.destroy(); },
    });
}

const flashScreen = (scene, color, alpha) => {
    const flash = scene.add.rectangle(400, 300, 800, 600, color, alpha);
    scene.tweens.add({
        targets: flash,
        alpha: 0,
        duration: 200,
        onComplete: () => flash.destroy(),
    });
}

export { createPowerEffect, createScoreEffect, flashScreen, popupText };
import confetti from "canvas-confetti";

export function fireConfetti() {
  const duration = 1500;
  const end = Date.now() + duration;
  (function frame() {
    confetti({
      angle: 60,
      spread: 55,
      startVelocity: 55,
      particleCount: 3,
      origin: { x: 0 },
    });
    confetti({
      angle: 120,
      spread: 55,
      startVelocity: 55,
      particleCount: 3,
      origin: { x: 1 },
    });
    if (Date.now() < end) requestAnimationFrame(frame);
  })();
}

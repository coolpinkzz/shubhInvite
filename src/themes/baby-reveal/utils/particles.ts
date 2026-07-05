export interface ParticleConfig {
  id: number;
  emoji: string;
  x: number;
  y: number;
  size: number;
  rotation: number;
  delay: number;
  duration: number;
  driftX: number;
  driftY: number;
}

function randomBetween(min: number, max: number) {
  return min + Math.random() * (max - min);
}

/** Generates celebration particle configs with randomized motion. */
export function createCelebrationParticles(
  emojis: readonly string[],
  count: number,
): ParticleConfig[] {
  return Array.from({ length: count }, (_, index) => ({
    id: index,
    emoji: emojis[index % emojis.length] ?? "✨",
    x: randomBetween(-45, 45),
    y: randomBetween(-20, 10),
    size: randomBetween(16, 32),
    rotation: randomBetween(-180, 180),
    delay: randomBetween(0, 0.4),
    duration: randomBetween(4, 6.5),
    driftX: randomBetween(-80, 80),
    driftY: randomBetween(120, 280),
  }));
}

export interface BalloonPiece {
  id: number;
  angle: number;
  distance: number;
  rotation: number;
  scale: number;
  color: string;
}

/** Generates balloon debris pieces for the pop animation. */
export function createBalloonPieces(count: number, color: string): BalloonPiece[] {
  return Array.from({ length: count }, (_, index) => ({
    id: index,
    angle: (360 / count) * index + randomBetween(-15, 15),
    distance: randomBetween(60, 140),
    rotation: randomBetween(-360, 360),
    scale: randomBetween(0.3, 0.7),
    color,
  }));
}

import type { CelebrationOrigin, FlowerKind, FlowerParticleState } from "./types";

const KIND_POOL: FlowerKind[] = [
  "rose",
  "rose",
  "marigold",
  "marigold",
  "jasmine",
  "jasmine",
  "leaf",
  "gold",
];

let particleId = 0;

function pickKind(): FlowerKind {
  return KIND_POOL[Math.floor(Math.random() * KIND_POOL.length)];
}

export function createBurstParticle(
  origin: CelebrationOrigin,
  groundY: number,
): FlowerParticleState {
  const angle = -Math.PI / 2 + (Math.random() - 0.5) * 1.2;
  const speed = 4 + Math.random() * 6;

  return {
    id: particleId++,
    kind: pickKind(),
    x: origin.x + (Math.random() - 0.5) * 40,
    y: origin.y,
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed,
    size: 6 + Math.random() * 10,
    rotation: Math.random() * 360,
    rotationSpeed: (Math.random() - 0.5) * 8,
    opacity: 0.85 + Math.random() * 0.15,
    birth: performance.now(),
    life: 4500 + Math.random() * 1500,
    windPhase: Math.random() * Math.PI * 2,
    bounced: false,
    groundY,
  };
}

export function createShowerParticle(
  screenWidth: number,
  groundY: number,
): FlowerParticleState {
  return {
    id: particleId++,
    kind: pickKind(),
    x: Math.random() * screenWidth,
    y: -20 - Math.random() * 60,
    vx: (Math.random() - 0.5) * 1.5,
    vy: 1.5 + Math.random() * 2.5,
    size: 5 + Math.random() * 12,
    rotation: Math.random() * 360,
    rotationSpeed: (Math.random() - 0.5) * 6,
    opacity: 0.75 + Math.random() * 0.25,
    birth: performance.now(),
    life: 4000 + Math.random() * 2000,
    windPhase: Math.random() * Math.PI * 2,
    bounced: false,
    groundY,
  };
}

export function updateFlowerParticle(
  particle: FlowerParticleState,
  delta: number,
  now: number,
  windStrength: number,
): boolean {
  const age = now - particle.birth;
  if (age > particle.life) return false;

  const wind = Math.sin(now / 400 + particle.windPhase) * windStrength;
  particle.vx += wind * delta * 0.02;
  particle.vy += 0.18 * delta;
  particle.x += particle.vx * delta * 0.06;
  particle.y += particle.vy * delta * 0.06;
  particle.rotation += particle.rotationSpeed * delta * 0.06;

  if (particle.y >= particle.groundY && !particle.bounced) {
    particle.y = particle.groundY;
    particle.vy *= -0.35;
    particle.vx *= 0.75;
    particle.bounced = true;
  }

  const fadeStart = particle.life * 0.65;
  if (age > fadeStart) {
    particle.opacity = Math.max(
      0,
      (1 - (age - fadeStart) / (particle.life - fadeStart)) * 0.9,
    );
  }

  return particle.opacity > 0.02;
}

export function drawFlowerParticle(
  ctx: CanvasRenderingContext2D,
  particle: FlowerParticleState,
) {
  ctx.save();
  ctx.translate(particle.x, particle.y);
  ctx.rotate((particle.rotation * Math.PI) / 180);
  ctx.globalAlpha = particle.opacity;

  switch (particle.kind) {
    case "rose":
      drawPetal(ctx, particle.size, "#C45C6A", "#E8A0A8");
      break;
    case "marigold":
      drawPetal(ctx, particle.size, "#E8A317", "#F5D76E");
      break;
    case "jasmine":
      drawJasmine(ctx, particle.size);
      break;
    case "leaf":
      drawLeaf(ctx, particle.size);
      break;
    case "gold":
      drawGoldSpark(ctx, particle.size);
      break;
  }

  ctx.restore();
}

function drawPetal(
  ctx: CanvasRenderingContext2D,
  size: number,
  fill: string,
  highlight: string,
) {
  const w = size * 0.9;
  const h = size * 1.2;
  ctx.beginPath();
  ctx.ellipse(0, 0, w * 0.45, h * 0.5, 0, 0, Math.PI * 2);
  ctx.fillStyle = fill;
  ctx.fill();
  ctx.beginPath();
  ctx.ellipse(-w * 0.1, -h * 0.1, w * 0.15, h * 0.2, -0.3, 0, Math.PI * 2);
  ctx.fillStyle = highlight;
  ctx.globalAlpha *= 0.5;
  ctx.fill();
}

function drawJasmine(ctx: CanvasRenderingContext2D, size: number) {
  for (let i = 0; i < 5; i++) {
    const angle = (i * Math.PI * 2) / 5;
    ctx.beginPath();
    ctx.ellipse(
      Math.cos(angle) * size * 0.25,
      Math.sin(angle) * size * 0.25,
      size * 0.22,
      size * 0.15,
      angle,
      0,
      Math.PI * 2,
    );
    ctx.fillStyle = "#FFFEF8";
    ctx.fill();
  }
  ctx.beginPath();
  ctx.arc(0, 0, size * 0.12, 0, Math.PI * 2);
  ctx.fillStyle = "#F5F0E6";
  ctx.fill();
}

function drawLeaf(ctx: CanvasRenderingContext2D, size: number) {
  ctx.beginPath();
  ctx.ellipse(0, 0, size * 0.35, size * 0.7, 0.4, 0, Math.PI * 2);
  ctx.fillStyle = "#4A7C59";
  ctx.fill();
  ctx.strokeStyle = "#3D6B4A";
  ctx.lineWidth = 0.5;
  ctx.stroke();
}

function drawGoldSpark(ctx: CanvasRenderingContext2D, size: number) {
  ctx.beginPath();
  ctx.arc(0, 0, size * 0.2, 0, Math.PI * 2);
  ctx.fillStyle = "#D4AF37";
  ctx.fill();
  ctx.shadowColor = "#F0E6C8";
  ctx.shadowBlur = size * 0.4;
}

export type FlowerKind = "rose" | "marigold" | "jasmine" | "leaf" | "gold";

export interface FlowerParticleState {
  id: number;
  kind: FlowerKind;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
  birth: number;
  life: number;
  windPhase: number;
  bounced: boolean;
  groundY: number;
}

export interface CelebrationOrigin {
  x: number;
  y: number;
}

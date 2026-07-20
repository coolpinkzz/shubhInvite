"use client";

import { AmbientLottieFlorals } from "./AmbientLottieFlorals";
import { BackdropLayers } from "./BackdropLayers";
import { FloatingPetals } from "./FloatingPetals";
import { SoftLights } from "./SoftLights";

/** Layered atmospheric decorations behind hero content. */
export function HeroAtmosphere() {
  return (
    <>
      <BackdropLayers />
      <SoftLights />
      <AmbientLottieFlorals />
      <FloatingPetals />
    </>
  );
}

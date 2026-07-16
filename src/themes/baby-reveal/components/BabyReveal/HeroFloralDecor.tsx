"use client";

import { motion } from "framer-motion";

import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/themes/baby-reveal/hooks/useReducedMotion";
import { babyRevealDesignTokens } from "@/themes/baby-reveal/tokens";

const { colors } = babyRevealDesignTokens;

interface HeroFloralDecorProps {
  className?: string;
}

function FivePetalFlower({
  size,
  petalColor,
  centerColor,
  opacity = 1,
}: {
  size: number;
  petalColor: string;
  centerColor: string;
  opacity?: number;
}) {
  const petals = [0, 72, 144, 216, 288];

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
      style={{ opacity }}
    >
      {petals.map((rotation) => (
        <ellipse
          key={rotation}
          cx="16"
          cy="9"
          rx="5.5"
          ry="9"
          fill={petalColor}
          transform={`rotate(${rotation} 16 16)`}
        />
      ))}
      <circle cx="16" cy="16" r="4.5" fill={centerColor} />
      <circle cx="14.5" cy="14.5" r="1.2" fill="#FFFFFF" opacity={0.45} />
    </svg>
  );
}

function LotusBloom({
  size,
  strokeColor,
  fillColor,
  opacity = 1,
}: {
  size: number;
  strokeColor: string;
  fillColor: string;
  opacity?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      aria-hidden="true"
      style={{ opacity }}
    >
      <path
        d="M20 34c-6-4.5-10-10-10-15.5 0-4 2.5-6.5 5.5-6.5 2 0 3.5 1.2 4.5 3 1-1.8 2.5-3 4.5-3 3 0 5.5 2.5 5.5 6.5 0 5.5-4 11-9.5 15.5z"
        fill={fillColor}
        opacity={0.55}
      />
      <path
        d="M20 30c-4-3-7-6.5-7-11 0-2.5 1.8-4.5 4-4.5 1.4 0 2.5.8 3 2 .5-1.2 1.6-2 3-2 2.2 0 4 2 4 4.5 0 4.5-3 8-7 11z"
        stroke={strokeColor}
        strokeWidth="1.2"
        fill="none"
        opacity={0.75}
      />
      <path
        d="M20 8c-1.5 2-2.5 4.5-2.5 7"
        stroke={strokeColor}
        strokeWidth="1"
        opacity={0.5}
      />
      <ellipse cx="20" cy="8" rx="3" ry="5" fill={fillColor} opacity={0.35} />
    </svg>
  );
}

function LeafSprig({
  size,
  color,
  flip = false,
  opacity = 1,
  className,
}: {
  size: number;
  color: string;
  flip?: boolean;
  opacity?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size * 1.4}
      viewBox="0 0 28 40"
      fill="none"
      aria-hidden="true"
      className={className}
      style={{
        opacity,
        transform: flip ? "scaleX(-1)" : undefined,
      }}
    >
      <path
        d="M14 38 C8 30 4 22 6 14 C8 6 14 2 14 2 C14 2 20 6 22 14 C24 22 20 30 14 38Z"
        fill={color}
        opacity={0.5}
      />
      <path
        d="M14 36 V6"
        stroke={color}
        strokeWidth="1.2"
        opacity={0.65}
      />
      <path
        d="M14 14 C10 16 8 20 8 24"
        stroke={color}
        strokeWidth="0.8"
        opacity={0.45}
      />
      <path
        d="M14 18 C18 20 20 24 20 28"
        stroke={color}
        strokeWidth="0.8"
        opacity={0.45}
      />
    </svg>
  );
}

function FlowerCluster({
  className,
  scale = 1,
  delay = 0,
}: {
  className?: string;
  scale?: number;
  delay?: number;
}) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      className={cn("absolute", className)}
      style={{ transform: `scale(${scale})` }}
      animate={
        reducedMotion
          ? undefined
          : {
              y: [0, -6, 0],
              rotate: [-2, 2, -2],
            }
      }
      transition={{
        duration: 5.5,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
    >
      <FivePetalFlower
        size={44}
        petalColor={colors.pastel.blueLight}
        centerColor={colors.pastel.blueDeep}
        opacity={0.85}
      />
      <div className="absolute -right-3 -top-2">
        <FivePetalFlower
          size={28}
          petalColor={colors.pastel.blueSoft}
          centerColor={colors.pastel.blue}
          opacity={0.7}
        />
      </div>
      <div className="absolute -bottom-1 -left-4">
        <LeafSprig size={22} color={colors.neutral.sageGreen} opacity={0.6} />
      </div>
      <div className="absolute -right-5 top-6">
        <LotusBloom
          size={32}
          strokeColor={colors.pastel.blueDeep}
          fillColor={colors.pastel.blueLight}
          opacity={0.65}
        />
      </div>
    </motion.div>
  );
}

function TopGarland({ className }: { className?: string }) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      className={cn("pointer-events-none absolute inset-x-0 top-0", className)}
      aria-hidden="true"
      animate={reducedMotion ? undefined : { y: [0, -3, 0] }}
      transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
    >
      <svg
        viewBox="0 0 400 60"
        className="mx-auto h-14 w-full max-w-lg opacity-70"
        preserveAspectRatio="xMidYMid meet"
      >
        <path
          d="M20 30 Q100 55 200 30 T380 30"
          stroke={colors.pastel.blueDeep}
          strokeWidth="1"
          fill="none"
          opacity={0.35}
        />
        {[40, 80, 120, 160, 200, 240, 280, 320, 360].map((x, index) => (
          <g key={x} transform={`translate(${x}, ${28 + (index % 2) * 4})`}>
            <circle
              r={index % 3 === 0 ? 5 : 3.5}
              fill={
                index % 2 === 0
                  ? colors.pastel.blueLight
                  : colors.pastel.blueSoft
              }
              opacity={0.7}
            />
            {index % 3 === 0 ? (
              <>
                <ellipse
                  cx="-6"
                  cy="0"
                  rx="4"
                  ry="7"
                  fill={colors.pastel.blueLight}
                  opacity={0.55}
                  transform="rotate(-35)"
                />
                <ellipse
                  cx="6"
                  cy="0"
                  rx="4"
                  ry="7"
                  fill={colors.pastel.blueLight}
                  opacity={0.55}
                  transform="rotate(35)"
                />
                <ellipse
                  cx="0"
                  cy="-7"
                  rx="4"
                  ry="7"
                  fill={colors.pastel.blueSoft}
                  opacity={0.5}
                />
              </>
            ) : null}
          </g>
        ))}
      </svg>
    </motion.div>
  );
}

function BottomFloralBorder({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-x-0 bottom-0 flex justify-center",
        className,
      )}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 420 50"
        className="h-12 w-full max-w-xl opacity-60"
        preserveAspectRatio="xMidYMid meet"
      >
        <path
          d="M10 25 Q105 8 210 25 T410 25"
          stroke={colors.pastel.blue}
          strokeWidth="1.2"
          fill="none"
          opacity={0.4}
        />
        {[30, 70, 110, 150, 190, 230, 270, 310, 350, 390].map((x) => (
          <circle
            key={x}
            cx={x}
            cy={24}
            r="3"
            fill={colors.pastel.blueLight}
            opacity={0.65}
          />
        ))}
        {[50, 130, 210, 290, 370].map((x) => (
          <g key={x} transform={`translate(${x}, 20)`}>
            <ellipse
              cx="0"
              cy="-5"
              rx="5"
              ry="8"
              fill={colors.pastel.blueSoft}
              opacity={0.55}
            />
            <ellipse
              cx="-5"
              cy="0"
              rx="5"
              ry="8"
              fill={colors.pastel.blueLight}
              opacity={0.5}
              transform="rotate(-72)"
            />
            <ellipse
              cx="5"
              cy="0"
              rx="5"
              ry="8"
              fill={colors.pastel.blueLight}
              opacity={0.5}
              transform="rotate(72)"
            />
            <circle r="3" fill={colors.pastel.blueDeep} opacity={0.6} />
          </g>
        ))}
      </svg>
    </div>
  );
}

const SCATTERED_FLOWERS = [
  { top: "12%", left: "14%", size: 22, delay: 0.2, type: "flower" as const },
  { top: "20%", right: "11%", size: 18, delay: 0.8, type: "lotus" as const },
  { top: "32%", left: "8%", size: 16, delay: 1.1, type: "flower" as const },
  { top: "40%", right: "7%", size: 20, delay: 0.5, type: "lotus" as const },
  { top: "55%", left: "6%", size: 14, delay: 1.4, type: "flower" as const },
  { top: "62%", right: "9%", size: 24, delay: 0.3, type: "flower" as const },
  { bottom: "22%", left: "10%", size: 18, delay: 0.9, type: "lotus" as const },
  { bottom: "16%", right: "12%", size: 16, delay: 1.6, type: "flower" as const },
  { bottom: "30%", left: "15%", size: 20, delay: 0.6, type: "flower" as const },
  { bottom: "10%", right: "18%", size: 14, delay: 1.2, type: "lotus" as const },
] as const;

export function HeroFloralDecor({ className }: HeroFloralDecorProps) {
  const reducedMotion = useReducedMotion();

  return (
    <div className={cn("pointer-events-none absolute inset-0", className)} aria-hidden="true">
      <TopGarland />
      <BottomFloralBorder />

      <FlowerCluster
        className="left-[-2%] top-[4%] sm:left-[1%]"
        scale={1.1}
        delay={0}
      />
      <FlowerCluster
        className="right-[-4%] top-[2%] sm:right-[0%]"
        scale={0.95}
        delay={0.6}
      />
      <FlowerCluster
        className="bottom-[6%] left-[-3%] sm:left-[0%]"
        scale={1}
        delay={1.2}
      />
      <FlowerCluster
        className="bottom-[4%] right-[-2%] sm:right-[1%]"
        scale={1.05}
        delay={0.4}
      />

      <LeafSprig
        size={36}
        color={colors.neutral.sageGreen}
        className="absolute left-[2%] top-[38%] opacity-50"
        opacity={0.55}
      />
      <LeafSprig
        size={32}
        color={colors.neutral.sageGreen}
        flip
        className="absolute right-[1%] top-[48%] opacity-50"
        opacity={0.5}
      />
      <LeafSprig
        size={28}
        color={colors.pastel.blueDeep}
        className="absolute bottom-[28%] left-[3%] opacity-40"
        opacity={0.45}
      />
      <LeafSprig
        size={30}
        color={colors.pastel.blueDeep}
        flip
        className="absolute bottom-[32%] right-[2%] opacity-40"
        opacity={0.45}
      />

      {SCATTERED_FLOWERS.map((flower, index) => (
        <motion.div
          key={index}
          className="absolute"
          style={{
            top: "top" in flower ? flower.top : undefined,
            bottom: "bottom" in flower ? flower.bottom : undefined,
            left: "left" in flower ? flower.left : undefined,
            right: "right" in flower ? flower.right : undefined,
          }}
          animate={
            reducedMotion
              ? undefined
              : {
                  y: [0, -8, 0],
                  opacity: [0.45, 0.75, 0.45],
                  rotate: [0, 6, 0],
                }
          }
          transition={{
            duration: 4 + index * 0.3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: flower.delay,
          }}
        >
          {flower.type === "flower" ? (
            <FivePetalFlower
              size={flower.size}
              petalColor={colors.pastel.blueLight}
              centerColor={colors.pastel.blueDeep}
              opacity={0.7}
            />
          ) : (
            <LotusBloom
              size={flower.size + 6}
              strokeColor={colors.pastel.blueDeep}
              fillColor={colors.pastel.blueSoft}
              opacity={0.65}
            />
          )}
        </motion.div>
      ))}
    </div>
  );
}

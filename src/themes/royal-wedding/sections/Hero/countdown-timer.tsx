"use client";

import { useEffect, useState } from "react";

interface CountdownTimerProps {
  targetDate: string;
}

interface TimeLeft {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
}

function getTimeLeft(target: number): TimeLeft {
  const diff = target - Date.now();
  if (diff < 0) {
    return { days: "00", hours: "00", minutes: "00", seconds: "00" };
  }

  const pad = (n: number) => n.toString().padStart(2, "0");

  return {
    days: pad(Math.floor(diff / (1000 * 60 * 60 * 24))),
    hours: pad(Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))),
    minutes: pad(Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))),
    seconds: pad(Math.floor((diff % (1000 * 60)) / 1000)),
  };
}

const units = [
  { key: "days" as const, label: "Days" },
  { key: "hours" as const, label: "Hours" },
  { key: "minutes" as const, label: "Mins" },
  { key: "seconds" as const, label: "Secs" },
];

export function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const target = new Date(targetDate).getTime();
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() =>
    getTimeLeft(target),
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft(target));
    }, 1000);
    return () => clearInterval(interval);
  }, [target]);

  return (
    <div className="mx-auto mb-10 grid max-w-xs grid-cols-4 gap-2 animate-fade-in">
      {units.map(({ key, label }) => (
        <div
          key={key}
          className="flex flex-col items-center rounded-lg border border-theme-outline-variant/30 bg-theme-surface-low p-2"
        >
          <span
            className="font-theme-headline text-2xl text-theme-primary-container"
            style={{ fontWeight: 600 }}
          >
            {timeLeft[key]}
          </span>
          <span
            className="font-theme-label text-[10px] uppercase tracking-tighter text-muted"
            style={{ fontWeight: 600, letterSpacing: "0.05em" }}
          >
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadLinksPreset } from "@tsparticles/preset-links"; // لود کردن پریست links
import type { Container, ISourceOptions, Engine } from "@tsparticles/engine";

export function AuthParticles() {
  const [init, setInit] = useState(false);
  useEffect(() => {
    initParticlesEngine(async (engine: Engine) => {
      await loadLinksPreset(engine);
    }).then(() => { setInit(true); });
  }, []);

  const options: ISourceOptions = {
    preset: "links",
    fullScreen: { enable: true, zIndex: 0 }, // zIndex 0 تا فرم روی آن بیاید
    background: { color: { value: "#0f172a" } }, // رنگ پس‌زمینه تیره (Slate-950)
    particles: {
      color: { value: "#94a3b8" }, // رنگ نقاط (Slate-400)
      links: { color: "#94a3b8", opacity: 0.4 }, // رنگ خطوط
      number: { value: 80 },
      opacity: { value: 0.5 },
      size: { value: { min: 1, max: 3 } },
    },
  };

  if (!init) return null;

  return <Particles id="auth-particles" options={options} className="absolute inset-0" />;
}
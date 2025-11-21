"use client";

import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
// استفاده از loadFull از پکیج اصلی برای اطمینان از لود شدن تمام فیچرها
import { loadFull } from "tsparticles";
import type { Container, ISourceOptions, Engine } from "@tsparticles/engine";

export function ParticlesBackground() {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine: Engine) => {
      // لود کردن تمام پلاگین‌ها برای جلوگیری از مشکل عدم نمایش خطوط
      await loadFull(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = async (container?: Container): Promise<void> => {
    // console.log(container);
  };

  const options: ISourceOptions = {
    fullScreen: {
      enable: true,
      zIndex: -1,
    },
    background: {
      color: {
        value: "transparent",
      },
    },
    fpsLimit: 120,
    interactivity: {
      events: {
        onClick: {
          enable: true,
          mode: "push",
        },
        onHover: {
          enable: true,
          mode: "grab", // حالت گرفتن: خطوط به موس وصل می‌شوند
        },
      },
      modes: {
        push: {
          quantity: 4,
        },
        grab: {
          distance: 200,
          links: {
            opacity: 1, // شفافیت کامل هنگام اتصال به موس
            color: "#64748b", // رنگ اتصال به موس
          },
        },
      },
    },
    particles: {
      // رنگ نقاط
      color: {
        value: "#94a3b8", 
      },
      // ✅ تنظیمات حیاتی برای نمایش مثلث‌ها
      links: {
        color: "#94a3b8", // رنگ خطوط (Slate-500)
        distance: 150, // فاصله اتصال
        enable: true, // حتما true باشد
        opacity: 0.5, // شفافیت خطوط را زیاد کردم تا دیده شوند
        width: 1, // ضخامت خط
      },
      collisions: {
        enable: true,
      },
      move: {
        direction: "none",
        enable: true,
        outModes: {
          default: "bounce",
        },
        random: false,
        speed: 2,
        straight: false,
      },
      number: {
        density: {
          enable: true,
          // تنظیم دستی مساحت برای تراکم مناسب
          width: 800, 
          height: 800,
        },
        value: 80,
      },
      opacity: {
        value: 0.3,
      },
      shape: {
        type: "circle",
      },
      size: {
        value: { min: 1, max: 3 },
      },
    },
    detectRetina: true,
  };

  if (!init) {
    return null;
  }

  return (
    <Particles
      id="tsparticles"
      particlesLoaded={particlesLoaded}
      options={options}
      className="absolute inset-0 -z-10"
    />
  );
}
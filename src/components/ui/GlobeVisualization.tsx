"use client";

import React, { useEffect, useRef } from "react";

export const GlobeVisualization: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let rotation = 0;

    // Set canvas dimensions
    const width = 640;
    const height = 520;
    canvas.width = width;
    canvas.height = height;

    const centerX = width / 2;
    const centerY = height / 2 + 20;
    const radius = 180;

    // Hub cities around the world
    const hubs = [
      { lat: 37.77, lon: -122.42, city: "San Francisco", label: "MediFlow", color: "#aeff00" },
      { lat: 51.5, lon: -0.12, city: "London", label: "Aura Capital", color: "#aeff00" },
      { lat: 52.52, lon: 13.4, city: "Berlin", label: "CloudSync", color: "#aeff00" },
      { lat: 1.35, lon: 103.82, city: "Singapore", label: "ScaleAsia", color: "#aeff00" },
      { lat: 35.67, lon: 139.65, city: "Tokyo", label: "Nova AI", color: "#aeff00" },
      { lat: -33.86, lon: 151.2, city: "Sydney", label: "AussieFlow", color: "#aeff00" },
    ];

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Globe ambient glow behind
      const ambientGlow = ctx.createRadialGradient(
        centerX,
        centerY,
        radius * 0.8,
        centerX,
        centerY,
        radius * 1.35
      );
      ambientGlow.addColorStop(0, "rgba(20, 45, 25, 0.45)");
      ambientGlow.addColorStop(0.6, "rgba(174, 255, 0, 0.08)");
      ambientGlow.addColorStop(1, "rgba(16, 22, 18, 0)");

      ctx.fillStyle = ambientGlow;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius * 1.35, 0, Math.PI * 2);
      ctx.fill();

      // Globe base sphere
      const sphereGradient = ctx.createRadialGradient(
        centerX - radius * 0.35,
        centerY - radius * 0.35,
        radius * 0.1,
        centerX,
        centerY,
        radius
      );
      sphereGradient.addColorStop(0, "#193520");
      sphereGradient.addColorStop(0.5, "#102315");
      sphereGradient.addColorStop(0.9, "#0d1810");
      sphereGradient.addColorStop(1, "#070d09");

      ctx.fillStyle = sphereGradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.fill();

      // Globe outer ring border
      ctx.strokeStyle = "rgba(174, 255, 0, 0.35)";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.stroke();

      // Atmosphere rim light
      const rimGrad = ctx.createRadialGradient(
        centerX,
        centerY,
        radius * 0.95,
        centerX,
        centerY,
        radius * 1.05
      );
      rimGrad.addColorStop(0, "rgba(174, 255, 0, 0.25)");
      rimGrad.addColorStop(1, "transparent");
      ctx.fillStyle = rimGrad;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius * 1.05, 0, Math.PI * 2);
      ctx.fill();

      // Draw latitude grid rings
      ctx.save();
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.clip();

      const latitudes = [-60, -40, -20, 0, 20, 40, 60];
      latitudes.forEach((lat) => {
        const yOffset = Math.sin((lat * Math.PI) / 180) * radius;
        const ringRadius = Math.cos((lat * Math.PI) / 180) * radius;
        ctx.strokeStyle = "rgba(255, 255, 255, 0.05)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.ellipse(centerX, centerY + yOffset, ringRadius, ringRadius * 0.25, 0, 0, Math.PI * 2);
        ctx.stroke();
      });

      // Longitude meridians with rotation
      for (let i = 0; i < 12; i++) {
        const angle = (i * 30 + rotation) % 360;
        const rad = (angle * Math.PI) / 180;
        const xOffset = Math.sin(rad) * radius;
        const isFacing = Math.cos(rad) > 0;

        if (isFacing) {
          ctx.strokeStyle = "rgba(174, 255, 0, 0.08)";
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.ellipse(centerX + xOffset * 0.3, centerY, Math.abs(xOffset), radius, 0, 0, Math.PI * 2);
          ctx.stroke();
        }
      }

      // Convert Lat/Lon to 3D projected point with rotation
      const projectedPoints: { x: number; y: number; visible: boolean; label: string; city: string }[] = [];

      hubs.forEach((hub) => {
        const radLat = (hub.lat * Math.PI) / 180;
        const radLon = ((hub.lon + rotation) * Math.PI) / 180;

        // 3D coordinates on sphere
        const x3d = Math.cos(radLat) * Math.sin(radLon);
        const y3d = -Math.sin(radLat);
        const z3d = Math.cos(radLat) * Math.cos(radLon);

        const visible = z3d > -0.2; // Point is facing forward
        const x2d = centerX + x3d * radius;
        const y2d = centerY + y3d * radius;

        projectedPoints.push({ x: x2d, y: y2d, visible, label: hub.label, city: hub.city });
      });

      // Draw Arcs between hubs
      for (let i = 0; i < projectedPoints.length; i++) {
        const next = (i + 1) % projectedPoints.length;
        const p1 = projectedPoints[i];
        const p2 = projectedPoints[next];

        if (p1.visible && p2.visible) {
          // Calculate midpoint arched outward
          const midX = (p1.x + p2.x) / 2;
          const midY = (p1.y + p2.y) / 2 - 35;

          ctx.strokeStyle = "rgba(174, 255, 0, 0.4)";
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.quadraticCurveTo(midX, midY, p2.x, p2.y);
          ctx.stroke();

          // Animated packet on the arc
          const t = (Date.now() / 2400 + i * 0.25) % 1;
          const packetX = (1 - t) * (1 - t) * p1.x + 2 * (1 - t) * t * midX + t * t * p2.x;
          const packetY = (1 - t) * (1 - t) * p1.y + 2 * (1 - t) * t * midY + t * t * p2.y;

          ctx.fillStyle = "#aeff00";
          ctx.shadowColor = "#aeff00";
          ctx.shadowBlur = 8;
          ctx.beginPath();
          ctx.arc(packetX, packetY, 2.5, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      }

      // Draw City Nodes & Tooltips
      projectedPoints.forEach((pt) => {
        if (!pt.visible) return;

        // Outer pulse circle
        ctx.strokeStyle = "rgba(174, 255, 0, 0.4)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, 7, 0, Math.PI * 2);
        ctx.stroke();

        // Core bright dot
        ctx.fillStyle = "#aeff00";
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, 3, 0, Math.PI * 2);
        ctx.fill();

        // City & Client Label tag
        ctx.fillStyle = "rgba(16, 22, 18, 0.85)";
        ctx.strokeStyle = "rgba(174, 255, 0, 0.3)";
        ctx.lineWidth = 1;

        const text = `${pt.city} • ${pt.label}`;
        ctx.font = "10px monospace";
        const textWidth = ctx.measureText(text).width;
        const boxX = pt.x + 10;
        const boxY = pt.y - 12;

        ctx.fillRect(boxX - 4, boxY - 10, textWidth + 8, 16);
        ctx.strokeRect(boxX - 4, boxY - 10, textWidth + 8, 16);

        ctx.fillStyle = "#fdfcf8";
        ctx.fillText(text, boxX, boxY + 2);
      });

      ctx.restore();

      rotation += 0.25;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="relative w-full flex items-center justify-center overflow-hidden min-h-[440px] sm:min-h-[500px]">
      <canvas
        ref={canvasRef}
        className="max-w-full h-auto drop-shadow-[0_0_60px_rgba(174,255,0,0.15)]"
      />
    </div>
  );
};

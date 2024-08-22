import { safeZoneConfig, wallConfig } from "./config";
import { drawEngine } from "./draw-engine";
import { Building } from "./types";

export function drawSun(ctx: CanvasRenderingContext2D) {
  const sunRadius = 26;
  const sunX = drawEngine.canvasWidth / 2;
  const sunY = sunRadius + 10;

  ctx.globalAlpha = 0.6;
  ctx.beginPath();
  ctx.arc(sunX, sunY, sunRadius, 0, 2 * Math.PI);
  ctx.fillStyle = "#d8d1b7";
  ctx.fill();
  ctx.closePath();
  ctx.globalAlpha = 1;
}

export function drawClouds(ctx: CanvasRenderingContext2D) {
  drawCloud(ctx, 50, 50, 0.14);
  drawCloud(ctx, 750, 50, 0.24);
}

export function drawCloud(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  opacity: number
) {
  ctx.globalAlpha = opacity;
  ctx.beginPath();
  ctx.arc(x, y, 20, Math.PI * 0.5, Math.PI * 1.5);
  ctx.arc(x + 30, y - 20, 30, Math.PI * 1, Math.PI * 1.85);
  ctx.arc(x + 70, y - 20, 40, Math.PI * 1.37, Math.PI * 1.91);
  ctx.arc(x + 100, y, 30, Math.PI * 1.5, Math.PI * 0.5);
  ctx.closePath();
  ctx.fillStyle = "#FFFFFF";
  ctx.fill();
  ctx.strokeStyle = "#D3D3D3";
  ctx.stroke();
  ctx.globalAlpha = 1;
}

export function drawBoard(ctx: CanvasRenderingContext2D) {
  const gradient = ctx.createLinearGradient(0, 0, 0, drawEngine.canvasHeight);

  gradient.addColorStop(0, "#1f313f");
  gradient.addColorStop(0.05, "#385a64");
  gradient.addColorStop(0.1, "#618384");
  gradient.addColorStop(0.15, "#cfd3c2");
  gradient.addColorStop(0.23, "#6b8a8d");
  gradient.addColorStop(0.24, "#2a4240");
  gradient.addColorStop(1, "#131515");

  ctx.fillStyle = gradient;
  ctx.fillRect(
    0,
    wallConfig.y,
    drawEngine.canvasWidth,
    drawEngine.canvasHeight
  );
}

export function drawBackground(ctx: CanvasRenderingContext2D) {
  const gradient = ctx.createLinearGradient(0, 0, 0, drawEngine.canvasHeight);

  gradient.addColorStop(0, "#1f313f");
  gradient.addColorStop(0.05, "#385a64");
  gradient.addColorStop(0.1, "#618384");
  gradient.addColorStop(0.15, "#cfd3c2");
  gradient.addColorStop(0.23, "#6b8a8d");
  gradient.addColorStop(0.24, "#2a4240");
  gradient.addColorStop(1, "#131515");

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, drawEngine.canvasWidth, drawEngine.canvasHeight);
}

export function drawRoad(ctx: CanvasRenderingContext2D) {
  const yStart = wallConfig.y;
  const yEnd = drawEngine.canvasHeight - safeZoneConfig.y;
  const roadWidthBottom = 50;
  const roadWidthTop = 800;
  const canvasWidth = drawEngine.canvasWidth;

  // Calculate offsets for trapezoid
  const bottomLeftX = (canvasWidth - roadWidthBottom) / 2;
  const bottomRightX = (canvasWidth + roadWidthBottom) / 2;
  const topLeftX = (canvasWidth - roadWidthTop) / 2;
  const topRightX = (canvasWidth + roadWidthTop) / 2;

  ctx.globalAlpha = 0.2;
  // Draw the trapezoid
  ctx.fillStyle = "#333"; // Road color
  ctx.strokeStyle = "#222"; // Road border color
  ctx.lineWidth;
  ctx.beginPath();
  ctx.moveTo(bottomLeftX, yStart); // Bottom left corner
  ctx.lineTo(bottomRightX, yStart); // Bottom right corner
  ctx.lineTo(topRightX, yEnd); // Top right corner
  ctx.lineTo(topLeftX, yEnd); // Top left corner
  ctx.closePath(); // Connect back to the start p
  ctx.fill();
  ctx.stroke();
  ctx.globalAlpha = 1;
}

export function drawSkyline(
  ctx: CanvasRenderingContext2D,
  buildings: Building[]
) {
  buildings.forEach((building) => {
    // Draw the building
    ctx.fillStyle = "#34363c";
    ctx.fillRect(building.x, building.y, building.width, building.height);

    // Draw the lights
    ctx.fillStyle = "#d6d6bb";
    building.lights.forEach((light) => {
      ctx.fillRect(light.x, light.y, light.size, light.size);
    });
  });
}

export function drawWall(ctx: CanvasRenderingContext2D) {
  ctx.beginPath();
  ctx.moveTo(wallConfig.x, wallConfig.y);
  ctx.lineTo(drawEngine.canvasWidth - wallConfig.x, wallConfig.y);
  ctx.lineWidth = wallConfig.width;

  ctx.strokeStyle = wallConfig.color;
  ctx.stroke();
  ctx.closePath();
}

export function drawSafeZone(ctx: CanvasRenderingContext2D) {
  const safeZoneHeight = drawEngine.canvasHeight - safeZoneConfig.y;
  ctx.beginPath();
  ctx.moveTo(safeZoneConfig.x, safeZoneHeight);
  ctx.lineTo(drawEngine.canvasWidth - safeZoneConfig.x, safeZoneHeight);
  ctx.lineWidth = wallConfig.width;

  ctx.strokeStyle = safeZoneConfig.color;
  ctx.stroke();
  ctx.closePath();
}

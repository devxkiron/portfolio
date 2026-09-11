'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import type { City, ArcConnection, ClientStory } from './types';

interface GlobeCanvasProps {
  cities: City[];
  stories?: ClientStory[];
  arcs: ArcConnection[];
  selectedCity: City;
  autoRotate: boolean;
  zoomLevel: number; // 1 to 5
  dotsColor?: string;
  dotDensity?: number;
  globeRadius?: number;
  glowRadius?: number;
  glowColor?: string;
  globeBgColor?: string;
  arcColor?: string;
  arcWidth?: number;
  arcHeight?: number;
  arcOpacity?: number;
  beaconRadius?: number;
  beaconGlowRadius?: number;
  beaconColor?: string;
  beaconActiveColor?: string;
  onSelectCity?: (city: City) => void;
}

// Convert Lat/Lon to 3D Cartesian coordinates on sphere (Geographically accurate right-handed)
function getSphericalPos(lat: number, lon: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const lambda = (lon * Math.PI) / 180;
  return new THREE.Vector3(
    radius * Math.sin(phi) * Math.sin(lambda),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.cos(lambda)
  );
}

// Safely parse hex colors, supporting 6-char (#ffffff), 8-char (#ffffffff) hex, and named colors
function parseHexColor(colorStr?: string): THREE.Color {
  if (!colorStr) return new THREE.Color('#f5f5f5');
  let c = colorStr.trim();
  if (!c.startsWith('#') && (c.length === 6 || c.length === 8)) {
    c = '#' + c;
  }
  // Strip alpha from 8-digit hex (e.g. #a31616ff -> #a31616) because THREE.Color rejects 8-digit hex
  if (c.startsWith('#') && c.length === 9) {
    c = c.substring(0, 7);
  } else if (c.startsWith('#') && c.length === 5) {
    c = c.substring(0, 4);
  }
  try {
    return new THREE.Color(c);
  } catch {
    return new THREE.Color('#f5f5f5');
  }
}

// Create smooth 3D curved flight arc curve between two points on the sphere
function createCurvedArcCurve(
  p1: THREE.Vector3,
  p2: THREE.Vector3,
  globeRadius: number,
  heightFactor = 0.45
): THREE.QuadraticBezierCurve3 {
  const distance = p1.distanceTo(p2);
  const midPoint = new THREE.Vector3().addVectors(p1, p2).multiplyScalar(0.5);
  // Altitude increases with distance across globe, scaled by heightFactor
  const altitude = globeRadius + Math.min(distance * heightFactor, globeRadius * heightFactor);
  const controlPoint = midPoint.normalize().multiplyScalar(altitude);

  return new THREE.QuadraticBezierCurve3(p1, controlPoint, p2);
}

// Create a high-quality smooth circular dot texture (prevents default square point sprites)
function createCircleDotTexture(): THREE.Texture {
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 30);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1.0)');
    gradient.addColorStop(0.45, 'rgba(255, 255, 255, 0.9)');
    gradient.addColorStop(0.75, 'rgba(255, 255, 255, 0.35)');
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0.0)');

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(32, 32, 30, 0, Math.PI * 2);
    ctx.fill();
  }

  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}

export const GlobeCanvas: React.FC<GlobeCanvasProps> = ({
  cities,
  stories,
  arcs,
  selectedCity,
  autoRotate,
  zoomLevel,
  dotsColor = '#5cf629',
  dotDensity = 350,
  globeRadius = 1.1,
  glowRadius = 1.0,
  glowColor = '#5cf629',
  globeBgColor = '#040805',
  arcColor = '#2f842b',
  arcWidth = 0.002,
  arcHeight = 0.45,
  arcOpacity = 0.4,
  beaconRadius = 0.018,
  beaconGlowRadius = 0.038,
  beaconColor = '#5cf629',
  beaconActiveColor = '#e2f952',
  onSelectCity,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const globeGroupRef = useRef<THREE.Group | null>(null);
  const dotsMeshRef = useRef<THREE.Points | null>(null);
  const coreMatRef = useRef<THREE.MeshBasicMaterial | null>(null);
  const atmosphereMatRef = useRef<THREE.ShaderMaterial | null>(null);
  const atmosphereMeshRef = useRef<THREE.Mesh | null>(null);
  const circleTextureRef = useRef<THREE.Texture | null>(null);
  const cachedImgDataRef = useRef<{
    data?: Uint8ClampedArray;
    width: number;
    height: number;
  } | null>(null);
  const buildPointsFnRef = useRef<((density: number) => void) | null>(null);
  const buildArcsFnRef = useRef<
    ((color: string, width: number, height: number, opacity: number) => void) | null
  >(null);
  const buildPinsFnRef = useRef<
    ((radius: number, glowRadius: number, color: string, activeColor: string) => void) | null
  >(null);

  const pinMeshesRef = useRef<
    Map<
      string,
      {
        pin: THREE.Mesh;
        ring: THREE.Mesh;
        city: City;
      }
    >
  >(new Map());

  // Active hovered city ID for tracking and glowing ring highlight
  const activeCityIdRef = useRef<string | null>(null);

  // Hovered client story popover state
  const [hoveredStory, setHoveredStory] = useState<{
    story: ClientStory;
    x: number;
    y: number;
  } | null>(null);

  const hoveredStoryRef = useRef(hoveredStory);
  hoveredStoryRef.current = hoveredStory;

  const storiesRef = useRef(stories);
  useEffect(() => {
    storiesRef.current = stories;
  }, [stories]);

  const citiesRef = useRef(cities);
  useEffect(() => {
    citiesRef.current = cities;
  }, [cities]);

  const onSelectCityRef = useRef(onSelectCity);
  useEffect(() => {
    onSelectCityRef.current = onSelectCity;
  }, [onSelectCity]);

  // Cached colors for the animation loop
  const beaconColorObjRef = useRef(parseHexColor(beaconColor));
  const beaconActiveColorObjRef = useRef(parseHexColor(beaconActiveColor));

  // Rotation angles: initial view tilted towards Americas/Pacific as in reference
  const targetRotationRef = useRef({ x: Math.PI / 8, y: -Math.PI / 2.5 });
  const isDraggingRef = useRef(false);
  const previousMousePosRef = useRef({ x: 0, y: 0 });
  const autoRotateRef = useRef(autoRotate);

  useEffect(() => {
    autoRotateRef.current = autoRotate;
  }, [autoRotate]);

  // Dynamically update dot color without re-rendering the whole scene
  useEffect(() => {
    if (dotsMeshRef.current && dotsMeshRef.current.material) {
      const mat = dotsMeshRef.current.material as THREE.PointsMaterial;
      mat.color.copy(parseHexColor(dotsColor));
    }
  }, [dotsColor]);

  // Dynamically update atmosphere glow color
  useEffect(() => {
    if (atmosphereMatRef.current) {
      atmosphereMatRef.current.uniforms.uGlowColor.value.copy(parseHexColor(glowColor));
    }
  }, [glowColor]);

  // Dynamically update globe core background color
  useEffect(() => {
    if (coreMatRef.current) {
      coreMatRef.current.color.copy(parseHexColor(globeBgColor));
    }
  }, [globeBgColor]);

  // Dynamically update atmosphere glow radius/scale
  useEffect(() => {
    if (atmosphereMeshRef.current) {
      const scale = (glowRadius || 1.0) / 1.0;
      atmosphereMeshRef.current.scale.set(scale, scale, scale);
    }
  }, [glowRadius]);

  // Dynamically update overall globe size/scale
  useEffect(() => {
    if (globeGroupRef.current) {
      const scale = (globeRadius || 1.1) / 1.1;
      globeGroupRef.current.scale.set(scale, scale, scale);
    }
  }, [globeRadius]);

  // Dynamically rebuild dots when dotDensity changes
  useEffect(() => {
    if (buildPointsFnRef.current) {
      buildPointsFnRef.current(dotDensity);
    }
  }, [dotDensity]);

  // Dynamically rebuild connection lines when arc properties change
  useEffect(() => {
    if (buildArcsFnRef.current) {
      buildArcsFnRef.current(
        arcColor || '#2f842b',
        arcWidth || 0.002,
        arcHeight || 0.45,
        arcOpacity || 0.4
      );
    }
  }, [arcColor, arcWidth, arcHeight, arcOpacity]);

  // Dynamically update city beacon pins (radius, glow radius, color)
  useEffect(() => {
    beaconColorObjRef.current = parseHexColor(beaconColor);
    beaconActiveColorObjRef.current = parseHexColor(beaconActiveColor);
    if (buildPinsFnRef.current) {
      buildPinsFnRef.current(
        beaconRadius || 0.018,
        beaconGlowRadius || 0.038,
        beaconColor || '#5cf629',
        beaconActiveColor || '#e2f952'
      );
    }
  }, [beaconRadius, beaconGlowRadius, beaconColor, beaconActiveColor]);

  // Pivot globe toward selected city
  useEffect(() => {
    if (!selectedCity) return;
    const targetY = -(selectedCity.lon * Math.PI) / 180;
    const targetX = ((selectedCity.lat * Math.PI) / 180) * 0.65;
    targetRotationRef.current = { x: targetX, y: targetY };
  }, [selectedCity]);

  // Zoom distance based on zoomLevel (1=far, 5=close)
  useEffect(() => {
    if (!cameraRef.current) return;
    const targetZ = 4.2 - (zoomLevel - 1) * 0.55;
    cameraRef.current.position.z = Math.max(1.8, Math.min(targetZ, 5.5));
  }, [zoomLevel]);

  // Initialize Three.js Scene
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;
    const baseRadius = 1.35;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0.35, 3.2);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    // 2. WebGL Renderer with Alpha Transparency
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.innerHTML = '';
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 3. Globe Main Group
    const globeGroup = new THREE.Group();
    globeGroupRef.current = globeGroup;
    globeGroup.rotation.x = targetRotationRef.current.x;
    globeGroup.rotation.y = targetRotationRef.current.y;
    const initialGlobeScale = (globeRadius || 1.1) / 1.1;
    globeGroup.scale.set(initialGlobeScale, initialGlobeScale, initialGlobeScale);
    scene.add(globeGroup);

    // 4. Solid Dark Background Core Sphere (Fixes visibility by cleanly occluding back dots)
    const coreGeo = new THREE.SphereGeometry(baseRadius * 0.99, 64, 64);
    const coreMat = new THREE.MeshBasicMaterial({
      color: parseHexColor(globeBgColor), // Rich solid dark background
    });
    coreMatRef.current = coreMat;
    const coreSphere = new THREE.Mesh(coreGeo, coreMat);
    globeGroup.add(coreSphere);

    // 5. Atmospheric Outer Rim Glow (Configurable radius & color)
    const atmosphereGeo = new THREE.SphereGeometry(baseRadius * 1.14, 64, 64);
    const atmosphereMat = new THREE.ShaderMaterial({
      uniforms: {
        uGlowColor: { value: parseHexColor(glowColor) },
      },
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 uGlowColor;
        varying vec3 vNormal;
        void main() {
          float intensity = pow(0.7 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.5);
          gl_FragColor = vec4(uGlowColor, 1.0) * intensity * 0.32;
        }
      `,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      transparent: true,
    });
    atmosphereMatRef.current = atmosphereMat;
    const atmosphereMesh = new THREE.Mesh(atmosphereGeo, atmosphereMat);
    const initialGlowScale = (glowRadius || 1.0) / 1.0;
    atmosphereMesh.scale.set(initialGlowScale, initialGlowScale, initialGlowScale);
    atmosphereMeshRef.current = atmosphereMesh;
    globeGroup.add(atmosphereMesh);

    // 6. Generate 3D Dotted Landmasses
    const circleTexture = createCircleDotTexture();
    circleTextureRef.current = circleTexture;

    const buildPoints = (density: number) => {
      // Clean up previous points if any
      if (dotsMeshRef.current) {
        globeGroup.remove(dotsMeshRef.current);
        dotsMeshRef.current.geometry.dispose();
        dotsMeshRef.current = null;
      }

      const positions: number[] = [];
      const rows = density;
      const cached = cachedImgDataRef.current;
      const imgData = cached?.data;
      const imgW = cached?.width || 0;
      const imgH = cached?.height || 0;

      for (let lat = -90; lat <= 90; lat += 180 / rows) {
        const radiusAtLat = Math.cos((lat * Math.PI) / 180);
        const cols = Math.floor(rows * 2 * radiusAtLat);

        for (let i = 0; i < cols; i++) {
          const lon = (i / cols) * 360 - 180;
          let isLand = false;

          if (imgData && imgW > 0 && imgH > 0) {
            const x = Math.floor(((lon + 180) / 360) * imgW);
            const y = Math.floor(((90 - lat) / 180) * imgH);
            const index = (y * imgW + x) * 4;
            // In specular map: land is dark (< 100), water is light
            isLand = imgData[index] < 100;
          } else {
            // Procedural fallback: continents approximation
            const isAmericas = lon > -165 && lon < -35 && (lat > -55 && lat < 70);
            const isEurasia = lon > -12 && lon < 145 && (lat > 5 && lat < 75);
            const isAfrica = lon > -18 && lon < 52 && (lat > -35 && lat < 38);
            const isAustralia = lon > 110 && lon < 155 && (lat > -42 && lat < -10);
            isLand = isAmericas || isEurasia || isAfrica || isAustralia;
          }

          if (isLand) {
            const pos = getSphericalPos(lat, lon, baseRadius);
            positions.push(pos.x, pos.y, pos.z);
          }
        }
      }

      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));

      // Circular, smooth glowing dots (NO square sprites!)
      const material = new THREE.PointsMaterial({
        color: parseHexColor(dotsColor),
        size: Math.max(0.012, 0.024 - (density - 140) * 0.000045),
        map: circleTexture,
        transparent: true,
        opacity: 0.88,
        alphaTest: 0.02,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });

      const points = new THREE.Points(geometry, material);
      dotsMeshRef.current = points;
      globeGroup.add(points);
    };

    buildPointsFnRef.current = buildPoints;

    // Load specular map from local public asset
    const img = new Image();
    img.src = '/textures/earth_specular.jpg';
    img.onload = () => {
      const offCanvas = document.createElement('canvas');
      offCanvas.width = img.width;
      offCanvas.height = img.height;
      const ctx = offCanvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(img, 0, 0);
        const data = ctx.getImageData(0, 0, img.width, img.height).data;
        cachedImgDataRef.current = { data, width: img.width, height: img.height };
        buildPoints(dotDensity);
      } else {
        buildPoints(dotDensity);
      }
    };
    img.onerror = () => {
      buildPoints(dotDensity);
    };

    // 7. City Beacon Pins & Ripple Glow Rings (Fully Configurable Size & Colors)
    const cityMap = new Map<string, THREE.Vector3>();
    let pinGroup: THREE.Group | null = null;

    const buildPins = (
      radius: number,
      glowRad: number,
      colorHex: string,
      activeColorHex: string
    ) => {
      if (pinGroup) {
        globeGroup.remove(pinGroup);
        pinGroup.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.geometry.dispose();
            if (Array.isArray(child.material)) child.material.forEach((m) => m.dispose());
            else child.material.dispose();
          }
        });
        pinGroup = null;
      }

      pinGroup = new THREE.Group();
      pinMeshesRef.current.clear();

      cities.forEach((city) => {
        const pos = getSphericalPos(city.lat, city.lon, baseRadius * 1.015);
        cityMap.set(city.id, pos);

        const isCurrent = city.id === selectedCity?.id;

        // Pin core sphere (center dot)
        const pinGeo = new THREE.SphereGeometry(radius, 16, 16);
        const pinMat = new THREE.MeshBasicMaterial({
          color: isCurrent ? parseHexColor(activeColorHex) : parseHexColor(colorHex),
        });
        const pinMesh = new THREE.Mesh(pinGeo, pinMat);
        pinMesh.position.copy(pos);
        pinGroup!.add(pinMesh);

        // Outer ripple ring
        const innerRing = radius * 1.3;
        const outerRing = Math.max(innerRing + 0.006, glowRad);
        const ringGeo = new THREE.RingGeometry(innerRing, outerRing, 32);
        const ringMat = new THREE.MeshBasicMaterial({
          color: isCurrent ? parseHexColor(activeColorHex) : parseHexColor(colorHex),
          side: THREE.DoubleSide,
          transparent: true,
          opacity: isCurrent ? 0.85 : 0.45,
        });
        const ringMesh = new THREE.Mesh(ringGeo, ringMat);
        ringMesh.position.copy(pos);
        ringMesh.lookAt(pos.clone().multiplyScalar(2));
        pinGroup!.add(ringMesh);

        pinMeshesRef.current.set(city.id, {
          pin: pinMesh,
          ring: ringMesh,
          city,
        });
      });

      globeGroup.add(pinGroup);
    };

    buildPinsFnRef.current = buildPins;
    buildPins(
      beaconRadius || 0.018,
      beaconGlowRadius || 0.038,
      beaconColor || '#5cf629',
      beaconActiveColor || '#e2f952'
    );

    // 8. Flight Connection Arcs with Configurable Color, Width (Tube), and Height (Altitude)
    let currentArcGroup: THREE.Group | null = null;

    const buildArcs = (color: string, width: number, heightFactor: number, opacity: number) => {
      if (currentArcGroup) {
        globeGroup.remove(currentArcGroup);
        currentArcGroup.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.geometry.dispose();
            if (Array.isArray(child.material)) child.material.forEach((m) => m.dispose());
            else child.material.dispose();
          }
        });
        currentArcGroup = null;
      }

      const arcGroup = new THREE.Group();
      currentArcGroup = arcGroup;

      const arcMat = new THREE.MeshBasicMaterial({
        color: parseHexColor(color),
        transparent: true,
        opacity: opacity,
      });

      arcs.forEach((arc) => {
        const p1 = cityMap.get(arc.fromCityId);
        const p2 = cityMap.get(arc.toCityId);
        if (!p1 || !p2) return;

        const curve = createCurvedArcCurve(p1, p2, baseRadius, heightFactor);
        // TubeGeometry produces real volumetric line thickness
        const tubeGeo = new THREE.TubeGeometry(curve, 48, width, 6, false);
        const tubeMesh = new THREE.Mesh(tubeGeo, arcMat);
        arcGroup.add(tubeMesh);
      });

      globeGroup.add(arcGroup);
    };

    buildArcsFnRef.current = buildArcs;
    buildArcs(
      arcColor || '#2f842b',
      arcWidth || 0.002,
      arcHeight || 0.45,
      arcOpacity || 0.4
    );

    // 9. Mouse Orbit, Bulletproof 2D Hover Detection & Wheel Controls
    let pointerDownPos = { x: 0, y: 0 };

    const handlePointerDown = (e: PointerEvent) => {
      isDraggingRef.current = true;
      previousMousePosRef.current = { x: e.clientX, y: e.clientY };
      pointerDownPos = { x: e.clientX, y: e.clientY };
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (isDraggingRef.current) {
        const deltaX = e.clientX - previousMousePosRef.current.x;
        const deltaY = e.clientY - previousMousePosRef.current.y;
        previousMousePosRef.current = { x: e.clientX, y: e.clientY };

        targetRotationRef.current.y += deltaX * 0.005;
        targetRotationRef.current.x += deltaY * 0.005;
        targetRotationRef.current.x = Math.max(-0.85, Math.min(0.85, targetRotationRef.current.x));

        // When user is dragging/rotating the globe, hide the hover popover
        if (hoveredStoryRef.current) {
          activeCityIdRef.current = null;
          setHoveredStory(null);
        }
        return;
      }

      if (!domEl || !cameraRef.current || !globeGroupRef.current) return;

      const rect = domEl.getBoundingClientRect();
      const isInside =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;

      if (!isInside) {
        if (hoveredStoryRef.current) {
          activeCityIdRef.current = null;
          setHoveredStory(null);
        }
        domEl.style.cursor = 'grab';
        return;
      }

      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;

      let nearestCity: City | null = null;
      let nearestDist = Infinity;
      let nearestPos = { x: 0, y: 0 };

      pinMeshesRef.current.forEach(({ pin, city }) => {
        const worldPos = new THREE.Vector3();
        pin.getWorldPosition(worldPos);

        // Check if the beacon is facing towards the camera (front hemisphere)
        const toCam = cameraRef.current!.position.clone().sub(worldPos).normalize();
        const normal = worldPos.clone().normalize();
        if (normal.dot(toCam) > 0.02) {
          const proj = worldPos.clone().project(cameraRef.current!);
          const sx = (proj.x * 0.5 + 0.5) * rect.width;
          const sy = (-proj.y * 0.5 + 0.5) * rect.height;

          const dist = Math.hypot(mx - sx, my - sy);
          // 38px radius around beacon dot for easy, comfortable hovering
          if (dist < 38 && dist < nearestDist) {
            nearestDist = dist;
            nearestCity = city;
            nearestPos = { x: sx, y: sy };
          }
        }
      });

      if (nearestCity) {
        const cityId = (nearestCity as City).id;
        const story = storiesRef.current?.find((s) => s.cityId === cityId);
        if (story) {
          activeCityIdRef.current = cityId;
          setHoveredStory({
            story,
            x: nearestPos.x,
            y: nearestPos.y,
          });
          domEl.style.cursor = 'pointer';
          return;
        }
      }

      if (hoveredStoryRef.current) {
        activeCityIdRef.current = null;
        setHoveredStory(null);
      }
      domEl.style.cursor = 'grab';
    };

    const handlePointerUp = (e: PointerEvent) => {
      isDraggingRef.current = false;

      // Detect click on beacon (small movement < 6px)
      const dist = Math.hypot(e.clientX - pointerDownPos.x, e.clientY - pointerDownPos.y);
      if (dist < 6 && domEl && cameraRef.current) {
        const rect = domEl.getBoundingClientRect();
        const mx = e.clientX - rect.left;
        const my = e.clientY - rect.top;

        pinMeshesRef.current.forEach(({ pin, city }) => {
          const worldPos = new THREE.Vector3();
          pin.getWorldPosition(worldPos);
          const toCam = cameraRef.current!.position.clone().sub(worldPos).normalize();
          const normal = worldPos.clone().normalize();
          if (normal.dot(toCam) > 0.02) {
            const proj = worldPos.clone().project(cameraRef.current!);
            const sx = (proj.x * 0.5 + 0.5) * rect.width;
            const sy = (-proj.y * 0.5 + 0.5) * rect.height;
            if (Math.hypot(mx - sx, my - sy) < 38) {
              if (onSelectCityRef.current) {
                onSelectCityRef.current(city);
              }
            }
          }
        });
      }
    };

    const handleWheel = (e: WheelEvent) => {
      // Only zoom if Ctrl (or Cmd on Mac) is pressed
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
        if (!cameraRef.current) return;
        let newZ = cameraRef.current.position.z + e.deltaY * 0.004;
        newZ = Math.max(1.6, Math.min(newZ, 6.0));
        cameraRef.current.position.z = newZ;
      }
      // Otherwise, do not prevent default so the page scrolls naturally
    };

    const domEl = renderer.domElement;
    domEl.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
    domEl.addEventListener('wheel', handleWheel, { passive: false });

    // 10. Window Resize Listener
    const handleResize = () => {
      if (!containerRef.current || !rendererRef.current || !cameraRef.current) return;
      const newW = containerRef.current.clientWidth;
      const newH = containerRef.current.clientHeight;
      cameraRef.current.aspect = newW / newH;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(newW, newH);
    };
    window.addEventListener('resize', handleResize);

    // 11. Animation Loop (using standard performance timestamp, no deprecated THREE.Clock)
    let animationId: number;

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const elapsed = performance.now() * 0.001;

      // Auto rotation: gently pause when hovering on a beacon so user can comfortably inspect the popover
      if (autoRotateRef.current && !isDraggingRef.current && !activeCityIdRef.current) {
        targetRotationRef.current.y += 0.0016;
      }

      // Smooth Lerp rotation
      if (globeGroupRef.current) {
        globeGroupRef.current.rotation.y += (targetRotationRef.current.y - globeGroupRef.current.rotation.y) * 0.06;
        globeGroupRef.current.rotation.x += (targetRotationRef.current.x - globeGroupRef.current.rotation.x) * 0.06;
      }

      // Synchronize popover screen position during motion
      if (activeCityIdRef.current && cameraRef.current && domEl) {
        const pinObj = pinMeshesRef.current.get(activeCityIdRef.current);
        if (pinObj) {
          const worldPos = new THREE.Vector3();
          pinObj.pin.getWorldPosition(worldPos);
          const toCam = cameraRef.current.position.clone().sub(worldPos).normalize();
          const normal = worldPos.clone().normalize();
          if (normal.dot(toCam) > 0.02) {
            const proj = worldPos.clone().project(cameraRef.current);
            const rect = domEl.getBoundingClientRect();
            const sx = (proj.x * 0.5 + 0.5) * rect.width;
            const sy = (-proj.y * 0.5 + 0.5) * rect.height;
            setHoveredStory((prev) => (prev ? { ...prev, x: sx, y: sy } : null));
          } else {
            activeCityIdRef.current = null;
            setHoveredStory(null);
          }
        }
      }

      // Animate pulsing city beacon rings using configured colors
      const activeColor = beaconActiveColorObjRef.current;
      const inactiveColor = beaconColorObjRef.current;

      pinMeshesRef.current.forEach(({ ring, pin }, cityId) => {
        const isCurrent = cityId === selectedCity?.id;
        const isHovered = activeCityIdRef.current === cityId;
        const scale = 1 + Math.sin(elapsed * 4.5) * (isCurrent || isHovered ? 0.32 : 0.15);
        ring.scale.set(scale, scale, 1);

        const ringMat = ring.material as THREE.MeshBasicMaterial;
        ringMat.opacity = isCurrent ? 0.95 : (isHovered ? 0.9 : 0.45);
        ringMat.color.copy(isCurrent || isHovered ? activeColor : inactiveColor);

        const pinMat = pin.material as THREE.MeshBasicMaterial;
        pinMat.color.copy(isCurrent || isHovered ? activeColor : inactiveColor);
      });

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      domEl.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      domEl.removeEventListener('wheel', handleWheel);
      window.removeEventListener('resize', handleResize);
      circleTexture.dispose();
      renderer.dispose();
    };
  }, [cities, arcs, onSelectCity]);

  return (
    <div
      ref={containerRef}
      className="relative h-full w-full cursor-grab active:cursor-grabbing select-none"
    >
      {/* Interactive Floating Popover on Glowing Dot Hover */}
      {hoveredStory && (
        <div
          style={{
            left: `${hoveredStory.x}px`,
            top: `${hoveredStory.y}px`,
          }}
          className={`pointer-events-auto absolute z-50 -translate-x-1/2 rounded-xl border border-lime-500/40 bg-[#070b08]/95 px-3 py-2 text-zinc-100 shadow-[0_12px_32px_rgba(0,0,0,0.95),0_0_20px_rgba(92,246,41,0.2)] backdrop-blur-xl transition-all duration-75 cursor-pointer select-none ${
            hoveredStory.y < 160
              ? 'translate-y-[16px]'
              : '-translate-y-[calc(100%+14px)]'
          }`}
          onPointerDown={(e) => e.stopPropagation()}
          onClick={() => {
            const city = cities.find((c) => c.id === hoveredStory.story.cityId);
            if (city && onSelectCity) onSelectCity(city);
          }}
        >
          {/* ONLY Client Profile: Avatar, Name, Role */}
          <div className="flex items-center gap-2.5 whitespace-nowrap">
            <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full border border-lime-400/60 shadow-[0_0_10px_rgba(92,246,41,0.25)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={hoveredStory.story.authorAvatar}
                alt={hoveredStory.story.authorName}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex flex-col pr-1">
              <span className="text-sm font-bold text-white tracking-tight leading-snug">
                {hoveredStory.story.authorName}
              </span>
              <span className="text-xs text-zinc-400 font-medium leading-snug">
                {hoveredStory.story.authorRole}
              </span>
            </div>
          </div>

          {/* Pointing Caret Arrow to the Beacon */}
          <div
            className={`absolute left-1/2 -translate-x-1/2 w-2.5 h-2.5 rotate-45 bg-[#070b08] ${
              hoveredStory.y < 160
                ? '-top-1.5 border-l border-t border-lime-500/40'
                : '-bottom-1.5 border-r border-b border-lime-500/40'
            }`}
          />
        </div>
      )}
    </div>
  );
};

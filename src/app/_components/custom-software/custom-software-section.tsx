'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

type FocusTarget = 'all' | 'web' | 'mobile' | 'portal';

const LABELS: { key: FocusTarget; label: string; desc: string }[] = [
  { key: 'all', label: 'All Platforms', desc: 'Websites, mobile apps & custom portals—built from scratch.' },
  { key: 'web', label: 'Web Apps', desc: 'Fast, conversion-focused websites and SaaS platforms.' },
  { key: 'mobile', label: 'Mobile Apps', desc: 'Smooth iOS & Android apps your customers love to use.' },
  { key: 'portal', label: 'Custom Portals', desc: 'Private dashboards to manage clients, orders & teams.' },
];

function createScreenTexture(title: string, accent: string, isDark: boolean): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 320;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.fillStyle = isDark ? '#0d1310' : '#f8f9fa';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Subtle grid
    ctx.strokeStyle = isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)';
    ctx.lineWidth = 1;
    for (let x = 0; x < canvas.width; x += 32) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }
    for (let y = 0; y < canvas.height; y += 32) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }

    // Top bar
    ctx.fillStyle = isDark ? '#17201b' : '#e5e7eb';
    ctx.fillRect(0, 0, canvas.width, 36);

    // Accent dot
    ctx.fillStyle = accent;
    ctx.beginPath();
    ctx.arc(24, 18, 6, 0, Math.PI * 2);
    ctx.fill();

    // Title
    ctx.fillStyle = isDark ? '#fdfcf8' : '#0d1310';
    ctx.font = 'bold 26px sans-serif';
    ctx.fillText(title, 32, 90);

    // Minimal UI bars
    ctx.fillStyle = accent;
    ctx.fillRect(32, 120, 140, 10);
    ctx.fillStyle = isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.12)';
    ctx.fillRect(32, 146, 320, 10);
    ctx.fillRect(32, 168, 260, 10);

    // Mini chart blocks
    const heights = [45, 75, 55, 105, 85];
    heights.forEach((h, i) => {
      ctx.fillStyle = i === 3 ? accent : isDark ? 'rgba(255,255,255,0.14)' : 'rgba(0,0,0,0.14)';
      ctx.fillRect(32 + i * 48, 285 - h, 32, h);
    });
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.needsUpdate = true;
  return tex;
}

export const CustomSoftwareSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const [focus, setFocus] = useState<FocusTarget>('all');
  const focusRef = useRef<FocusTarget>('all');

  useEffect(() => {
    focusRef.current = focus;
  }, [focus]);

  useEffect(() => {
    const container = canvasContainerRef.current;
    const section = sectionRef.current;
    if (!container || !section) return;

    const isDark =
      document.documentElement.getAttribute('data-theme') === 'dark' ||
      document.documentElement.classList.contains('dark');

    const scene = new THREE.Scene();
    const width = container.clientWidth || 800;
    const height = container.clientHeight || 460;

    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 0.7, 8.2);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Realistic PBR Studio Environment
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;

    // Balanced side/top lighting so front glare doesn't wash out screens
    const ambientLight = new THREE.AmbientLight(0xffffff, isDark ? 0.5 : 0.65);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xaeff00, 1.1);
    keyLight.position.set(5, 7, -3);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xffffff, 0.45);
    fillLight.position.set(-6, 4, 2);
    scene.add(fillLight);

    // Shared materials
    const bodyMat = new THREE.MeshStandardMaterial({
      color: isDark ? 0x1a231e : 0x27272a,
      metalness: 0.75,
      roughness: 0.25,
    });
    const trimMat = new THREE.MeshStandardMaterial({
      color: 0xaeff00,
      emissive: 0xaeff00,
      emissiveIntensity: 0.25,
      metalness: 0.5,
      roughness: 0.3,
    });

    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // Helper to load a real .glb model into a target group (replacing procedural fallback)
    const gltfLoader = new GLTFLoader();
    const loadRealModel = (
      url: string,
      targetGroup: THREE.Group,
      targetSize: number,
      extraRotY = 0,
      screenTex?: THREE.Texture
    ) => {
      gltfLoader.load(
        url,
        (gltf) => {
          const model = gltf.scene;
          model.rotation.y = extraRotY;

          const box = new THREE.Box3().setFromObject(model);
          const size = box.getSize(new THREE.Vector3());
          const maxDim = Math.max(size.x, size.y, size.z) || 1;
          model.scale.setScalar(targetSize / maxDim);

          // Recompute center after scaling and rotating so it stays dead-center
          box.setFromObject(model);
          const center = box.getCenter(new THREE.Vector3());
          model.position.sub(center);

          if (screenTex) {
            let matched = false;
            model.traverse((child) => {
              if ((child as THREE.Mesh).isMesh) {
                const mesh = child as THREE.Mesh;
                const meshName = (mesh.name || '').toLowerCase();
                const mat = Array.isArray(mesh.material) ? mesh.material[0] : mesh.material;
                const matName = ((mat as THREE.Material)?.name || '').toLowerCase();
                const combined = `${meshName} ${matName}`;
                const hasEmissiveMap = Boolean((mat as THREE.MeshStandardMaterial)?.emissiveMap);
                if (
                  combined.includes('screen') ||
                  combined.includes('display') ||
                  combined.includes('wallpaper') ||
                  combined.includes('lcd') ||
                  combined.includes('oled') ||
                  combined.includes('monitor') ||
                  hasEmissiveMap
                ) {
                  mesh.material = new THREE.MeshBasicMaterial({
                    map: screenTex,
                    toneMapped: false,
                  });
                  matched = true;
                }
              }
            });

            // Fallback for models like iPad where the screen mesh uses a generic name with a wallpaper map
            if (!matched) {
              model.traverse((child) => {
                if ((child as THREE.Mesh).isMesh) {
                  const mesh = child as THREE.Mesh;
                  const mat = Array.isArray(mesh.material) ? mesh.material[0] : mesh.material;
                  if ((mat as THREE.MeshStandardMaterial)?.map) {
                    mesh.material = new THREE.MeshBasicMaterial({
                      map: screenTex,
                      toneMapped: false,
                    });
                  }
                }
              });
            }
          }

          targetGroup.clear();
          targetGroup.add(model);
        },
        undefined,
        () => {
          // Keep procedural fallback if .glb file is not present
        }
      );
    };

    // 1. 3D Laptop (Web App)
    const laptopGroup = new THREE.Group();
    const laptopBase = new THREE.Mesh(new THREE.BoxGeometry(2.6, 0.08, 1.7), bodyMat);
    laptopBase.position.set(0, -0.75, 0.35);
    laptopGroup.add(laptopBase);

    const laptopLid = new THREE.Mesh(new THREE.BoxGeometry(2.6, 1.65, 0.07), bodyMat);
    laptopLid.position.set(0, 0.08, -0.48);
    laptopLid.rotation.x = -0.12;
    laptopGroup.add(laptopLid);

    const laptopScreenMat = new THREE.MeshBasicMaterial({
      map: createScreenTexture('Web App & SaaS', '#aeff00', isDark),
    });
    const laptopScreen = new THREE.Mesh(new THREE.PlaneGeometry(2.42, 1.48), laptopScreenMat);
    laptopScreen.position.set(0, 0.08, -0.44);
    laptopScreen.rotation.x = -0.12;
    laptopGroup.add(laptopScreen);
    rootGroup.add(laptopGroup);

    // 2. 3D Smartphone (Mobile App)
    const phoneGroup = new THREE.Group();
    const phoneBody = new THREE.Mesh(new THREE.BoxGeometry(0.95, 1.9, 0.09), bodyMat);
    phoneGroup.add(phoneBody);

    const phoneScreenMat = new THREE.MeshBasicMaterial({
      map: createScreenTexture('Mobile App', '#aeff00', isDark),
    });
    const phoneScreen = new THREE.Mesh(new THREE.PlaneGeometry(0.84, 1.72), phoneScreenMat);
    phoneScreen.position.z = 0.05;
    phoneGroup.add(phoneScreen);

    const phoneBeacon = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.03, 0.02), trimMat);
    phoneBeacon.position.set(0, 0.84, 0.05);
    phoneGroup.add(phoneBeacon);

    phoneGroup.position.set(2.0, -0.1, 0.7);
    phoneGroup.rotation.y = -0.32;
    rootGroup.add(phoneGroup);

    // 3. 3D Tablet / Portal (Custom Portal)
    const tabletGroup = new THREE.Group();
    const tabletBody = new THREE.Mesh(new THREE.BoxGeometry(1.9, 1.35, 0.08), bodyMat);
    tabletGroup.add(tabletBody);

    const tabletScreenMat = new THREE.MeshBasicMaterial({
      map: createScreenTexture('Custom Portal', '#aeff00', isDark),
    });
    const tabletScreen = new THREE.Mesh(new THREE.PlaneGeometry(1.76, 1.2), tabletScreenMat);
    tabletScreen.position.z = 0.045;
    tabletGroup.add(tabletScreen);

    tabletGroup.position.set(-2.0, 0.05, 0.5);
    tabletGroup.rotation.y = 0.35;
    rootGroup.add(tabletGroup);

    const textureLoader = new THREE.TextureLoader();
    textureLoader.setCrossOrigin('anonymous');
    const loadDummyImage = (url: string, fallbackTitle: string) => {
      const tex = textureLoader.load(url);
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.flipY = false;
      return tex;
    };

    const webImgTex = loadDummyImage(
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop',
      'Web App & SaaS'
    );
    const mobileImgTex = loadDummyImage(
      'https://images.unsplash.com/photo-1642790106117-e829e14a795f?q=80&w=900&auto=format&fit=crop',
      'Mobile App'
    );
    const portalImgTex = loadDummyImage(
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop',
      'Custom Portal'
    );

    loadRealModel('/models/laptop.glb', laptopGroup, 2.6, 0, webImgTex);
    loadRealModel('/models/phone.glb', phoneGroup, 1.85, 0, mobileImgTex);
    loadRealModel('/models/tablet.glb', tabletGroup, 1.95, -Math.PI * 0.5, portalImgTex);

    // Scroll-driven 3D animation
    const scrollState = { progress: 0 };
    const st = ScrollTrigger.create({
      trigger: section,
      start: 'top 80%',
      end: 'bottom 20%',
      scrub: 1,
      onUpdate: (self) => {
        scrollState.progress = self.progress;
      },
    });

    // Drag to rotate + Click Raycaster to select a 3D model
    const drag = {
      isDown: false,
      startX: 0,
      startY: 0,
      rotY: 0,
      rotX: 0,
      moved: false,
    };
    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();

    const onPointerDown = (e: PointerEvent) => {
      drag.isDown = true;
      drag.moved = false;
      drag.startX = e.clientX;
      drag.startY = e.clientY;
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!drag.isDown) return;
      const dx = e.clientX - drag.startX;
      const dy = e.clientY - drag.startY;
      if (Math.abs(dx) > 4 || Math.abs(dy) > 4) {
        drag.moved = true;
      }
      drag.rotY += dx * 0.008;
      drag.rotX = Math.max(-0.45, Math.min(0.45, drag.rotX + dy * 0.005));
      drag.startX = e.clientX;
      drag.startY = e.clientY;
    };

    const onPointerUp = (e: PointerEvent) => {
      if (!drag.isDown) return;
      drag.isDown = false;

      // If it was a clean click (not a drag), raycast to focus the clicked model
      if (!drag.moved) {
        const rect = renderer.domElement.getBoundingClientRect();
        pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
        raycaster.setFromCamera(pointer, camera);

        const hits = raycaster.intersectObjects([laptopGroup, phoneGroup, tabletGroup], true);
        if (hits.length > 0) {
          let obj: THREE.Object3D | null = hits[0].object;
          while (obj && obj.parent !== rootGroup) {
            obj = obj.parent;
          }
          if (obj === laptopGroup) setFocus('web');
          else if (obj === phoneGroup) setFocus('mobile');
          else if (obj === tabletGroup) setFocus('portal');
        }
      }
    };

    const domEl = renderer.domElement;
    domEl.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);

    // Render loop
    let animId = 0;
    const clock = new THREE.Clock();
    const animate = () => {
      animId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      // Scroll-driven rotation + drag rotation (no hover movement)
      const scrollRotY = (scrollState.progress - 0.5) * 0.7;
      rootGroup.rotation.y += (scrollRotY + drag.rotY - rootGroup.rotation.y) * 0.08;
      rootGroup.rotation.x += (drag.rotX - rootGroup.rotation.x) * 0.08;

      laptopGroup.position.y = Math.sin(t * 1.2) * 0.06;
      phoneGroup.position.y = -0.15 + Math.sin(t * 1.5 + 1) * 0.08;
      tabletGroup.position.y = 0.1 + Math.sin(t * 1.3 + 2) * 0.07;

      // Scale & Z-depth focus per device based on active button
      const f = focusRef.current;
      const webScale = f === 'web' ? 1.2 : f === 'all' ? 1.0 : 0.82;
      const mobileScale = f === 'mobile' ? 1.25 : f === 'all' ? 1.0 : 0.82;
      const portalScale = f === 'portal' ? 1.22 : f === 'all' ? 1.0 : 0.82;

      laptopGroup.scale.lerp(new THREE.Vector3(webScale, webScale, webScale), 0.08);
      phoneGroup.scale.lerp(new THREE.Vector3(mobileScale, mobileScale, mobileScale), 0.08);
      tabletGroup.scale.lerp(new THREE.Vector3(portalScale, portalScale, portalScale), 0.08);

      // Focus camera smoothly based on selected pill
      let targetCamX = 0;
      let targetCamZ = 8.2;
      if (f === 'web') {
        targetCamX = 0;
        targetCamZ = 5.8;
      } else if (f === 'mobile') {
        targetCamX = 2.0;
        targetCamZ = 5.2;
      } else if (f === 'portal') {
        targetCamX = -2.0;
        targetCamZ = 5.4;
      }

      camera.position.x += (targetCamX - camera.position.x) * 0.06;
      camera.position.z += (targetCamZ - camera.position.z) * 0.06;
      camera.lookAt(camera.position.x * 0.6, 0, 0);

      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || 800;
      const h = container.clientHeight || 460;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      st.kill();
      domEl.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, []);

  const activeItem = LABELS.find((l) => l.key === focus) || LABELS[0];

  return (
    <section
      ref={sectionRef}
      id="custom-software"
      className="relative w-full py-20 sm:py-28 px-4 sm:px-6 lg:px-8 overflow-visible bg-background text-foreground transition-colors duration-200"
    >
      <div className="mx-auto max-w-6xl">
        {/* Minimal Header */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-card/60 text-[11px] font-mono tracking-widest uppercase text-muted-foreground mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-neon" />
            CUSTOM SOFTWARE
          </div>

          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground leading-[1.12]">
            Built for your business.{' '}
            <span className="text-muted-foreground">In 3D.</span>
          </h2>
        </div>

        {/* Interactive Focus Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
          {LABELS.map((item) => (
            <button
              key={item.key}
              type="button"
              onClick={() => setFocus(item.key)}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer border ${
                focus === item.key
                  ? 'bg-foreground text-background border-foreground shadow-sm'
                  : 'bg-card/70 text-muted-foreground border-border hover:text-foreground'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

      </div>

      {/* Full-Width Three.js 3D WebGL Canvas (prevents left/right/bottom clipping on drag) */}
      <div
        ref={canvasContainerRef}
        className="w-full h-[500px] sm:h-[580px] md:h-[640px] cursor-grab active:cursor-grabbing"
      />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Minimal 1-Line Caption */}
        <p className="mt-2 text-center text-xs sm:text-sm font-medium text-muted-foreground">
          {activeItem.desc}
        </p>
      </div>
    </section>
  );
};

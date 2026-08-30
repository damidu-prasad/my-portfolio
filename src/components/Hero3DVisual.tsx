import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Sparkles, Rotate3d, Zap } from 'lucide-react';
import { playCyberBlip } from '../utils/audio';

export const Hero3DVisual: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeTech, setActiveTech] = useState<string>('React & Java EE Architecture');
  const [isHovered, setIsHovered] = useState<boolean>(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 400;
    const height = container.clientHeight || 400;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 32;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Tech Sphere Group
    const group = new THREE.Group();
    scene.add(group);

    // 1. Inner Glowing Icosahedron
    const innerGeo = new THREE.IcosahedronGeometry(7, 1);
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0x06b6d4,
      wireframe: true,
      transparent: true,
      opacity: 0.6,
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    group.add(innerMesh);

    // 2. Middle Dodecahedron
    const midGeo = new THREE.DodecahedronGeometry(9.5, 0);
    const midMat = new THREE.MeshBasicMaterial({
      color: 0x8b5cf6,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const midMesh = new THREE.Mesh(midGeo, midMat);
    group.add(midMesh);

    // 3. Outer Holographic Orbit Rings
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.5,
    });
    const ringGeo1 = new THREE.TorusGeometry(12.5, 0.15, 16, 100);
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    ring1.rotation.x = Math.PI / 3;
    group.add(ring1);

    const ringMat2 = new THREE.MeshBasicMaterial({
      color: 0x10b981,
      wireframe: true,
      transparent: true,
      opacity: 0.4,
    });
    const ringGeo2 = new THREE.TorusGeometry(14, 0.12, 16, 100);
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.rotation.y = Math.PI / 4;
    ring2.rotation.x = Math.PI / 6;
    group.add(ring2);

    // 4. Orbiting Tech Nodes (Spheres)
    const techNodes: { mesh: THREE.Mesh; angle: number; speed: number; radius: number; label: string; height: number }[] = [];
    const techLabels = [
      { name: 'React.js', color: 0x06b6d4, radius: 12.5, speed: 0.015, height: 0 },
      { name: 'Java EE / Spring', color: 0xf97316, radius: 14, speed: -0.012, height: 2 },
      { name: 'Next.js 15', color: 0x3b82f6, radius: 11, speed: 0.018, height: -3 },
      { name: 'AI & LLM / RAG', color: 0xa855f7, radius: 13, speed: -0.016, height: 4 },
      { name: 'MySQL & Cloud', color: 0x10b981, radius: 12, speed: 0.014, height: -2 },
    ];

    techLabels.forEach((item, index) => {
      const nodeGeo = new THREE.SphereGeometry(0.85, 16, 16);
      const nodeMat = new THREE.MeshBasicMaterial({
        color: item.color,
      });
      const nodeMesh = new THREE.Mesh(nodeGeo, nodeMat);
      
      const glowGeo = new THREE.SphereGeometry(1.25, 16, 16);
      const glowMat = new THREE.MeshBasicMaterial({
        color: item.color,
        transparent: true,
        opacity: 0.35,
        wireframe: true,
      });
      const glowMesh = new THREE.Mesh(glowGeo, glowMat);
      nodeMesh.add(glowMesh);

      group.add(nodeMesh);

      techNodes.push({
        mesh: nodeMesh,
        angle: (index * Math.PI * 2) / techLabels.length,
        speed: item.speed,
        radius: item.radius,
        label: item.name,
        height: item.height,
      });
    });

    // Mouse Drag Rotation
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    const handleMouseDown = (e: MouseEvent) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - previousMousePosition.x;
      const deltaY = e.clientY - previousMousePosition.y;

      group.rotation.y += deltaX * 0.008;
      group.rotation.x += deltaY * 0.008;

      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    const domElement = renderer.domElement;
    domElement.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    // Resize
    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animId: number;
    let pulseTime = 0;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      pulseTime += 0.02;

      if (!isDragging) {
        group.rotation.y += 0.004;
        group.rotation.x = Math.sin(pulseTime * 0.5) * 0.12;
      }

      innerMesh.rotation.y -= 0.008;
      innerMesh.rotation.x += 0.005;

      midMesh.rotation.y += 0.006;
      midMesh.rotation.z -= 0.004;

      ring1.rotation.z += 0.005;
      ring2.rotation.z -= 0.007;

      // Pulse inner core
      const scale = 1 + Math.sin(pulseTime * 2) * 0.04;
      innerMesh.scale.set(scale, scale, scale);

      // Update orbiting tech nodes
      techNodes.forEach((node) => {
        node.angle += node.speed;
        node.mesh.position.x = Math.cos(node.angle) * node.radius;
        node.mesh.position.z = Math.sin(node.angle) * node.radius;
        node.mesh.position.y = node.height + Math.sin(pulseTime + node.angle) * 1.2;
      });

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      domElement.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);

      if (container && domElement) {
        container.removeChild(domElement);
      }
      renderer.dispose();
      innerGeo.dispose();
      innerMat.dispose();
      midGeo.dispose();
      midMat.dispose();
      ringGeo1.dispose();
      ringMat1.dispose();
      ringGeo2.dispose();
      ringMat2.dispose();
    };
  }, []);

  const handleTechClick = (tech: string) => {
    setActiveTech(tech);
    playCyberBlip(680, 0.06, 'triangle');
  };

  return (
    <div 
      className="relative w-full aspect-square max-w-[480px] mx-auto flex items-center justify-center select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Glow aura behind 3D visual */}
      <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 via-indigo-500/15 to-emerald-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* 3D WebGL Canvas Container */}
      <div 
        ref={containerRef} 
        className="w-full h-full cursor-grab active:cursor-grabbing rounded-full"
        title="Click and drag to rotate the 3D Tech Core"
      />

      {/* 3D Visual Floating Badge & Controls */}
      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-slate-900/90 backdrop-blur-md border border-cyan-500/30 px-4 py-2 rounded-full text-xs font-mono text-cyan-300 shadow-xl flex items-center gap-2 pointer-events-auto">
        <Rotate3d className="w-3.5 h-3.5 text-cyan-400 animate-spin" style={{ animationDuration: '8s' }} />
        <span>3D Interactive Core</span>
        <span className="text-slate-500">•</span>
        <span className="text-slate-300 flex items-center gap-1">
          <Zap className="w-3 h-3 text-amber-400" />
          Drag to Orbit
        </span>
      </div>

      {/* Quick Interactive Orbit Pill Indicators */}
      <div className="absolute -top-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-slate-900/80 backdrop-blur border border-slate-800 px-3 py-1.5 rounded-full text-[11px] font-mono text-slate-300">
        <Sparkles className="w-3 h-3 text-cyan-400" />
        <span>Full-Stack Architecture</span>
      </div>
    </div>
  );
};

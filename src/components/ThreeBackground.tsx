import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const ThreeBackground: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 80;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Particle Constellation
    const particleCount = 200;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const initialPositions = new Float32Array(particleCount * 3);
    const velocities: { x: number; y: number; z: number }[] = [];
    const colors = new Float32Array(particleCount * 3);

    const colorPalette = [
      new THREE.Color(0x06b6d4), // Cyan
      new THREE.Color(0x3b82f6), // Blue
      new THREE.Color(0x8b5cf6), // Purple
      new THREE.Color(0x10b981), // Emerald
      new THREE.Color(0xa855f7), // Neon Violet
    ];

    for (let i = 0; i < particleCount; i++) {
      const px = (Math.random() - 0.5) * 180;
      const py = (Math.random() - 0.5) * 140;
      const pz = (Math.random() - 0.5) * 100;

      positions[i * 3] = px;
      positions[i * 3 + 1] = py;
      positions[i * 3 + 2] = pz;

      initialPositions[i * 3] = px;
      initialPositions[i * 3 + 1] = py;
      initialPositions[i * 3 + 2] = pz;

      velocities.push({
        x: (Math.random() - 0.5) * 0.07,
        y: (Math.random() - 0.5) * 0.07,
        z: (Math.random() - 0.5) * 0.04
      });

      const col = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      colors[i * 3] = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Particle Material
    const particleMaterial = new THREE.PointsMaterial({
      size: 2.4,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(geometry, particleMaterial);
    scene.add(particles);

    // Dynamic Connecting Lines
    const maxLineSegments = 320;
    const linePositions = new Float32Array(maxLineSegments * 6);
    const lineColors = new Float32Array(maxLineSegments * 6);
    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    lineGeometry.setAttribute('color', new THREE.BufferAttribute(lineColors, 3));

    const lineMaterial = new THREE.LineSegments(
      lineGeometry,
      new THREE.LineBasicMaterial({
        vertexColors: true,
        transparent: true,
        opacity: 0.3,
        blending: THREE.AdditiveBlending,
      })
    );
    scene.add(lineMaterial);

    // 3D Floating Cyber Objects in Space that rotate with scroll
    const scrollGroup = new THREE.Group();
    scene.add(scrollGroup);

    // 1. Floating Torus Knot
    const knotGeo = new THREE.TorusKnotGeometry(16, 3.8, 100, 16, 2, 3);
    const knotMat = new THREE.MeshBasicMaterial({
      color: 0x06b6d4,
      wireframe: true,
      transparent: true,
      opacity: 0.09,
    });
    const knotMesh = new THREE.Mesh(knotGeo, knotMat);
    knotMesh.position.set(45, -12, -35);
    scrollGroup.add(knotMesh);

    // 2. Floating Icosahedron
    const icoGeo = new THREE.IcosahedronGeometry(15, 1);
    const icoMat = new THREE.MeshBasicMaterial({
      color: 0xa855f7,
      wireframe: true,
      transparent: true,
      opacity: 0.1,
    });
    const icoMesh = new THREE.Mesh(icoGeo, icoMat);
    icoMesh.position.set(-50, 18, -30);
    scrollGroup.add(icoMesh);

    // 3. Floating Octahedron Core
    const octGeo = new THREE.OctahedronGeometry(12, 1);
    const octMat = new THREE.MeshBasicMaterial({
      color: 0x10b981,
      wireframe: true,
      transparent: true,
      opacity: 0.08,
    });
    const octMesh = new THREE.Mesh(octGeo, octMat);
    octMesh.position.set(30, 40, -45);
    scrollGroup.add(octMesh);

    // 4. Floating Dodecahedron
    const dodGeo = new THREE.DodecahedronGeometry(10, 0);
    const dodMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.08,
    });
    const dodMesh = new THREE.Mesh(dodGeo, dodMat);
    dodMesh.position.set(-35, -35, -40);
    scrollGroup.add(dodMesh);

    // Mouse & Scroll Tracking
    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;

    let targetScrollProgress = 0;
    let currentScrollProgress = 0;

    const onMouseMove = (e: MouseEvent) => {
      targetMouseX = (e.clientX / window.innerWidth - 0.5) * 28;
      targetMouseY = -(e.clientY / window.innerHeight - 0.5) * 20;
    };

    const onScroll = () => {
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      targetScrollProgress = window.scrollY / maxScroll;
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // Resize Handler
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', onResize);

    // Animation Loop
    let animationFrameId: number;
    let frame = 0;

    const animate = () => {
      frame++;
      animationFrameId = requestAnimationFrame(animate);

      // Smooth mouse lerp
      currentMouseX += (targetMouseX - currentMouseX) * 0.05;
      currentMouseY += (targetMouseY - currentMouseY) * 0.05;

      // Smooth scroll lerp
      currentScrollProgress += (targetScrollProgress - currentScrollProgress) * 0.06;

      // Scroll-driven 3D transitions & perspective shifts
      camera.position.x = currentMouseX * 0.6 + Math.sin(currentScrollProgress * Math.PI * 2) * 8;
      camera.position.y = currentMouseY * 0.6 - currentScrollProgress * 25;
      camera.position.z = 80 + Math.cos(currentScrollProgress * Math.PI) * 12;
      camera.rotation.z = (currentMouseX * 0.002) + (currentScrollProgress * 0.35);
      camera.lookAt(0, -currentScrollProgress * 15, 0);

      // Rotate geometric meshes with scroll multiplier
      knotMesh.rotation.x += 0.003 + currentScrollProgress * 0.01;
      knotMesh.rotation.y += 0.004 + currentScrollProgress * 0.015;
      knotMesh.position.y = -12 + currentScrollProgress * 30;

      icoMesh.rotation.x -= 0.003 + currentScrollProgress * 0.012;
      icoMesh.rotation.z += 0.003 + currentScrollProgress * 0.008;
      icoMesh.position.y = 18 - currentScrollProgress * 35;

      octMesh.rotation.y += 0.005;
      octMesh.rotation.z -= 0.004;

      dodMesh.rotation.x += 0.004;
      dodMesh.rotation.y += 0.003;

      scrollGroup.rotation.y = currentScrollProgress * Math.PI * 0.8;

      // Update particle positions with subtle scroll vortex
      const posArray = geometry.attributes.position.array as Float32Array;

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        posArray[i3] += velocities[i].x;
        posArray[i3 + 1] += velocities[i].y;
        posArray[i3 + 2] += velocities[i].z;

        // Boundary wrap/bounce
        if (Math.abs(posArray[i3]) > 90) velocities[i].x *= -1;
        if (Math.abs(posArray[i3 + 1]) > 70) velocities[i].y *= -1;
        if (Math.abs(posArray[i3 + 2]) > 50) velocities[i].z *= -1;
      }
      geometry.attributes.position.needsUpdate = true;

      // Connect nearby particles with lines every 2 frames
      if (frame % 2 === 0) {
        let lineIdx = 0;
        const linePosArr = lineGeometry.attributes.position.array as Float32Array;
        const lineColArr = lineGeometry.attributes.color.array as Float32Array;
        const maxDist = 24;

        for (let i = 0; i < particleCount && lineIdx < maxLineSegments; i++) {
          const x1 = posArray[i * 3];
          const y1 = posArray[i * 3 + 1];
          const z1 = posArray[i * 3 + 2];

          for (let j = i + 1; j < particleCount && lineIdx < maxLineSegments; j++) {
            const x2 = posArray[j * 3];
            const y2 = posArray[j * 3 + 1];
            const z2 = posArray[j * 3 + 2];

            const dx = x1 - x2;
            const dy = y1 - y2;
            const dz = z1 - z2;
            const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

            if (dist < maxDist) {
              const alpha = (1 - dist / maxDist) * 0.8;
              const p6 = lineIdx * 6;

              linePosArr[p6] = x1;
              linePosArr[p6 + 1] = y1;
              linePosArr[p6 + 2] = z1;
              linePosArr[p6 + 3] = x2;
              linePosArr[p6 + 4] = y2;
              linePosArr[p6 + 5] = z2;

              // Gradient line colors
              lineColArr[p6] = 0.02 * alpha;
              lineColArr[p6 + 1] = 0.7 * alpha;
              lineColArr[p6 + 2] = 0.9 * alpha;
              lineColArr[p6 + 3] = 0.6 * alpha;
              lineColArr[p6 + 4] = 0.2 * alpha;
              lineColArr[p6 + 5] = 0.9 * alpha;

              lineIdx++;
            }
          }
        }

        // Clear remaining lines
        for (let k = lineIdx * 6; k < maxLineSegments * 6; k++) {
          linePosArr[k] = 0;
          lineColArr[k] = 0;
        }

        lineGeometry.attributes.position.needsUpdate = true;
        lineGeometry.attributes.color.needsUpdate = true;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(animationFrameId);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      geometry.dispose();
      particleMaterial.dispose();
      lineGeometry.dispose();
      lineMaterial.material.dispose();
      knotGeo.dispose();
      knotMat.dispose();
      icoGeo.dispose();
      icoMat.dispose();
      octGeo.dispose();
      octMat.dispose();
      dodGeo.dispose();
      dodMat.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    />
  );
};

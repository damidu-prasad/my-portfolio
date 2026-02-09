// Setup
const canvas = document.querySelector('#webgl');
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
    antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// --- THE CORE OBJECTS ---
// We create multiple geometries to represent the "Morphing" states
const coreGroup = new THREE.Group();
scene.add(coreGroup);

// Materials
const mainMaterial = new THREE.MeshPhysicalMaterial({
    color: 0x00f0ff,
    metalness: 0.9,
    roughness: 0.1,
    wireframe: true,
    emissive: 0x001122,
    emissiveIntensity: 0.5
});

const solidMaterial = new THREE.MeshPhysicalMaterial({
    color: 0x0066ff,
    metalness: 0.5,
    roughness: 0.2,
    transparent: true,
    opacity: 0.2,
    side: THREE.DoubleSide
});

// 1. SPHERE (HERO STATE)
const sphereGeo = new THREE.IcosahedronGeometry(1.5, 2);
const sphereMesh = new THREE.Mesh(sphereGeo, mainMaterial);
const sphereSolid = new THREE.Mesh(sphereGeo, solidMaterial);
const sphereGroup = new THREE.Group();
sphereGroup.add(sphereMesh, sphereSolid);
coreGroup.add(sphereGroup);

// 2. CUBES (PROJECTS STATE)
const cubeGroup = new THREE.Group();
// Create a dispersed cloud of cubes
for (let i = 0; i < 5; i++) {
    const s = 0.5 + Math.random() * 0.5;
    const g = new THREE.BoxGeometry(s, s, s);
    const m = new THREE.Mesh(g, mainMaterial);
    m.position.set(
        (Math.random() - 0.5) * 4,
        (Math.random() - 0.5) * 4,
        (Math.random() - 0.5) * 4
    );
    m.rotation.set(Math.random(), Math.random(), Math.random());
    cubeGroup.add(m);
}
cubeGroup.visible = false; // Hidden initially
cubeGroup.scale.set(0, 0, 0);
coreGroup.add(cubeGroup);

// 3. TORUS (SKILLS STATE)
const torusGeo = new THREE.TorusKnotGeometry(1, 0.3, 100, 16);
const torusMesh = new THREE.Mesh(torusGeo, mainMaterial);
const torusGroup = new THREE.Group();
torusGroup.add(torusMesh);
torusGroup.visible = false;
torusGroup.scale.set(0, 0, 0);
coreGroup.add(torusGroup);

// Particles Background
const particlesGeo = new THREE.BufferGeometry();
const particlesCount = 2000;
const posArray = new Float32Array(particlesCount * 3);

for (let i = 0; i < particlesCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 30; // Spread out
}

particlesGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
const particlesMat = new THREE.PointsMaterial({
    size: 0.02,
    color: 0x00f0ff,
    transparent: true,
    opacity: 0.5
});
const particlesMesh = new THREE.Points(particlesGeo, particlesMat);
scene.add(particlesMesh);

// Lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0x00f0ff, 2);
pointLight.position.set(5, 5, 5);
scene.add(pointLight);

// Mouse Interaction
let mouseX = 0;
let mouseY = 0;
let targetX = 0;
let targetY = 0;

window.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX - window.innerWidth / 2) * 0.001;
    mouseY = (e.clientY - window.innerHeight / 2) * 0.001;
});


// Animation Loop
const clock = new THREE.Clock();

function animate() {
    const elapsedTime = clock.getElapsedTime();

    // Constant rotation
    sphereGroup.rotation.y = elapsedTime * 0.2;
    sphereGroup.rotation.x = elapsedTime * 0.1;

    cubeGroup.rotation.y = elapsedTime * 0.2;
    torusGroup.rotation.z = elapsedTime * 0.2;

    // Mouse Interaction Easing
    targetX = mouseX * 2;
    targetY = mouseY * 2;

    coreGroup.rotation.y += 0.05 * (targetX - coreGroup.rotation.y);
    coreGroup.rotation.x += 0.05 * (targetY - coreGroup.rotation.x);

    // Particles Movement
    particlesMesh.rotation.y = elapsedTime * 0.05;

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

animate();


// --- GSAP SCROLL TRIGGERS ---
gsap.registerPlugin(ScrollTrigger);

// 1. Hero -> Projects (Sphere morps to Cubes)
let tl1 = gsap.timeline({
    scrollTrigger: {
        trigger: "#hero",
        start: "bottom center", // When hero leaves
        end: "bottom top",
        scrub: true
    }
});

tl1.to(sphereGroup.scale, { x: 0, y: 0, z: 0, duration: 1 }) // Shrink Sphere
    .to(sphereGroup, { visible: false, duration: 0 })
    .to(cubeGroup, { visible: true, duration: 0 })
    .to(cubeGroup.scale, { x: 1, y: 1, z: 1, duration: 1 }); // Grow Cubes

// Move Position for Projects
gsap.to(coreGroup.position, {
    scrollTrigger: {
        trigger: "#projects",
        start: "top bottom",
        end: "center center",
        scrub: true
    },
    x: -2 // Move left so text can be on right
});

// 2. Projects -> About (Cubes morph to Torus)
let tl2 = gsap.timeline({
    scrollTrigger: {
        trigger: "#projects",
        start: "bottom center",
        end: "bottom top",
        scrub: true
    }
});

tl2.to(cubeGroup.scale, { x: 0, y: 0, z: 0, duration: 1 })
    .to(cubeGroup, { visible: false, duration: 0 })
    .to(torusGroup, { visible: true, duration: 0 })
    .to(torusGroup.scale, { x: 1, y: 1, z: 1, duration: 1 });

// Move Position for About
gsap.to(coreGroup.position, {
    scrollTrigger: {
        trigger: "#about",
        start: "top bottom",
        end: "center center",
        scrub: true
    },
    x: 2 // Move right so text can be on left
});

// 3. Contact (Explosion / Pulse)
gsap.to(torusGroup.scale, {
    scrollTrigger: {
        trigger: "#contact",
        start: "top bottom",
        end: "center center",
        scrub: true
    },
    x: 2,
    y: 2,
    z: 2
});

gsap.to(coreGroup.position, {
    scrollTrigger: {
        trigger: "#contact",
        start: "top bottom",
        end: "center center",
        scrub: true
    },
    x: 0 // Back to center
});

// Handle Resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

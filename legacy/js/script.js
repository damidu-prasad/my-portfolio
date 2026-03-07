/**
 * DAMINDU PRASAD | ELITE PORTFOLIO CORE LOGIC
 * Features: Lenis Smooth Scroll, GSAP Interactions, Magnetic Cursor, Optimized Three.js
 */

// 1. Initialize Lenis Smooth Scroll
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    touchAlpha: 2
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// 2. Magnetic Custom Cursor
const cursorDot = document.querySelector('#cursor-dot');
const cursorOutline = document.querySelector('#cursor-outline');
let mouse = { x: 0, y: 0 };
let dotPos = { x: 0, y: 0 };
let outlinePos = { x: 0, y: 0 };

window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});

function animateCursor() {
    // Smooth easing for cursor components
    dotPos.x += (mouse.x - dotPos.x) * 1;
    dotPos.y += (mouse.y - dotPos.y) * 1;

    outlinePos.x += (mouse.x - outlinePos.x) * 0.15;
    outlinePos.y += (mouse.y - outlinePos.y) * 0.15;

    cursorDot.style.left = `${dotPos.x}px`;
    cursorDot.style.top = `${dotPos.y}px`;

    cursorOutline.style.left = `${outlinePos.x}px`;
    cursorOutline.style.top = `${outlinePos.y}px`;

    requestAnimationFrame(animateCursor);
}
animateCursor();

// Cursor Interactions
document.querySelectorAll('a, button, .expertise-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursorOutline.style.width = '80px';
        cursorOutline.style.height = '80px';
        cursorOutline.style.backgroundColor = 'rgba(0, 255, 170, 0.1)';
        cursorOutline.style.borderColor = 'transparent';
    });
    el.addEventListener('mouseleave', () => {
        cursorOutline.style.width = '40px';
        cursorOutline.style.height = '40px';
        cursorOutline.style.backgroundColor = 'transparent';
        cursorOutline.style.borderColor = 'var(--accent-emerald)';
    });
});

// 3. Three.js: The Cinematic AI Core (Phase 4 Refinement)
const canvas = document.querySelector('#webgl');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 6;

const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
    antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Core Geometry State
const coreGroup = new THREE.Group();
scene.add(coreGroup);

// Honor-Inspired Material (Gold & Deep Emerald)
const mainMat = new THREE.MeshPhysicalMaterial({
    color: 0xb5935b,
    metalness: 1,
    roughness: 0.1,
    wireframe: true,
    emissive: 0x221100,
    emissiveIntensity: 0.8,
    transparent: true,
    opacity: 0.8
});

const geometries = [
    new THREE.IcosahedronGeometry(2, 3),   // Hero: Perfect Sphere
    new THREE.TorusGeometry(1.5, 0.5, 32, 100), // Expertise: Structured Ring
    new THREE.OctahedronGeometry(2, 0)     // Projects: Precise Diamond
];

// Background Starfield (Muted for Professionalism)
const starsGeo = new THREE.BufferGeometry();
const starsCount = 2000;
const starPosArray = new Float32Array(starsCount * 3);
for (let i = 0; i < starsCount * 3; i++) {
    starPosArray[i] = (Math.random() - 0.5) * 50;
}
starsGeo.setAttribute('position', new THREE.BufferAttribute(starPosArray, 3));
const starsMat = new THREE.PointsMaterial({ size: 0.015, color: 0xffffff, transparent: true, opacity: 0.2 });
const stars = new THREE.Points(starsGeo, starsMat);
scene.add(stars);

// Cinematic Lighting
const pointLight = new THREE.PointLight(0xffffff, 2);
pointLight.position.set(5, 5, 5);
const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
const blueLight = new THREE.PointLight(0x0088ff, 1);
blueLight.position.set(-5, -5, 2);
scene.add(pointLight, ambientLight, blueLight);

// 4. GSAP Animations & Cinematic Reveals
gsap.registerPlugin(ScrollTrigger);

// Core Shapes for Morphing
const shapes = [];
geometries.forEach((geo, i) => {
    const s = new THREE.Mesh(geo, mainMat);
    s.scale.set(0, 0, 0);
    s.visible = false;
    coreGroup.add(s);
    shapes.push(s);
});

shapes[0].scale.set(1, 1, 1);
shapes[0].visible = true;

// Honor Staggered Text Reveals
const revealTexts = document.querySelectorAll('.reveal-text');
revealTexts.forEach(text => {
    const lines = text.querySelectorAll('.line');
    if (lines.length > 0) {
        gsap.fromTo(lines,
            { y: "110%" },
            {
                y: 0,
                stagger: 0.15,
                duration: 1.2,
                ease: "cubic-bezier(0.16, 1, 0.3, 1)",
                scrollTrigger: {
                    trigger: text,
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                }
            }
        );
    } else {
        // Fallback for non-line-wrapped headers
        gsap.fromTo(text,
            { opacity: 0, y: 30 },
            {
                opacity: 1, y: 0,
                duration: 1,
                ease: "power4.out",
                scrollTrigger: {
                    trigger: text,
                    start: "top 90%"
                }
            }
        );
    }
});

// Staggered Item Reveals (Bottom-to-Top)
const revealItems = document.querySelectorAll('.reveal-item');
revealItems.forEach(item => {
    gsap.fromTo(item,
        { opacity: 0, y: 40 },
        {
            opacity: 1, y: 0,
            duration: 1,
            ease: "cubic-bezier(0.16, 1, 0.3, 1)",
            scrollTrigger: {
                trigger: item,
                start: "top 90%",
                toggleActions: "play none none reverse"
            }
        }
    );
});

// Scroll-Driven Zoom Reveals (Honor Discovery Effect)
const zoomTriggers = document.querySelectorAll('.zoom-trigger');
zoomTriggers.forEach(trigger => {
    const element = trigger.querySelector('.zoom-element');
    gsap.fromTo(element,
        { scale: 0.8 },
        {
            scale: 1,
            ease: "none",
            scrollTrigger: {
                trigger: trigger,
                start: "top bottom",
                end: "top 20%",
                scrub: true
            }
        }
    );
});

// Navigation Scroll State
const nav = document.querySelector('.glass-nav');
ScrollTrigger.create({
    start: "top -50",
    onUpdate: (self) => {
        if (self.isActive) nav.classList.add('scrolled');
        else nav.classList.remove('scrolled');
    }
});

// Three.js Scroll Path
const scrollTl = gsap.timeline({
    scrollTrigger: {
        trigger: "#main-content",
        start: "top top",
        end: "bottom bottom",
        scrub: 1.5
    }
});

scrollTl.to(coreGroup.rotation, { y: Math.PI * 4, x: Math.PI * 2, ease: "none" })
    .to(coreGroup.position, { x: 3, z: -2, duration: 1 }, 0.2) // Move to side for expertise
    .to(shapes[0].scale, { x: 0, y: 0, z: 0, duration: 0.5 }, 0.8)
    .add(() => { shapes[0].visible = false; shapes[1].visible = true; }, 1.3)
    .to(shapes[1].scale, { x: 1, y: 1, z: 1, duration: 0.5 }, 1.3)
    .to(coreGroup.position, { x: -3, z: 0, duration: 1 }, 1.5) // Move to projects
    .to(shapes[1].scale, { x: 0, y: 0, z: 0, duration: 0.5 }, 1.8)
    .add(() => { shapes[1].visible = false; shapes[2].visible = true; }, 2.3)
    .to(shapes[2].scale, { x: 1, y: 1, z: 1, duration: 0.5 }, 2.3)
    .to(stars.rotation, { y: 1.5, ease: "none" }, 0);

// Animation Loop
const clock = new THREE.Clock();
function animate() {
    const time = clock.getElapsedTime();
    coreGroup.rotation.y += 0.003;
    stars.rotation.y -= 0.0005;

    // Gentle Floating Motion
    coreGroup.position.y = Math.sin(time * 0.5) * 0.2;

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}
animate();

// Handle Resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// 5. AI Chatbot Logic (Phase 3 Advanced)
const chatbotToggle = document.querySelector('#chatbot-toggle');
const chatbotContainer = document.querySelector('#ai-chatbot');
const closeChat = document.querySelector('#close-chat');
const chatMessages = document.querySelector('#chat-messages');
const userInput = document.querySelector('#user-input');
const sendMsg = document.querySelector('#send-msg');
const promptChips = document.querySelectorAll('.prompt-chip');

if (chatbotToggle) {
    chatbotToggle.addEventListener('click', () => {
        chatbotContainer.classList.add('active');
        chatbotToggle.style.opacity = '0';
        chatbotToggle.style.pointerEvents = 'none';
    });

    closeChat.addEventListener('click', () => {
        chatbotContainer.classList.remove('active');
        chatbotToggle.style.opacity = '1';
        chatbotToggle.style.pointerEvents = 'auto';
    });

    const botKnowledge = {
        "automation": "Damindu architects AI-driven business automation using custom LLM integrations and intelligent workflow design. At Olix Holdings, the focus is on converting traditional bottlenecks into scalable automated systems.",
        "aat": "The AAT (Commerce) background provides a unique edge, allowing Damindu to understand the financial 'DNA' of a business before building the software architecture. This ensures every technical solution has a strong business ROI.",
        "fintech": "Specialized in high-fidelity FinTech systems like the Temco Loan Management system. These architectures handle high-stakes data with precision and scalability.",
        "dna": "Engineering DNA is the core philosophy: building software that isn't just code, but a living ecosystem designed for performance, security, and growth.",
        "olix": "Olix Holdings is the hub where enterprise communications (CCM) and AI automation intersect to transform business operations globally."
    };

    function showTypingIndicator() {
        const indicator = document.createElement('div');
        indicator.className = 'typing-indicator';
        indicator.id = 'typing-indicator';
        indicator.innerHTML = '<span></span><span></span><span></span>';
        chatMessages.appendChild(indicator);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        return indicator;
    }

    async function streamResponse(text) {
        const indicator = showTypingIndicator();
        await new Promise(r => setTimeout(r, 1500)); // Simulate thinking
        indicator.remove();

        const msg = document.createElement('div');
        msg.className = 'message bot';
        chatMessages.appendChild(msg);

        const words = text.split(' ');
        for (let word of words) {
            msg.innerHTML += word + ' ';
            chatMessages.scrollTop = chatMessages.scrollHeight;
            await new Promise(r => setTimeout(r, 50 + Math.random() * 50));
        }
    }

    function addMessage(text, sender) {
        const msg = document.createElement('div');
        msg.className = `message ${sender}`;
        msg.textContent = text;
        chatMessages.appendChild(msg);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function generateResponse(input) {
        const lowerInput = input.toLowerCase();
        let response = "I've logged your query into the Olix logic engine. Could you elaborate on how we can optimize your current infrastructure?";

        if (lowerInput.includes('ai') || lowerInput.includes('automation')) response = botKnowledge.automation;
        else if (lowerInput.includes('aat') || lowerInput.includes('commerce')) response = botKnowledge.aat;
        else if (lowerInput.includes('fintech') || lowerInput.includes('loan') || lowerInput.includes('temco')) response = botKnowledge.fintech;
        else if (lowerInput.includes('dna') || lowerInput.includes('philosophy')) response = botKnowledge.dna;
        else if (lowerInput.includes('olix') || lowerInput.includes('holdings')) response = botKnowledge.olix;

        streamResponse(response);
    }

    function handleInput() {
        const text = userInput.value.trim();
        if (text) {
            addMessage(text, 'user');
            userInput.value = '';
            generateResponse(text);
        }
    }

    sendMsg.addEventListener('click', handleInput);
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleInput();
    });

    promptChips.forEach(chip => {
        chip.addEventListener('click', () => {
            const text = chip.textContent;
            addMessage(text, 'user');
            generateResponse(text);
        });
    });
}

// Final Polish: Entrance Sequence
window.addEventListener('load', () => {
    const tl = gsap.timeline();
    tl.to('.hero-v2 h1 .line', { y: 0, stagger: 0.2, duration: 1.5, ease: "power4.out" })
        .to('.badge-reveal', { opacity: 1, duration: 1 }, "-=1");

    // Fix for mobile address bar
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
});

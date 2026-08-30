import { Project, ExperienceItem, EducationItem, SkillCategory, ContactDetails } from '../types';

export const PERSONAL_DETAILS: ContactDetails = {
  fullName: "Rajapaksha Mudiyanselage Damindu Prasad Jayarathna",
  displayName: "R.M Damindu Prasad Jayarathna",
  title: "Full-Stack Software Engineer & AI / System Automation Developer",
  email: "damiduprasadjayarathna@gmail.com",
  phones: ["+94 77 007 3699", "+94 77 749 6394"],
  location: "No. 15, Olagankanda, Kegalle, Sri Lanka",
  languages: ["English", "Sinhala"],
  portfolioUrl: "https://damindu-prasad.netlify.app",
  linkedinUrl: "https://linkedin.com/in/damindu-prasad",
  githubUrl: "https://github.com/damindu-prasad",
};

export const PROFESSIONAL_SUMMARY = 
  "Results-driven Full-Stack Software Engineer with a BSc (Hons) in Software Engineering and over 3 years of hands-on experience in architecting scalable enterprise web applications. Highly proficient in modern ecosystems including React.js, Next.js, TypeScript, Java EE, and Spring Boot. Strong expertise in AI integration (LLMs, RAG), system automation, and Fintech solutions. Adept at driving performance optimization, deploying microservices, and utilizing Cloud/DevOps tools to deliver high-impact, user-centric software in Agile environments.";

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: "freelance-ai",
    role: "Freelance Software Engineer / System Automation Developer",
    company: "Self-Employed",
    period: "Jan 2026 – Present",
    type: "Freelance / Contract",
    location: "Remote / Global",
    badge: "AI & System Automation Specialist",
    bullets: [
      "Architecting and developing automated SaaS platforms utilizing AI and LLM integrations to optimize complex business workflows and data retrieval processes.",
      "Designing scalable, high-performance software solutions tailored for the Fintech sector, focusing on secure architecture and automated recurring revenue systems.",
      "Building custom RAG (Retrieval-Augmented Generation) applications to significantly enhance data processing efficiency for independent client projects."
    ],
    technologies: ["AI & LLM Integrations", "RAG Pipelines", "OpenAI / Gemini APIs", "LangChain concepts", "Next.js", "TypeScript", "System Automation", "Fintech"]
  },
  {
    id: "exon-associate",
    role: "Associate Software Engineer",
    company: "Exon Software Solutions (Pvt) Ltd",
    period: "May 2023 – December 2025",
    type: "Full-time",
    location: "Colombo / Hybrid",
    badge: "Promoted within 6 Months",
    bullets: [
      "Engineered and deployed scalable features for enterprise-level web applications using React.js and Java EE, achieving a 30% improvement in system reliability and user engagement.",
      "Optimized frontend rendering logic and executed seamless RESTful API integrations, reducing page load times by over 25% and enhancing core application performance.",
      "Collaborated with cross-functional teams within Agile/Scrum teams to consistently deliver high-quality software solutions, meeting 100% of project deadlines.",
      "Earned a rapid promotion from Intern to Associate level within 6 months due to technical excellence, proactive problem-solving, and strict adherence to clean code standards."
    ],
    technologies: ["React.js", "Java EE", "Spring Boot", "RESTful APIs", "MySQL", "Agile/Scrum", "Git", "Performance Optimization"]
  },
  {
    id: "exon-intern",
    role: "Intern Associate Software Engineer",
    company: "Exon Software Solutions (Pvt) Ltd",
    period: "November 2022 – May 2023",
    type: "Internship",
    location: "Colombo",
    badge: "Exon Hackathon 2024 Champion",
    bullets: [
      "Assisted senior engineers in full-stack development, rigorous debugging, and comprehensive unit testing, reducing post-release bugs by 15%.",
      "Developed responsive, user-centric UI components using PrimeFaces, successfully integrating them with secure Spring Boot backend systems.",
      "Spearheaded the development of an innovative software prototype that secured the winning title at the Exon Hackathon 2024 through rapid problem-solving and coding efficiency."
    ],
    technologies: ["PrimeFaces", "Spring Boot", "Java", "React.js", "Unit Testing", "SDLC", "JIRA"]
  }
];

export const EDUCATION_ITEMS: EducationItem[] = [
  {
    degree: "BSc (Hons) in Software Engineering",
    institution: "Birmingham City University, UK (via Java Institute)",
    period: "Graduated in 27 April 2026",
    details: "Comprehensive specialization in Enterprise Software Architecture, Web Application Development, Distributed Systems, Cloud Computing, and Advanced Algorithms.",
    honors: "Honors Graduate"
  },
  {
    degree: "AAT Level 2 (Accounting)",
    institution: "Association of Accounting Technicians",
    period: "Certified",
    details: "Comprehensive training in corporate financial management, quantitative data analysis, budgeting principles, and accounting methodologies."
  }
];

export const PROJECTS: Project[] = [
  {
    id: "temco-mgmt",
    title: "TEMCO Management System",
    subtitle: "Enterprise Financial Tracking & Automated Lead Platform",
    category: "Full-Stack & Fintech",
    featured: true,
    link: "https://temcobank.com",
    technologies: ["React.js", "Java EE", "MySQL", "RESTful APIs", "Tailwind CSS", "Role-Based Security"],
    role: "Full-Stack Lead Engineer",
    impact: "Automated lead conversion and secured financial auditing records",
    description: "Engineered an automated lead conversion and financial tracking platform for a cooperative banking society using React.js, Java EE, and MySQL.",
    highlights: [
      "Engineered an automated lead conversion and financial tracking platform tailored for banking operations.",
      "Integrated the 'Samma Upakara Thirsara Investment Plan' module to streamline and secure financial records effectively.",
      "Designed secure transactional endpoints with strict role-based access control and high database concurrency handling."
    ]
  },
  {
    id: "olix-holdings",
    title: "Olix Holdings Corporate Platform",
    subtitle: "Modern AI Automation Agency Digital Portal",
    category: "AI & Web",
    featured: true,
    link: "https://olixai.netlify.app",
    technologies: ["React.js", "AI Automation Workflows", "Modern UI/UX", "Tailwind CSS", "Netlify"],
    role: "UI/UX & Frontend Architect",
    impact: "Official digital presence driving client acquisition for AI automation",
    description: "Designed, developed, and deployed the official digital platform (olixai.netlify.app) for an agency specializing in AI automation, utilizing modern UI/UX principles and responsive design to maximize client engagement.",
    highlights: [
      "Designed and deployed the official platform for Olix Holdings specializing in AI automation solutions.",
      "Utilized modern UI/UX principles and dynamic responsive design to maximize client engagement and conversion rates.",
      "Integrated dynamic AI service showcase modules and interactive client consultation funnels."
    ]
  },
  {
    id: "nedp-ananda",
    title: "NEDP System (Ananda College)",
    subtitle: "Specialized Educational Management Infrastructure",
    category: "Full-Stack",
    featured: true,
    technologies: ["Next.js", "Java", "RESTful APIs", "MySQL", "Tailwind CSS"],
    role: "Core Architecture & Frontend Engineer",
    impact: "Unified educational tracking and student data operations for Ananda College",
    description: "Architected a specialized educational management system utilizing Java for core components and Next.js for a high-performance, fast-rendering frontend experience.",
    highlights: [
      "Architected core system components using Java for high-throughput back-end processing.",
      "Implemented a high-performance frontend using Next.js for fast server-side rendering and streamlined user experience.",
      "Unified student records, examination grading modules, and administrative workflows."
    ]
  },
  {
    id: "project-sona",
    title: "Project Sona",
    subtitle: "High-Performance Dynamic Web Frontend",
    category: "Frontend",
    featured: false,
    technologies: ["React.js", "JavaScript (ES6+)", "State Management", "Tailwind CSS", "Vite"],
    role: "Frontend Developer",
    impact: "Optimized state management and rendering logic for maximum application speed",
    description: "Engineered high-performance, dynamic React.js frontend components, optimizing state management and rendering logic to deliver a highly responsive user experience and maximum application speed.",
    highlights: [
      "Developed high-performance dynamic frontend components with fine-grained memoization.",
      "Optimized rendering logic, lifecycle handling, and event dispatchers to deliver maximum application responsiveness."
    ]
  },
  {
    id: "hotel-mgmt",
    title: "Hotel Management System",
    subtitle: "Real-Time Desktop Reservation & Operations Suite",
    category: "Backend / Enterprise",
    featured: false,
    technologies: ["Java", "MySQL", "Desktop GUI", "Relational Database Design", "SQL Query Optimization"],
    role: "Software Engineer",
    impact: "Built real-time reservation & operations management with optimized database",
    description: "Built a comprehensive desktop application for real-time reservation and operations management, featuring a secure, highly optimized MySQL relational database architecture.",
    highlights: [
      "Engineered real-time room reservation, guest check-in/out, and operations management modules.",
      "Designed a secure and highly optimized MySQL relational database schema to prevent double-booking conflicts.",
      "Integrated automated billing calculations and reporting utilities."
    ]
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "AI & System Automation",
    iconName: "BrainCircuit",
    skills: [
      { name: "LLM Integration (OpenAI & Gemini APIs)", level: 95, experience: "2+ Years", tag: "Primary AI" },
      { name: "Prompt Engineering", level: 95, experience: "2+ Years", tag: "Advanced" },
      { name: "RAG (Retrieval-Augmented Generation)", level: 90, experience: "1.5+ Years", tag: "Vector & Search" },
      { name: "LangChain Concepts & Agents", level: 88, experience: "1.5+ Years", tag: "Agentic AI" },
      { name: "Automated Workflows & SaaS Pipelines", level: 92, experience: "2+ Years", tag: "Automation" }
    ]
  },
  {
    title: "Frontend Technologies",
    iconName: "Layout",
    skills: [
      { name: "React.js", level: 95, experience: "3+ Years", tag: "Primary" },
      { name: "Next.js", level: 92, experience: "2.5+ Years", tag: "SSR/App Router" },
      { name: "TypeScript", level: 92, experience: "2.5+ Years", tag: "Type Safe" },
      { name: "JavaScript (ES6+)", level: 96, experience: "3+ Years", tag: "Core" },
      { name: "HTML5 & CSS3 / Tailwind CSS", level: 96, experience: "3+ Years", tag: "Styling" },
      { name: "PrimeReact & PrimeFaces", level: 88, experience: "2 Years" },
      { name: "Figma (UI/UX Prototyping)", level: 85, experience: "2+ Years" }
    ]
  },
  {
    title: "Backend & Architecture",
    iconName: "Server",
    skills: [
      { name: "Java EE", level: 92, experience: "3+ Years", tag: "Enterprise" },
      { name: "Spring Boot", level: 90, experience: "2.5+ Years", tag: "Microservices" },
      { name: "Node.js (Express)", level: 88, experience: "2+ Years" },
      { name: "RESTful APIs", level: 96, experience: "3+ Years", tag: "High Perf" },
      { name: "Microservices Architecture", level: 88, experience: "2 Years" },
      { name: "PHP & Laravel", level: 82, experience: "1.5 Years" }
    ]
  },
  {
    title: "Cloud, DevOps & Tools",
    iconName: "Cloud",
    skills: [
      { name: "AWS (EC2, S3)", level: 85, experience: "2 Years", tag: "Cloud" },
      { name: "Docker", level: 85, experience: "1.5+ Years", tag: "Containers" },
      { name: "CI/CD Pipelines", level: 86, experience: "2 Years" },
      { name: "Git & GitHub", level: 95, experience: "3+ Years", tag: "Daily" },
      { name: "Maven & Build Tooling", level: 90, experience: "2.5+ Years" },
      { name: "Postman & API Testing", level: 94, experience: "3+ Years" },
      { name: "JIRA", level: 92, experience: "2.5+ Years" }
    ]
  },
  {
    title: "Databases",
    iconName: "Database",
    skills: [
      { name: "MySQL", level: 94, experience: "3+ Years", tag: "Primary SQL" },
      { name: "PostgreSQL", level: 90, experience: "2 Years", tag: "Relational" },
      { name: "MSSQL", level: 86, experience: "2 Years" },
      { name: "Firebase (Firestore & Auth)", level: 90, experience: "2 Years" },
      { name: "Relational DB Design & SQL Optimization", level: 92, experience: "3+ Years" }
    ]
  },
  {
    title: "Tools & Methodologies",
    iconName: "Cpu",
    skills: [
      { name: "Agile / Scrum Methodology", level: 96, experience: "3+ Years", tag: "Practitioner" },
      { name: "SDLC & Clean Code", level: 96, experience: "3+ Years" },
      { name: "Unit Testing & QA", level: 92, experience: "3+ Years" },
      { name: "VS Code & IntelliJ IDEA", level: 96, experience: "3+ Years" }
    ]
  }
];

export const STATS = [
  { label: "Hands-on Experience", value: "3+", suffix: "Years", desc: "Full-Stack & AI System Development" },
  { label: "Core Enterprise Projects", value: "5+", suffix: "Systems", desc: "Banking, AI Agency, Education & SaaS" },
  { label: "Hackathon Title", value: "2024", suffix: "Champion", desc: "Exon Hackathon Software Prototype" },
  { label: "Promotion Velocity", value: "6", suffix: "Months", desc: "Intern to Associate Engineer Fast-Track" }
];

export const AI_CAPABILITIES = [
  {
    title: "Custom RAG Architectures",
    description: "Building production Retrieval-Augmented Generation systems with vector embeddings, semantic search, and contextual document chunking for instant query retrieval.",
    tags: ["Embeddings", "Vector DBs", "Semantic Search", "Document Ingestion"]
  },
  {
    title: "LLM Multi-Agent Workflows",
    description: "Architecting autonomous AI agent loops with tool-calling, function executions, and structured JSON outputs using OpenAI GPT-4o and Google Gemini models.",
    tags: ["Gemini 1.5/2.0", "OpenAI APIs", "Function Calling", "Agent Workflows"]
  },
  {
    title: "Enterprise Process Automation",
    description: "Automating manual business workflows, financial lead pipelines, customer support routing, and recurring SaaS billing operations with resilient error handling.",
    tags: ["Automated Workflows", "Fintech Logic", "Webhook Triggers", "Microservices"]
  },
  {
    title: "Prompt Engineering & Evaluation",
    description: "Designing few-shot prompts, system guardrails, hallucination prevention mechanisms, and model evaluation benchmarks for production reliability.",
    tags: ["System Guardrails", "Few-Shot Prompting", "JSON Schema Enforcement", "Benchmarking"]
  }
];

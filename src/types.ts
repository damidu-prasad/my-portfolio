export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: 'Full-Stack' | 'Frontend' | 'Backend / Enterprise' | 'AI & Web' | 'Full-Stack & Fintech';
  technologies: string[];
  description: string;
  highlights: string[];
  link?: string;
  featured: boolean;
  role: string;
  impact: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  type: 'Full-time' | 'Internship' | 'Part-time' | 'Freelance / Contract';
  location: string;
  bullets: string[];
  badge?: string;
  technologies: string[];
}

export interface EducationItem {
  degree: string;
  institution: string;
  period: string;
  details: string;
  honors?: string;
}

export interface SkillCategory {
  title: string;
  iconName: string;
  skills: {
    name: string;
    level: number; // 0 to 100
    experience: string;
    tag?: string;
  }[];
}

export interface ContactDetails {
  fullName: string;
  displayName: string;
  title: string;
  email: string;
  phones: string[];
  location: string;
  languages: string[];
  portfolioUrl: string;
  linkedinUrl: string;
  githubUrl: string;
}

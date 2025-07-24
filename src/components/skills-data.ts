import {
  Coffee,
  Code2,
  Cpu,
  Database,
  Globe,
  Layers,
  Zap,
  GitBranch,
  Boxes,
  Cloud,
  Server
} from "lucide-react";

export interface Skill {
  name: string;
  icon: React.ElementType;
  description: string;
}

export interface Category {
  title: string;
  skills: Skill[];
}

export const skillCategories: Category[] = [
  {
    title: "Languages",
    skills: [
      { name: "Java", icon: Coffee, description: "Primary backend language" },
      { name: "JavaScript", icon: Code2, description: "Frontend & backend scripting" },
      { name: "Python", icon: Code2, description: "Data analysis & automation" },
      { name: "C++", icon: Cpu, description: "System programming & DSA" },
      { name: "SQL", icon: Database, description: "Database queries & design" },
      { name: "HTML/CSS", icon: Globe, description: "Web markup & styling" }
    ]
  },
  {
    title: "Frameworks",
    skills: [
      { name: "Spring Boot", icon: Layers, description: "Java web framework" },
      { name: "React", icon: Zap, description: "Frontend UI library" },
      { name: "Node.js", icon: Server, description: "JavaScript runtime" },
      { name: "Express.js", icon: Server, description: "Node.js web framework" },
      { name: "Socket.IO", icon: Zap, description: "Real-time communication" }
    ]
  },
  {
    title: "Databases",
    skills: [
      { name: "MySQL", icon: Database, description: "Relational database" },
      { name: "PostgreSQL", icon: Database, description: "Advanced SQL database" },
      { name: "MongoDB", icon: Database, description: "NoSQL document store" },
      { name: "Redis", icon: Zap, description: "In-memory caching" }
    ]
  },
  {
    title: "Tools & Cloud",
    skills: [
      { name: "Git", icon: GitBranch, description: "Version control" },
      { name: "Docker", icon: Boxes, description: "Containerization" },
      { name: "AWS S3", icon: Cloud, description: "Cloud storage" },
      { name: "Kafka", icon: Server, description: "Event streaming" },
      { name: "Microservices", icon: Layers, description: "Distributed architecture" },
      { name: "REST APIs", icon: Globe, description: "Web service design" }
    ]
  }
];

export const proficiencies = [
  { label: "Java & Spring Boot", percent: 90 },
  { label: "React & JavaScript", percent: 85 },
  { label: "Database Design", percent: 80 },
  { label: "Cloud & DevOps", percent: 75 }
] as const;

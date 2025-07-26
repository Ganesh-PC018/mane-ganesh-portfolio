import {
  ExternalLink,
  Github,
  MessageCircle,
  Hotel,
  Receipt,
  Dumbbell,
  Send
} from "lucide-react";

import { ProjectCard } from "./ProjectCard";
import { ProjectsCarousel } from "./ProjectsCarousel"; // remove if not using

export interface Project {
  title: string;
  description: string;
  icon: React.ElementType;
  tech: string[];
  highlights: string[];
  liveUrl?: string;
  githubUrl?: string;
  color: string;
}

export const ProjectsSection = () => {
  const projects: Project[] = [
    {
      title: "AI-Powered Chat",
      description: "Real-time chat with Google Gemini AI and Redis caching for optimal performance.",
      icon: MessageCircle,
      tech: ["MERN", "Socket.IO", "Redis", "Gemini AI"],
      highlights: ["AI assistant integration", "40% lower latency", "Live messaging"],
      liveUrl: "#",
      githubUrl: "#",
      color: "bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20"
    },
    {
      title: "Hotel Booking System",
      description: "Full-stack booking platform with secure S3 storage and comprehensive API design.",
      icon: Hotel,
      tech: ["Spring Boot", "React", "MySQL", "AWS S3"],
      highlights: ["15+ REST APIs", "Secure image uploads", "Responsive UI"],
      liveUrl: "https://hotel-booking-frontend-3jle.onrender.com/",
      githubUrl: "#",
      color: "bg-gradient-to-br from-secondary/10 to-secondary/5 border-secondary/20"
    },
    {
      title: "Billing Manager",
      description: "Enterprise billing with RBAC and Razorpay payment processing.",
      icon: Receipt,
      tech: ["Spring Boot", "React", "MySQL", "Razorpay", "JWT"],
      highlights: ["Role-based access", "Instant invoices", "100+ records handled"],
      liveUrl: "https://billing-app-frontend.onrender.com/",
      githubUrl: "#",
      color: "bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20"
    },
    {
      title: "Gym Manager",
      description: "Client-side portal for attendance, member onboarding, automated emails, and web dashboards.",
      icon: Dumbbell,
      tech: ["Spring Boot", "React", "PostgreSQL", "SendGrid"],
      highlights: ["QR attendance logs", "Email welcome flows", "Member history analytics"],
      liveUrl: "#",
      githubUrl: "#",
      color: "bg-gradient-to-br from-secondary/10 to-secondary/5 border-secondary/20"
    },
    {
      title: "STOMP Chat Hub",
      description: "Enterprise chat using Spring Boot STOMP over WebSockets with topic subscriptions.",
      icon: Send,
      tech: ["Spring Boot", "STOMP", "React", "WebSocket", "Redis"],
      highlights: ["Topic-based rooms", "Typing indicators", "Message persistence"],
      liveUrl: "#",
      githubUrl: "#",
      color: "bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20"
    }
  ];

  return (
    <section id="projects" className="px-4 py-16">
      <div className="mx-auto max-w-6xl space-y-12">
        {/* Header */}
        <header className="space-y-4 text-center">
          <h2 className="text-2xl font-bold tracking-tight">Featured Projects</h2>
          <div className="mx-auto h-1 w-16 rounded-full bg-primary" />
          <p className="mx-auto max-w-2xl text-sm text-muted-foreground">
            Showcasing scalable applications built with modern technologies
          </p>
        </header>

        {/* Projects Grid / Carousel */}
        <div className="hidden gap-6 md:grid md:grid-cols-2 lg:grid-cols-3">
          {projects.map(p => (
            <ProjectCard key={p.title} {...p} />
          ))}
        </div>

        {/* Mobile carousel */}
        <div className="md:hidden">
          <ProjectsCarousel projects={projects} />
        </div>

        {/* More Projects CTA */}
        <div className="text-center">
          <div className="inline-block rounded-lg border border-border bg-card p-6">
            <h3 className="mb-2 text-lg font-semibold">Want to see more?</h3>
            <p className="mb-4 text-sm text-muted-foreground">
              Browse additional repositories and ongoing work
            </p>
            <a
              href="https://github.com/ganesh-pc018"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md border border-primary bg-transparent px-4 py-2 text-sm
                         font-medium text-primary transition-colors hover:bg-primary hover:text-primary-foreground">
              <Github className="h-4 w-4" />
              GitHub Profile
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

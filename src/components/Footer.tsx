import { Heart, Github, Linkedin, Mail } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="py-8 px-4 border-t border-border">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Left side - Copyright */}
          <div className="flex items-center gap-1 text-compact-sm text-muted-foreground">
            <span>© 2025 Ganesh Mane.</span>
            <Heart className="w-3 h-3 text-primary fill-current" />
            <span>React & Tailwind CSS</span>
          </div>

          {/* Center - Navigation Links */}
          <div className="flex items-center gap-6 text-compact-sm">
            <button 
              onClick={() => document.getElementById("home")?.scrollIntoView({ behavior: "smooth" })}
              className="text-muted-foreground hover:text-primary transition-colors duration-200"
            >
              Home
            </button>
            <button 
              onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
              className="text-muted-foreground hover:text-primary transition-colors duration-200"
            >
              About
            </button>
            <button 
              onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
              className="text-muted-foreground hover:text-primary transition-colors duration-200"
            >
              Projects
            </button>
            <button 
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              className="text-muted-foreground hover:text-primary transition-colors duration-200"
            >
              Contact
            </button>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="mailto:mane.ganesh.pc@gmail.com"
              className="skill-icon hover:bg-primary hover:text-primary-foreground"
              aria-label="Email"
            >
              <Mail className="w-4 h-4" />
            </a>
            <a
              href="https://github.com/Ganesh-PC018"
              target="_blank"
              rel="noopener noreferrer"
              className="skill-icon hover:bg-foreground hover:text-background"
              aria-label="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href="https://linkedin.com/in/ganeshrmane"
              target="_blank"
              rel="noopener noreferrer"
              className="skill-icon hover:bg-secondary hover:text-secondary-foreground"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Bottom text for mobile */}
        <div className="md:hidden text-center mt-4 pt-4 border-t border-border">
          <p className="text-compact-xs text-muted-foreground">
            Available for internship opportunities
          </p>
        </div>
      </div>
    </footer>
  );
};
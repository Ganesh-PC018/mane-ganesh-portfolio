import { useState, useEffect, useRef } from "react";
import { Download, Eye, ChevronDown, ExternalLink } from "lucide-react";
import ganeshAvatar from "../assets/ganesh-avatar.jpg";
import resume from "../assets/resume.pdf";

export const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [cursorXY, setCursorXY] = useState({ x: -100, y: -100 });
  const heroRef = useRef(null);

  // Fade-in animation
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Floating cursor gradient effect (desktop only)
  useEffect(() => {
    const handleMouseMove = (e: { clientX: any; clientY: any; }) => {
      if (window.innerWidth > 768) {
        setCursorXY({ x: e.clientX, y: e.clientY });
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const scrollToAbout = () => {
    const aboutSection = document.getElementById("about");
    if (aboutSection) aboutSection.scrollIntoView({ behavior: "smooth" });
  };

  const profiles = [
    {
      name: "GeeksforGeeks",
      label: "Top 1%",
      href: "https://www.geeksforgeeks.org/user/mane_",
      badge: "text-primary",
    },
    {
      name: "HackerRank",
      label: "5★ Java",
      href: "https://www.hackerrank.com/mane_ganesh_pc",
      badge: "text-secondary",
    },
    {
      name: "LeetCode",
      label: "200+ Problems",
      href: "https://leetcode.com/mane_ganeshh",
      badge: "text-primary",
    },
    {
      name: "Github",
      label: "Active",
      href: "https://github.com/Ganesh-PC018",
      badge: "text-secondary",
    },
  ];

  const stats = [
    { value: "3+", label: "Years Learning", color: "text-primary" },
    { value: "10+", label: "Projects Built", color: "text-secondary" },
    { value: "5★", label: "HackerRank", color: "text-yellow-500" },
  ];

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center px-4 pt-16 bg-gradient-to-br from-white via-gray-50 to-slate-100 overflow-hidden"
    >
      {/* Animated floating gradient (desktop only) */}
      {window.innerWidth > 768 && (
        <div
          className="absolute pointer-events-none mix-blend-overlay opacity-20 dark:opacity-10 transition-opacity"
          style={{
            left: cursorXY.x,
            top: cursorXY.y,
            width: "400px",
            height: "400px",
            background:
              "radial-gradient( circle, rgba(99, 102, 241, 0.8), rgba(217, 119, 6, 0) 70% )",
            transform: "translate(-50%, -50%)",
            zIndex: 0,
          }}
        />
      )}

      <div className="max-w-6xl mx-auto w-full relative z-[1]">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          {/* Left Side - Text Content */}
          <div
            className={`space-y-8 transform transition-opacity duration-700 ease-in ${
              isVisible ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="flex items-center gap-3 animate-fadeIn">
              <span className="text-muted-foreground text-base">👋</span>
              <span className="text-muted-foreground text-base">
                Hello there!
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-extrabold text-foreground leading-tight">
              I'm{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-pink-500 animate-gradient-wave animate-infinite">
                Ganesh Mane
              </span>
            </h1>

            <h2 className="text-xl md:text-2xl font-semibold text-muted-foreground animate-pulse-slow">
              <span className="text-secondary hover:underline hover:underline-offset-4 transition-all duration-300">
                Java Full Stack Developer
              </span>
            </h2>

            <p className="text-base text-muted-foreground max-w-lg leading-relaxed">
              Building scalable applications with{" "}
              <strong className="text-foreground hover:bg-foreground/10 px-1 rounded transition-colors duration-200">
                Spring Boot
              </strong>
              ,{" "}
              <strong className="text-foreground hover:bg-foreground/10 px-1 rounded transition-colors duration-200">
                React
              </strong>
              , and{" "}
              <strong className="text-foreground hover:bg-foreground/10 px-1 rounded transition-colors duration-200">
                AI
              </strong>
              . <br />
              I focus on{" "}
              <span className="decoration-primary decoration-wavy decoration-2 underline-offset-4 hover:text-primary hover:decoration-primary/50 transition-all duration-300">
                clean code
              </span>{" "}
              and{" "}
              <span className="decoration-secondary decoration-wavy decoration-2 underline-offset-4 hover:text-secondary hover:decoration-secondary/50 transition-all duration-300">
                innovative solutions
              </span>
              .
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <button
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium border-2 border-primary rounded-full text-primary hover:bg-primary hover:text-white hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 active:scale-95"
                onClick={() =>
                  document
                    .getElementById("projects")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                <Eye className="w-4 h-4" />
                My Projects
              </button>
              <a
                href={resume}
                download
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium rounded-full bg-gradient-to-r from-teal-500 to-blue-500 text-white hover:brightness-110 hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300 active:scale-95"
              >
                <Download className="w-4 h-4" />
                Download Resume
              </a>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border/50">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="text-center animate-fadeInUp"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div
                    className={`text-xl md:text-2xl font-bold ${stat.color} hover:scale-110 transition-transform duration-200`}
                  >
                    {stat.value}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Avatar */}
          <div
            className={`flex justify-center transition-opacity duration-700 ease-in ${
              isVisible ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="relative group">
              <div className="w-72 h-72 md:w-80 md:h-80 rounded-3xl overflow-hidden shadow-xl border-4 border-primary/30 hover:shadow-2xl hover:border-primary/50 transition-all duration-300">
                <img
                  src={ganeshAvatar}
                  alt="Ganesh Mane"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="eager"
                />
              </div>
              {/* Floating dots */}
              <div className="absolute -top-3 -right-3 w-6 h-6 bg-primary rounded-full animate-ping" />
              <div
                className="absolute -bottom-4 -left-4 w-5 h-5 bg-secondary rounded-full animate-pulse"
                style={{ animationDelay: "800ms" }}
              />
            </div>
          </div>
        </div>

        {/* Scroll Down Indicator */}
        {/* <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 animate-bounce">
          <button
            onClick={scrollToAbout}
            aria-label="Scroll to About section"
            className="flex flex-col items-center text-muted-foreground hover:text-primary transition duration-300 hover:scale-110"
          >
            <span className="text-xs tracking-widest uppercase">Scroll Down</span>
            <ChevronDown className="w-5 h-5 mt-1" />
          </button>
        </div> */}

        {/* Competitive Programming Profiles */}
        <div className="mt-10 md:mt-16 animate-fadeInUp">
          <h4 className="text-lg font-semibold text-foreground mb-4 text-center md:text-left group">
            <span className="inline-flex items-center gap-2">
              <span className="group-hover:translate-x-1 transition-transform duration-300">
                Competitive Programming
              </span>
              <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </span>
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {profiles.map((profile) => (
              <a
                key={profile.name}
                href={profile.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group text-center p-3 rounded-xl border border-border bg-muted/50 hover:bg-muted hover:shadow-lg transition-all duration-200 hover:-translate-y-1 flex flex-col"
              >
                <div className="text-sm font-semibold text-foreground group-hover:text-primary">
                  {profile.name}
                </div>
                <div
                  className={`text-xs mt-1 font-medium ${profile.badge} group-hover:underline`}
                >
                  {profile.label}
                  <span className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    ↗
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

import { Briefcase } from "lucide-react";
import { motion } from "framer-motion";

export const ExperienceSection = () => {
  const experiences = [
    {
      company: "C-DAC (Centre for Development of Advanced Computing)",
      role: "Cyber Security Intern",
      duration: "Dec 2024 – Feb 2025",
      points: [
        "Conducted network vulnerability analysis using Wireshark, Nmap, and dnsEnum.",
        "Built a Windows-based IDS using Snort to detect suspicious activity.",
        "Simulated ethical hacking attacks using Metasploit and custom tools.",
      ],
    },
    {
      company: "Vowtech IT and Software Development",
      role: "Frontend Developer Intern",
      duration: "May 2022 – Aug 2022",
      points: [
        "Worked on frontend modules using HTML5, CSS3, JavaScript, and React.js.",
        "Integrated RESTful APIs with dynamic React components.",
        "Improved UI performance and responsiveness across mobile and desktop.",
        "Collaborated with backend team for Spring Boot integration.",
      ],
    },
  ];

  return (
    <section id="experience" className="py-16 px-6 bg-white text-gray-900">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center px-4 py-2 mb-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full shadow-lg">
            <Briefcase className="w-6 h-6 mr-2" />
            <span className="font-semibold text-lg">Experience</span>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Internships and industry experience using modern tech stacks.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Vertical timeline line */}
          <div className="hidden md:block absolute left-6 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-400 to-indigo-600 rounded-full"></div>

          <div className="space-y-10">
            {experiences.map((exp, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.3 }}
                viewport={{ once: true }}
                className="relative md:pl-16 md:pr-6 p-6 rounded-xl bg-gradient-to-r from-white via-blue-50 to-white shadow-lg hover:shadow-2xl transition-shadow border border-blue-200"
              >
                {/* Timeline circle */}
                <div className="hidden md:block absolute left-0 top-8 w-5 h-5 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600 border-4 border-white shadow"></div>

                <h3 className="text-xl font-semibold text-gray-900">
                  {exp.role}
                </h3>
                <p className="text-blue-700 font-medium mt-1">{exp.company}</p>
                <p className="text-sm text-gray-500 mt-1 mb-3">{exp.duration}</p>

                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  {exp.points.map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

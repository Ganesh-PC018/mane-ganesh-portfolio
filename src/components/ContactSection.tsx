import { useState } from "react";
import { Mail, Linkedin, Github, MapPin, Send, ExternalLink, Star, Trophy, Code } from "lucide-react";

export const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch("http://localhost:5000/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();
      if (result.success) {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error("Error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(null), 5000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" className="relative py-20 px-4 bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/40 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDk5LDEwMiwyNDEsMC4wNSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-40"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-blue-100 mb-6">
            <Mail className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-600">Let's Connect</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent mb-6">
            Get In Touch
          </h2>
          
          <div className="w-24 h-1.5 bg-gradient-to-r from-blue-500 to-indigo-600 mx-auto rounded-full mb-6"></div>
          
          <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Looking for internship opportunities or want to collaborate on exciting projects? 
            I'd love to hear from you and explore how we can work together!
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Contact Info Card - Compact */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white/70 backdrop-blur-md rounded-2xl p-3 border border-white/20 shadow-md">
              <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                <div className="w-1.5 h-5 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full"></div>
                Let's Connect
              </h3>
              <div className="space-y-3">
                {/* Email Contact */}
                <a 
                  href="mailto:mane.ganesh.pc@gmail.com"
                  className="group flex items-center gap-2 p-1 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-lg hover:shadow-md transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="w-7 h-7 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-md flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors text-[13px]">Email</div>
                    <div className="text-xs text-slate-600">mane.ganesh.pc@gmail.com</div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-blue-500 transition-colors" />
                </a>

                {/* LinkedIn Contact */}
                <a 
                  href="https://linkedin.com/in/ganeshrmane"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 p-2 bg-gradient-to-r from-blue-50 to-sky-50 border border-blue-100 rounded-lg hover:shadow-md hover:shadow-blue-500/10 transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="w-7 h-7 bg-gradient-to-br from-blue-600 to-sky-600 rounded-md flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                    <Linkedin className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors text-[13px]">LinkedIn</div>
                    <div className="text-xs text-slate-600">Connect professionally</div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-blue-500 transition-colors" />
                </a>

                {/* GitHub Contact */}
                <a 
                  href="https://github.com/ganesh-pc018"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 p-2 bg-gradient-to-r from-slate-50 to-gray-50 border border-slate-200 rounded-lg hover:shadow-md hover:shadow-slate-500/10 transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="w-7 h-7 bg-gradient-to-br from-slate-700 to-gray-900 rounded-md flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                    <Github className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-slate-900 group-hover:text-slate-700 transition-colors text-[13px]">GitHub</div>
                    <div className="text-xs text-slate-600">View my repositories</div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-slate-600 transition-colors" />
                </a>

                {/* Location Info */}
                <div className="flex items-center gap-3 p-2 bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-100 rounded-lg">
                  <div className="w-7 h-7 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-md flex items-center justify-center text-white">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900 text-[13px]">Location</div>
                    <div className="text-xs text-slate-600">Pune, Maharashtra, India</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Competitive Programming - Compact */}
            <div className="bg-white/70 backdrop-blur-md rounded-2xl p-3 border border-white/20 shadow-md">
              <h4 className="text-base font-semibold text-slate-900 mb-2 flex items-center gap-2">
                <Code className="w-4 h-4 text-indigo-600" />
                Competitive Programming
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <a 
                  href="https://www.geeksforgeeks.org/user/mane_"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-2 bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-lg hover:shadow-md hover:shadow-green-500/10 transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="text-center text-xs">
                    <div className="font-semibold text-slate-900 group-hover:text-green-600 transition-colors">GeeksforGeeks</div>
                    <div className="text-green-600 font-medium flex items-center justify-center gap-1 mt-1">
                      <Trophy className="w-3 h-3" />
                      Top 1% Institute Rank
                    </div>
                  </div>
                </a>
                <a 
                  href="https://www.hackerrank.com/mane_ganesh_pc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-2 bg-gradient-to-br from-blue-50 to-sky-50 border border-blue-200 rounded-lg hover:shadow-md hover:shadow-blue-500/10 transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="text-center text-xs">
                    <div className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">HackerRank</div>
                    <div className="text-blue-600 font-medium flex items-center justify-center gap-1 mt-1">
                      <Star className="w-3 h-3 fill-current" />
                      5★ Java
                    </div>
                  </div>
                </a>
                <a 
                  href="https://leetcode.com/mane_ganeshh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-2 bg-gradient-to-br from-orange-50 to-yellow-50 border border-orange-200 rounded-lg hover:shadow-md hover:shadow-orange-500/10 transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="text-center text-xs">
                    <div className="font-semibold text-slate-900 group-hover:text-orange-600 transition-colors">LeetCode</div>
                    <div className="text-orange-600 font-medium text-xs">200+ Problems</div>
                  </div>
                </a>
                <a 
                  href="https://github.com/Ganesh-PC018"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-2 bg-gradient-to-br from-purple-50 to-indigo-50 border border-purple-200 rounded-lg hover:shadow-md hover:shadow-purple-500/10 transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="text-center text-xs">
                    <div className="font-semibold text-slate-900 group-hover:text-purple-600 transition-colors">GitHub</div>
                    <div className="text-purple-600 font-medium">Active Contributor</div>
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* Send a Message Form - Compact */}
          <div className="lg:col-span-3">
            <div className="bg-white/80 backdrop-blur-md rounded-2xl p-3 md:p-5 border border-white/30 shadow-md">
              <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                <div className="w-1.5 h-5 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full"></div>
                Send a Message
              </h3>
              <form onSubmit={handleSubmit} className="space-y-2">
                {/* Name */}
                <div className="relative group">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-3 bg-slate-50 border-2 border-slate-200 rounded-2xl text-slate-900 focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 peer transition-all duration-300 placeholder-transparent group-hover:border-slate-300 text-sm"
                    placeholder="Your Name"
                  />
                  <label className="absolute left-3 top-3 text-slate-500 transition-all duration-300 pointer-events-none peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-slate-500 peer-focus:-top-2 peer-focus:left-2 peer-focus:text-sm peer-focus:text-blue-600 peer-focus:bg-white peer-focus:px-1 peer-focus:rounded peer-valid:-top-2 peer-valid:left-2 peer-valid:text-sm peer-valid:text-slate-600 peer-valid:bg-white peer-valid:px-1 peer-valid:rounded text-sm">
                    Your Name *
                  </label>
                </div>

                {/* Email */}
                <div className="relative group">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-3 bg-slate-50 border-2 border-slate-200 rounded-2xl text-slate-900 focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 peer transition-all duration-300 placeholder-transparent group-hover:border-slate-300"
                    placeholder="Email Address"
                  />
                  <label className="absolute left-3 top-3 text-slate-500 transition-all duration-300 pointer-events-none peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-slate-500 peer-focus:-top-2 peer-focus:left-2 peer-focus:text-sm peer-focus:text-blue-600 peer-focus:bg-white peer-focus:px-1 peer-focus:rounded peer-valid:-top-2 peer-valid:left-2 peer-valid:text-sm peer-valid:text-slate-600 peer-valid:bg-white peer-valid:px-1 peer-valid:rounded">
                    Email Address *
                  </label>
                </div>

                {/* Message */}
                <div className="relative group">
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full px-3 py-3 bg-slate-50 border-2 border-slate-200 rounded-2xl text-slate-900 focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 peer transition-all duration-300 placeholder-transparent resize-none group-hover:border-slate-300"
                    placeholder="Your Message"
                  />
                  <label className="absolute left-3 top-3 text-slate-500 transition-all duration-300 pointer-events-none peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-slate-500 peer-focus:-top-2 peer-focus:left-2 peer-focus:text-sm peer-focus:text-blue-600 peer-focus:bg-white peer-focus:px-1 peer-focus:rounded peer-valid:-top-2 peer-valid:left-2 peer-valid:text-sm peer-valid:text-slate-600 peer-valid:bg-white peer-valid:px-1 peer-valid:rounded">
                    Your Message *
                  </label>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-2 px-4 rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-blue-500/30 hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 group"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                      Send Message
                    </>
                  )}
                </button>

                {/* Status Messages */}
                {submitStatus === "success" && (
                  <div className="p-2 bg-green-50 border border-green-200 rounded-2xl">
                    <p className="text-green-700 font-medium">
                      ✅ Message sent successfully! I'll get back to you soon.
                    </p>
                  </div>
                )}

                {submitStatus === "error" && (
                  <div className="p-2 bg-red-50 border border-red-200 rounded-2xl">
                    <p className="text-red-700 font-medium">
                      ❌ Something went wrong. Please try again or contact me directly.
                    </p>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

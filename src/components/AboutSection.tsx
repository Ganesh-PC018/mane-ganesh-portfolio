import React, { useState, useEffect, useRef } from 'react';
import { GraduationCap, Code, Award, ChevronDown } from "lucide-react";


// Helper component for animated numbers
const AnimatedNumber = ({ value }) => {
    const [currentValue, setCurrentValue] = useState(0);
    const targetValue = parseInt(value, 10);
    const elementRef = useRef(null);


    useEffect(() => {
        const duration = 1500;
        let startTime = null;


        const animate = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = timestamp - startTime;
            const percentage = Math.min(progress / duration, 1);
            const animatedValue = Math.floor(percentage * targetValue);
            setCurrentValue(animatedValue);


            if (progress < duration) {
                requestAnimationFrame(animate);
            }
        };


        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    requestAnimationFrame(animate);
                    observer.disconnect();
                }
            },
            { threshold: 0.5 }
        );


        if (elementRef.current) {
            observer.observe(elementRef.current);
        }


        return () => {
            if (elementRef.current) {
                observer.disconnect();
            }
        };
    }, [targetValue]);


    return <span ref={elementRef}>{currentValue}</span>;
};

// ✨ NEW: Custom hook to detect when an element is in view
const useInView = (ref, options) => {
    const [isInView, setIsInView] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsInView(true);
                observer.unobserve(entry.target);
            }
        }, options);

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, [ref, options]);

    return isInView;
};


export const AboutSection = () => {
    // ✨ NEW: Refs and in-view state for the animated cards
    const educationRef = useRef(null);
    const achievementsRef = useRef(null);
    const isEducationInView = useInView(educationRef, { threshold: 0.2 });
    const isAchievementsInView = useInView(achievementsRef, { threshold: 0.2 });
    
    // Education items for clean mapping
    const educationData = [
        {
            degree: "B.Tech, Information Technology",
            institution: "SGGS Institute, Nanded",
            duration: "2023 - Present (CGPA: 8.15)"
        },
        {
            degree: "Diploma, Computer Engineering",
            institution: "Govt. Polytechnic Pune",
            duration: "2020 - 2023 (90.33%)"
        },
        {
            degree: "State Secondary Certificate",
            institution: "Aurangabad Division-Maharashtra",
            duration: "2019 - 2020 (95.60%)"
        }
    ];

    const achievementsData = [
        "Top 1% on GeeksforGeeks (Institute)",
        "5★ Gold Badge in Java on HackerRank",
        "200+ DSA Problems on LeetCode"
    ];


    return (
        <section id="about" className="py-16 px-4 bg-gray-50 text-gray-800 font-sans overflow-x-hidden">
            <div className="max-w-6xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900">About Me</h2>
                    <p className="mt-3 text-base md:text-lg text-gray-600">A glimpse into my journey and passion for technology.</p>
                    <div className="mt-4 w-16 h-1.5 bg-indigo-600 mx-auto rounded-full"></div>
                </div>


                {/* Main Content Grid */}
                <div className="grid md:grid-cols-2 gap-8">
                    {/* Bio & Quick Facts */}
                    <div className="space-y-6">
                        <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="bg-indigo-100 text-indigo-600 p-2 rounded-full">
                                    <Code className="w-5 h-5" />
                                </div>
                                <h3 className="text-lg font-semibold">Bio</h3>
                            </div>
                            <p className="text-sm text-gray-700 text-justify">
                                I'm a motivated Information Technology student passionate about building scalable and robust full-stack applications. Proficient in <strong className="text-indigo-600">Java & Spring Boot</strong> (backend) and <strong className="text-indigo-600">React</strong> (frontend). Skilled in DSA and interested in microservices and cloud tech.
                            </p>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            {[
                                { value: "3", label: "Years Coding" },
                                { value: "15", label: "Technologies" },
                                { value: "5", label: "Major Projects" },
                                { value: "1000", label: "DSA Problems Solved" },
                            ].map((fact, index) => (
                                <div key={index} className="bg-white border border-gray-100 rounded-lg p-4 text-center text-sm shadow-sm hover:shadow-md transition-all">
                                    <div className="text-2xl font-bold text-indigo-600">
                                        <AnimatedNumber value={fact.value} />{fact.value === "1000" ? "+" : ''}
                                    </div>
                                    <div className="mt-1 text-gray-500">{fact.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>


                    {/* Right Column with Animated Cards */}
                    <div className="space-y-6">
                        {/* ✨ MODIFIED: Education Card with Animation */}
                        <div ref={educationRef} className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
                            <div className={`flex items-center gap-3 mb-4 transform transition-all duration-500 ${isEducationInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                                <div className="bg-green-100 text-green-600 p-2 rounded-full">
                                    <GraduationCap className="w-5 h-5" />
                                </div>
                                <h3 className="text-lg font-semibold">Education</h3>
                            </div>
                            <div className="space-y-4 text-sm text-gray-700">
                                {educationData.map((edu, index) => (
                                    <div 
                                        key={index}
                                        // ✨ NEW: Staggered animation classes
                                        className={`transform transition-all duration-500 ${isEducationInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                                        style={{ transitionDelay: `${150 * (index + 1)}ms` }} // Staggered delay
                                    >
                                        <p className="font-medium">{edu.degree}</p>
                                        <p>{edu.institution}</p>
                                        <p className="text-xs text-gray-500">{edu.duration}</p>
                                    </div>
                                ))}
                            </div>
                        </div>


                        {/* ✨ MODIFIED: Achievements Card with Animation */}
                        <div ref={achievementsRef} className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
                             <div className={`flex items-center gap-3 mb-4 transform transition-all duration-500 ${isAchievementsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                                <div className="bg-yellow-100 text-yellow-600 p-2 rounded-full">
                                    <Award className="w-5 h-5" />
                                </div>
                                <h3 className="text-lg font-semibold">Achievements</h3>
                            </div>
                            <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
                                {achievementsData.map((ach, index) => (
                                    <li 
                                        key={index}
                                        // ✨ NEW: Staggered animation classes
                                        className={`transform transition-all duration-500 ${isAchievementsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                                        style={{ transitionDelay: `${150 * (index + 1)}ms` }} // Staggered delay
                                    >
                                        {ach}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};


export default AboutSection;
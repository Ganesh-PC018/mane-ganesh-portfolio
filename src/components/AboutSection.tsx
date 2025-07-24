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

        const animate = (timestamp: number) => {
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

        return () => observer.disconnect();
    }, [targetValue]);

    return <span ref={elementRef}>{currentValue}</span>;
};

export const AboutSection = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <section id="about" className="py-16 px-4 bg-gray-50 text-gray-800 font-sans">
            <div className="max-w-6xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900">About Me</h2>
                    <p className="mt-3 text-base md:text-lg text-gray-600">A glimpse into my journey and passion for technology.</p>
                    <div className="mt-4 w-16 h-1.5 bg-indigo-600 mx-auto rounded-full"></div>
                </div>

                {/* Main Content Grid */}
                <div className="grid md:grid-cols-2 gap-8">
                    {/* Bio */}
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
                            {/* <button
                                onClick={() => setIsExpanded(!isExpanded)}
                                className="mt-4 inline-flex items-center gap-1 text-sm text-indigo-600 font-medium hover:text-indigo-800"
                            >
                                {isExpanded ? "Show Less" : "Learn More"}
                                <ChevronDown className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                            </button> */}
                        </div>

                        {/* Quick Facts */}
                        <div className="grid grid-cols-2 gap-4">
                            {[
                                { value: "3", label: "Years Coding" },
                                { value: "15", label: "Technologies" },
                                { value: "5", label: "Major Projects" },
                                { value: "1000", label: "DSA all over Platforms Solved" },
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

                    {/* Right Column */}
                    <div className="space-y-6 transition-all duration-500 ease-in-out">
                        <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="bg-green-100 text-green-600 p-2 rounded-full">
                                    <GraduationCap className="w-5 h-5" />
                                </div>
                                <h3 className="text-lg font-semibold">Education</h3>
                            </div>
                            <div className="space-y-4 text-sm text-gray-700">
                                <div>
                                    <p className="font-medium">B.Tech, Information Technology</p>
                                    <p>SGGS Institute, Nanded</p>
                                    <p className="text-xs text-gray-500">2023 - Present (CGPA: 8.15)</p>
                                </div>
                                <div>
                                    <p className="font-medium">Diploma, Computer Engineering</p>
                                    <p>Govt. Polytechnic Pune</p>
                                    <p className="text-xs text-gray-500">2020 - 2023 (90.33%)</p>
                                </div>
                                <div>
                                    <p className="font-medium">State Secondary Certificate</p>
                                    <p>Aurangabad Division-Maharashtra</p>
                                    <p className="text-xs text-gray-500">2019 - 2020 (95.60%)</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="bg-yellow-100 text-yellow-600 p-2 rounded-full">
                                    <Award className="w-5 h-5" />
                                </div>
                                <h3 className="text-lg font-semibold">Achievements</h3>
                            </div>
                            <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
                                <li>Top 1% on GeeksforGeeks (Institute)</li>
                                <li>5★ Gold Badge in Java on HackerRank</li>
                                <li>200+ DSA Problems on LeetCode</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;

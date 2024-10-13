"use client"; // Add this line to mark the component as a Client Component

import React, { useState, useEffect, useCallback } from "react";

// Type-safe debounce function
const debounce = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
) => {
  let timeoutId: NodeJS.Timeout | null;
  return (...args: Parameters<T>) => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

export const Header = () => {
  const [activeSection, setActiveSection] = useState<string>("hero");

  // Memoize handleScroll to prevent recreation on every render
  const handleScroll = useCallback(() => {
    const sections = ["hero", "projects", "about", "contact"];
    const scrollY = window.scrollY;

    sections.forEach((section) => {
      const element = document.getElementById(section);
      if (element) {
        const { offsetTop, clientHeight } = element;
        if (scrollY >= offsetTop - clientHeight / 3) {
          setActiveSection(section);
        }
      }
    });
  }, []); // No dependencies, so only defined once

  // Memoize the debounced function
  const debouncedHandleScroll = useCallback(debounce(handleScroll, 100), [handleScroll]);

  useEffect(() => {
    window.addEventListener("scroll", debouncedHandleScroll);
    return () => {
      window.removeEventListener("scroll", debouncedHandleScroll);
    };
  }, [debouncedHandleScroll]); // Include debouncedHandleScroll as a dependency

  return (
    <div className="flex justify-center items-center fixed top-3 w-full z-50">
      <nav className="flex gap-1 p-0.5 border border-white/15 rounded-full bg-white/10 backdrop-blur">
        <a
          href="#hero"
          className={`nav-item ${
            activeSection === "hero" ? "bg-white text-gray-900" : ""
          }`}
        >
          Home
        </a>
        <a
          href="#projects"
          className={`nav-item ${
            activeSection === "projects" ? "bg-white text-gray-900" : ""
          }`}
        >
          Projects
        </a>
        <a
          href="#about"
          className={`nav-item ${
            activeSection === "about" ? "bg-white text-gray-900" : ""
          }`}
        >
          About
        </a>
        <a
          href="#contact"
          className={`nav-item ${
            activeSection === "contact" ? "bg-white text-gray-900" : ""
          }`}
        >
          Contact
        </a>
      </nav>
    </div>
  );
};

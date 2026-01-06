"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Github, Twitter, Linkedin, Mail, FileText, ExternalLink, Code, BookOpen, Menu, X } from "lucide-react";
import { profile } from "@/data/profile";
import { publications } from "@/data/publications";
import { cn } from "@/lib/utils";

export default function Home() {
  const [activeSection, setActiveSection] = useState("about");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showNavName, setShowNavName] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show name in nav if scrolled past 100px
      setShowNavName(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { id: "about", label: "About" },
    { id: "experience", label: "Experience" },
    { id: "work", label: "Recent Work" },
    { id: "publications", label: "Publications" },
  ];

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveSection(id);
      setMobileMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="container-width h-16 flex items-center justify-between">
          <div 
            className={cn(
              "text-xl font-bold tracking-tight cursor-pointer transition-opacity duration-300",
              showNavName ? "opacity-100" : "opacity-0 pointer-events-none md:pointer-events-auto md:opacity-0" // Keep clickable on mobile if menu is open, but generally hidden at top
            )}
            onClick={() => scrollTo("about")}
          >
            Yujia Bao
          </div>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Mobile Nav Toggle */}
          <button className="md:hidden p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-slate-100 py-4 px-6 space-y-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="block w-full text-left text-base font-medium text-slate-600 hover:text-slate-900"
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </nav>

      <main className="pt-24 pb-20 space-y-24 md:space-y-32">
        {/* About / Hero Section */}
        <section id="about" className="container-width scroll-mt-24 space-y-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid md:grid-cols-[1.5fr_1fr] gap-12 items-center"
          >
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900">
                {profile.name}
              </h1>
              <h2 className="text-xl md:text-2xl text-slate-600 font-medium italic">
                {profile.role}
              </h2>
              <div className="flex gap-1 pt-2">
                <SocialLink href={profile.social.github} icon={<Github size={24} />} label="GitHub" variant="icon" />
                <SocialLink href={profile.social.twitter} icon={<Twitter size={24} />} label="Twitter" variant="icon" />
                <SocialLink href={profile.social.linkedin} icon={<Linkedin size={24} />} label="LinkedIn" variant="icon" />
                <SocialLink href={profile.social.scholar} icon={<BookOpen size={24} />} label="Scholar" variant="icon" />
                <SocialLink href={`mailto:${profile.email}`} icon={<Mail size={24} />} label="Email" variant="icon" />
                <SocialLink href={profile.social.resume} icon={<FileText size={24} />} label="Resume" variant="icon" />
              </div>
            </div>

            <div className="relative w-full max-w-sm mx-auto md:max-w-none">
              <Image 
                src="/assets/img/profile_new.jpeg" 
                alt="Yujia Bao" 
                width={1086} 
                height={724} 
                className="rounded-2xl shadow-xl"
                priority
              />
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="prose prose-slate max-w-none text-lg text-slate-600 leading-relaxed space-y-6"
          >
            {profile.bio.split('\n\n').map((paragraph, i) => (
              <p key={i}>{paragraph.trim()}</p>
            ))}
            <p>
              I received my Ph.D. in Computer Science from <a href="https://www.csail.mit.edu" className="text-blue-600 hover:underline">MIT CSAIL</a>, advised by <a href="https://www.regina.csail.mit.edu" className="text-blue-600 hover:underline">Regina Barzilay</a>.
            </p>
          </motion.div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="container-width scroll-mt-24">
          <SectionTitle>Experience & Education</SectionTitle>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <h3 className="text-xl font-bold text-slate-900 border-b pb-4">Professional Experience</h3>
              <div className="space-y-8">
                {profile.experience.map((exp, idx) => (
                  <div key={idx} className="relative pl-6 border-l-2 border-slate-200">
                    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-slate-200 border-4 border-white"></div>
                    <div className="text-sm font-semibold text-blue-600 mb-1">{exp.year}</div>
                    <h4 className="text-lg font-bold text-slate-900">{exp.role}</h4>
                    <div className="text-slate-700 font-medium mb-2">{exp.company}</div>
                    <p className="text-slate-600 text-sm leading-relaxed">{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-8">
              <h3 className="text-xl font-bold text-slate-900 border-b pb-4">Education</h3>
              <div className="space-y-8">
                {profile.education.map((edu, idx) => (
                  <div key={idx} className="relative pl-6 border-l-2 border-slate-200">
                    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-slate-200 border-4 border-white"></div>
                    <div className="text-sm font-semibold text-blue-600 mb-1">{edu.year}</div>
                    <h4 className="text-lg font-bold text-slate-900">{edu.degree}</h4>
                    <div className="text-slate-700 font-medium mb-1">{edu.school}</div>
                    {edu.advisor && <div className="text-slate-500 text-sm">Advisor: {edu.advisor}</div>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Recent Work Section */}
        <section id="work" className="container-width scroll-mt-24">
          <SectionTitle>Recent Work</SectionTitle>
          <div className="grid md:grid-cols-3 gap-6">
            {profile.recentWork.map((work, idx) => (
              <div key={idx} className="group bg-slate-50 border border-slate-100 rounded-2xl p-6 hover:border-slate-200 hover:shadow-lg transition-all">
                <h3 className="text-lg font-bold text-slate-900 mb-3">{work.title}</h3>
                <p className="text-slate-600 text-sm mb-6 leading-relaxed">
                  {work.description}
                </p>
                <div className="flex flex-wrap gap-2 mt-auto">
                  {work.links.map((link, lIdx) => (
                    <a 
                      key={lIdx} 
                      href={link.url}
                      target="_blank"
                      className="inline-flex items-center text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full hover:bg-blue-100 transition-colors"
                    >
                      {link.name} <ExternalLink size={12} className="ml-1" />
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Publications Section */}
        <section id="publications" className="container-width scroll-mt-24">
          <SectionTitle>Publications</SectionTitle>
          
          <div className="space-y-12">
            {Array.from(new Set(publications.map(p => p.year)))
              .sort((a, b) => b - a)
              .map(year => (
                <div key={year} className="space-y-6">
                  <div className="flex items-center gap-4">
                    <h3 className="text-2xl font-bold text-slate-900">{year}</h3>
                    <div className="h-px bg-slate-100 flex-1"></div>
                  </div>
                  <div className="space-y-6">
                    {publications.filter(p => p.year === year).map((pub) => (
                      <div key={pub.id} className="group flex flex-col space-y-3">
                        <div className="space-y-1">
                          <h4 className="text-lg font-semibold text-slate-900 leading-tight group-hover:text-blue-600 transition-colors">
                            {pub.title}
                          </h4>
                          <div className="text-slate-600 text-sm">
                            {pub.authors.map((author, i) => (
                              <span key={i} className={author.includes("Yujia Bao") ? "font-bold text-slate-900" : ""}>
                                {author}{i < pub.authors.length - 1 ? ", " : ""}
                              </span>
                            ))}
                          </div>
                          <div className="text-sm text-slate-500 font-medium">
                            {pub.venue}
                          </div>
                        </div>
                        
                        <div className="flex gap-3">
                          {pub.arxiv && (
                            <a 
                              href={`https://arxiv.org/abs/${pub.arxiv}`} 
                              target="_blank"
                              className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-md hover:bg-slate-50 hover:text-blue-600 hover:border-slate-300 transition-all"
                            >
                              <FileText size={14} className="text-slate-400 group-hover:text-blue-600" />
                              Paper
                            </a>
                          )}
                          {pub.code && (
                            <a 
                              href={pub.code} 
                              target="_blank"
                              className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-md hover:bg-slate-50 hover:text-blue-600 hover:border-slate-300 transition-all"
                            >
                              <Code size={14} className="text-slate-400 group-hover:text-blue-600" />
                              Code
                            </a>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-100 py-12 bg-slate-50">
        <div className="container-width flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-slate-500 text-sm">
            © {new Date().getFullYear()} Yujia Bao. All rights reserved.
          </div>
          <div className="flex gap-6">
            <SocialLink href={profile.social.github} icon={<Github size={18} />} label="GitHub" variant="text" />
            <SocialLink href={profile.social.twitter} icon={<Twitter size={18} />} label="Twitter" variant="text" />
            <SocialLink href={profile.social.linkedin} icon={<Linkedin size={18} />} label="LinkedIn" variant="text" />
          </div>
        </div>
      </footer>
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 mb-12">
      {children}
    </h2>
  );
}

function SocialLink({ 
  href, 
  icon, 
  label, 
  variant = "pill" 
}: { 
  href: string; 
  icon: React.ReactNode; 
  label: string; 
  variant?: "pill" | "text" | "icon" 
}) {
  const variants = {
    pill: "bg-slate-100 text-slate-700 px-4 py-2 rounded-full font-medium text-sm hover:bg-slate-200 hover:text-slate-900",
    text: "text-slate-400 hover:text-slate-900",
    icon: "text-slate-500 hover:text-blue-600 hover:bg-blue-50 p-2 rounded-full transition-all"
  };

  return (
    <a
      href={href}
      target="_blank"
      className={cn("inline-flex items-center gap-2 transition-colors", variants[variant])}
      aria-label={label}
    >
      {icon}
      {variant === "pill" && <span>{label}</span>}
    </a>
  );
}
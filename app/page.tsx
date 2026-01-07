"use client";

import { useState, useEffect } from "react";
import ExportedImage from "next-image-export-optimizer";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Twitter, Linkedin, Mail, FileText, ExternalLink, Code, BookOpen, Menu, X, ChevronDown, ChevronUp } from "lucide-react";
import { profile } from "@/data/profile";
import { publications } from "@/data/publications";
import { cn } from "@/lib/utils";
import ParticleBackground from "@/components/ParticleBackground";

export default function Home() {
  const [activeSection, setActiveSection] = useState("about");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showNavName, setShowNavName] = useState(false);
  const [expandedPapers, setExpandedPapers] = useState<Set<string>>(new Set());

  useEffect(() => {
    const handleScroll = () => {
      // Show name in nav if scrolled past 100px
      setShowNavName(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleAllTldrs = () => {
    if (expandedPapers.size > 0) {
      setExpandedPapers(new Set());
    } else {
      const allIds = new Set(publications.map(p => p.id));
      setExpandedPapers(allIds);
    }
  };

  const togglePaper = (id: string) => {
    const newExpanded = new Set(expandedPapers);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedPapers(newExpanded);
  };

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
    <div className="min-h-screen relative overflow-hidden bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <ParticleBackground />
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-50/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200/60 dark:border-slate-800/50 transition-colors duration-300">
        <div className="container-width h-16 flex items-center justify-between">
          <div 
            className={cn(
              "text-xl font-medium tracking-normal cursor-pointer transition-opacity duration-300 text-slate-900 dark:text-slate-100",
              showNavName ? "opacity-100" : "opacity-0 pointer-events-none md:pointer-events-auto md:opacity-0" 
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
                className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Mobile Nav Toggle */}
          <button className="md:hidden p-2 text-slate-600 dark:text-slate-300" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 py-4 px-6 space-y-4 overflow-hidden"
            >
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className="block w-full text-left text-base font-medium text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400"
                >
                  {item.label}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
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
            <div className="space-y-6">
              <div>
                <h1 className="text-5xl md:text-6xl font-semibold tracking-tight text-slate-900 dark:text-slate-100 mb-2">
                  {profile.name}
                </h1>
                <h2 className="text-xl md:text-2xl font-medium text-blue-600 dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-blue-400 dark:to-violet-400">
                  {profile.role}
                </h2>
              </div>
              
              <div className="flex gap-2">
                <SocialLink href={profile.social.github} icon={<Github size={20} />} label="GitHub" variant="icon" />
                <SocialLink href={profile.social.twitter} icon={<Twitter size={20} />} label="Twitter" variant="icon" />
                <SocialLink href={profile.social.linkedin} icon={<Linkedin size={20} />} label="LinkedIn" variant="icon" />
                <SocialLink href={profile.social.scholar} icon={<BookOpen size={20} />} label="Scholar" variant="icon" />
                <SocialLink href={`mailto:${profile.email}`} icon={<Mail size={20} />} label="Email" variant="icon" />
                <SocialLink href={profile.social.resume} icon={<FileText size={20} />} label="Resume" variant="icon" />
              </div>
            </div>

            <div className="relative w-full max-w-sm mx-auto md:max-w-none group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-violet-600 rounded-2xl blur opacity-10 group-hover:opacity-25 transition duration-1000 dark:opacity-25 dark:group-hover:opacity-50"></div>
              <div className="relative aspect-[3/2] overflow-hidden rounded-2xl border border-slate-200/60 dark:border-slate-800">
                 <ExportedImage 
                  src="/assets/img/profile.jpeg" 
                  alt="Yujia Bao"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  priority
                />
              </div>
            </div>
          </motion.div>

          <div 
            className="glass-panel p-8 rounded-2xl prose dark:prose-invert max-w-none text-lg text-slate-600 dark:text-slate-300 leading-relaxed space-y-6"
          >
            {profile.bio.split('\n\n').map((paragraph, i) => (
              <p key={i} dangerouslySetInnerHTML={{ __html: paragraph.trim() }} />
            ))}
            <p>
              I received my Ph.D. in Computer Science from <a href="https://www.csail.mit.edu" className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300">MIT CSAIL</a>, advised by <a href="https://www.regina.csail.mit.edu" className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300">Regina Barzilay</a>.
            </p>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="container-width scroll-mt-24">
          <SectionTitle className="mb-12">Experience & Education</SectionTitle>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                Professional Experience
              </h3>
              <div className="space-y-8">
                {profile.experience.map((exp, idx) => (
                  <div key={idx} className="relative pl-8 border-l border-slate-200 dark:border-slate-800">
                    <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-600"></div>
                    <div className="text-sm font-semibold text-blue-600 dark:text-blue-400 mb-1">{exp.year}</div>
                    <h4 className="text-lg font-bold text-slate-900 dark:text-slate-100">{exp.role}</h4>
                    <div className="text-slate-600 dark:text-slate-400 font-medium mb-2">{exp.company}</div>
                    <p className="text-slate-500 text-sm leading-relaxed">{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-8">
              <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-violet-500"></span>
                Education
              </h3>
              <div className="space-y-8">
                {profile.education.map((edu, idx) => (
                  <div key={idx} className="relative pl-8 border-l border-slate-200 dark:border-slate-800">
                     <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-600"></div>
                    <div className="text-sm font-semibold text-violet-600 dark:text-violet-400 mb-1">{edu.year}</div>
                    <h4 className="text-lg font-bold text-slate-900 dark:text-slate-100">{edu.degree}</h4>
                    <div className="text-slate-600 dark:text-slate-400 font-medium mb-1">{edu.school}</div>
                    {edu.advisor && <div className="text-slate-500 text-sm">Advisor: {edu.advisor}</div>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Recent Work Section */}
        <section id="work" className="container-width scroll-mt-24">
          <SectionTitle className="mb-12">Recent Work</SectionTitle>
          <div className="grid md:grid-cols-3 gap-6">
            {profile.recentWork.map((work, idx) => (
              <div key={idx} className="group glass-panel rounded-2xl p-6 hover:bg-white dark:hover:bg-slate-800/50 hover:shadow-md dark:hover:shadow-none transition-all hover:-translate-y-1 duration-300">
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{work.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm mb-6 leading-relaxed">
                  {work.description}
                </p>
                <div className="flex flex-wrap gap-2 mt-auto">
                  {work.links.map((link, lIdx) => (
                    <a 
                      key={lIdx} 
                      href={link.url}
                      target="_blank"
                      className="inline-flex items-center text-xs font-semibold text-blue-600 dark:text-blue-300 bg-blue-50 dark:bg-blue-500/10 border border-blue-100 dark:border-blue-500/20 px-3 py-1.5 rounded-full hover:bg-blue-600 hover:text-white dark:hover:bg-blue-500/20 hover:border-blue-600 dark:hover:border-blue-500/40 transition-all"
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
          <div className="mb-12">
            <div className="flex flex-col md:flex-row md:items-center gap-4 mb-2">
              <SectionTitle className="mb-0">Publications</SectionTitle>
              <button
                onClick={toggleAllTldrs}
                className="inline-flex items-center text-xs font-semibold uppercase tracking-wider text-slate-400 hover:text-blue-600 dark:text-slate-500 dark:hover:text-blue-400 transition-colors"
              >
                {expandedPapers.size > 0 ? "[ Collapse all ]" : "[ Expand all TL;DRs ]"}
              </button>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              See <a href="https://scholar.google.com/citations?user=Ee4Peu4AAAAJ&hl=en" target="_blank" className="text-blue-600 dark:text-blue-400 hover:underline">Google Scholar</a> for full list of publications.
            </p>
          </div>
          
          <div className="space-y-12">
            {Array.from(new Set(publications.map(p => p.year)))
              .sort((a, b) => b - a)
              .map(year => (
                <div key={year} className="space-y-6">
                  <div className="flex items-center gap-4">
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100">{year}</h3>
                    <div className="h-px bg-slate-200 dark:bg-slate-800 flex-1"></div>
                  </div>
                  <div className="space-y-6">
                    {publications.filter(p => p.year === year).map((pub) => (
                      <div 
                        key={pub.id} 
                        onClick={() => togglePaper(pub.id)}
                        className="group flex flex-col space-y-3 p-4 -mx-4 rounded-xl hover:bg-white dark:hover:bg-slate-900/40 transition-colors border border-transparent hover:border-slate-200 dark:hover:border-slate-800/50 hover:shadow-sm dark:hover:shadow-none cursor-pointer"
                      >
                        <div className="space-y-1">
                          <h4 className="text-lg font-semibold text-slate-900 dark:text-slate-200 leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {pub.title}
                          </h4>
                          <div className="text-slate-600 dark:text-slate-400 text-sm">
                            {pub.authors.map((author, i) => (
                              <span key={i} className={author.includes("Yujia Bao") ? "font-bold text-slate-900 dark:text-slate-100" : ""}>
                                {author}{i < pub.authors.length - 1 ? ", " : ""}
                              </span>
                            ))}
                          </div>
                          
                          <div className="text-sm text-slate-500 font-medium">
                            {pub.venue}
                          </div>

                          <AnimatePresence>
                            {expandedPapers.has(pub.id) && pub.tldr && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden mt-2 mb-1"
                              >
                                <div className="text-sm text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800/50 px-3 py-2 rounded-md border-l-4 border-blue-600 dark:border-blue-500 italic">
                                  {pub.tldr}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                        
                        <div className="flex flex-wrap gap-3 items-center">
                          {pub.arxiv && (
                            <a 
                              href={`https://arxiv.org/abs/${pub.arxiv}`}
                              target="_blank"
                              onClick={(e) => e.stopPropagation()}
                              className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium text-slate-600 dark:text-slate-400 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-md hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-300 dark:hover:border-blue-500/50 transition-all"
                            >
                              <FileText size={14} className="text-slate-400 dark:text-slate-500 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
                              Paper
                            </a>
                          )}
                          {pub.code && (
                            <a 
                              href={pub.code} 
                              target="_blank"
                              onClick={(e) => e.stopPropagation()}
                              className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium text-slate-600 dark:text-slate-400 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-md hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-300 dark:hover:border-blue-500/50 transition-all"
                            >
                              <Code size={14} className="text-slate-400 dark:text-slate-500 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
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
      <footer className="border-t border-slate-200/60 dark:border-slate-800/50 py-12 bg-slate-100/50 dark:bg-slate-950 transition-colors">
        <div className="container-width flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-slate-500 dark:text-slate-600 text-sm">
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

function SectionTitle({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <h2 className={cn("text-3xl md:text-4xl font-semibold tracking-tight text-slate-900 dark:text-slate-100", className)}>
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
    pill: "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-4 py-2 rounded-full font-medium text-sm border border-slate-200 dark:border-transparent hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-slate-100 shadow-sm dark:shadow-none transition-all",
    text: "text-slate-500 dark:text-slate-500 hover:text-slate-900 dark:hover:text-slate-300",
    icon: "text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-white dark:hover:bg-slate-800 p-2 rounded-full transition-all border border-transparent hover:border-slate-100 dark:hover:border-slate-700 hover:shadow-sm dark:hover:shadow-none"
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

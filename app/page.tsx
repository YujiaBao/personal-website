"use client";

import { useState, useEffect } from "react";
import ExportedImage from "next-image-export-optimizer";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Twitter, Linkedin, Mail, FileText, ExternalLink, Code, BookOpen, Menu, X } from "lucide-react";
import { profile } from "@/data/profile";
import { publications } from "@/data/publications";
import { cn } from "@/lib/utils";
import ParticleBackground from "@/components/ParticleBackground";

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showNavName, setShowNavName] = useState(false);
  const [expandedPapers, setExpandedPapers] = useState<Set<string>>(new Set());

  useEffect(() => {
    const handleScroll = () => {
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
      setMobileMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-surface-light dark:bg-surface-dark transition-colors duration-300">
      <ParticleBackground />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-surface-light/90 dark:bg-surface-dark/90 backdrop-blur-xl border-b border-border-light dark:border-border-dark transition-colors duration-200">
        <div className="container-width h-14 flex items-center justify-between">
          <div
            className={cn(
              "text-sm font-semibold tracking-wide uppercase cursor-pointer transition-opacity duration-300 text-text-light-primary dark:text-text-dark-primary",
              showNavName ? "opacity-100" : "opacity-0 pointer-events-none md:pointer-events-auto md:opacity-0"
            )}
            onClick={() => scrollTo("about")}
          >
            Yujia Bao
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="text-xs font-medium tracking-wide text-text-light-muted dark:text-text-dark-muted hover:text-accent dark:hover:text-accent hover:bg-accent-glow px-3 py-1.5 transition-all duration-150"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Mobile Nav Toggle */}
          <button className="md:hidden p-2 text-text-light-secondary dark:text-text-dark-secondary" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-surface-light dark:bg-surface-dark-raised border-b border-border-light dark:border-border-dark py-3 px-6 space-y-1 overflow-hidden"
            >
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className="block w-full text-left text-sm font-medium text-text-light-muted dark:text-text-dark-muted hover:text-accent dark:hover:text-accent hover:bg-accent-glow px-3 py-2 transition-all duration-150"
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
                <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-text-light-primary dark:text-text-dark-primary mb-4 leading-tight">
                  {profile.name}
                </h1>
                <div className="space-y-0.5">
                  <h2 className="text-lg md:text-xl font-medium text-text-light-muted dark:text-text-dark-muted tracking-tight">
                    {profile.role.split('\n')[0]}
                  </h2>
                  {profile.role.includes('\n') && (
                    <h2 className="text-lg md:text-xl font-medium text-text-light-muted dark:text-text-dark-muted tracking-tight">
                      <a href="https://thinkingmachines.ai" target="_blank" className="hover:text-accent transition-colors duration-150">
                        @thinkingmachines
                      </a>
                    </h2>
                  )}
                </div>
              </div>

              <div className="flex gap-1">
                <SocialLink href={profile.social.github} icon={<Github size={18} />} label="GitHub" variant="icon" />
                <SocialLink href={profile.social.scholar} icon={<BookOpen size={18} />} label="Scholar" variant="icon" />
                <SocialLink href={profile.social.twitter} icon={<Twitter size={18} />} label="Twitter" variant="icon" />
                <SocialLink href={profile.social.linkedin} icon={<Linkedin size={18} />} label="LinkedIn" variant="icon" />
                <SocialLink href={`mailto:${profile.email}`} icon={<Mail size={18} />} label="Email" variant="icon" />
              </div>
            </div>

            <div className="relative w-full max-w-sm mx-auto md:max-w-none group">
              <div className="relative aspect-[3/2] overflow-hidden border border-border-light dark:border-border-dark group-hover:border-accent/40 transition-all duration-300">
                 <ExportedImage
                  src="/assets/img/profile.jpeg"
                  alt="Yujia Bao"
                  fill
                  className="object-cover saturate-[0.85] brightness-[1.02] sepia-[0.08]"
                  priority
                />
              </div>
            </div>
          </motion.div>

          <div
            className="glass-panel p-8 prose dark:prose-invert max-w-none text-base text-text-light-secondary dark:text-text-dark-secondary leading-relaxed space-y-4"
          >
            {profile.bio.split('\n\n').map((paragraph, i) => (
              <p key={i} dangerouslySetInnerHTML={{ __html: paragraph.trim() }} />
            ))}
            <p>
              I received my Ph.D. in Computer Science from <a href="https://www.csail.mit.edu" className="text-accent hover:text-accent-hover transition-colors duration-150 underline decoration-accent/30 underline-offset-2">MIT CSAIL</a>, advised by <a href="https://www.regina.csail.mit.edu" className="text-accent hover:text-accent-hover transition-colors duration-150 underline decoration-accent/30 underline-offset-2">Regina Barzilay</a>.
            </p>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="container-width scroll-mt-24">
          <SectionTitle className="mb-12">Experience & Education</SectionTitle>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <h3 className="text-sm font-semibold tracking-wide uppercase text-text-light-primary dark:text-text-dark-primary border-b border-border-light dark:border-border-dark pb-3 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-accent"></span>
                Professional Experience
              </h3>
              <div className="space-y-8">
                {profile.experience.map((exp, idx) => (
                  <div key={idx} className="relative pl-8 border-l border-border-light dark:border-border-dark">
                    <div className="absolute -left-[3px] top-2 w-1.5 h-1.5 bg-border-light dark:bg-border-dark"></div>
                    <div className="text-xs font-semibold tracking-wide text-accent mb-1">{exp.year}</div>
                    <h4 className="text-base font-semibold text-text-light-primary dark:text-text-dark-primary tracking-tight">{exp.role}</h4>
                    <div className="text-text-light-muted dark:text-text-dark-muted text-sm font-medium mb-2">{exp.company}</div>
                    <p className="text-text-light-secondary dark:text-text-dark-secondary text-sm leading-relaxed">{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-8">
              <h3 className="text-sm font-semibold tracking-wide uppercase text-text-light-primary dark:text-text-dark-primary border-b border-border-light dark:border-border-dark pb-3 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-accent"></span>
                Education
              </h3>
              <div className="space-y-8">
                {profile.education.map((edu, idx) => (
                  <div key={idx} className="relative pl-8 border-l border-border-light dark:border-border-dark">
                     <div className="absolute -left-[3px] top-2 w-1.5 h-1.5 bg-border-light dark:bg-border-dark"></div>
                    <div className="text-xs font-semibold tracking-wide text-accent mb-1">{edu.year}</div>
                    <h4 className="text-base font-semibold text-text-light-primary dark:text-text-dark-primary tracking-tight">{edu.degree}</h4>
                    <div className="text-text-light-muted dark:text-text-dark-muted text-sm font-medium mb-1">{edu.school}</div>
                    {edu.advisor && <div className="text-text-light-secondary dark:text-text-dark-secondary text-sm">Advisor: {edu.advisor}</div>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Recent Work Section */}
        <section id="work" className="container-width scroll-mt-24">
          <SectionTitle className="mb-12">Recent Work</SectionTitle>
          <div className="space-y-4">
            {/* Featured: first item full width */}
            {profile.recentWork.slice(0, 1).map((work, idx) => (
              <div key={idx} className="group glass-panel p-6 hover:border-accent/40 hover:shadow-[0_2px_16px_rgba(181,146,107,0.06)] transition-all duration-200 hover:-translate-y-px">
                <h3 className="text-base font-semibold text-text-light-primary dark:text-text-dark-primary mb-2 group-hover:text-accent transition-colors duration-150 tracking-tight">{work.title}</h3>
                <p className="text-text-light-secondary dark:text-text-dark-secondary text-sm mb-5 leading-relaxed max-w-2xl">
                  {work.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {work.links.map((link, lIdx) => (
                    <a
                      key={lIdx}
                      href={link.url}
                      target="_blank"
                      className="inline-flex items-center text-xs font-medium text-text-light-secondary dark:text-text-dark-secondary border border-border-light dark:border-border-dark px-2.5 py-1 hover:border-accent/50 hover:text-accent transition-all duration-150"
                    >
                      {link.name} <ExternalLink size={10} className="ml-1" />
                    </a>
                  ))}
                </div>
              </div>
            ))}
            {/* Remaining items: two columns */}
            <div className="grid md:grid-cols-2 gap-4">
              {profile.recentWork.slice(1).map((work, idx) => (
                <div key={idx} className="group glass-panel p-5 hover:border-accent/40 hover:shadow-[0_2px_16px_rgba(181,146,107,0.06)] transition-all duration-200 hover:-translate-y-px">
                  <h3 className="text-sm font-semibold text-text-light-primary dark:text-text-dark-primary mb-2 group-hover:text-accent transition-colors duration-150 tracking-tight">{work.title}</h3>
                  <p className="text-text-light-secondary dark:text-text-dark-secondary text-xs mb-5 leading-relaxed">
                    {work.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {work.links.map((link, lIdx) => (
                      <a
                        key={lIdx}
                        href={link.url}
                        target="_blank"
                        className="inline-flex items-center text-xs font-medium text-text-light-secondary dark:text-text-dark-secondary border border-border-light dark:border-border-dark px-2.5 py-1 hover:border-accent/50 hover:text-accent transition-all duration-150"
                      >
                        {link.name} <ExternalLink size={10} className="ml-1" />
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Publications Section */}
        <section id="publications" className="container-width scroll-mt-24">
          <div className="mb-12">
            <div className="flex flex-col md:flex-row md:items-center gap-4 mb-2">
              <SectionTitle className="mb-0">Publications</SectionTitle>
              <button
                onClick={toggleAllTldrs}
                className="inline-flex items-center text-xs font-medium tracking-wide text-text-light-muted hover:text-accent dark:text-text-dark-muted dark:hover:text-accent transition-colors duration-150"
              >
                {expandedPapers.size > 0 ? "[ Collapse all ]" : "[ Expand all TL;DRs ]"}
              </button>
            </div>
            <p className="text-xs text-text-light-muted dark:text-text-dark-muted">
              See <a href="https://scholar.google.com/citations?user=Ee4Peu4AAAAJ&hl=en" target="_blank" className="text-accent hover:underline">Google Scholar</a> for full list of publications.
            </p>
          </div>

          <div className="space-y-10">
            {Array.from(new Set(publications.map(p => p.year)))
              .sort((a, b) => b - a)
              .map(year => (
                <div key={year} className="space-y-4">
                  <div className="flex items-center gap-4">
                    <h3 className="text-lg font-semibold text-text-light-primary dark:text-text-dark-primary tracking-tight">{year}</h3>
                    <div className="h-px bg-border-light dark:bg-border-dark flex-1"></div>
                  </div>
                  <div className="space-y-1">
                    {publications.filter(p => p.year === year).map((pub) => (
                      <div
                        key={pub.id}
                        onClick={() => togglePaper(pub.id)}
                        className="group flex flex-col space-y-2 p-3 -mx-3 hover:bg-surface-light-raised dark:hover:bg-surface-dark-raised transition-all duration-150 border border-transparent hover:border-border-light dark:hover:border-border-dark cursor-pointer"
                      >
                        <div className="space-y-1">
                          <h4 className="text-sm font-semibold text-text-light-primary dark:text-text-dark-primary leading-snug group-hover:text-accent transition-colors duration-150 tracking-tight">
                            {pub.title}
                          </h4>
                          <div className="text-text-light-muted dark:text-text-dark-muted text-xs">
                            {pub.authors.map((author, i) => (
                              <span key={i} className={author.includes("Yujia Bao") ? "font-semibold text-text-light-primary dark:text-text-dark-primary" : ""}>
                                {author}{i < pub.authors.length - 1 ? ", " : ""}
                              </span>
                            ))}
                          </div>

                          <div className="text-xs text-text-light-muted dark:text-text-dark-muted font-medium">
                            {pub.venue}
                          </div>

                          <AnimatePresence>
                            {expandedPapers.has(pub.id) && pub.tldr && (
                              <motion.div
                                key="tldr"
                                initial="collapsed"
                                animate="expanded"
                                exit="collapsed"
                                variants={{
                                  expanded: {
                                    opacity: 1,
                                    height: "auto",
                                    marginTop: "0.5rem",
                                    marginBottom: "0.25rem",
                                    transition: {
                                      duration: 0.4,
                                      type: "spring",
                                      bounce: 0,
                                      opacity: { duration: 0.25, delay: 0.1 }
                                    }
                                  },
                                  collapsed: {
                                    opacity: 0,
                                    height: 0,
                                    marginTop: 0,
                                    marginBottom: 0,
                                    transition: {
                                      duration: 0.3,
                                      type: "spring",
                                      bounce: 0,
                                      opacity: { duration: 0.15 }
                                    }
                                  }
                                }}
                                className="overflow-hidden"
                              >
                                <div className="text-xs text-text-light-secondary dark:text-text-dark-secondary bg-surface-light-raised dark:bg-surface-dark-raised px-3 py-2 border-l-2 border-accent italic leading-relaxed">
                                  {pub.tldr}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>

                        <div className="flex flex-wrap gap-2 items-center">
                          {pub.arxiv && (
                            <a
                              href={`https://arxiv.org/abs/${pub.arxiv}`}
                              target="_blank"
                              onClick={(e) => e.stopPropagation()}
                              className="inline-flex items-center gap-1.5 px-2.5 py-0.5 text-xs font-medium text-text-light-muted dark:text-text-dark-muted border border-border-light dark:border-border-dark hover:border-accent/50 hover:text-accent transition-all duration-150"
                            >
                              <FileText size={12} />
                              Paper
                            </a>
                          )}
                          {pub.code && (
                            <a
                              href={pub.code}
                              target="_blank"
                              onClick={(e) => e.stopPropagation()}
                              className="inline-flex items-center gap-1.5 px-2.5 py-0.5 text-xs font-medium text-text-light-muted dark:text-text-dark-muted border border-border-light dark:border-border-dark hover:border-accent/50 hover:text-accent transition-all duration-150"
                            >
                              <Code size={12} />
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
      <footer className="border-t border-border-light dark:border-border-dark py-10 transition-colors">
        <div className="container-width flex justify-center">
          <div className="text-text-light-muted dark:text-text-dark-muted text-xs tracking-wide">
            © {new Date().getFullYear()} Yujia Bao
          </div>
        </div>
      </footer>
    </div>
  );
}

function SectionTitle({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <h2 className={cn("text-2xl md:text-3xl font-semibold tracking-tight text-text-light-primary dark:text-text-dark-primary", className)}>
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
    pill: "bg-surface-light-raised dark:bg-surface-dark-raised text-text-light-secondary dark:text-text-dark-secondary px-4 py-2 font-medium text-sm border border-border-light dark:border-border-dark hover:border-accent/50 hover:text-accent transition-all duration-150",
    text: "text-text-light-muted dark:text-text-dark-muted hover:text-accent",
    icon: "text-text-light-muted dark:text-text-dark-muted hover:text-accent hover:bg-accent-glow p-2 transition-all duration-150"
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

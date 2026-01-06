export const profile = {
  name: "Yujia Bao",
  role: "Machine Learning Researcher",
  email: "bao@yujia.io",
  location: "United States",
  social: {
    github: "https://github.com/yujiabao",
    twitter: "https://twitter.com/yujia_bao",
    linkedin: "https://linkedin.com/in/yujia-bao-506b76130",
    scholar: "https://scholar.google.com/citations?user=Ee4Peu4AAAAJ",
    resume: "/assets/pdf/resume.pdf",
  },
  bio: `
    Hello! I am a machine learning researcher and a life-long engineer who cannot live without Vim. My goal is to push the frontier of AI and make it useful and safe for humanity.
    
    Currently, I manage a team of 80+ research scientists and engineers at Accenture, focusing on AI for the enterprise. I lead the development of AI Refinery, an agentic AI platform driving AI adoption for Fortune 500 companies.

    My work spans building scalable agent architectures, optimizing LLM post-training, and advancing fundamental machine learning algorithms. I am driven by the excitement of "zero to one" innovation—translating cutting-edge research into stable, production-grade platforms that solve real-world problems.
  `,
  education: [
    {
      degree: "Ph.D. in Computer Science",
      school: "MIT CSAIL",
      advisor: "Regina Barzilay",
      year: "2017 - 2022",
      url: "https://www.csail.mit.edu",
    },
    {
      degree: "M.A. in Mathematics",
      school: "University of Wisconsin–Madison",
      year: "2016 - 2017",
      url: "https://math.wisc.edu",
    },
    {
      degree: "B.S. in Mathematics",
      school: "Shanghai Jiao Tong University",
      year: "2012 - 2016",
      url: "https://www.sjtu.edu.cn",
    },
  ],
  experience: [
    {
      role: "Associate Director",
      company: "Accenture",
      description: "Leading a team of 80+ researchers and engineers. Developing AI Refinery, an agentic AI platform.",
      year: "2023 - Current",
    },
    {
      role: "Lead Machine Learning Scientist",
      company: "Insitro",
      description: "Machine learning research for drug discovery and development.",
      year: "2022 - 2023",
    },
    {
      role: "Researcher",
      company: "MIT CSAIL",
      description: "Ph.D. research on machine learning, fairness, and interpretability.",
      year: "2017 - 2022",
    },
  ],
  recentWork: [
    {
      title: "AI Refinery: Enterprise Agentic Platform",
      description: "Leading engineering and research for AI Refinery, enabling developers to build and govern complex agentic workflows.",
      links: [
        { name: "Website", url: "https://airefinery.accenture.com" },
        { name: "SDK", url: "https://sdk.airefinery.accenture.com" },
      ]
    },
    {
      title: "LLM Customization",
      description: "Leading LLM customization efforts including pre-training, domain adaptation, and post-training optimization (KV-cache reuse, targeted unlearning).",
      links: [
        { name: "NeurIPS 2025", url: "https://arxiv.org/abs/2502.16002" },
        { name: "ICLR 2025", url: "https://arxiv.org/abs/2410.11143" },
      ]
    },
    {
      title: "Machine Learning Foundations",
      description: "Research on transformer architectures (Channel ViT, Contextual ViT), fairness, and human-machine interaction.",
      links: [
        { name: "ICLR 2024", url: "https://arxiv.org/abs/2309.16108" },
        { name: "ICML 2021", url: "https://proceedings.mlr.press/v139/bao21a.html" },
      ]
    }
  ]
};


import {
  Project,
  ExperienceItem,
  EducationItem,
  CertificateItem,
  SkillCategory,
  SkillLevel,
  FAQItem,
} from "@/types";

export const PORTFOLIO_DATA = {
  profile: {
    name: "Mayur Banait",
    shortName: "Mayur",
    initials: "MB",
    title: "Full-Stack Developer",
    location: "Nagpur, Maharashtra, India",
    email: "mbanait43@gmail.com",
    phone: "+91 8103755388",
    avatar: "/mayur-photo.png",
    headline:
      "B.Tech CSE Graduate (2026) | Full-Stack Developer | Open to entry-level roles in Software Development, IT Support, Technical Support and Customer Support.",
    summary:
      "B.Tech Computer Science graduate (2026) with good communication, English comprehension, computer, typing and problem-solving skills. Quick learner with an adaptable approach and a technical background. Able to understand customer requirements, communicate clearly, troubleshoot basic issues and work accurately with computer-based tools.",
    links: {
      github: "https://github.com/mbanait43-glitch",
      linkedin: "https://www.linkedin.com/in/mayur-banait-2951a5335/",
      instagram: "https://www.instagram.com/mayur_banait83?stkn=M3F1dW11amluNWpk",
      whatsapp: "https://wa.me/918103755388",
      email: "mailto:mbanait43@gmail.com",
      phone: "tel:+918103755388",
      resumePdf: "/resume.pdf",
      resumeDrive: "https://drive.google.com/file/d/1sZOT_oLq34_SvU1sNC0R2rXoz24aqgb1/view?usp=sharing",
    },
  },

  languagesSpoken: [
    { language: "Hindi", proficiency: "Fluent / Native" },
    { language: "English", proficiency: "Professional (Listening, Reading, Writing)" },
    { language: "Marathi", proficiency: "Conversational / Native" },
  ],

  education: [
    {
      degree: "B.Tech in Computer Science and Engineering (CSE)",
      institution:
        "Sagar Institute of Science, Technology & Research (SISTec-R)",
      location: "Ratibad, Bhopal (M.P.)",
      year: "2022 - 2026",
      score: "CGPA: 7.21 / 10",
      highlights: [
        "Focused on Full-Stack Development, Data Structures, Algorithms, DBMS, and Software Engineering",
        "Active participant in technical coding challenges and project demonstrations",
      ],
    },
    {
      degree: "Class XII (Senior Secondary)",
      institution: "Govt. D.K.M. Higher Secondary School",
      location: "Mohgaon (M.P.)",
      year: "2022",
      score: "73.80%",
      highlights: ["Physics, Chemistry, Mathematics stream"],
    },
    {
      degree: "Class X (Secondary School Certificate)",
      institution: "Govt. D.K.M. Higher Secondary School",
      location: "Mohgaon (M.P.)",
      year: "2020",
      score: "88.75%",
      highlights: ["Distinction across Core Science & Mathematics"],
    },
  ] as EducationItem[],

  experience: [
    {
      company: "IBM",
      role: "Data Analysis with AI Intern (Virtual)",
      period: "6 Weeks",
      location: "Virtual / Remote",
      type: "Internship",
      statusBadge: "Coming Soon",
      featured: true,
      description:
        "Hands-on virtual internship program focusing on data analysis workflows, predictive modeling, and AI integration using IBM tools and Python.",
      contributions: [
        "Structured data analysis pipelines and automated statistical exploratory workflows using Python.",
        "Predictive modeling and machine learning fundamentals integrated with modern AI tooling.",
        "Applied data transformation and visual analytics with enterprise cloud frameworks.",
      ],
      skills: ["Python", "Data Analysis", "Machine Learning", "AI", "IBM Cloud/Tools"],
    },
    {
      company: "Yexa Technologies",
      role: "Full Stack Developer Intern",
      period: "Jan 2026 - Apr 2026",
      location: "Remote / Hybrid",
      type: "Internship",
      description:
        "Worked across the entire web application lifecycle, building responsive frontend components, implementing RESTful backend APIs, and collaborating with senior developers on real-world client requirements.",
      contributions: [
        "Designed and implemented reusable React.js UI modules with robust state handling and smooth interaction flows.",
        "Collaborated on backend API endpoints, database schema optimization, and authentication mechanisms.",
        "Conducted code quality reviews, debugged edge cases, and ensured high responsiveness across screen resolutions.",
        "Engaged in agile sprints, daily standups, and client requirement walkthroughs.",
      ],
      skills: ["React.js", "JavaScript", "REST APIs", "Node.js", "Git", "SQL"],
    },
  ] as ExperienceItem[],

  projects: [
    {
      id: "river-surveillance",
      title: "Smart River Water Level and Quality Surveillance",
      category: "Java",
      type: "web",
      image: "/projects/smart-river.png",
      description:
        "An end-to-end environmental monitoring web application engineered for real-time tracking of river water levels, contamination indicators, and quality metrics with an intuitive interactive dashboard.",
      stack: ["Java", "Spring Boot", "React.js", "MySQL", "REST APIs", "IoT Sensors"],
      highlights: [
        "Real-time sensor data ingest and threshold breach warning alerts.",
        "Interactive React charts visualizing pH levels, turbidity, and water flow over time.",
        "Modular Spring Boot REST controllers with persistent MySQL logging and role-based access.",
      ],
      githubUrl: "https://github.com/mbanait43-glitch/smart-river-surveillance-project",
      liveUrl: "https://smart-river-surveillance-project.vercel.app",
      featured: true,
    },
    {
      id: "banking-system",
      title: "Banking Management System",
      category: ".NET",
      type: "web",
      image: "/projects/bank-management.png",
      description:
        "A secure, transactional enterprise banking platform handling client accounts, deposits, withdrawals, fund transfers, and ledger history with strict JWT authentication and entity relational mapping.",
      stack: [
        "React.js",
        "ASP.NET Core Web API",
        "PostgreSQL",
        "Entity Framework Core",
        "JWT",
        "REST APIs",
      ],
      highlights: [
        "ACID-compliant fund transfer transaction processing with balance validation.",
        "JWT token-based auth with refresh token rotation and protected API endpoints.",
        "Clean architecture separating domain models, data access layers, and API controllers.",
      ],
      githubUrl: "https://github.com/mbanait43-glitch/Bank-Management-System-PostgreSQL",
      liveUrl: "https://bank-management-system-frontend-vu7k.onrender.com/sign-in",
      featured: true,
    },
    {
      id: "job-portal",
      title: "Job Portal System",
      category: "MERN",
      type: "web",
      image: "/projects/job-portal.png",
      status: "Production Ready",
      githubUrl: "https://github.com/mbanait43-glitch",
      liveUrl: "https://github.com/mbanait43-glitch",
      progressPercent: 95,
      progressNote:
        "Full-stack recruitment and talent acquisition platform with automated resume parsing, interactive application tracking, and secure recruiter analytics dashboard.",
      description:
        "A full-stack recruitment platform connecting job seekers with hiring teams, featuring resume uploads, job categorization, application pipeline tracking, and recruiter dashboards.",
      stack: ["React", "Node.js", "Express.js", "MongoDB", "JWT"],
      highlights: [
        "Candidate profile builder with resume attachment and dynamic application status tracker.",
        "Recruiter dashboard for posting vacancies, filtering applicants, and reviewing credentials.",
        "Secure MongoDB aggregation queries with JWT role authorization.",
      ],
      featured: true,
    },
    {
      id: "full-page-screenshot-ext",
      title: "Full Page Screenshot",
      category: "Extensions",
      type: "extension",
      image: "/projects/full-page-screenshot.png",
      status: "Released & Open Source",
      description:
        "A feature-rich Chrome Extension (Manifest V3) that intelligently captures entire scrolling web pages with one click. Eliminates sticky headers, supports manual custom scroll stitching, visible area snaps, and rectangular region selection with instant 100% local PNG/JPG export.",
      stack: [
        "JavaScript",
        "Chrome Extensions API (Manifest V3)",
        "HTML5 Canvas",
        "Tailwind CSS",
        "Offscreen API",
      ],
      highlights: [
        "Full Page Auto (Alt+Shift+F): Automatically scrolls the entire webpage, eliminates sticky headers/navbars, and losslessly stitches content.",
        "Manual Full Page (NEW): Scroll at your custom pace with live path tracking to stitch bespoke page sections.",
        "Visible Area (Alt+Shift+V) & Selected Area (Alt+Shift+S): Fast viewport captures and interactive draggable region selection.",
        "100% Local & Private: Client-side canvas image processing with direct PNG and JPG exports without network leakage.",
      ],
      githubUrl: "https://github.com/mbanait43-glitch/Full-Page-Screenshot",
      liveUrl: "https://github.com/mbanait43-glitch/Full-Page-Screenshot",
      featured: true,
    },
    {
      id: "dev-tab-notes-ext",
      title: "DevTab — Developer Quick Notes & Snippets",
      category: "Extensions",
      type: "extension",
      status: "In Progress / Staging",
      inProgress: true,
      progressPercent: 78,
      progressNote:
        "Developer productivity extension replacing new tabs with an offline markdown scratchpad, syntax highlighting, and local browser storage sync.",
      description:
        "A productivity-focused Chrome Extension replacing the new-tab screen with an engineer scratchpad, markdown quick notes, syntax-highlighted code snippet storage, and local storage sync.",
      stack: ["JavaScript", "Chrome Storage API", "Markdown", "Tailwind CSS"],
      highlights: [
        "Lightning-fast scratchpad that syncs across browser sessions via chrome.storage.local.",
        "Syntax highlighting for code blocks with one-click copy to clipboard.",
        "Minimalist retro dark mode with keyboard shortcuts for rapid developer logging.",
      ],
      featured: false,
    },
    {
      id: "api-json-inspector-ext",
      title: "API Inspector & JSON Beautifier",
      category: "Extensions",
      type: "extension",
      status: "In Progress / Architecture",
      inProgress: true,
      progressPercent: 65,
      progressNote:
        "DevTools companion extension for intercepting, formatting, and validating JSON API responses with searchable tree views.",
      description:
        "A Chrome DevTools companion extension that intercepts, parses, formats, and validates JSON API payloads directly inside browser tabs with search and expandable tree hierarchy.",
      stack: ["TypeScript", "Chrome DevTools API", "React", "CSS3"],
      highlights: [
        "Automatic detection and formatting of JSON API endpoints in browser tabs.",
        "Searchable interactive tree view with type hints, copy paths, and curl generator.",
        "Lightweight footprint with zero external analytics or network leakage.",
      ],
      featured: false,
    },
  ] as Project[],

  technicalSkills: [
    {
      category: "Languages",
      items: ["C", "C++", "Java", "C#", "JavaScript"],
    },
    {
      category: "Web & Frameworks",
      items: ["React.js", "HTML5", "CSS3", "REST APIs", "Node.js Basics", "Tailwind CSS"],
    },
    {
      category: "Databases",
      items: ["MySQL", "SQL Server", "PostgreSQL", "MongoDB Basics"],
    },
    {
      category: "Concepts",
      items: [
        "Object-Oriented Programming (OOPs)",
        "Database Management Systems (DBMS)",
        "Data Structures & Algorithms (DSA)",
        "Software Development Life Cycle (SDLC)",
        "Problem Solving",
      ],
    },
    {
      category: "Tools & Platforms",
      items: ["Git & GitHub", "VS Code", "Postman", "MS Office", "Visual Studio"],
    },
  ] as SkillCategory[],

  skillLevels: [
    { name: "Java & OOPs", percentage: 88, category: "Languages" },
    { name: "React.js & Web UI", percentage: 85, category: "Web" },
    { name: "C / C++", percentage: 80, category: "Languages" },
    { name: "C# & .NET Core", percentage: 78, category: "Backend" },
    { name: "SQL & Relational DBs", percentage: 84, category: "Databases" },
    { name: "REST APIs & Integration", percentage: 86, category: "Architecture" },
    { name: "Data Structures & Algorithms", percentage: 82, category: "Concepts" },
    { name: "Git & Version Control", percentage: 85, category: "Tools" },
  ] as SkillLevel[],

  coreSkills: [
    "English listening and comprehension",
    "English reading and writing",
    "MS Office (Word, Excel, PowerPoint)",
    "Internet and computer skills",
    "Quality checking",
    "Audio validation and annotation",
    "Typing and accuracy",
    "Data entry and verification",
    "Attention to detail",
    "Time management",
    "Adaptability and quick learning",
    "Target-oriented approach",
  ],

  interpersonalSkills: [
    "Problem solving",
    "Team collaboration",
    "Logical thinking",
    "Adaptability",
    "Clear communication",
    "Active listening",
  ],

  certificates: [
    {
      title: "Oracle Agentic AI Foundations Associate",
      issuer: "Oracle",
      code: "1Z0-1157-26",
      year: "2026",
    },
    {
      title: "Google AI Essentials",
      issuer: "Google",
      year: "2025",
    },
    {
      title: "Prompting Essentials",
      issuer: "Google",
      year: "2025",
    },
    {
      title: "Python Essentials 1 & 2",
      issuer: "Cisco Networking Academy",
      year: "2024",
    },
  ] as CertificateItem[],

  codingStats: {
    badge: "100+ DSA Problems Solved",
    platforms: [
      { name: "LeetCode", description: "Arrays, Two Pointers, Strings, Linked Lists" },
      { name: "HackerRank", description: "Problem Solving, SQL & C++ Gold Badges" },
      { name: "CodeChef", description: "Contests & Algorithmic Practice" },
    ],
  },

  faq: [
    {
      question: "What do you do?",
      answer:
        "I am a Computer Science & Engineering graduate (Class of 2026) and Full-Stack Developer. I build web applications using React.js on the frontend, combined with robust backend services in Java (Spring Boot) and C# (.NET Core), alongside SQL databases.",
    },
    {
      question: "Are you open to work?",
      answer:
        "Yes, absolutely! I am actively looking for full-time and internship opportunities. I am immediately available for entry-level positions.",
    },
    {
      question: "Which roles are you targeting?",
      answer:
        "I am open to entry-level opportunities across: Software Development / Full-Stack Developer, Frontend/Backend Developer, IT Support, Technical Support Engineer, and Customer Support specialist roles.",
    },
    {
      question: "Which tech stacks do you feel most confident in?",
      answer:
        "My primary strengths are in Java + Spring Boot, React.js with modern JavaScript/TypeScript, C# (.NET Core), and SQL databases (MySQL, PostgreSQL, SQL Server). I also have strong foundational knowledge in DSA, OOPs, Git, and REST APIs.",
    },
    {
      question: "How can recruiters and teams contact you?",
      answer:
        "You can reach me directly via email at mbanait43@gmail.com, call or WhatsApp me at +91 8103755388, or submit the built-in Contact form on this desktop! I respond quickly.",
    },
  ] as FAQItem[],
};

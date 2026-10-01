export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  imagePath: string;
  pdfPath: string;
  verificationUrl?: string;
  category?: "AI & ML" | "Programming" | "Cybersecurity & Networks" | "Cloud & Enterprise";
  skills?: string[];
}

export const CERTIFICATES_DATA: Certificate[] = [
  {
    id: "google-ai-essentials",
    title: "Google AI Essentials Specialization",
    issuer: "Google (Coursera)",
    date: "Jul 13, 2026",
    imagePath: "/certificates/google-ai.png",
    pdfPath: "/certificates/google-ai.pdf",
    verificationUrl: "https://coursera.org/verify/specialization/B7MLFZDGPRHN",
    category: "AI & ML",
    skills: ["Generative AI", "AI Prompting", "Workplace Productivity", "Ethical AI"],
  },
  {
    id: "google-prompting-essentials",
    title: "Google Prompting Essentials Specialization",
    issuer: "Google (Coursera)",
    date: "Jul 18, 2026",
    imagePath: "/certificates/google-prompting.png",
    pdfPath: "/certificates/google-prompting.pdf",
    verificationUrl: "https://coursera.org/verify/specialization/ZFHGXJGMSJON",
    category: "AI & ML",
    skills: ["Prompt Engineering", "Large Language Models", "Multimodal AI", "Context Optimization"],
  },
  {
    id: "oracle-agentic-ai",
    title: "Oracle Cloud Infrastructure 2026 Certified Foundations Associate (Agentic AI)",
    issuer: "Oracle",
    date: "2026",
    imagePath: "/certificates/oracle-agentic-ai.png",
    pdfPath: "/certificates/oracle-agentic-ai.pdf",
    category: "Cloud & Enterprise",
    skills: ["Oracle Cloud (OCI)", "Agentic AI", "AI Architecture", "Cloud Security"],
  },
  {
    id: "ibm-skillsbuild-internship",
    title: "AICTE & IBM SkillsBuild Academic Internship",
    issuer: "IBM & AICTE",
    date: "2026",
    imagePath: "/certificates/ibm-skillsbuild.png",
    pdfPath: "/certificates/ibm-skillsbuild.pdf",
    category: "Cloud & Enterprise",
    skills: ["Data Analysis", "IBM Cloud", "Python", "Machine Learning"],
  },
  {
    id: "cisco-python-1",
    title: "Python Essentials 1",
    issuer: "Cisco Networking Academy (SISTec)",
    date: "30 May 2025",
    imagePath: "/certificates/cisco-python-1.png",
    pdfPath: "/certificates/cisco-python-1.pdf",
    category: "Programming",
    skills: ["Python Fundamentals", "Control Flow", "Data Types", "Functions & Logic"],
  },
  {
    id: "cisco-python-2",
    title: "Python Essentials 2",
    issuer: "Cisco Networking Academy (SISTec)",
    date: "30 May 2025",
    imagePath: "/certificates/cisco-python-2.png",
    pdfPath: "/certificates/cisco-python-2.pdf",
    category: "Programming",
    skills: ["OOP in Python", "Modules & Packages", "Exception Handling", "File Processing"],
  },
  {
    id: "cisco-intro-cybersecurity",
    title: "Introduction to Cybersecurity",
    issuer: "Cisco Networking Academy (SISTec)",
    date: "31 May 2025",
    imagePath: "/certificates/cisco-intro-cybersecurity.png",
    pdfPath: "/certificates/cisco-intro-cybersecurity.pdf",
    category: "Cybersecurity & Networks",
    skills: ["Threat Intelligence", "Data Confidentiality", "Defense in Depth", "Security Principles"],
  },
  {
    id: "cisco-cybersecurity-essentials",
    title: "Cybersecurity Essentials",
    issuer: "Cisco Networking Academy (SISTec)",
    date: "31 May 2025",
    imagePath: "/certificates/cisco-cybersecurity-essentials.png",
    pdfPath: "/certificates/cisco-cybersecurity-essentials.pdf",
    category: "Cybersecurity & Networks",
    skills: ["Network Security", "Cryptography", "Firewalls", "Incident Response"],
  },
  {
    id: "cisco-ccna-intro-networks",
    title: "CCNA: Introduction to Networks",
    issuer: "Cisco Networking Academy (SISTec)",
    date: "31 May 2025",
    imagePath: "/certificates/cisco-ccna.png",
    pdfPath: "/certificates/cisco-ccna.pdf",
    category: "Cybersecurity & Networks",
    skills: ["TCP/IP Protocols", "IPv4 & IPv6 Subnetting", "Ethernet Switching", "Router Configuration"],
  },
];

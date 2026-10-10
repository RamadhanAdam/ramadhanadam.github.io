// Everything the site says lives here, so it can be edited without touching the layout.
// Descriptions are Ramadhan's own words from the earlier versions of the site.

export const links = {
  email: "ramadhanzome4@gmail.com",
  emailHiroshima: "k260152@hiroshima-u.ac.jp",
  github: "https://github.com/RamadhanAdam",
  huggingface: "https://huggingface.co/RamadhanZome",
  medium: "https://medium.com/@ramadhanzome4",
  cv: "/cv_research.pdf",
  cvIndustry: "/cv_industry.pdf",
  source: "https://github.com/RamadhanAdam/ramadhanadam.github.io",
  talk: "https://rentai-chugoku.org/program/Ver0/",
  linkedin: "https://www.linkedin.com/in/ramadhan-zome-191619353/",
};

// The links in "Say hi". A link with no address is left out.
export const socials = [
  { name: "GitHub", handle: "@RamadhanAdam", href: links.github },
  { name: "LinkedIn", handle: "Ramadhan Zome", href: links.linkedin },
  { name: "Hugging Face", handle: "@RamadhanZome", href: links.huggingface },
  { name: "Medium", handle: "@ramadhanzome4", href: links.medium },
  { name: "CV", handle: "PDF, research version", href: links.cv },
].filter((s) => s.href);

// The greeting switches between English and Japanese.
export const greetings = ["Hello", "こんにちは"];

export const role = "Machine learning engineer and researcher";

export const intro =
  "I build machine learning systems, and I like knowing how things work underneath them: the models, the programs they run on, the networks and the memory.";

export const about = [
  "I'm a student at PAUSTI, and this year I'm on exchange at Hiroshima University, in the Dependable Systems Lab.",
  "What pulls me in is the low level: opening a program up to see what it really does. Reverse engineering, malware, and how you keep a system safe from it. Machine learning is the tool I reach for most.",
  "Off the screen, it's football, or a comic.",
];

export const rightNow = [
  { label: "Research", value: "A malware detector that knows when it doesn't know" },
  { label: "Talk", value: "Chugoku-section conference, 17 October" },
  { label: "Writing", value: "PE files and GPU memory, on Medium" },
];

export type Research = {
  tag: string;
  title: string;
  areas: string[];
  links?: { label: string; href: string }[];
};

export const research: Research[] = [
  {
    tag: "Thesis · in progress",
    title: "Malware detection that knows when it doesn't know",
    areas: ["Self-supervised learning", "Open-set recognition", "Few-shot learning", "Malware analysis"],
  },
  {
    tag: "Research · in progress",
    title: "Intrusion detection for cars, learned across a fleet",
    areas: ["Graph neural networks", "Federated learning", "Vehicle security"],
    links: [{ label: "Code", href: "https://github.com/RamadhanAdam/grama" }],
  },
];

export type Stop = { when: string; title: string; org: string; body: string };

export const experience: Stop[] = [
  {
    when: "Aug 2026 – Jan 2027",
    title: "Special research student",
    org: "Hiroshima University, Dependable Systems Laboratory",
    body: "An exchange hosted by Assoc. Prof. Junjun Zheng. Pretraining my encoder on the lab's GPUs, and presenting the work at the Chugoku-section joint conference.",
  },
  {
    when: "Aug 2026",
    title: "Student evaluator, GPU pilot",
    org: "PAUSTI and Kinesis Network",
    body: "Benchmarked training and inference on A100s with a custom language-model workload and wrote the decision report on performance, reliability and data persistence.",
  },
  {
    when: "Dec 2023 – Jul 2025",
    title: "Data Analyst and Cybersecurity Associate",
    org: "Innovative Toll Solutions",
    body: "Modelling and reporting on operational logs and transaction data. Log-level anomaly detection, alert triage and traffic-pattern analysis, and resilience work after DDoS incidents.",
  },
];

export const education: Stop[] = [
  {
    when: "2025 – 2027",
    title: "M.Sc. Artificial Intelligence and Machine Learning",
    org: "PAUSTI, Pan African University",
    body: "On a Pan African University scholarship from the African Union.",
  },
  {
    when: "2019 – 2023",
    title: "B.Sc. Statistics and Programming",
    org: "Kenyatta University",
    body: "First Class Honours, on a county government scholarship.",
  },
];

export const skills = [
  { group: "Languages", items: ["Python", "C", "x86-64 assembly", "SQL", "Bash", "JavaScript"] },
  { group: "Machine learning", items: ["PyTorch", "TensorFlow", "scikit-learn", "Hugging Face", "FAISS", "Self-supervised learning"] },
  { group: "Security", items: ["PE internals", "Malware analysis", "Reverse engineering", "LIEF", "REMnux", "FLARE-VM"] },
  { group: "Systems", items: ["Linux", "Docker", "Kubernetes", "GitHub Actions", "FastAPI", "PostgreSQL"] },
];

export const certificates = [
  { name: "AI Security & Governance", by: "Securiti", year: "2025" },
  { name: "PrivacyOps", by: "Securiti", year: "2025" },
  { name: "DSPM Fundamentals", by: "Securiti", year: "2025" },
  { name: "Cyber security job simulation", by: "Deloitte", year: "2025" },
  { name: "Automation Developer Professional", by: "UiPath", year: "2024" },
];

export type Project = {
  title: string;
  what: string;
  stack: string;
  preview: "image" | "hex" | "swahili" | "phish";
  image?: string;
  href: string;
  links: { label: string; href: string }[];
};

// Four, not all of them: the rest are on GitHub.
export const projects: Project[] = [
  {
    title: "Explainable deepfake detection",
    what: "Spots GAN faces (about 97% on 20K held-out images) and explains each verdict from the forensics literature.",
    stack: "PyTorch · FAISS · FastAPI · React",
    preview: "image",
    image: "/images/projects/deepfake.jpg",
    href: "https://deepfake-rag.vercel.app",
    links: [
      { label: "Demo", href: "https://deepfake-rag.vercel.app" },
      { label: "Code", href: "https://github.com/RamadhanAdam/deepfake-rag" },
    ],
  },
  {
    title: "raw-pe",
    what: "A working 2,560-byte Windows executable, every header and import written by hand, no linker.",
    stack: "NASM · x86-64",
    preview: "hex",
    href: "https://github.com/RamadhanAdam/raw-pe",
    links: [
      { label: "Code", href: "https://github.com/RamadhanAdam/raw-pe" },
      { label: "Write-up", href: "https://medium.com/@ramadhanzome4/i-wrote-a-windows-pe-file-from-scratch-in-assembly-d011cb0097cb" },
    ],
  },
  {
    title: "Swahili GPT",
    what: "A character-level GPT trained from scratch on 65M characters of Swahili news.",
    stack: "PyTorch · A100",
    preview: "swahili",
    href: "https://huggingface.co/RamadhanZome/swahili-gpt",
    links: [{ label: "Model", href: "https://huggingface.co/RamadhanZome/swahili-gpt" }],
  },
  {
    title: "Phish-Transformer",
    what: "A 45K-parameter transformer behind a Chrome extension that warns you before you click a phishing link.",
    stack: "PyTorch · Flask · Chrome MV3",
    preview: "phish",
    href: "https://github.com/RamadhanAdam/phish-transformer",
    links: [
      { label: "Code", href: "https://github.com/RamadhanAdam/phish-transformer" },
      { label: "Model", href: "https://huggingface.co/RamadhanZome/phish-transformer" },
    ],
  },
];

export type Piece = { kind: "Writing" | "Talk"; when: string; title: string; where: string; href: string };

export const writing: Piece[] = [
  { kind: "Talk", when: "17 Oct 2026", title: "Open-world malware detection, at the Chugoku-section joint conference", where: "Conference", href: "https://rentai-chugoku.org/program/Ver0/" },
  { kind: "Writing", when: "Jul 2026", title: "I Wrote a Windows PE File From Scratch, in Assembly", where: "Medium", href: "https://medium.com/@ramadhanzome4/i-wrote-a-windows-pe-file-from-scratch-in-assembly-d011cb0097cb" },
  { kind: "Writing", when: "Sep 2026", title: "Row Hammer: How Reading Memory Fast Enough Breaks Memory That Was Never Touched", where: "Medium", href: "https://medium.com/@ramadhanzome4" },
  { kind: "Writing", when: "Jul 2026", title: "Authenticode Checks Who Signed a PE File. Nothing Checks Whether It's True.", where: "Medium", href: "https://medium.com/@ramadhanzome4/authenticode-checks-who-signed-a-pe-file-nothing-checks-whether-its-true-6ad4ccc8fbe6" },
];

export type Post = { date: string; title: string; href: string };

// The Medium list on the /writing page (kept for anyone who goes there).
export const medium: Post[] = [
  { date: "2026-09-28", title: "GPU DRAM Architecture, Explained Simply", href: "https://medium.com/genaitrail/gpu-dram-architecture-explained-simply-a4eb4c4d8dcb" },
  { date: "2026-09-27", title: "Row Hammer: How Reading Memory Fast Enough Breaks Memory That Was Never Touched", href: "https://medium.com/@ramadhanzome4" },
  { date: "2026-09-14", title: "The NVIDIA A100: When GPU Architecture Becomes Part of the Research Method", href: "https://medium.com/@ramadhanzome4/the-nvidia-a100-when-gpu-architecture-becomes-part-of-the-research-method-4474c5ada123" },
  { date: "2026-09-08", title: "Beyond the Chatbot: How Self-Attention Learns Structure by Accident", href: "https://medium.com/@ramadhanzome4/beyond-the-chatbot-how-self-attention-learns-structure-by-accident-a63baf7fdc1f" },
  { date: "2026-08-11", title: "RWX Memory in Windows: What Read, Write, and Execute Really Mean", href: "https://medium.com/@ramadhanzome4/rwx-memory-in-windows-what-read-write-and-execute-really-mean-4897c49d3b76" },
  { date: "2026-07-27", title: "PE Overlays: A Small Thing Worth Writing About", href: "https://medium.com/@ramadhanzome4/pe-overlays-a-small-thing-worth-writing-about-056c39ce3774" },
  { date: "2026-07-12", title: "Authenticode Checks Who Signed a PE File. Nothing Checks Whether It's True.", href: "https://medium.com/@ramadhanzome4/authenticode-checks-who-signed-a-pe-file-nothing-checks-whether-its-true-6ad4ccc8fbe6" },
  { date: "2026-07-03", title: "I Wrote a Windows PE File From Scratch, in Assembly", href: "https://medium.com/@ramadhanzome4/i-wrote-a-windows-pe-file-from-scratch-in-assembly-d011cb0097cb" },
  { date: "2026-06-28", title: "Convolutional Neural Networks: How Machines Learn to See", href: "https://medium.com/@ramadhanzome4/convolutional-neural-networks-how-machines-learn-to-see-a8f98209680e" },
];

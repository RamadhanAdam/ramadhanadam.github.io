// Everything the site says lives here, so it can be edited without touching the layout.
// Text is in Ramadhan's own words, taken from the previous version of the site.

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
};

export const intro = [
  "I'm doing my master's in AI and machine learning at PAUSTI in Nairobi, and until January I'm in Hiroshima, working with Assoc. Prof. Junjun Zheng in his Dependable Systems Laboratory.",
  "My thesis is about malware detection that admits when it doesn't know. Most classifiers will call a brand-new malware family by the name of one they've already seen. I'm building one that reads a Windows executable the way the PE format lays it out, says \"I haven't seen this before\", and then learns the new family from a handful of examples.",
];

// The phrases that glide in after "I build machine learning that".
export const rotating = [
  "knows when it doesn't know.",
  "reads programs the way Windows does.",
  "watches the messages inside a car.",
  "speaks a little Swahili.",
];

// A number counts up when it scrolls into view; a fact with text instead of a number is shown as it is.
export type Fact = { value?: number; decimals?: number; suffix?: string; text?: string; label: string };

export const facts: Fact[] = [
  { value: 9.9, decimals: 1, suffix: "M", label: "Windows programs my thesis encoder learned from" },
  { value: 2560, label: "bytes in the Windows .exe I wrote by hand" },
  { value: 65, suffix: "M", label: "characters of Swahili news behind my GPT" },
  { text: "First Class", label: "Honours, B.Sc. Statistics and Programming" },
];

export type Work = {
  tag: string;
  title: string;
  subtitle?: string;
  body: string[];
  footnote?: string;
  link?: { label: string; href: string };
};

export const work: Work[] = [
  {
    tag: "Thesis · in progress",
    title: "Open-world malware detection",
    subtitle: "Open-World Windows Malware Detection with PE-Aware Hierarchical Embeddings and Few-Shot Adaptation",
    body: [
      "A malware classifier gives every new family the name of an old one. I'm building detection that can also say \"unknown\", then learn the new family from a few examples.",
      "The encoder reads a Windows program region by region, the way the PE format lays it out: header, sections, overlay, with a learned bias that lets it compare sections by type, entropy and size. I pretrained it without labels on the 9.9 million binaries of SOREL-20M. Each known family is described by several prototypes, and a file far from all of them is rejected.",
      "The unglamorous part was getting 9.9 million binaries out of S3 without crashes eating a week of the schedule. I'll write the results up in the thesis and show them in the talk on 17 October.",
    ],
    footnote: "With Dr. Albert Njoroge Kahira and Dr. Mulang' Onando at PAUSTI, and Assoc. Prof. Junjun Zheng at Hiroshima University.",
  },
  {
    tag: "Research · in progress",
    title: "Federated intrusion detection for vehicles",
    body: [
      "GraMa reads in-vehicle CAN traffic as a graph of message IDs with graph attention, follows it over time with a Mamba model, and trains across vehicles without sharing their data. The server clusters the vehicles' updates with HDBSCAN to keep poisoned ones out.",
    ],
    link: { label: "Code", href: "https://github.com/RamadhanAdam/grama" },
  },
];

export type Project = {
  title: string;
  blurb: string;
  stack: string;
  kind: "ML" | "Security" | "Systems";
  image?: string;
  links: { label: string; href: string }[];
};

export const projects: Project[] = [
  {
    title: "Explainable deepfake detection",
    blurb: "An Xception classifier trained on 140K real and GAN faces (about 97% on 20K held-out images) that explains each verdict by retrieving passages from the deepfake-forensics literature.",
    stack: "PyTorch · FAISS · FastAPI · React",
    kind: "ML",
    image: "/images/projects/deepfake.jpg",
    links: [
      { label: "Try the demo", href: "https://deepfake-rag.vercel.app" },
      { label: "Code", href: "https://github.com/RamadhanAdam/deepfake-rag" },
    ],
  },
  {
    title: "raw-pe",
    blurb: "A working 2,560-byte Win64 executable, hand-assembled in NASM. Every header and import entry written by hand, no linker. I wanted to know what the Windows loader actually asks for.",
    stack: "NASM · x86-64",
    kind: "Security",
    links: [
      { label: "Code", href: "https://github.com/RamadhanAdam/raw-pe" },
      { label: "Write-up", href: "https://medium.com/@ramadhanzome4/i-wrote-a-windows-pe-file-from-scratch-in-assembly-d011cb0097cb" },
    ],
  },
  {
    title: "sco-pe",
    blurb: "A PE parser in C with bounds checks for malformed files: headers, sections, imports, exports and overlays. The other side of raw-pe.",
    stack: "C",
    kind: "Security",
    links: [{ label: "Code", href: "https://github.com/RamadhanAdam/sco-pe" }],
  },
  {
    title: "Swahili GPT",
    blurb: "A character-level GPT trained from scratch on 65M characters of Swahili news (29,544 articles), a small study of language modelling for a low-resource African language.",
    stack: "PyTorch · A100",
    kind: "ML",
    links: [{ label: "Model", href: "https://huggingface.co/RamadhanZome/swahili-gpt" }],
  },
  {
    title: "Phish-Transformer",
    blurb: "A 45K-parameter character-level transformer for phishing URLs (test AUC about 0.98), served to a Chrome extension that warns you before you click.",
    stack: "PyTorch · Flask · Chrome MV3",
    kind: "Security",
    links: [
      { label: "Code", href: "https://github.com/RamadhanAdam/phish-transformer" },
      { label: "Model", href: "https://huggingface.co/RamadhanZome/phish-transformer" },
    ],
  },
  {
    title: "ML on Kubernetes",
    blurb: "A prediction API deployed to GKE through GitHub Actions CI/CD, with a PostgreSQL StatefulSet for prediction logs, SOPS-encrypted secrets, and Prometheus, Grafana and Loki monitoring.",
    stack: "FastAPI · GKE · Helm",
    kind: "Systems",
    links: [{ label: "Code", href: "https://github.com/RamadhanAdam/ml_deployment_project" }],
  },
];

export type Role = { when: string; title: string; org: string; body: string };

export const experience: { group: string; roles: Role[] }[] = [
  {
    group: "Research",
    roles: [
      {
        when: "Aug 2026 – Jan 2027",
        title: "Special research student",
        org: "Hiroshima University · Dependable Systems Laboratory, Higashi-Hiroshima",
        body: "An exchange hosted by Assoc. Prof. Junjun Zheng. Pretraining the byte encoder on SOREL-20M with the lab's GPUs, testing open-set rejection on BODMAS, and presenting the work at the Chugoku-section joint conference.",
      },
      {
        when: "Aug 2026",
        title: "Student evaluator, GPU pilot for PAUSTI",
        org: "Kinesis Network A100 pilot",
        body: "Benchmarked training and inference with a custom language-model workload and wrote the decision report on performance, reliability and data persistence.",
      },
    ],
  },
  {
    group: "Industry",
    roles: [
      {
        when: "Dec 2023 – Jul 2025",
        title: "Data Analyst and Cybersecurity Associate",
        org: "Innovative Toll Solutions, Nairobi",
        body: "Modelling and reporting on operational logs and transaction data. Log-level anomaly detection, alert triage and traffic-pattern analysis, and resilience work after DDoS incidents.",
      },
    ],
  },
  {
    group: "Education",
    roles: [
      {
        when: "2025 – 2027",
        title: "M.Sc. Artificial Intelligence and Machine Learning",
        org: "PAUSTI, Pan African University, Nairobi",
        body: "On a Pan African University scholarship from the African Union. Thesis supervised by Dr. Albert Njoroge Kahira and Dr. Mulang' Onando.",
      },
      {
        when: "2019 – 2023",
        title: "B.Sc. Statistics and Programming",
        org: "Kenyatta University, Nairobi",
        body: "First Class Honours, on a county government scholarship.",
      },
    ],
  },
];

export type Post = { date: string; title: string; href: string };

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

export const more =
  "I like going down the stack. I wrote a Windows .exe byte by byte to understand the loader, and I write about how GPU memory fails: Rowhammer, side-channel and fault attacks.";

export const skills: { group: string; items: string[] }[] = [
  { group: "Languages", items: ["Python", "C", "SQL", "Bash", "x86-64 assembly (NASM)", "JavaScript"] },
  { group: "ML", items: ["PyTorch", "TensorFlow", "scikit-learn", "Hugging Face", "FAISS", "HDBSCAN", "contrastive and self-supervised learning"] },
  { group: "Systems", items: ["Docker", "Kubernetes", "Helm", "GitHub Actions", "GKE", "FastAPI", "PostgreSQL", "Prometheus", "Grafana", "Linux"] },
  { group: "Security", items: ["PE format", "static and dynamic malware analysis", "reverse engineering", "REMnux", "FLARE-VM"] },
];

export const honours = [
  "First Class Honours, B.Sc. Statistics and Programming, Kenyatta University, 2023",
  "Pan African University scholarship (African Union), M.Sc. at PAUSTI, 2025–2027",
  "County government scholarship, Kenya, for secondary school and for the B.Sc., 2019–2023",
];

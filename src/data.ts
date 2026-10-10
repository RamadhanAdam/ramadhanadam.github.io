// Everything the site says lives here, so it can be edited without touching the layout.
// The descriptions are Ramadhan's own words, from the previous version of the site.

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

export type FloorId = "ideas" | "models" | "systems" | "binaries" | "memory";

// The chips that float around the greeting. Each one belongs to a floor of the stack.
export const interests: { label: string; floor: FloorId }[] = [
  { label: "Transformers", floor: "models" },
  { label: "Malware", floor: "binaries" },
  { label: "Rowhammer", floor: "memory" },
  { label: "Swahili NLP", floor: "models" },
  { label: "The PE format", floor: "binaries" },
  { label: "Car networks", floor: "systems" },
  { label: "GPU memory", floor: "memory" },
  { label: "Deepfakes", floor: "models" },
  { label: "Philosophy of mind", floor: "ideas" },
  { label: "Assembly", floor: "binaries" },
  { label: "Federated learning", floor: "systems" },
  { label: "Kubernetes", floor: "systems" },
];

export type Item = {
  kind: "Research" | "Project" | "Writing" | "Note" | "Work";
  title: string;
  line: string; // one line on the card
  status?: string;
  details?: string[]; // shown when the card is opened
  footnote?: string;
  image?: string;
  tags?: string[];
  links?: { label: string; href: string }[];
  href?: string; // a card that is only a link (writing) goes straight there
  wide?: boolean;
};

export type Floor = { id: FloorId; n: number; name: string; tagline: string; items: Item[] };

export const floors: Floor[] = [
  {
    id: "ideas",
    n: 1,
    name: "Ideas",
    tagline: "How learning works, and what it would mean for a machine to understand.",
    items: [
      {
        kind: "Note",
        title: "The Consciousness Paradox in Large Language Models",
        line: "Should a perfect simulation of consciousness change how we talk about understanding?",
        href: "/writing/ai-consciousness-paradox",
      },
      {
        kind: "Note",
        title: "Hebbian Learning and the Road to Backpropagation",
        line: "What Hebb's local rule still explains, and the problem backpropagation solved instead.",
        href: "/writing/hebbian-learning-backprop",
      },
      {
        kind: "Note",
        title: "Reducing the Dimensionality of Data with Neural Networks",
        line: "Hinton and Salakhutdinov, 2006: the trick that made deep autoencoders trainable.",
        href: "/writing/hinton-2006-dimensionality",
      },
    ],
  },
  {
    id: "models",
    n: 2,
    name: "Models",
    tagline: "Networks that see, read and judge, and say why.",
    items: [
      {
        kind: "Project",
        title: "Explainable deepfake detection",
        line: "Spots GAN faces, then explains each verdict from the forensics literature.",
        status: "Live demo",
        image: "/images/projects/deepfake.jpg",
        wide: true,
        details: [
          "An Xception classifier trained on 140K real and GAN faces (about 97% on 20K held-out images) that explains each verdict by retrieving passages from the deepfake-forensics literature.",
        ],
        tags: ["PyTorch", "FAISS", "FastAPI", "React"],
        links: [
          { label: "Try the demo", href: "https://deepfake-rag.vercel.app" },
          { label: "Code", href: "https://github.com/RamadhanAdam/deepfake-rag" },
        ],
      },
      {
        kind: "Project",
        title: "Swahili GPT",
        line: "A GPT trained from scratch on 65M characters of Swahili news.",
        details: [
          "A character-level GPT trained from scratch on 65M characters of Swahili news (29,544 articles), a small study of language modelling for a low-resource African language.",
        ],
        tags: ["PyTorch", "A100"],
        links: [{ label: "Model", href: "https://huggingface.co/RamadhanZome/swahili-gpt" }],
      },
      {
        kind: "Project",
        title: "Phish-Transformer",
        line: "A 45K-parameter transformer that warns you before you click a phishing link.",
        details: [
          "A 45K-parameter character-level transformer for phishing URLs (test AUC about 0.98), served to a Chrome extension that warns you before you click.",
        ],
        tags: ["PyTorch", "Flask", "Chrome MV3"],
        links: [
          { label: "Code", href: "https://github.com/RamadhanAdam/phish-transformer" },
          { label: "Model", href: "https://huggingface.co/RamadhanZome/phish-transformer" },
        ],
      },
      {
        kind: "Writing",
        title: "Beyond the Chatbot: How Self-Attention Learns Structure by Accident",
        line: "On Medium.",
        href: "https://medium.com/@ramadhanzome4/beyond-the-chatbot-how-self-attention-learns-structure-by-accident-a63baf7fdc1f",
      },
      {
        kind: "Writing",
        title: "Convolutional Neural Networks: How Machines Learn to See",
        line: "On Medium.",
        href: "https://medium.com/@ramadhanzome4/convolutional-neural-networks-how-machines-learn-to-see-a8f98209680e",
      },
    ],
  },
  {
    id: "systems",
    n: 3,
    name: "Systems",
    tagline: "Models out in the world: fleets of cars, clusters, pipelines.",
    items: [
      {
        kind: "Research",
        title: "GraMa: intrusion detection for cars",
        line: "Reads a car's network as graphs of messages, and learns across a fleet without sharing data.",
        status: "In progress",
        wide: true,
        details: [
          "GraMa reads in-vehicle CAN traffic as a graph of message IDs with graph attention, follows it over time with a Mamba model, and trains across vehicles without sharing their data. The server clusters the vehicles' updates with HDBSCAN to keep poisoned ones out.",
        ],
        tags: ["Graph attention", "Mamba", "Federated learning", "HDBSCAN"],
        links: [{ label: "Code", href: "https://github.com/RamadhanAdam/grama" }],
      },
      {
        kind: "Project",
        title: "ML on Kubernetes",
        line: "A prediction API on GKE with CI/CD, secrets and monitoring done properly.",
        details: [
          "A prediction API deployed to GKE through GitHub Actions CI/CD, with a PostgreSQL StatefulSet for prediction logs, SOPS-encrypted secrets, and Prometheus, Grafana and Loki monitoring.",
        ],
        tags: ["FastAPI", "GKE", "Helm"],
        links: [{ label: "Code", href: "https://github.com/RamadhanAdam/ml_deployment_project" }],
      },
      {
        kind: "Work",
        title: "Logs, anomalies and DDoS at a toll operator",
        line: "Data analyst and cybersecurity associate, Nairobi, 2023 to 2025.",
        details: [
          "Modelling and reporting on operational logs and transaction data. Log-level anomaly detection, alert triage and traffic-pattern analysis, and resilience work after DDoS incidents.",
        ],
        footnote: "Innovative Toll Solutions, Nairobi, Dec 2023 – Jul 2025.",
      },
    ],
  },
  {
    id: "binaries",
    n: 4,
    name: "Binaries",
    tagline: "What a program really is, byte by byte.",
    items: [
      {
        kind: "Research",
        title: "Malware detection that knows when it doesn't know",
        line: "My thesis: a detector that can say \"I haven't seen this before\", then learn the new family from a few examples.",
        status: "Thesis, in progress",
        wide: true,
        details: [
          "A malware classifier gives every new family the name of an old one. I'm building detection that can also say \"unknown\", then learn the new family from a few examples.",
          "The encoder reads a Windows program region by region, the way the PE format lays it out. I pretrained it without labels on the 9.9 million binaries of SOREL-20M.",
          "The unglamorous part was getting 9.9 million binaries out of S3 without crashes eating a week of the schedule. I'll show the results in the talk on 17 October.",
        ],
        footnote: "With Dr. Albert Njoroge Kahira and Dr. Mulang' Onando at PAUSTI, and Assoc. Prof. Junjun Zheng at Hiroshima University.",
        tags: ["Self-supervised learning", "Open-set recognition", "Few-shot learning"],
      },
      {
        kind: "Project",
        title: "raw-pe",
        line: "A working Windows .exe, 2,560 bytes, every header written by hand.",
        details: [
          "A working 2,560-byte Win64 executable, hand-assembled in NASM. Every header and import entry written by hand, no linker. I wanted to know what the Windows loader actually asks for.",
        ],
        tags: ["NASM", "x86-64"],
        links: [
          { label: "Code", href: "https://github.com/RamadhanAdam/raw-pe" },
          { label: "Write-up", href: "https://medium.com/@ramadhanzome4/i-wrote-a-windows-pe-file-from-scratch-in-assembly-d011cb0097cb" },
        ],
      },
      {
        kind: "Project",
        title: "sco-pe",
        line: "A PE parser in C that survives malformed files. The other side of raw-pe.",
        details: [
          "A PE parser in C with bounds checks for malformed files: headers, sections, imports, exports and overlays. The other side of raw-pe.",
        ],
        tags: ["C"],
        links: [{ label: "Code", href: "https://github.com/RamadhanAdam/sco-pe" }],
      },
      {
        kind: "Writing",
        title: "Authenticode Checks Who Signed a PE File. Nothing Checks Whether It's True.",
        line: "On Medium.",
        href: "https://medium.com/@ramadhanzome4/authenticode-checks-who-signed-a-pe-file-nothing-checks-whether-its-true-6ad4ccc8fbe6",
      },
      {
        kind: "Writing",
        title: "PE Overlays: A Small Thing Worth Writing About",
        line: "On Medium.",
        href: "https://medium.com/@ramadhanzome4/pe-overlays-a-small-thing-worth-writing-about-056c39ce3774",
      },
      {
        kind: "Writing",
        title: "RWX Memory in Windows: What Read, Write, and Execute Really Mean",
        line: "On Medium.",
        href: "https://medium.com/@ramadhanzome4/rwx-memory-in-windows-what-read-write-and-execute-really-mean-4897c49d3b76",
      },
    ],
  },
  {
    id: "memory",
    n: 5,
    name: "Memory",
    tagline: "Where the bits physically live, and how they flip.",
    items: [
      {
        kind: "Writing",
        title: "Row Hammer: How Reading Memory Fast Enough Breaks Memory That Was Never Touched",
        line: "On Medium.",
        href: "https://medium.com/@ramadhanzome4",
        wide: true,
      },
      {
        kind: "Writing",
        title: "GPU DRAM Architecture, Explained Simply",
        line: "On Medium.",
        href: "https://medium.com/genaitrail/gpu-dram-architecture-explained-simply-a4eb4c4d8dcb",
      },
      {
        kind: "Writing",
        title: "The NVIDIA A100: When GPU Architecture Becomes Part of the Research Method",
        line: "On Medium.",
        href: "https://medium.com/@ramadhanzome4/the-nvidia-a100-when-gpu-architecture-becomes-part-of-the-research-method-4474c5ada123",
      },
      {
        kind: "Work",
        title: "Putting A100s through their paces for PAUSTI",
        line: "Student evaluator, Kinesis Network GPU pilot, August 2026.",
        details: [
          "Benchmarked training and inference with a custom language-model workload and wrote the decision report on performance, reliability and data persistence.",
        ],
      },
    ],
  },
];

// How I got here, oldest first.
export const path: { when: string; place: string; city: string; role: string; body: string }[] = [
  {
    when: "2019 – 2023",
    place: "Kenyatta University",
    city: "Nairobi",
    role: "B.Sc. Statistics and Programming",
    body: "First Class Honours, on a county government scholarship.",
  },
  {
    when: "2023 – 2025",
    place: "Innovative Toll Solutions",
    city: "Nairobi",
    role: "Data Analyst and Cybersecurity Associate",
    body: "Log-level anomaly detection, alert triage and traffic-pattern analysis, and resilience work after DDoS incidents.",
  },
  {
    when: "2025 – 2027",
    place: "PAUSTI, Pan African University",
    city: "Nairobi",
    role: "M.Sc. Artificial Intelligence and Machine Learning",
    body: "On a Pan African University scholarship from the African Union. Thesis supervised by Dr. Albert Njoroge Kahira and Dr. Mulang' Onando.",
  },
  {
    when: "Aug 2026 – Jan 2027",
    place: "Hiroshima University",
    city: "Higashi-Hiroshima",
    role: "Special research student, Dependable Systems Laboratory",
    body: "An exchange hosted by Assoc. Prof. Junjun Zheng. Pretraining my encoder on the lab's GPUs, and presenting the work at the Chugoku-section joint conference on 17 October.",
  },
];

export type Post = { date: string; title: string; href: string };

// The Medium list on the writing page.
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

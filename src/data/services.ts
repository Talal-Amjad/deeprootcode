import type { Service } from "@/types";

/**
 * Services shown on the home page, /services and /services/[slug].
 * Order matters: the first entries appear first in grids and navigation.
 */
export const services: Service[] = [
  {
    slug: "web-development",
    title: "Web Development",
    shortTitle: "Web & SaaS",
    icon: "globe",
    summary:
      "Fast, accessible websites and full-stack web applications — from a focused landing page to a multi-tenant SaaS platform.",
    overview:
      "We design and build web products that are quick to load, easy to use and straightforward to maintain. Whether you need a marketing site that explains your offer clearly or a full application with accounts, payments and dashboards, we choose an architecture that fits the problem rather than the trend.",
    capabilities: [
      "Business websites & landing pages",
      "Custom web applications",
      "SaaS platforms",
      "E-commerce solutions",
      "Admin dashboards & portals",
      "Full-stack development",
    ],
    problems: [
      "Your current site is slow, hard to update or doesn't explain what you do.",
      "Internal teams rely on spreadsheets and email for work that deserves a proper tool.",
      "You have a SaaS idea and need a dependable first version to put in front of users.",
      "An existing application has grown difficult to change without breaking something.",
    ],
    deliverables: [
      "Responsive, accessible interfaces built from a reusable component system",
      "Full-stack applications with authentication, roles and data management",
      "Payment, e-commerce and subscription flows",
      "Admin panels and reporting dashboards",
      "SEO-ready pages with sensible performance budgets",
      "Deployment pipelines and handover documentation",
    ],
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Node.js", "Ruby on Rails", "Django", "PostgreSQL"],
    approach: [
      {
        title: "Start with the user journey",
        description: "We map what visitors and users need to accomplish before choosing pages or features.",
      },
      {
        title: "Build on a component system",
        description: "A consistent set of UI building blocks keeps the product coherent and quick to extend.",
      },
      {
        title: "Ship in usable increments",
        description: "You see working software early and can adjust priorities as you learn.",
      },
    ],
    contactCategory: "Web Development",
    ctaLabel: "Discuss a web project",
    seo: {
      title: "Web Development Services: Web Apps & SaaS",
      description:
        "Custom web development: business websites, web applications, SaaS platforms, e-commerce and dashboards built with Next.js, React, Node.js, Rails and Django.",
    },
    faqs: [
      {
        question: "What kind of websites and web applications do you build?",
        answer:
          "We build business websites and landing pages, custom web applications, SaaS platforms, e-commerce stores, admin dashboards and customer portals — from the interface through to the backend, database and deployment.",
      },
      {
        question: "Which technologies do you use for web development?",
        answer:
          "Most frontends use React and Next.js with TypeScript and Tailwind CSS. For backends we choose between Node.js/Express, Ruby on Rails, Django and FastAPI, with PostgreSQL, MySQL or MongoDB, depending on the project's needs and your team's existing skills.",
      },
      {
        question: "Can you improve or take over an existing web application?",
        answer:
          "Yes. We start with a code review to understand the architecture, risks and quick wins, then agree a plan — whether that's fixing performance problems, adding features or gradually modernising the codebase.",
      },
      {
        question: "Will my website be fast and search-engine friendly?",
        answer:
          "Performance, accessibility and technical SEO are part of our baseline: server rendering where it helps, optimised images and fonts, semantic HTML, metadata, sitemaps and structured data.",
      },
    ],
  },
  {
    slug: "ai-machine-learning",
    title: "AI & Machine Learning",
    shortTitle: "AI Solutions",
    icon: "brain",
    summary:
      "Practical AI features and applications: LLM integrations, assistants, RAG systems, document processing and custom ML models.",
    overview:
      "AI is most valuable when it solves a specific, well-understood problem. We help you identify where language models or machine learning genuinely add value, then build reliable features around them — with evaluation, guardrails and clear fallbacks so they behave predictably in real use.",
    capabilities: [
      "LLM integrations",
      "AI chatbots & assistants",
      "RAG systems",
      "Intelligent document processing",
      "Machine learning solutions",
      "Research & prototyping",
    ],
    problems: [
      "Your team spends hours searching through documents, policies or knowledge bases.",
      "You want an assistant that answers questions using your own data, not generic internet knowledge.",
      "Large volumes of documents need to be classified, extracted or summarised.",
      "You have data and suspect a model could predict or automate something, but need to validate it first.",
    ],
    deliverables: [
      "LLM-powered features integrated into new or existing products",
      "Retrieval-augmented assistants grounded in your documents",
      "Document extraction and classification pipelines",
      "Custom machine learning models with evaluation reports",
      "Prompt, retrieval and output evaluation suites",
      "Proofs of concept to test feasibility before larger investment",
    ],
    technologies: ["Python", "FastAPI", "LLM APIs", "PyTorch", "scikit-learn", "Vector databases", "PostgreSQL"],
    approach: [
      {
        title: "Define success measurably",
        description: "We agree on what a good answer or prediction looks like and how we will test it.",
      },
      {
        title: "Prototype, then harden",
        description: "A quick prototype validates the idea; production work adds evaluation, monitoring and safeguards.",
      },
      {
        title: "Keep humans in the loop",
        description: "Where decisions matter, we design review steps and transparent outputs rather than black boxes.",
      },
    ],
    contactCategory: "AI & Machine Learning",
    ctaLabel: "Explore an AI idea",
    seo: {
      title: "AI Development: LLM, Chatbots & RAG",
      description:
        "AI and machine learning development: LLM integrations, AI chatbots and assistants, RAG systems, document processing and custom ML models with evaluation.",
    },
    faqs: [
      {
        question: "What is a RAG system and when do I need one?",
        answer:
          "Retrieval-augmented generation (RAG) lets a language model answer questions using your own documents. Relevant passages are retrieved first and the model answers from them, ideally with citations. It suits knowledge bases, policies, support content and internal documentation.",
      },
      {
        question: "Can you build an AI chatbot trained on our company data?",
        answer:
          "Yes. In most cases we use retrieval over your documents rather than training a new model, which is faster, cheaper and easier to keep up to date. We add access controls, source citations and a fallback when the answer isn't in your data.",
      },
      {
        question: "How do you make AI features reliable?",
        answer:
          "We define what a good output looks like, build an evaluation set from realistic examples, and test prompts, retrieval and models against it. Production features get guardrails, monitoring and human review where decisions matter.",
      },
      {
        question: "Can you help us check whether an AI idea is feasible?",
        answer:
          "Yes. A short proof of concept with real data is often the best first step. It shows what accuracy is achievable and what a full build would involve before you commit a larger budget.",
      },
    ],
  },
  {
    slug: "business-process-automation",
    title: "Business Process Automation",
    shortTitle: "Automation",
    icon: "workflow",
    summary:
      "Connect your tools and remove repetitive work with dependable workflows, integrations and AI-assisted automation.",
    overview:
      "Many teams lose hours every week copying data between systems, preparing the same reports and chasing manual steps. We map those workflows, automate the parts that are predictable and leave people in control of the parts that need judgement.",
    capabilities: [
      "Workflow automation",
      "API integrations",
      "Third-party service integrations",
      "Repetitive task automation",
      "AI-powered automation",
      "Data processing & reporting",
    ],
    problems: [
      "Data is entered manually into several tools that should talk to each other.",
      "Weekly or monthly reports take hours to assemble by hand.",
      "Requests, approvals or onboarding steps get lost between people and inboxes.",
      "Off-the-shelf automation tools have hit their limits for your use case.",
    ],
    deliverables: [
      "Automated workflows between your existing tools",
      "Custom integrations with third-party APIs",
      "Scheduled data processing and reporting jobs",
      "AI-assisted triage, extraction and summarisation steps",
      "Monitoring and alerts for failed or unusual runs",
      "Documentation so your team understands each workflow",
    ],
    technologies: ["Python", "Node.js", "REST APIs", "FastAPI", "PostgreSQL", "Redis", "LLM APIs"],
    approach: [
      {
        title: "Map the current process",
        description: "We document each step, who owns it and where errors or delays occur.",
      },
      {
        title: "Automate the predictable parts",
        description: "Rules-based steps are automated first; judgement calls stay with people.",
      },
      {
        title: "Make failures visible",
        description: "Logging, retries and alerts mean problems surface quickly instead of silently.",
      },
    ],
    contactCategory: "Automation",
    ctaLabel: "Automate a workflow",
    seo: {
      title: "Business Process Automation Services",
      description:
        "Automate repetitive work with workflow automation, API and third-party integrations, AI-powered automation, and scheduled data processing and reporting.",
    },
    faqs: [
      {
        question: "What business processes can be automated?",
        answer:
          "Good candidates are repetitive, rules-based tasks: copying data between systems, generating recurring reports, processing invoices or forms, onboarding steps, notifications and approvals. Steps that need human judgement can stay manual or become review steps.",
      },
      {
        question: "Should we use Zapier or Make, or a custom automation?",
        answer:
          "No-code tools are great for simple workflows. Custom automation makes sense when you hit their limits — complex logic, large data volumes, unsupported APIs, cost at scale or stricter reliability needs. We can also combine both.",
      },
      {
        question: "Can AI be part of an automated workflow?",
        answer:
          "Yes. Language models can classify messages, extract fields from documents or summarise content inside a workflow. We pair them with validation rules and confidence thresholds so uncertain results go to a person.",
      },
      {
        question: "What happens if an automation fails?",
        answer:
          "We build in logging, retries and alerts, so failures are visible and recoverable instead of silent. Each workflow is documented so your team understands what it does.",
      },
    ],
  },
  {
    slug: "mobile-app-development",
    title: "Mobile App Development",
    shortTitle: "Mobile Apps",
    icon: "smartphone",
    summary:
      "Cross-platform Android and iOS apps with polished interfaces and reliable connections to your backend.",
    overview:
      "We build mobile applications with React Native, so a single codebase serves both Android and iOS without compromising the experience. From customer-facing apps to internal field tools, we focus on clear interfaces, offline-aware behaviour and solid API integration.",
    capabilities: [
      "Android & iOS applications",
      "Cross-platform apps",
      "Business applications",
      "API & backend integration",
      "Mobile UI/UX implementation",
    ],
    problems: [
      "Your customers expect a mobile experience your website can't provide.",
      "Field teams need a reliable app for data capture, check-ins or task management.",
      "You need to launch on both Android and iOS without funding two separate teams.",
    ],
    deliverables: [
      "Cross-platform apps for Android and iOS",
      "Authentication, push notifications and in-app flows",
      "Integration with new or existing APIs",
      "Offline-aware data handling where the use case needs it",
      "Store submission support and release documentation",
    ],
    technologies: ["React Native", "TypeScript", "Node.js", "REST APIs", "PostgreSQL", "MongoDB"],
    approach: [
      {
        title: "Design for small screens first",
        description: "Flows are planned around thumbs, interruptions and patchy connections.",
      },
      {
        title: "Share logic, respect platforms",
        description: "One codebase where it helps, platform-specific details where users notice them.",
      },
      {
        title: "Test on real devices",
        description: "We validate behaviour across device sizes and OS versions before release.",
      },
    ],
    contactCategory: "Mobile Development",
    ctaLabel: "Plan a mobile app",
    seo: {
      title: "Mobile App Development: iOS & Android Apps",
      description:
        "Cross-platform mobile app development with React Native: Android and iOS business apps with polished UI, offline support and reliable backend integration.",
    },
    faqs: [
      {
        question: "Do you build apps for both Android and iOS?",
        answer:
          "Yes. We use React Native, so one codebase serves both platforms, with platform-specific details where users would notice them.",
      },
      {
        question: "Can the app work without an internet connection?",
        answer:
          "Where the use case needs it, we store data on the device and sync it when a connection returns — common for field, inspection and data-collection apps.",
      },
      {
        question: "Can you also build the backend for the app?",
        answer:
          "Yes. We design and build the APIs, database, authentication and admin tools the app depends on, or integrate with your existing backend.",
      },
      {
        question: "Do you help publish apps to the App Store and Google Play?",
        answer:
          "We prepare release builds and help with store submission, listings and review requirements. The developer accounts are created in your name so you own the apps.",
      },
    ],
  },
  {
    slug: "backend-api-development",
    title: "Backend & API Development",
    shortTitle: "Backend & APIs",
    icon: "server",
    summary:
      "Well-structured APIs, data models and backend systems that stay fast, secure and understandable as they grow.",
    overview:
      "The backend is the foundation every interface depends on. We design data models, APIs and services with clear boundaries, strong authentication and sensible performance characteristics — and document them so other developers can build on them confidently.",
    capabilities: [
      "RESTful APIs",
      "Database design",
      "Authentication & authorization",
      "Scalable backend systems",
      "Third-party integrations",
      "Performance optimisation",
    ],
    problems: [
      "Your frontend or mobile app needs a dependable API behind it.",
      "Queries are slowing down as your data grows.",
      "Access control has become inconsistent or hard to reason about.",
      "Several services need to exchange data reliably.",
    ],
    deliverables: [
      "Documented REST APIs with versioning and validation",
      "Relational and document database schemas",
      "Authentication, roles and permission models",
      "Background jobs, queues and caching layers",
      "Performance profiling and optimisation",
      "Automated tests and CI/CD pipelines",
    ],
    technologies: ["Node.js", "Express.js", "Ruby on Rails", "Django", "FastAPI", "PostgreSQL", "MySQL", "MongoDB", "Redis"],
    approach: [
      {
        title: "Model the domain carefully",
        description: "Good data models make every later feature simpler; we spend time getting them right.",
      },
      {
        title: "Secure by default",
        description: "Input validation, least-privilege access and safe secret handling are part of the baseline.",
      },
      {
        title: "Measure before optimising",
        description: "We profile real bottlenecks rather than guessing.",
      },
    ],
    contactCategory: "Backend / API Development",
    ctaLabel: "Talk about your backend",
    seo: {
      title: "Backend & REST API Development Services",
      description:
        "Backend and API development: REST APIs, database design, authentication, scalable systems and performance tuning with Node.js, Rails, Django and FastAPI.",
    },
    faqs: [
      {
        question: "Which backend frameworks do you work with?",
        answer:
          "Node.js with Express, Ruby on Rails, Django and FastAPI. We choose based on the project, performance needs and the skills of the team that will maintain it.",
      },
      {
        question: "Which database should I use: PostgreSQL, MySQL or MongoDB?",
        answer:
          "For most business applications with related data, PostgreSQL is a strong default. MongoDB can suit flexible, document-shaped data, and Redis is ideal for caching and queues. We recommend a choice after looking at your data and access patterns.",
      },
      {
        question: "How do you keep APIs secure?",
        answer:
          "Every request is validated, access rules are enforced on the server, secrets stay out of code, and authentication follows established standards. We also add rate limiting, logging and dependency updates as part of normal work.",
      },
      {
        question: "Can you fix a slow API or database?",
        answer:
          "Yes. We profile real requests and queries to find the actual bottlenecks, then apply targeted fixes such as indexes, query changes, caching or background jobs.",
      },
    ],
  },
  {
    slug: "research-development",
    title: "Research & Development",
    shortTitle: "R&D",
    icon: "flask",
    summary:
      "Technical implementation for research: prototypes, experiments, datasets and tools for Master's, PhD and applied research.",
    overview:
      "Research often needs solid engineering to move from idea to evidence. We collaborate with researchers on implementation — building prototypes, preparing datasets, running experiments and developing research tools — while the research questions, analysis and authorship remain yours. We work transparently and in line with academic integrity policies.",
    capabilities: [
      "Research implementation",
      "PhD & Master's prototyping",
      "AI/ML research support",
      "Dataset preparation & processing",
      "Experiment implementation & evaluation",
      "Research tool development",
    ],
    problems: [
      "Your research design is clear, but implementing it in code is slowing you down.",
      "You need a working prototype to test a hypothesis or demonstrate a concept.",
      "Raw data needs cleaning, structuring or labelling before experiments can begin.",
      "Experiments need to be reproducible, well-documented and easy to re-run.",
    ],
    deliverables: [
      "Research prototypes and proof-of-concept implementations",
      "Reproducible experiment pipelines with documented configuration",
      "Dataset preparation, cleaning and processing scripts",
      "Evaluation harnesses and baseline implementations",
      "Custom research tools and interfaces",
      "Code walkthroughs so you fully understand the implementation",
    ],
    technologies: ["Python", "PyTorch", "scikit-learn", "Jupyter", "FastAPI", "PostgreSQL"],
    approach: [
      {
        title: "Your research, our engineering",
        description: "You own the research questions and conclusions; we help implement and test them.",
      },
      {
        title: "Reproducibility first",
        description: "Versioned code, fixed seeds and documented environments make results verifiable.",
      },
      {
        title: "Transparent collaboration",
        description: "We explain what we build so it can be disclosed and understood appropriately.",
      },
    ],
    contactCategory: "Research & Academic Projects",
    ctaLabel: "Discuss your research",
    seo: {
      title: "Research Implementation for Master's & PhD",
      description:
        "Technical research support: prototypes, AI/ML experiments, dataset preparation and research tools for Master's, PhD and applied research projects.",
    },
    faqs: [
      {
        question: "What kind of research support do you provide?",
        answer:
          "Technical implementation: turning a research design into working code, building prototypes and experiment pipelines, preparing datasets, implementing baselines and creating research tools. The research questions, analysis and conclusions remain yours.",
      },
      {
        question: "Do you write theses or research papers?",
        answer:
          "No. We don't write theses, papers or other work to be submitted as someone else's. We help with engineering and explain what we build so you fully understand it, and we support appropriate disclosure under your institution's rules.",
      },
      {
        question: "Can you help with machine learning experiments?",
        answer:
          "Yes. We implement models and baselines, set up reproducible training and evaluation with fixed seeds and logged configurations, and help you run experiments consistently across datasets.",
      },
      {
        question: "Which fields do you work with?",
        answer:
          "We focus on computing-heavy research — AI and machine learning, NLP, data processing, software systems and applied research tools. If your field is different, share the details and we'll tell you honestly whether we're a good fit.",
      },
    ],
  },
  {
    slug: "academic-technical-projects",
    title: "Academic & Technical Projects",
    shortTitle: "Academic Projects",
    icon: "graduation",
    summary:
      "Guidance and development support for semester and final-year projects, prototypes, proofs of concept and MVPs.",
    overview:
      "We help students and early-stage teams plan, build and understand technical projects. For coursework, our role is mentoring and technical guidance: helping you choose an architecture, unblock implementation problems and learn the technologies involved, so the work you submit is genuinely yours. For founders and teams, we build prototypes and MVPs end to end.",
    capabilities: [
      "Semester & final-year project mentoring",
      "University project development support",
      "Proofs of concept",
      "Prototypes & MVPs",
      "Technical guidance",
    ],
    problems: [
      "You have a project idea but aren't sure how to structure it technically.",
      "You're stuck on a specific implementation or integration problem.",
      "You need a working prototype to validate a product idea with users or investors.",
    ],
    deliverables: [
      "Architecture and technology planning sessions",
      "Guided implementation and code reviews",
      "Prototypes and MVPs for product validation",
      "Documentation and walkthroughs of how the system works",
    ],
    technologies: ["React", "Next.js", "Node.js", "Django", "Python", "React Native", "MongoDB", "PostgreSQL"],
    approach: [
      {
        title: "Understand the brief",
        description: "We start from the requirements, constraints and what you need to learn or show.",
      },
      {
        title: "Mentor, don't replace",
        description: "For coursework we guide and review; you write and present your own work.",
      },
      {
        title: "Leave you more capable",
        description: "Every engagement should end with you understanding the system better than before.",
      },
    ],
    contactCategory: "Research & Academic Projects",
    ctaLabel: "Get project guidance",
    seo: {
      title: "Final Year Project Mentoring & MVPs",
      description:
        "Mentoring for semester and final-year projects, plus prototypes, proofs of concept and MVPs for founders: architecture planning, code reviews and guidance.",
    },
    faqs: [
      {
        question: "Can you help with my final-year or semester project?",
        answer:
          "Yes, as mentors. We help you choose a sensible architecture, plan the work, get unstuck on implementation problems and review your code — so you build and can confidently explain your own project.",
      },
      {
        question: "Will you build the whole university project for me?",
        answer:
          "No. Submitting work built by someone else would breach academic integrity rules. Our role is guidance, teaching and review; the project you submit should be your own.",
      },
      {
        question: "Do you build MVPs and prototypes for startups?",
        answer:
          "Yes. For founders and teams we build focused prototypes and MVPs end to end, designed to test an idea with real users and to grow into a production product if it works.",
      },
    ],
  },
  {
    slug: "technical-training-mentorship",
    title: "Technical Training & Mentorship",
    shortTitle: "Training",
    icon: "presentation",
    summary:
      "One-to-one sessions, code reviews and project-based learning in web, backend, AI and automation.",
    overview:
      "Learning is faster with someone who has built real systems. Our sessions are tailored to your level and goals — whether you are learning to program, moving into backend or AI work, preparing for technical interviews or trying to understand a codebase you've inherited.",
    capabilities: [
      "One-to-one learning sessions",
      "Programming mentorship",
      "Web & backend development training",
      "AI & automation sessions",
      "Code reviews & debugging",
      "Interview preparation",
    ],
    problems: [
      "Tutorials haven't helped you build something real on your own.",
      "You want feedback on your code from an experienced developer.",
      "You're preparing for technical interviews and want structured practice.",
      "Your team needs to get up to speed on a new technology quickly.",
    ],
    deliverables: [
      "Personalised learning plans based on your goals",
      "Live one-to-one or small-group sessions",
      "Project-based exercises with review",
      "Detailed code reviews and debugging walkthroughs",
      "Mock interviews and feedback",
    ],
    technologies: ["JavaScript", "TypeScript", "React", "Next.js", "Node.js", "Python", "Django", "FastAPI"],
    approach: [
      {
        title: "Start from where you are",
        description: "A short assessment shapes a plan around your current skills and goals.",
      },
      {
        title: "Learn by building",
        description: "Concepts are anchored in projects you actually write and run.",
      },
      {
        title: "Honest feedback",
        description: "Specific, constructive reviews that explain the why, not just the what.",
      },
    ],
    contactCategory: "Training & Mentorship",
    ctaLabel: "Book a learning session",
    seo: {
      title: "Programming Mentorship & 1:1 Coding Help",
      description:
        "One-to-one programming mentorship in web development, backend, AI and automation, plus code reviews, debugging help and technical interview preparation.",
    },
    faqs: [
      {
        question: "What can I learn in one-to-one sessions?",
        answer:
          "JavaScript and TypeScript, React and Next.js, Node.js, Python, Django, FastAPI, databases, APIs, AI integrations and automation — or how to structure and finish a real project. Sessions are planned around your goals.",
      },
      {
        question: "Are sessions suitable for beginners?",
        answer:
          "Yes. We start by understanding your current level and adjust the pace. Beginners focus on fundamentals through small projects; experienced developers can go straight to architecture, reviews or a specific technology.",
      },
      {
        question: "Can you review my code or help me debug?",
        answer:
          "Yes. We review code for structure, readability, security and performance, and run live debugging sessions where we explain how we find the problem as well as the fix.",
      },
      {
        question: "Do you help with technical interview preparation?",
        answer:
          "Yes. We run mock interviews covering problem solving, system design and practical coding, with specific feedback on what to improve.",
      },
    ],
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}

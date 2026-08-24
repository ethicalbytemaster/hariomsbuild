export type Project = {
  slug: string;
  name: string;
  status: string;
  kind: 'build' | 'lab';
  summary: string;
  problem: string;
  build: string;
  value: string;
  stack: string[];
  github?: string;
  demo?: string;
};

export const projects: Project[] = [
  {
    slug: 'mek-property-maintenance',
    name: 'MEK Property Maintenance Demo',
    status: 'CLIENT',
    kind: 'build',
    summary: 'A service-business website concept focused on clear offers, trust and lead generation.',
    problem: 'Service businesses often lose enquiries when their offer, proof and next step are difficult to understand.',
    build: 'A focused property-maintenance experience with clear service paths, trust signals and enquiry-focused structure.',
    value: 'A clearer path from local search or referral traffic to a qualified enquiry.',
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    github: 'https://github.com/pateljiop/mek-property-maintenance-demo',
  },
  {
    slug: 'roofing-demo',
    name: 'Roofing Demo',
    status: 'CLIENT',
    kind: 'build',
    summary: 'A focused local-service experience designed around high-intent enquiries.',
    problem: 'Roofing customers need fast answers, visible services and an obvious route to request work.',
    build: 'A conversion-oriented service site organized around high-intent visitor questions.',
    value: 'Less friction between discovering the service and starting an enquiry.',
    stack: ['Next.js', 'TypeScript', 'CSS'],
    github: 'https://github.com/pateljiop/Roofing-demo',
  },
  {
    slug: 'laundry-demo',
    name: 'Laundry Demo',
    status: 'CLIENT',
    kind: 'build',
    summary: 'A simple service funnel for bookings, offers and repeat customers.',
    problem: 'Local laundry services need a simple digital flow for customers to understand the offer and take action.',
    build: 'A streamlined laundry-service interface with booking-oriented information architecture.',
    value: 'A simpler customer journey for service discovery and booking.',
    stack: ['React', 'TypeScript', 'CSS'],
    github: 'https://github.com/pateljiop/Laundry-demo',
  },
  {
    slug: 'taskmaster',
    name: 'TaskMaster Web App',
    status: 'INTERNAL',
    kind: 'build',
    summary: 'A practical web application for turning everyday work into a manageable system.',
    problem: 'Small teams can lose track of tasks when work lives across messages, notes and memory.',
    build: 'A lightweight task-management experience for organizing work and making progress visible.',
    value: 'A clearer operational view of what needs to happen next.',
    stack: ['React', 'TypeScript', 'Web App'],
    github: 'https://github.com/pateljiop/TaskMaster-Web-App',
  },
  {
    slug: 'ai-personal-assistant',
    name: 'AI Personal Assistant',
    status: 'EXPLORING',
    kind: 'lab',
    summary: 'Exploring practical AI assistance around everyday workflows.',
    problem: 'Useful AI should reduce real friction instead of becoming another interface to manage.',
    build: 'An experimental assistant architecture for task-oriented interactions.',
    value: 'Testing where AI can reliably remove repetitive cognitive work.',
    stack: ['AI', 'TypeScript', 'APIs'],
    github: 'https://github.com/pateljiop/AI-Personal-Assistant',
  },
  {
    slug: 'web-scraper-tool',
    name: 'Web Scraper Tool',
    status: 'BUILDING',
    kind: 'lab',
    summary: 'A utility for collecting structured information from public web pages.',
    problem: 'Manual research becomes slow when the same information has to be gathered repeatedly.',
    build: 'An experimental scraping workflow with structured output.',
    value: 'Faster repeatable research workflows where permitted.',
    stack: ['Python', 'Web Scraping', 'Data'],
    github: 'https://github.com/pateljiop/Web-Scraper-Tool',
  },
  {
    slug: 'expense-tracker',
    name: 'Expense Tracker',
    status: 'TESTING',
    kind: 'lab',
    summary: 'A small system for recording and understanding everyday spending.',
    problem: 'Expense data is easy to collect but harder to turn into a useful view of spending.',
    build: 'An experimental tracker with structured entries and analysis-ready data.',
    value: 'A clearer foundation for personal financial visibility.',
    stack: ['React', 'TypeScript', 'Data Visualization'],
    github: 'https://github.com/pateljiop/Expense-Tracker',
  },
  {
    slug: 'real-time-chat',
    name: 'Real-Time Chat Application',
    status: 'LIVE',
    kind: 'lab',
    summary: 'An experiment in real-time messaging and presence.',
    problem: 'Real-time communication requires reliable state updates, connection handling and a useful interface.',
    build: 'A real-time chat experience designed to test messaging primitives.',
    value: 'A practical foundation for communication-heavy products.',
    stack: ['WebSockets', 'TypeScript', 'React'],
    github: 'https://github.com/pateljiop/RealTime-Chat-Application',
  },
  {
    slug: 'data-analysis-visualization',
    name: 'Data Analysis & Visualization',
    status: 'SHIPPED',
    kind: 'lab',
    summary: 'Experiments turning raw datasets into readable visual insights.',
    problem: 'Raw tables hide patterns that become obvious when data is structured and visualized.',
    build: 'Exploratory analysis and visualization workflows for turning datasets into decisions.',
    value: 'Faster pattern discovery and clearer communication of data.',
    stack: ['Python', 'Pandas', 'Visualization'],
    github: 'https://github.com/pateljiop/Data-Analysis-Visualization',
  },
];

export const builds = projects.filter((p) => p.kind === 'build');
export const labs = projects.filter((p) => p.kind === 'lab');

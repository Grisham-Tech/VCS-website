// Define the types
export interface ModuleDetail {
    day: string;
    content: string; // The main topic/heading for the day
    detail: string; // The extremely lengthy, detailed content
}

export interface CourseModuleInfo {
    module: number;
    title: string;
    description: string;
    topics: string[];
}

export interface ModuleVisuals {
    id: number;
    module: number;
    label: string;
    topic: string;
    zIndex: number;
    position: { top: string; left: string };
}

// Visual layout data for the Hero Section
export const modules: ModuleVisuals[] = [
    { id: 1, module: 1, label: "Foundations of Venture Capital", topic: "Intro, Firm, Finances", zIndex: 10, position: { top: "0%", left: "15%" } },
    { id: 2, module: 2, label: "Understanding Startups and Funding Pipeline", topic: "Ecosystem, Diligence", zIndex: 10, position: { top: "15%", left: "48%" } },
    { id: 3, module: 3, label: "Deal Structuring and Portfolio Management", topic: "Investments, Term Sheets, Portfolio Management", zIndex: 10, position: { top: "40%", left: "55%" } },
    { id: 4, module: 4, label: "Career and Global VC Perspective", topic: "Career, VC, Assignments", zIndex: 20, position: { top: "30%", left: "5%" } },
    { id: 5, module: 5, label: "Advanced Tools, Pitches and Emerging Trends", topic: "Pitch Eval, Tools, Future of VC", zIndex: 10, position: { top: "55%", left: "20%" } },
];

// Module summary data
export const courseModules: CourseModuleInfo[] = [
    {
        module: 1,
        title: "Foundations of Venture Capital",
        description:
            "This module introduces the fundamentals of venture capital, including its history, the internal structure of a VC firm, and the financial models behind how VCs make money and create an investment thesis.",
        topics: ["Introduction to VC", "VC Firm Structure", "VC Finances", "Funding Stages", "Investment Thesis", "Fund Returns"],
    },
    {
        module: 2,
        title: "Understanding Startups and Funding Pipeline",
        description:
            "This module covers the startup ecosystem, market analysis (TAM/SAM/SOM), and the critical processes of performing due diligence and building a deal flow pipeline through sourcing and networking.",
        topics: ["Startup Ecosystem", "Market Analysis", "Business Models", "Due Diligence", "Metrics & KPIs", "Deal Flow", "Sourcing Tools"],
    },
    {
        module: 3,
        title: "Deal Structuring and Portfolio Management",
        description:
            "This module dives into the details of the investment process, different deal types (Equity, SAFE, Convertible Notes), and the legal/financial components of term sheets, cap tables, and valuation.",
        topics: ["Investment Process", "Deal Types", "Valuation", "Term Sheets", "Cap Tables", "Dilution", "Portfolio Management"],
    },
    {
        module: 4,
        title: "Career and Global VC Perspective",
        description:
            "This module explores career paths in venture capital, skills required for an analyst, and compares the VC landscapes in India and globally, including regulatory aspects. It concludes with an applied assignment.",
        topics: ["VC Careers", "Analyst Skills", "Memo Writing", "Global VC Models", "Indian VC Ecosystem", "SEBI Regulations", "Investment Memo"],
    },
    {
        module: 5,
        title: "Advanced Tools, Pitches and Emerging Trends",
        description:
            "This module focuses on practical skills like evaluating pitch decks, using common VC tools (Notion, Airtable, Pitchbook), and understanding emerging trends like AI in VC, Climate Tech, and new fund structures.",
        topics: ["Pitch Deck Evaluation", "VC Tools", "Notion", "Airtable", "Pitchbook", "Future of VC", "AI in VC", "Climate Tech"],
    },
];

// Note: moduleData is REMOVED from this file and is now in individual files.
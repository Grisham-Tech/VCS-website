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
    { id: 2, module: 2, label: "Startup Ecosystem and Due Diligence", topic: "Ecosystem, Market Analysis, Deal Flow", zIndex: 10, position: { top: "15%", left: "48%" } },
    { id: 3, module: 3, label: "Deal Structuring and the Investment Memo", topic: "Deal Types, Valuation, Term Sheets", zIndex: 10, position: { top: "40%", left: "55%" } },
    { id: 4, module: 4, label: "Pitches, Portfolio and Emerging Trends", topic: "Pitch Evaluation, VC Landscape, Future of VC", zIndex: 10, position: { top: "55%", left: "20%" } },
];

// Module summary data
export const courseModules: CourseModuleInfo[] = [
    {
        module: 1,
        title: "Foundations and Fund Economics",
        description:
            "Learn what venture capital is, how a VC firm operates, and how funds are raised and earn returns. Day 3 includes a mandatory basic track and optional advanced material.",
        topics: ["Introduction to VC", "VC Firm Roles", "Fundraising", "Management Fees", "Carry", "Basic (Mandatory)", "Advanced (Optional)"],
    },
    {
        module: 2,
        title: "Startup Ecosystem and Due Diligence",
        description:
            "Explore the startup ecosystem, market sizing, and business models, then practice due diligence, startup evaluation, and building a deal pipeline.",
        topics: ["Startup Ecosystem", "TAM/SAM/SOM", "Business Models", "Due Diligence", "Deal Pipeline", "Sourcing"],
    },
    {
        module: 3,
        title: "Deal Structuring and the Investment Memo",
        description:
            "Across Days 7–9, compare financing instruments and valuation methods, read term sheets, model cap tables and exit waterfalls, and prepare an investment memo. Track A covers core topics; Track B adds optional advanced work.",
        topics: ["Deal Types", "Valuation", "Term Sheets", "Cap Tables", "Exit Waterfalls", "Investment Memo", "Track A: Core", "Track B: Optional Advanced"],
    },
    {
        module: 4,
        title: "Pitches, Portfolio and Emerging Trends",
        description:
            "Across Days 12–14, evaluate pitches and portfolio risk, compare Indian and global VC, and explore emerging trends, fund structures and VC careers.",
        topics: ["Pitch Evaluation", "Portfolio Management", "VC in India and Abroad", "AI", "Climate Tech", "VC Careers", "Investment Memo"],
    },
];

// Note: moduleData is REMOVED from this file and is now in individual files.
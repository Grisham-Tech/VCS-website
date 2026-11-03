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
    dayRange: string;
    lessonCount: number;
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
            "Learn what venture capital is, how a VC firm operates, and how funds are raised and earn returns, including fund economics, management fees, and carried interest.",
        dayRange: "Days 1–3",
        lessonCount: 3,
        topics: ["VC Fundamentals", "Firm Structure", "Fundraising", "Management Fees", "Carried Interest", "LP/GP Economics"],
    },
    {
        module: 2,
        title: "Startup Ecosystem and Due Diligence",
        description:
            "Explore the startup ecosystem, market sizing, and business models, then practice due diligence, startup evaluation, and building a deal pipeline.",
        dayRange: "Days 4–5",
        lessonCount: 2,
        topics: ["Startup Ecosystems", "Market Sizing", "Business Models", "Due Diligence", "Deal Sourcing", "Pipeline Management"],
    },
    {
        module: 3,
        title: "Deal Structuring and the Investment Memo",
        description:
            "Compare financing instruments and valuation methods, interpret term sheets, model cap tables and exit waterfalls, and prepare an evidence-based investment memo.",
        dayRange: "Days 7–9",
        lessonCount: 3,
        topics: ["Financing Instruments", "Startup Valuation", "Term Sheets", "Cap Table Modeling", "Exit Waterfalls", "Investment Memo"],
    },
    {
        module: 4,
        title: "Pitches, Portfolio and Emerging Trends",
        description:
            "Across Days 12–14, evaluate pitches and portfolio risk, compare Indian and global VC, and explore emerging trends, fund structures and VC careers.",
        dayRange: "Days 12–14",
        lessonCount: 3,
        topics: ["Pitch Evaluation", "Portfolio Strategy", "India & Global VC", "AI & Climate Tech", "Fund Structures", "VC Career Pathways"],
    },
];

// Note: moduleData is REMOVED from this file and is now in individual files.
import { ModuleDetail } from "@/data/course-data";
import { module3Source } from "./module3-source";
import { renderFullLesson } from "./render-full-lesson";

export const module3Content: ModuleDetail[] = [
    {
        day: "Day 7",
        content: "Deal Types and Valuation",
        detail: `
            ${renderFullLesson("Day 7", module3Source.day7)}
            <h2 style="font-size: 2.25rem; font-weight: 800; color: #fdbf68; border-bottom: 2px solid #333; padding-bottom: 0.5rem; margin-top: 2.5rem;">Basic (Mandatory)</h2>
            <p>Required core: compare priced equity, SAFEs and convertible notes; distinguish pre-money from post-money valuation; and practice valuation and dilution calculations.</p>
            <h2 style="font-size: 2.25rem; font-weight: 800; color: #fdbf68; border-bottom: 2px solid #333; padding-bottom: 0.5rem; margin-top: 2.5rem;">Advanced (Optional)</h2>
            <p>Optional extension: advanced conversion, option-pool and valuation scenarios. The PDF contains the full explanations, worked examples and exercises.</p>
            <p>Hands-on output: a valuation and dilution quiz.</p>
        `,
    },
    {
        day: "Day 8",
        content: "Term Sheets and Cap Table Lab",
        detail: `
            ${renderFullLesson("Day 8", module3Source.day8)}
            <h2 style="font-size: 2.25rem; font-weight: 800; color: #fdbf68; border-bottom: 2px solid #333; padding-bottom: 0.5rem; margin-top: 2.5rem;">Core Topics</h2>
            <p>Required core: read the economic and control provisions in a term sheet and model how financing rounds and option pools change ownership in a cap table.</p>
            <h2 style="font-size: 2.25rem; font-weight: 800; color: #fdbf68; border-bottom: 2px solid #333; padding-bottom: 0.5rem; margin-top: 2.5rem;">Advanced (Optional)</h2>
            <p>Optional extension: use the exit-waterfall lab to compare investor proceeds under different preference and participation terms.</p>
            <p>Hands-on output: a two-round cap table and exit-waterfall lab.</p>
        `,
    },
    {
        day: "Day 9",
        content: "Investment Memo Clinic and Assignment Briefing",
        detail: `
            ${renderFullLesson("Day 9", module3Source.day9)}
            <h2 style="font-size: 2.25rem; font-weight: 800; color: #fdbf68; border-bottom: 2px solid #333; padding-bottom: 0.5rem; margin-top: 2.5rem;">Track A - Core</h2>
            <p>Build a clear investment recommendation from the market, team, traction, unit economics, valuation and deal terms. Submit a concise investment memo with evidence, ranked risks and a reasoned recommendation.</p>
            <h2 style="font-size: 2.25rem; font-weight: 800; color: #fdbf68; border-bottom: 2px solid #333; padding-bottom: 0.5rem; margin-top: 2.5rem;">Track B - Core + Advanced</h2>
            <p>Complete all Track A requirements, then add the optional advanced conversion, option-pool, valuation and exit-waterfall analysis with clear assumptions and interpretation.</p>
        `,
    },
];

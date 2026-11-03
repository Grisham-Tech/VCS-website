import { ModuleDetail } from "@/data/course-data";
import { module3Source } from "./module3-source";
import { renderFullLesson } from "./render-full-lesson";

export const module3Content: ModuleDetail[] = [
  {
    day: "Day 7",
    content: "Deal Types and Valuation",
    detail: renderFullLesson("Day 7", module3Source.day7),
  },
  {
    day: "Day 8",
    content: "Term Sheets and Cap Table Lab",
    detail: renderFullLesson("Day 8", module3Source.day8),
  },
  {
    day: "Day 9",
    content: "Investment Memo Clinic and Assignment Briefing",
    detail: renderFullLesson("Day 9", module3Source.day9),
  },
];

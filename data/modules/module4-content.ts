import { ModuleDetail } from "@/data/course-data";
import { module4Source } from "./module4-source";
import { renderFullLesson } from "./render-full-lesson";

export const module4Content: ModuleDetail[] = [
  {
    day: "Day 12",
    content: "Pitch Evaluation, Portfolio Management and Risk",
    detail: renderFullLesson("Day 12", module4Source.day12),
  },
  {
    day: "Day 13",
    content: "VC in India and Abroad",
    detail: renderFullLesson("Day 13", module4Source.day13),
  },
  {
    day: "Day 14",
    content: "Future of VC and Careers",
    detail: renderFullLesson("Day 14", module4Source.day14),
  },
];

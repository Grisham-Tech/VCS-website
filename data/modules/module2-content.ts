import { ModuleDetail } from "@/data/course-data";
import { module2Source } from "./module2-source";
import { renderFullLesson } from "./render-full-lesson";

export const module2Content: ModuleDetail[] = [
  {
    day: "Day 4",
    content: "Understanding the Startup Ecosystem & Market Analysis",
    detail: renderFullLesson("Day 4", module2Source.day4),
  },
  {
    day: "Day 5",
    content: "Due Diligence and Building a Deal Pipeline",
    detail: renderFullLesson("Day 5", module2Source.day5),
  },
];

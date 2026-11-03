import { ModuleDetail } from "@/data/course-data";
import { module1Source } from "./module1-source";
import { renderFullLesson } from "./render-full-lesson";

export const module1Content: ModuleDetail[] = [
  {
    day: "Day 1",
    content: "Introduction to Venture Capitalism",
    detail: renderFullLesson("Day 1", module1Source.day1),
  },
  {
    day: "Day 2",
    content: "Inside a VC Firm",
    detail: renderFullLesson("Day 2", module1Source.day2),
  },
  {
    day: "Day 3",
    content: "VC Fund Economics",
    detail: renderFullLesson("Day 3", module1Source.day3),
  },
];

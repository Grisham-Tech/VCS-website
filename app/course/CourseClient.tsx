"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  ChevronRight,
  Lightbulb,
  Trophy,
} from "lucide-react";
import RegisterButton from "./components/register-button";
// 💡 Import metadata and types
import { modules, courseModules, ModuleDetail } from "@/data/course-data";

// --- Types ---

type Status = "no-session" | "unregistered" | "registered";

interface CourseClientProps {
  status: Status;
}

const moduleContentLoaders: Record<number, () => Promise<ModuleDetail[]>> = {
  1: async () => (await import("@/data/modules/module1-content")).module1Content,
  2: async () => (await import("@/data/modules/module2-content")).module2Content,
  3: async () => (await import("@/data/modules/module3-content")).module3Content,
  4: async () => (await import("@/data/modules/module4-content")).module4Content,
};

const moduleContentCache = new Map<number, Promise<ModuleDetail[]>>();

const loadModuleContent = (moduleNumber: number) => {
  const cached = moduleContentCache.get(moduleNumber);
  if (cached) return cached;

  const loader = moduleContentLoaders[moduleNumber];
  if (!loader) {
    return Promise.reject(new Error(`Unknown module number: ${moduleNumber}`));
  }

  const content = loader().catch((error: unknown) => {
    moduleContentCache.delete(moduleNumber);
    throw error;
  });
  moduleContentCache.set(moduleNumber, content);
  return content;
};

const prefetchModuleContent = (moduleNumber: number) => {
  void loadModuleContent(moduleNumber).catch((error: unknown) => {
    console.error(`Failed to preload content for Module ${moduleNumber}:`, error);
  });
};

// --- Module Detail Page Component (Dynamically loads content) ---

interface ModuleDetailPageProps {
  moduleNumber: number;
  onBack: () => void;
}

const ModuleDetailPage: React.FC<ModuleDetailPageProps> = ({
  moduleNumber,
  onBack,
}) => {
  const [curriculum, setCurriculum] = useState<ModuleDetail[] | null>(null);
  const moduleInfo = courseModules.find((m) => m.module === moduleNumber);

  useEffect(() => {
    setCurriculum(null);
    let active = true;

    loadModuleContent(moduleNumber)
      .then((content) => {
        if (active) setCurriculum(content);
      })
      .catch((error: unknown) => {
        console.error(
          `Failed to load content for Module ${moduleNumber}:`,
          error
        );
        if (active) setCurriculum([]);
      });

    return () => {
      active = false;
    };
  }, [moduleNumber]);

  if (!moduleInfo) {
    return (
      <div className="min-h-screen hero-background py-16 px-4 md:px-8 max-w-7xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-red-500">Module Not Found</h2>
        <Button
          onClick={onBack}
          className="mt-8 border border-orange-100/30 bg-[#612E2A]/45 text-orange-50 shadow-sm shadow-black/10 backdrop-blur-md hover:border-orange-100/50 hover:bg-[#612E2A]/60 hover:text-white focus-visible:ring-orange-100"
        >
          <ArrowLeft className="h-4 w-4 text-orange-200" /> Back to Course Curriculum
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen hero-background py-16 px-4 md:px-8 max-w-7xl mx-auto">
      <Button
        onClick={onBack}
        variant="outline"
        className="mb-8 border-orange-100/30 bg-[#612E2A]/45 text-orange-50 shadow-sm shadow-black/10 backdrop-blur-md hover:border-orange-100/50 hover:bg-[#612E2A]/60 hover:text-white focus-visible:ring-orange-100"
      >
        <ArrowLeft className="h-4 w-4 text-orange-200" /> Back to Course Curriculum
      </Button>

      <header className="mb-12 rounded-3xl border border-white/10 bg-slate-950/45 px-6 py-10 text-center shadow-2xl shadow-black/20 backdrop-blur-md sm:px-10">
        <div className="mb-3 flex flex-wrap items-center justify-center gap-3 text-xs font-semibold uppercase tracking-[0.16em] text-orange-200">
          <span className="h-px w-7 bg-orange-300/80" aria-hidden="true" />
          <span>Module {String(moduleInfo.module).padStart(2, "0")}</span>
          <span className="text-white/45" aria-hidden="true">/</span>
          <span>{moduleInfo.dayRange}</span>
          <span className="h-px w-7 bg-orange-300/80" aria-hidden="true" />
        </div>
        <h1 className="mb-4 text-4xl font-bold leading-tight text-white sm:text-5xl">
          {moduleInfo.title}
        </h1>
        <p className="mx-auto max-w-4xl text-base leading-relaxed text-slate-200 sm:text-lg">
          {moduleInfo.description}
        </p>
      </header>

      <section className="mb-12">
        <h2
          id="module-topics-heading"
          className="mb-4 text-center text-2xl font-bold text-white"
        >
          Key Topics
        </h2>
        <ul
          aria-labelledby="module-topics-heading"
          className="flex flex-wrap justify-center gap-2.5"
        >
          {moduleInfo.topics.map((topic) => (
            <li
              key={topic}
              className="inline-flex items-center gap-2 rounded-lg border border-white/12 bg-slate-950/35 px-3.5 py-2 text-sm font-medium text-slate-200 shadow-sm"
            >
              <span
                className="h-1.5 w-1.5 rounded-full bg-orange-300"
                aria-hidden="true"
              />
              {topic}
            </li>
          ))}
        </ul>
      </section>

      {/* Displaying detailed daily content */}
      <section className="space-y-8 sm:space-y-10" aria-busy={!curriculum}>
        <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
          Course lessons
        </h2>

        {!curriculum ? (
          <div className="space-y-6" role="status" aria-live="polite">
            {[1, 2].map((item) => (
              <Card
                key={item}
                className="animate-pulse rounded-3xl border border-white/10 bg-slate-950/50 p-6 sm:p-8"
              >
                <div className="mb-5 h-7 max-w-md rounded bg-white/10" />
                <div className="h-4 max-w-3xl rounded bg-white/10" />
                <div className="mt-3 h-4 max-w-2xl rounded bg-white/10" />
              </Card>
            ))}
            <span className="sr-only">Loading Module {moduleNumber} lessons...</span>
          </div>
        ) : curriculum.map((day: ModuleDetail, index) => (
          <Card
            key={index}
            className="rounded-2xl border border-white/10 bg-slate-950/60 p-5 shadow-xl shadow-black/15 backdrop-blur-md sm:rounded-3xl sm:p-8"
          >
            <h3 className="mb-6 border-b border-white/10 pb-4 text-xl font-bold leading-snug tracking-tight text-orange-100 sm:mb-7 sm:text-2xl">
              {day.day}: {day.content}
            </h3>
            <div
              className="[&_a]:relative [&_a]:z-10 [&_a]:cursor-pointer [&_a]:text-orange-200 [&_a]:underline [&_a]:transition-colors [&_a]:hover:text-orange-100"
              dangerouslySetInnerHTML={{ __html: day.detail }}
            />
          </Card>
        ))}
      </section>
    </div>
  );
};

// --- Main Course Client Component ---

const CourseClient: React.FC<CourseClientProps> = ({ status }) => {
  const [activeModule, setActiveModule] = useState<number | null>(null);

  const scrollToCourseStructure = () => {
    document
      .getElementById("course-structure")
      ?.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "auto"
          : "smooth",
      });
  };

  const handleModuleClick = (moduleNumber: number) => {
    if (status === "no-session") {
      window.location.href = "/auth";
      return;
    }

    if (status === "unregistered") {
      window.location.href = "/course/register";
      return;
    }

    // Only registered users can view modules
    prefetchModuleContent(moduleNumber);
    setActiveModule(moduleNumber);
    window.scrollTo({
      top: 0,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
    });
  };

  const handleBackClick = () => {
    setActiveModule(null);
  };

  // 1. Module Detail Page View
  if (activeModule !== null) {
    return (
      <ModuleDetailPage moduleNumber={activeModule} onBack={handleBackClick} />
    );
  }

  // 2. Main Course Structure View
  return (
    <div className="hero-background min-h-screen">
      {/* Hero Section */}
      <section className="relative mx-auto flex min-h-[82vh] w-full max-w-[90rem] flex-col items-center justify-between gap-12 px-4 py-12 sm:px-8 sm:py-16 lg:flex-row lg:gap-10 lg:px-12">
        {/* Left: Module Cards (Clickable) */}
        <div className="hidden w-full max-w-3xl grid-cols-2 gap-4 self-center lg:grid">
          {modules.map((item) => (
            <button
              type="button"
              key={item.id}
              className="group flex min-h-44 flex-col justify-center rounded-2xl border border-white/15 bg-slate-950/45 p-6 text-left shadow-lg shadow-black/10 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-orange-300/50 hover:bg-slate-950/65 hover:shadow-2xl hover:shadow-orange-500/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-300"
              onMouseEnter={() => prefetchModuleContent(item.module)}
              onFocus={() => prefetchModuleContent(item.module)}
              onClick={() => handleModuleClick(item.module)}
            >
              <div className="mb-3 flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-orange-200/80">
                  Module {item.module}
                </span>
                <ArrowRight className="h-4 w-4 text-white/45 transition group-hover:translate-x-1 group-hover:text-orange-200" />
              </div>
              <div className="mb-2 text-xl font-bold leading-snug text-white">
                {item.label}
              </div>
              <div className="text-sm text-slate-300">{item.topic}</div>
            </button>
          ))}

          <div className="col-span-2 mx-auto flex w-full max-w-xs items-center justify-center gap-3 rounded-2xl border border-orange-200/35 bg-gradient-to-r from-orange-950/60 via-rose-950/50 to-slate-950/60 p-5 text-center shadow-xl shadow-orange-950/15 backdrop-blur-md">
            <Trophy className="h-6 w-6 text-orange-200" />
            <div className="text-left">
              <div className="text-lg font-bold text-white">Final hackathon</div>
              <div className="text-sm text-slate-300">Put your VC skills to work</div>
            </div>
          </div>
        </div>

        {/* Right: Hero Text */}
        <div className="relative z-10 w-full max-w-2xl text-center lg:text-left">
          <div className="space-y-6">
            <div className="flex items-center justify-center gap-3 text-xs font-semibold uppercase tracking-[0.14em] text-orange-100 sm:text-sm lg:justify-start">
              <span className="h-px w-8 shrink-0 bg-orange-300" aria-hidden="true" />
              <span>E-Summit &apos;27 <span className="px-1 text-white/55">·</span> Dawn of the Defiant</span>
            </div>

            <h1 className="text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl md:text-6xl">
              Build your edge
              <br />
              <span className="gradient-text">
                in venture capital
              </span>
            </h1>

            <p className="mx-auto max-w-xl text-base leading-relaxed text-slate-200 sm:text-lg lg:mx-0">
              Learn how venture capital works, evaluate startups, and build
              investment conviction through a practical, four-module course
              from E-Cell IIT BHU.
            </p>

            <div className="flex flex-wrap justify-center gap-2.5 lg:justify-start">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-slate-950/35 px-3.5 py-2 text-sm text-white/90 backdrop-blur-sm">
                <BookOpen className="h-4 w-4 text-orange-300" />
                4 focused modules
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-slate-950/35 px-3.5 py-2 text-sm text-white/90 backdrop-blur-sm">
                <Lightbulb className="h-4 w-4 text-orange-300" />
                Hands-on casework
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-slate-950/35 px-3.5 py-2 text-sm text-white/90 backdrop-blur-sm">
                <Trophy className="h-4 w-4 text-orange-300" />
                Final hackathon
              </span>
            </div>

            <div className="flex flex-wrap justify-center gap-3 pt-2 lg:justify-start">
              <Button
                type="button"
                size="lg"
                onClick={scrollToCourseStructure}
                className="group bg-orange-500 font-semibold text-white shadow-lg shadow-orange-950/30 hover:bg-orange-400"
              >
                Explore the curriculum
                <ArrowDown className="ml-2 h-4 w-4 transition-transform group-hover:translate-y-0.5" />
              </Button>
              <RegisterButton status={status} />

              {status === "registered" && (
                <Button asChild size="lg" variant="outline" className="border-white/25 bg-slate-950/30 text-white hover:bg-white/10">
                  <a
                    href="https://chat.whatsapp.com/FKpfFAEdb001JPVIeDh1J0?mode=wwt"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    JOIN WHATSAPP GROUP
                  </a>
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Module Cards Carousel (Clickable) */}
        <div className="scrollbar-hide flex w-full snap-x snap-mandatory justify-start gap-3 overflow-x-auto px-1 pb-3 lg:hidden">
          {modules.map((item) => (
            <button
              type="button"
              key={item.module}
              className="min-w-[220px] snap-start rounded-2xl border border-white/15 bg-slate-950/50 p-4 text-left shadow-lg shadow-black/10 backdrop-blur-md transition hover:border-orange-300/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-300"
              onFocus={() => prefetchModuleContent(item.module)}
              onClick={() => handleModuleClick(item.module)}
            >
              <div className="mb-2 flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-orange-200">
                  Module {item.module}
                </span>
                <ChevronRight className="h-4 w-4 text-white/50" />
              </div>
              <div className="text-sm font-semibold leading-snug text-white">
                {item.label || item.topic}
              </div>
              <div className="mt-2 text-xs text-slate-300">{item.topic}</div>
            </button>
          ))}
        </div>
      </section>

      {/* Course Outline Section */}
      <section
        id="course-structure"
        className="mx-auto w-full max-w-7xl scroll-mt-8 px-4 py-16 sm:px-8 md:py-24"
      >
        <div className="mb-10 max-w-3xl">
          <div className="mb-4 text-xs font-bold tracking-[0.22em] text-orange-200">
            THE LEARNING PATH
          </div>
          <h2 className="mb-4 text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
            From first principles to investment decisions.
          </h2>
          <p className="max-w-2xl text-base leading-relaxed text-slate-200 sm:text-lg">
            Follow a practical path through VC fundamentals, startup diligence,
            deal structuring, and portfolio thinking.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {courseModules.map((module) => (
            <Card
              key={module.module}
              id={`module-${module.module}`}
              className="group relative h-full scroll-mt-28 overflow-hidden rounded-3xl border border-white/10 bg-slate-950/55 p-0 shadow-xl shadow-black/10 backdrop-blur-lg transition-all duration-300 before:absolute before:inset-x-0 before:top-0 before:z-10 before:h-1 before:bg-gradient-to-r before:from-[#F86531] before:via-[#C42F35] before:to-[#13324F] hover:-translate-y-1 hover:border-orange-200/35 hover:bg-slate-950/70 hover:shadow-2xl hover:shadow-orange-950/20"
            >
              <button
                type="button"
                className="flex h-full w-full flex-col p-6 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-orange-300 sm:p-7"
                aria-label={`Open Module ${module.module}: ${module.title}`}
                onMouseEnter={() => prefetchModuleContent(module.module)}
                onFocus={() => prefetchModuleContent(module.module)}
                onClick={() => handleModuleClick(module.module)}
              >
                <div className="mb-6 flex w-full items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-orange-200/20 bg-gradient-to-br from-orange-400/20 to-rose-500/10 text-lg font-bold text-orange-100 transition group-hover:border-orange-200/40">
                      {String(module.module).padStart(2, "0")}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">Module {module.module}</div>
                      <div className="mt-0.5 text-xs text-slate-300">{module.dayRange}</div>
                    </div>
                  </div>
                  <ArrowRight className="h-5 w-5 shrink-0 text-white/45 transition group-hover:translate-x-1 group-hover:text-orange-200" />
                </div>

                <h3 className="mb-3 text-xl font-bold leading-snug text-white transition-colors group-hover:text-orange-100 sm:text-2xl">
                  {module.title}
                </h3>
                <p className="mb-5 text-sm leading-relaxed text-slate-200 sm:text-base">
                  {module.description}
                </p>

                <div className="mb-5 flex flex-wrap gap-2">
                  {module.topics.slice(0, 4).map((topic) => (
                    <span
                      key={topic}
                      className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-200"
                    >
                      {topic}
                    </span>
                  ))}
                  {module.topics.length > 4 && (
                    <span className="rounded-full border border-orange-200/15 bg-orange-200/10 px-3 py-1 text-xs font-medium text-orange-100">
                      +{module.topics.length - 4} more
                    </span>
                  )}
                </div>

                <div className="mt-auto flex w-full items-center justify-between border-t border-white/10 pt-4 text-xs text-slate-300">
                  <span className="inline-flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-orange-200" />
                    {module.lessonCount} lesson days
                  </span>
                  <span>Explore module</span>
                </div>
              </button>
            </Card>
          ))}

          {/* Hackathon card */}
          <Card className="group relative overflow-hidden rounded-3xl border border-orange-200/20 bg-gradient-to-br from-orange-950/60 via-rose-950/45 to-slate-950/65 p-6 shadow-xl shadow-black/10 backdrop-blur-lg transition-all duration-300 before:absolute before:inset-x-0 before:top-0 before:h-1 before:bg-gradient-to-r before:from-[#F86531] before:via-[#C42F35] before:to-[#13324F] hover:-translate-y-1 hover:border-orange-200/40 sm:col-span-2 sm:mx-auto sm:w-full sm:max-w-2xl sm:p-8">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-orange-200/25 bg-orange-300/10">
                <Trophy className="h-6 w-6 text-orange-200" />
              </div>
              <div>
                <div className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-orange-200">Capstone</div>
                <h3 className="mb-2 text-xl font-bold text-white sm:text-2xl">Final hackathon</h3>
                <p className="max-w-3xl text-sm leading-relaxed text-slate-200 sm:text-base">
                  Bring your learning together in a final assessment grounded in venture capital.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default CourseClient;
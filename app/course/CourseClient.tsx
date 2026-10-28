"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowDown, ArrowLeft, Loader2 } from "lucide-react";
import RegisterButton from "./components/register-button";
// 💡 Import metadata and types
import { modules, courseModules, ModuleDetail } from "@/data/course-data";

// --- Types ---

type Status = "no-session" | "unregistered" | "registered";

interface CourseClientProps {
  status: Status;
}

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
    if (moduleNumber) {
      import(`@/data/modules/module${moduleNumber}-content`)
        .then((module) => {
          const contentKey =
            `module${moduleNumber}Content` as keyof typeof module;
          setCurriculum(module[contentKey] as ModuleDetail[]);
        })
        .catch((error) => {
          console.error(
            `Failed to load content for Module ${moduleNumber}:`,
            error
          );
          setCurriculum([]);
        });
    }
  }, [moduleNumber]);

  if (!moduleInfo) {
    return (
      <div className="min-h-screen hero-background py-16 px-4 md:px-8 max-w-7xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-red-500">Module Not Found</h2>
        <Button onClick={onBack} className="mt-8">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Course Structure
        </Button>
      </div>
    );
  }

  if (!curriculum) {
    return (
      <div className="min-h-screen hero-background py-16 px-4 md:px-8 max-w-7xl mx-auto flex flex-col items-center justify-center">
        <Loader2 className="w-10 h-10 text-orange-500 animate-spin mb-4" />
        <p className="text-white text-lg">
          Loading Module {moduleNumber} Content...
        </p>
        <Button onClick={onBack} variant="outline" className="mt-8">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Course Structure
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen hero-background py-16 px-4 md:px-8 max-w-7xl mx-auto">
      <Button onClick={onBack} variant="outline" className="mb-8">
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Course Structure
      </Button>

      <header className="text-center mb-12">
        <div className="text-sm text-orange-400 font-medium tracking-wider mb-2">
          Module {moduleInfo.module}
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">
          {moduleInfo.title}
        </h1>
        <p className="text-muted-foreground text-base sm:text-lg max-w-4xl mx-auto">
          {moduleInfo.description}
        </p>
      </header>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4 text-orange-400 text-center">
          Key Topics
        </h2>
        <div className="flex flex-wrap gap-3 justify-center">
          {moduleInfo.topics.map((topic) => (
            <span
              key={topic}
              className="text-base px-4 py-2 rounded-full bg-orange-500/20 text-orange-200 border border-orange-500/40"
            >
              {topic}
            </span>
          ))}
        </div>
      </section>

      {/* Displaying detailed daily content */}
      <section className="space-y-12">
        <h2 className="text-3xl font-bold text-white text-center">
          Daily Deep Dive Curriculum
        </h2>

        {curriculum.map((day: ModuleDetail, index) => (
          <Card
            key={index}
            className="p-6 sm:p-8 bg-card/50 backdrop-blur-sm border-border"
          >
            <h3 className="text-xl sm:text-2xl font-bold text-orange-400 mb-4">
              {day.day}: {day.content}
            </h3>
            {/* Simplified className relies on inline CSS from data files */}
            <div
              className="prose prose-invert max-w-none text-muted-foreground [&_a]:text-yellow-400 [&_a]:underline [&_a]:cursor-pointer [&_a]:hover:text-yellow-300 [&_a]:transition-colors [&_a]:relative [&_a]:z-10"
              dangerouslySetInnerHTML={{ __html: day.detail }}
            />
            {/* Example Image for context */}
            {moduleNumber === 1 && index === 1 && (
              <div className="mt-8 mx-auto max-w-md"></div>
            )}
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
      ?.scrollIntoView({ behavior: "smooth" });
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
    setActiveModule(moduleNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
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
    <div className="min-h-screen hero-background">
      {/* Hero Section */}
      <section className="relative flex flex-col-reverse lg:flex-row items-center justify-between min-h-[90vh] px-4 md:px-8 pt-6 sm:pt-12 py-12">
        {/* Left: Module Cards (Clickable) */}
        <div className="hidden lg:block relative w-full max-w-3xl h-[70vh]">
          {modules.map((item) => (
            <div
              key={item.id}
              className="absolute bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl p-6 w-64 transition-all duration-300 hover:border-orange-500/50 hover:shadow-2xl hover:shadow-orange-border-orange-500/10 cursor-pointer"
              style={{ ...item.position, zIndex: item.zIndex }}
              onClick={() => handleModuleClick(item.module)}
            >
              <div className="text-xs text-white/60 mb-2 uppercase tracking-wider">
                {item.label}
              </div>
              <div className="text-white text-3xl font-bold mb-3">
                Module {item.module}
              </div>
              <div className="text-sm text-white/70">{item.topic}</div>
            </div>
          ))}

          <div
            className="absolute bg-black/40 backdrop-blur-md border-2 border-blue-400 rounded-2xl p-6 w-64 text-center transition-all duration-300 shadow-2xl shadow-blue-500/20"
            style={{
              bottom: "0%",
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 30,
            }}
          >
            <div className="text-white text-3xl font-bold mb-2">
              Hackathon 🏆
            </div>
            <div className="text-sm text-white/70">Final Assessment</div>
          </div>
        </div>

        {/* Right: Hero Text */}
        <div className="relative z-10 w-full text-center lg:text-right max-w-3xl pr-12">
          <div className="space-y-6">
            <div className="text-sm text-cyan-200 font-medium tracking-wider">
              IIT BHU's winter Course for VC
            </div>

            <h1 className="text-4xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              The perfect start
              <br />
              <span className="gradient-text text-4xl sm:text-4xl md:text-5xl lg:text-6xl ">
                for your VC journey
              </span>
            </h1>

            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto lg:ml-auto">
              The winter course on VC and Start Up offers a comprehensive blend
              of resources — engaging videos, blogs, assignments, and a final
              hackathon!
            </p>

            <div className="flex flex-wrap gap-4 justify-center lg:justify-end pt-4">
              <RegisterButton status={status} />

              {status === "registered" && (
                <Button asChild size="lg" variant="default">
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

            <button
              onClick={scrollToCourseStructure}
              className="mt-12 flex items-center gap-2 text-foreground border border-foreground rounded-full px-6 py-3 hover:bg-foreground/10 transition-all ml-auto "
            >
              EXPLORE COURSE STRUCTURE
              <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Mobile Module Cards Carousel (Clickable) */}
        <div className="lg:hidden flex justify-start gap-3 px-2 overflow-x-auto pb-4 w-full">
          {modules.map((item) => (
            <div
              key={item.module}
              className="bg-card border border-border rounded-lg p-3 min-w-[140px] flex-shrink-0 text-left cursor-pointer hover:border-orange-500 transition-colors"
              onClick={() => handleModuleClick(item.module)}
            >
              <div className="text-orange-400 text-sm font-bold">
                Module {item.module}
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                {item.label || item.topic}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Course Outline Section */}
      <section
        id="course-structure"
        className="py-16 px-4 md:px-8 max-w-7xl mx-auto"
      >
        <div className="text-center mb-16">
          <div className="text-sm text-cyan-400 font-medium tracking-wider mb-4">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-cyan-300 via-blue-200 to-blue-100 bg-clip-text text-transparent border-b-2 border-blue-500/50 pb-4 inline-block">
              COURSE OUTLINE
            </h2>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-cyan-100">
            How is the course structured?
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-3xl mx-auto">
            The 6-module course takes you from the fundamentals of venture
            capital to advanced startup funding, deal structuring, and portfolio
            management
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courseModules.map((module, index) => (
            <Card
              key={module.module}
              className="p-6 bg-card/50 backdrop-blur-sm border-border hover:border-orange-500 transition-all duration-300 group cursor-pointer"
              style={{ animationDelay: `${index * 100}ms` }}
              onClick={(e) => {
                // Don't trigger if clicking on a link
                if ((e.target as HTMLElement).tagName === 'A') {
                  return;
                }
                handleModuleClick(module.module);
              }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center border border-orange-500/20 group-hover:border-orange-500 transition-colors">
                  <span className="text-orange-400 font-bold">
                    {module.module}
                  </span>
                </div>
                <div className="text-lg font-bold">Module {module.module}</div>
              </div>

              <h3 className="text-base sm:text-lg font-semibold mb-3 group-hover:text-cyan-400 transition-colors">
                {module.title}
              </h3>
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                {module.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {module.topics.map((topic) => (
                  <span
                    key={topic}
                    className="text-xs px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </Card>
          ))}

          {/* Hackathon card */}
          <Card className="p-6 bg-gradient-to-br from-orange-500/10 to-orange-500/5 backdrop-blur-sm border-orange-500 hover:shadow-[0_0_40px_hsl(188_85%_43%/0.4)] transition-all duration-300 group sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center text-2xl">
                🏆
              </div>
              <div className="text-lg font-bold">Hackathon</div>
            </div>
            <h3 className="text-base sm:text-lg font-semibold mb-3 text-orange-500">
              Final Assessment
            </h3>
            <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
              Apply everything you've learned in a thrilling hackathon with
              real-world tasks, peer competition, and certification.
            </p>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default CourseClient;
import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { MdArrowOutward } from "react-icons/md";
import { auth } from "@/auth";
import { headers } from "next/headers";
import HomeClient from "./HomeClient";

// const courses = [
//   {
//     id: 1,
//     title: "Venture Capital 101",
//     short: "Learn the fundamentals of VC.",
//     duration: "8 Weeks",
//   },
//   {
//     id: 2,
//     title: "Startup Idea Validation",
//     short: "How to know if your idea is a winner.",
//     duration: "4 Weeks",
//   },
//   {
//     id: 3,
//     title: "Growth Hacking Basics",
//     short: "Scale your startup fast.",
//     duration: "6 Weeks",
//   },
// ];

const partners = [
  {
    id: 1,
    name: "247 VC",
    logo: "247vclogo.png",
  },
  {
    id: 2,
    name: "BVC",
    logo: "BVClogo.png",
  },
];

const moduleSessions = [
  { module: 1, day: 1, topic: "Introduction to Venture Capitalism" },
  { module: 1, day: 2, topic: "Working and Structure of a VC Firm" },
  { module: 1, day: 3, topic: "VC Fund Economics: Basic and Advanced Tracks" },
  { module: 2, day: 4, topic: "Understanding the Startup Ecosystem & Market Analysis" },
  { module: 2, day: 5, topic: "Due Diligence Procedures & KPIs" },
  { module: 3, day: 7, topic: "Deal Types and Valuation" },
  { module: 3, day: 8, topic: "Term Sheets and Cap Table Lab" },
  { module: 3, day: 9, topic: "Investment Memo Clinic and Assignment Briefing" },
  { module: 4, day: 12, topic: "Pitch Evaluation, Portfolio Management and Risk" },
  { module: 4, day: 13, topic: "VC in India and Abroad" },
  { module: 4, day: 14, topic: "Future of VC and Careers" },
];

export default async function Home() {

 const session = await auth();
  let status: "no-session" | "unregistered" | "registered" = "no-session";

  if (session?.user?.email) {
    try {
      const headerList = await headers();
      const host =
        headerList.get("x-forwarded-host") ||
        headerList.get("host") ||
        "localhost:3000";

      const protocol =
        headerList.get("x-forwarded-proto") ||
        (process.env.NODE_ENV === "production" ? "https" : "http");

      const baseUrl = `${protocol}://${host}`;

      const req = await fetch(`${baseUrl}/api/user/${session.user.email}`, {
        cache: "no-store",
      });

      if (req.ok) {
        const res = await req.json();
        status = res?.registered_course_id ? "registered" : "unregistered";
      }
    } catch (err) {
      console.error("Landing page status error:", err);
    }
  }

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="min-h-[45vh] relative pt-10">
        <div className="relative max-w-6xl mx-auto px-4 md:px-6 py-8 md:py-10 space-y-8">
          {/* Main Hero Content */}
          <section className="grid md:grid-cols-2 gap-10 items-center">
            <div className="space-y-6">
              <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-white/80">
                <span className="h-px w-8 bg-[#F86531]" />
                E-Summit '27
                <span className="text-white/50">·</span>
                Dawn of the Defiant
              </p>
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                <span className="block text-4xl sm:text-5xl lg:text-[3.25rem] xl:text-6xl font-extrabold text-white leading-[1.08] tracking-tight">
                  Empowering
                </span>
                <span className="block text-4xl sm:text-5xl lg:text-[3.25rem] xl:text-6xl font-extrabold text-white leading-[1.08] tracking-tight">
                  Venture Capitalists
                </span>
                <span className="block text-4xl sm:text-5xl lg:text-[3.25rem] xl:text-6xl font-extrabold text-white leading-[1.08] tracking-tight">
                  of Tomorrow
                </span>
              </h1>
              <p className="text-white/85 text-lg leading-relaxed max-w-md drop-shadow-sm">
                VC Scout develops future VC talent with practical training and
                real deal-flow exposure for career-ready investing skills.
              </p>

                <HomeClient status={status} />
            </div>

            <div className="space-y-6">
              <Card className="rounded-2xl bg-[#0d1d2d]/75 backdrop-blur-md p-6 md:p-8 border-white/10 shadow-[0_12px_40px_rgba(8,21,34,0.18)]">
                <CardHeader className="p-0 mb-4">
                  <CardTitle className="text-lg md:text-xl font-bold">
                    Why VC Scout?
                  </CardTitle>
                </CardHeader>

                <CardContent className="p-0">
                  <ul className="space-y-3 text-gray-300">
                    <li className="flex items-start gap-3">
                      <span className="text-[#F86531] font-bold text-lg">•</span>
                      <span>Learn from real VC investors</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#F86531] font-bold text-lg">•</span>
                      <span>Master deal flow &amp; due diligence</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#F86531] font-bold text-lg">•</span>
                      <span>Build a strong VC-ready profile</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="rounded-2xl bg-[#0d1d2d]/75 backdrop-blur-md p-6 md:p-8 border-white/10 shadow-[0_12px_40px_rgba(8,21,34,0.18)]">
  <CardHeader className="p-0 mb-4">
    <CardTitle className="text-lg md:text-xl font-bold flex items-center gap-2">
      <span className="text-2xl">📅</span>
      Live Sessions
    </CardTitle>
  </CardHeader>

  <CardContent className="p-0">
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left text-gray-300">
        <thead>
          <tr className="border-b border-zinc-700/50">
            <th scope="col" className="py-2 pr-3 font-semibold text-[#F86531] whitespace-nowrap">
              Module / Day
            </th>
            <th scope="col" className="py-2 pl-3 font-semibold text-[#F86531]">
              Session Topic
            </th>
          </tr>
        </thead>
        <tbody>
          {moduleSessions.map((session, index) => (
            <tr
              key={session.day}
              className={`${index < moduleSessions.length - 1 ? "border-b border-zinc-800" : ""} hover:bg-[#F86531]/5 transition duration-150`}
            >
              <td className="py-2 pr-3 text-[#F86531] font-semibold whitespace-nowrap">
                Module {session.module} · Day {session.day}
              </td>
              <td className="py-2 pl-3">{session.topic}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </CardContent>
</Card>
            </div>
          </section>
        </div>
      </section>

      {/* Partners Section */}
      <section className="max-w-6xl mx-auto px-4 md:px-6 py-6 md:py-8 pb-40 md:pb-40">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 md:mb-6 text-white drop-shadow-md border-b-2 border-[#F86531]/60 pb-4 inline-block">
          Our Partners
        </h2>

        <div className="grid md:grid-cols-2 gap-8 md:gap-10 mt-8">
          {partners.map((partner) => (
            <Card
              key={partner.id}
              className="bg-zinc-900/80 backdrop-blur-md p-6 md:p-7 transition-all duration-300 group hover:shadow-lg hover:shadow-[#F86531]/15"
            >
              <CardContent className="p-0 flex flex-col items-center text-center space-y-4">
                {/* Logo Container */}
                <div className="w-full h-32 flex items-center justify-center bg-white rounded-lg border border-zinc-700/50 group-hover:border-[#F86531]/30 transition-all duration-300 backdrop-blur-sm">
                  <Image
                    src={`/${partner.logo}`}
                    alt={`${partner.name} logo`}
                    width={200}
                    height={80}
                    className="object-contain filter brightness-90 group-hover:brightness-110 transition-all duration-300"
                  />
                </div>

                {/* Partner Name */}
                <h3
                  className="text-xl font-bold bg-gradient-to-r from-[#F86531] via-[#e05a2c] to-[#C42F35] bg-clip-text text-transparent transition-all duration-300"
                >
                  {partner.name}
                </h3>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}

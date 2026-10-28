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
    <div className="w-full bg-transparent">
      {/* Hero Section */}
      <section
        className="min-h-[45vh] bg-cover bg-center bg-fixed relative pt-10"
        style={{ backgroundImage: "url('/new-bg.jpeg')" }}
      >
        {/* Overlay — deep navy tint with a subtle orange-to-navy sweep at the bottom */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#13324F]/50 via-[#0d2035]/55 to-[#0a0f14]/70"></div>

        <div className="relative max-w-6xl mx-auto px-4 md:px-6 py-8 md:py-10 space-y-8">
          {/* Main Hero Content */}
          <section className="grid md:grid-cols-2 gap-10 items-center">
            <div className="space-y-6">
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                <span className="block text-5xl md:text-6xl font-extrabold text-white leading-tight">
                  Empowering
                </span>
                <span className="block text-5xl md:text-6xl font-extrabold gradient-text leading-tight">
                  Venture Capitalists
                </span>
                <span className="block text-5xl md:text-6xl font-extrabold text-white leading-tight">
                  of Tomorrow
                </span>
              </h1>
              <p className="text-slate-300 text-lg leading-relaxed max-w-md">
                VC Scout develops future VC talent with practical training and
                real deal-flow exposure for career-ready investing skills.
              </p>

                <HomeClient status={status} />
            </div>

            <div className="space-y-6">
              <Card className="bg-zinc-900/80 backdrop-blur-md p-6 md:p-8">
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

              <Card className="bg-zinc-900/80 backdrop-blur-md p-6 md:p-8">
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
              Date (Day)
            </th>
            <th scope="col" className="py-2 pl-3 font-semibold text-[#F86531]">
              Session Topic
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-zinc-800 hover:bg-[#F86531]/5 transition duration-150">
            <td className="py-2 pr-3 text-[#F86531] font-semibold whitespace-nowrap">
              29th Nov (Day 1)
            </td>
            <td className="py-2 pl-3">
              Introductory session
            </td>
          </tr>
          <tr className="border-b border-zinc-800 hover:bg-[#F86531]/5 transition duration-150">
            <td className="py-2 pr-3 text-[#F86531] font-semibold whitespace-nowrap">
              4th Dec (Day 6)
            </td>
            <td className="py-2 pl-3">
              Analysis + Due Diligence
            </td>
          </tr>
          <tr className="border-b border-zinc-800 hover:bg-[#F86531]/5 transition duration-150">
            <td className="py-2 pr-3 text-[#F86531] font-semibold whitespace-nowrap">
              9th Dec (Day 11)
            </td>
            <td className="py-2 pl-3">
              Term Sheets
            </td>
          </tr>
          <tr className="border-b border-zinc-800 hover:bg-[#F86531]/5 transition duration-150">
            <td className="py-2 pr-3 text-[#F86531] font-semibold whitespace-nowrap">
              11th Dec (Day 13)
            </td>
            <td className="py-2 pl-3">
              VC as a Career
            </td>
          </tr>
          <tr className="hover:bg-[#F86531]/5 transition duration-150">
            <td className="py-2 pr-3 text-[#F86531] font-semibold whitespace-nowrap">
              13th Dec (Day 15)
            </td>
            <td className="py-2 pl-3">
              Closing session (PS Release)
            </td>
          </tr>
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
        <h2 className="text-3xl md:text-4xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-[#F86531] via-[#d9552a] to-[#C42F35] bg-clip-text text-transparent border-b-2 border-[#F86531]/40 pb-4 inline-block">
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

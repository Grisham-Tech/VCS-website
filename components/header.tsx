// // import { auth, signOut } from "@/auth";
// // import Link from "next/link";
// // import Image from "next/image";

// // export default async function Header() {
// //   const session = await auth();

// //   return (
// //     <header className="w-full bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 backdrop-blur-md text-white border-b border-cyan-400/30 shadow-[0_2px_10px_rgba(0,0,30,0.4)] z-50">
// //       <div className="max-w-6xl mx-auto flex justify-between items-center py-0 px-6">
// //         {/* Logo */}
// //         {/* <Link
// //       href="/"
// //       className="text-3xl font-bold bg-gradient-to-r from-blue-300 via-cyan-400 to-yellow-300 bg-clip-text text-transparent hover:from-blue-400 hover:to-cyan-300 transition-all duration-300"
// //     >
// //       E-Cell IIT BHU
// //     </Link> */}

// //         <Link href="/" className="inline-flex items-center">
// //           <Image
// //             src="/ecell-logo-noBG-WHITE.png" // put your logo inside /public folder
// //             alt="E-Cell IIT BHU"
// //             width={150} // adjust as needed
// //             height={10}
// //             className="object-contain"
// //           />
// //         </Link>

       

// //         {/* Navigation */}
// //         <nav className="flex gap-6 text-sm font-medium items-center">
// //           <Link
// //             href="/course"
// //             className="px-4 py-2 rounded-full bg-slate-800/60 border border-slate-700/50 hover:bg-slate-700/70 hover:border-cyan-400/50 hover:text-cyan-300 transition-all duration-300 shadow-sm hover:shadow-cyan-500/20"
// //           >
// //             Course
// //           </Link>

// //           {session &&
// //             session.user &&
// //             (session.user as any).role === "admin" && (
// //               <Link
// //                 href="/admin"
// //                 className="px-4 py-2 rounded-full bg-slate-800/60 border border-slate-700/50 hover:bg-slate-700/70 hover:border-cyan-400/50 hover:text-cyan-300 transition-all duration-300 shadow-sm hover:shadow-cyan-500/20"
// //               >
// //                 Admin
// //               </Link>
// //             )}

// //           {session && session.user ? (
// //             <form
// //               action={async () => {
// //                 "use server";
// //                 await signOut();
// //               }}
// //             >
// //               <button
// //                 type="submit"
// //                 className="px-5 py-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 shadow-lg hover:shadow-cyan-500/40 hover:scale-[1.03] active:scale-[0.97]"
// //               >
// //                 Sign Out
// //               </button>
// //             </form>
// //           ) : (
// //             <Link
// //               href="/auth"
// //               className="px-5 py-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 shadow-lg hover:shadow-cyan-500/40 hover:scale-[1.03] active:scale-[0.97]"
// //             >
// //               Register
// //             </Link>
// //           )}
// //         </nav>
// //       </div>
// //     </header>
// //   );
// // }
// import { auth, signOut } from "@/auth";
// import Link from "next/link";
// import Image from "next/image";

// export default async function Header() {
//   const session = await auth();

//   return (
//     <header className="w-full bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 backdrop-blur-md text-white border-b border-cyan-400/30 shadow-[0_2px_10px_rgba(0,0,30,0.4)] z-50">
//       <div className="max-w-6xl mx-auto flex justify-between items-center py-4 px-6">
//         {/* Logo */}
//         <Link href="/" className="inline-flex items-center h-10">
//           <Image
//             src="/ecell-logo-noBG-WHITE.png"
//             alt="E-Cell IIT BHU"
//             width={100}
//             height={60}
//             className="object-contain h-full w-auto"
//           />
//         </Link>

//         {/* Navigation */}
//         <nav className="flex gap-6 text-sm font-medium items-center">
//           <Link
//             href="/course"
//             className="px-4 py-2 rounded-full bg-slate-800/60 border border-slate-700/50 hover:bg-slate-700/70 hover:border-cyan-400/50 hover:text-cyan-300 transition-all duration-300 shadow-sm hover:shadow-cyan-500/20"
//           >
//             Course
//           </Link>

//           {session &&
//             session.user &&
//             (session.user as any).role === "admin" && (
//               <Link
//                 href="/admin"
//                 className="px-4 py-2 rounded-full bg-slate-800/60 border border-slate-700/50 hover:bg-slate-700/70 hover:border-cyan-400/50 hover:text-cyan-300 transition-all duration-300 shadow-sm hover:shadow-cyan-500/20"
//               >
//                 Admin
//               </Link>
//             )}

//           {session && session.user ? (
//             <form
//               action={async () => {
//                 "use server";
//                 await signOut();
//               }}
//             >
//               <button
//                 type="submit"
//                 className="px-5 py-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 shadow-lg hover:shadow-cyan-500/40 hover:scale-[1.03] active:scale-[0.97]"
//               >
//                 Sign Out
//               </button>
//             </form>
//           ) : (
//             <Link
//               href="/auth"
//               className="px-5 py-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 shadow-lg hover:shadow-cyan-500/40 hover:scale-[1.03] active:scale-[0.97]"
//             >
//               Register
//             </Link>
//           )}
//         </nav>
//       </div>
//     </header>
//   );
// }

import { auth, signOut } from "@/auth";
import Link from "next/link";
import Image from "next/image";
import ProfileDropdown from "./ProfileDropdown";

export default async function Header() {
  const session = await auth();

  return (
    <header className="w-full bg-gradient-to-b from-[#0d2035] via-[#13324F] to-[#0d2035] backdrop-blur-md text-white border-b border-[#F86531]/20 shadow-[0_2px_12px_rgba(19,50,79,0.6)] z-50">
      {/* Brand accent bar — orange → crimson → navy */}
      <div className="h-[3px] w-full bg-gradient-to-r from-[#F86531] via-[#C42F35] to-[#13324F]" />

      <div className="max-w-6xl mx-auto flex justify-between items-center py-0 px-6">
        {/* E-Summit '27 logo */}
        <Link
          href="/"
          aria-label="E-Summit '27: Dawn of the Defiant home"
          className="inline-flex items-center h-20"
        >
          <Image
            src="/esummit-logo.png"
            alt="IIT BHU's E-Summit '27 — Dawn of the Defiant"
            width={280}
            height={56}
            className="object-contain h-14 w-auto"
            priority
          />
        </Link>

        {/* Navigation */}
        <nav className="flex gap-6 text-sm font-medium items-center">
          <Link
            href="/course"
            className="px-4 py-2 rounded-full bg-[#13324F]/60 border border-[#F86531]/30 hover:bg-[#F86531]/15 hover:border-[#F86531]/60 hover:text-[#F86531] transition-all duration-300 shadow-sm hover:shadow-[#F86531]/20"
          >
            Course
          </Link>

          {session &&
            session.user &&
            (session.user as any).role === "admin" && (
              <Link
                href="/admin"
                className="px-4 py-2 rounded-full bg-[#13324F]/60 border border-[#F86531]/30 hover:bg-[#F86531]/15 hover:border-[#F86531]/60 hover:text-[#F86531] transition-all duration-300 shadow-sm hover:shadow-[#F86531]/20"
              >
                Admin
              </Link>
            )}

          {session && session.user ? (
            <ProfileDropdown
              user={session.user}
              signOutAction={async () => {
                "use server";
                await signOut();
              }}
            />
          ) : (
            <Link
              href="/auth"
              className="px-5 py-2 rounded-full bg-gradient-to-r from-[#F86531] to-[#C42F35] text-white font-semibold hover:from-[#ff7340] hover:to-[#d93a40] transition-all duration-300 shadow-lg shadow-[#F86531]/30 hover:shadow-[#F86531]/50 hover:scale-[1.03] active:scale-[0.97]"
            >
              Register
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}

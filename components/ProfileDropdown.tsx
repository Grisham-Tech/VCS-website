"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { User, LogOut } from "lucide-react";

interface ProfileDropdownProps {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
  signOutAction: () => Promise<void>;
}

export default function ProfileDropdown({ user, signOutAction }: ProfileDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const initials = user.name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase() || user.email?.[0].toUpperCase() || "U";

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Avatar Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 rounded-full hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-[#F86531]/50"
      >
        <div className="h-9 w-9 rounded-full bg-gradient-to-br from-[#F86531] to-[#C42F35] border-2 border-[#F86531]/40 flex items-center justify-center text-white text-sm font-semibold">
          {user.image ? (
            <img
              src={user.image}
              alt={user.name || ""}
              className="h-full w-full rounded-full object-cover"
            />
          ) : (
            initials
          )}
        </div>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-[#0d2035]/95 backdrop-blur-md border border-[#F86531]/30 rounded-lg shadow-lg shadow-[#F86531]/10 z-50">
          {/* User Info */}
          <div className="px-4 py-3 border-b border-[#F86531]/20">
            <p className="text-sm font-medium text-white leading-none mb-1">
              {user.name}
            </p>
            <p className="text-xs text-slate-400 leading-none">
              {user.email}
            </p>
          </div>

          {/* Menu Items */}
          <div className="py-1">
            <Link
              href="/course/register"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2 px-4 py-2 text-sm text-white hover:bg-[#F86531]/10 hover:text-[#F86531] transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              <span>Update Profile</span>
            </Link>

            <div className="border-t border-[#F86531]/20 my-1"></div>

            <button
              onClick={() => {
                setIsOpen(false);
                signOutAction();
              }}
              className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-400 hover:bg-[#C42F35]/10 hover:text-red-300 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" x2="9" y1="12" y2="12" />
              </svg>
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

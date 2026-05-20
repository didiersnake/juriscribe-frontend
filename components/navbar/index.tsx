"use client"
import React from "react"
import Image from "next/image"
import logo from "../../app/assets/images/juriscribe_logo.png"
import { Menu, Search, Settings, HelpCircle, User } from "lucide-react"
import { on } from "node:cluster"

export default function Navbar({
  isLoggedIn,
  onToggleAuth,
  onToggleSidebar,
}: {
  isLoggedIn: boolean
  onToggleAuth: () => void
  onToggleSidebar: () => void
}) {
  const leftNav = (
    <div className="relative flex shrink-0 items-center gap-2 sm:gap-4">
      <button
        onClick={onToggleSidebar}
        className="block rounded-full p-2 text-slate-600 transition-colors hover:bg-slate-100 active:scale-95 sm:p-3"
      >
        <Menu size={24} />
      </button>

      <div className="group flex cursor-pointer items-center gap-3">
        <svg
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-9 w-9 shrink-0 transform transition-transform duration-300 group-hover:scale-105 sm:h-11 sm:w-11"
        >
          <rect x="6" y="4" width="36" height="40" rx="4" fill="#1E3A8A" />
          <path d="M30 4 L42 16 L42 4 Z" fill="#D97706" />
          <path d="M24 14 L17 28 L24 38 L31 28 Z" fill="#F8FAFC" />
          <line
            x1="24"
            y1="21"
            x2="24"
            y2="33"
            stroke="#1E3A8A"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <circle cx="24" cy="18" r="1.5" fill="#1E3A8A" />
        </svg>
        <span className="hidden text-[20px] font-bold tracking-tight text-slate-800 transition-colors group-hover:text-blue-900 sm:block sm:text-[24px]">
          JuriScribe
        </span>
      </div>
    </div>
  )

  const middleNav = (
    <div className="max-w-[720px] flex-1 px-4 md:px-8">
      <div className="group relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <Search className="h-5 w-5 text-slate-500 group-focus-within:text-slate-700" />
        </div>
        <input
          type="text"
          className="block w-full rounded-full border-transparent bg-slate-100 py-2.5 pr-3 pl-12 text-sm text-slate-900 placeholder-slate-500 transition-all focus:bg-white focus:shadow-md focus:ring-1 focus:ring-slate-300 focus:outline-none sm:py-3 sm:text-base"
          placeholder={
            isLoggedIn
              ? "Search templates and documents"
              : "Search public legal templates..."
          }
        />
      </div>
    </div>
  )

  const RightNav = (isLoggedIn: boolean, onToggleAuth: () => void) => {
    return (
      <div className="flex shrink-0 items-center gap-1 sm:gap-3">
        {isLoggedIn && (
          <>
            <button
              className="hidden rounded-full p-2 text-slate-600 transition-colors hover:bg-slate-100 active:scale-95 md:block"
              title="Help"
            >
              <HelpCircle size={22} />
            </button>
            <button
              className="hidden rounded-full p-2 text-slate-600 transition-colors hover:bg-slate-100 active:scale-95 md:block"
              title="Settings"
            >
              <Settings size={22} />
            </button>
            {/* <button
              className="hidden rounded-full p-2 text-slate-600 transition-colors hover:bg-slate-100 active:scale-95 sm:block"
              title="Google Apps"
            >
              <Grid size={22} />
            </button> */}
          </>
        )}

        <div className="pl-2">
          {isLoggedIn ? (
            <button
              onClick={onToggleAuth}
              className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-indigo-600 text-sm font-medium text-white shadow-sm transition-all hover:ring-4 hover:ring-indigo-100 active:scale-95 sm:h-10 sm:w-10 sm:text-base"
              title="Log out"
            >
              D
            </button>
          ) : (
            <button
              onClick={onToggleAuth}
              className="flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-all duration-300 hover:bg-blue-700 hover:shadow-md active:scale-95 sm:px-6 sm:py-2.5 sm:text-base"
            >
              <User size={18} />
              <span className="hidden sm:inline">Sign In</span>
            </button>
          )}
        </div>
      </div>
    )
  }

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4">
      {leftNav}
      {middleNav}
      {RightNav(isLoggedIn, onToggleAuth)}
    </header>
  )
}

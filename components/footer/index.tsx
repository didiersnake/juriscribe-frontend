"use client"
import React from "react"
import {
  AlertCircle,
  FileArchive,
  Gavel,
  Landmark,
  Scale,
  Send,
} from "lucide-react"
export default function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-800 bg-slate-900 px-6 pt-16 pb-8 text-slate-400">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 md:grid-cols-12 md:gap-12">
        <div className="md:col-span-4 lg:col-span-5">
          <div className="mb-6 flex items-center gap-3 opacity-90 grayscale">
            <svg
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 shrink-0"
            >
              <rect x="6" y="4" width="36" height="40" rx="4" fill="#3B82F6" />
              <path d="M30 4 L42 16 L42 4 Z" fill="#F59E0B" />
              <path d="M24 14 L17 28 L24 38 L31 28 Z" fill="#F8FAFC" />
              <line
                x1="24"
                y1="21"
                x2="24"
                y2="33"
                stroke="#3B82F6"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <circle cx="24" cy="18" r="1.5" fill="#3B82F6" />
            </svg>
            <span className="text-xl font-bold tracking-tight text-white">
              JuriScribe
            </span>
          </div>
          <p className="mb-6 max-w-sm text-sm leading-relaxed text-slate-500">
            The new standard for legal templates and document generation.
            Empowering legal professionals to draft documents with confidence
            and speed.
          </p>
        </div>

        <div className="md:col-span-4 lg:col-span-4">
          <h4 className="mb-5 font-medium text-white">
            Complaints & Petitions
          </h4>
          <ul className="flex flex-col space-y-3 text-sm">
            <li>
              <a
                href="#"
                className="group inline-flex items-center gap-2 transition-colors hover:text-blue-400"
              >
                <AlertCircle
                  size={16}
                  className="text-slate-500 group-hover:text-blue-500"
                />{" "}
                Simple Complaint
              </a>
            </li>
            <li>
              <a
                href="#"
                className="group inline-flex items-center gap-2 transition-colors hover:text-blue-400"
              >
                <Gavel
                  size={16}
                  className="text-slate-500 group-hover:text-blue-500"
                />{" "}
                Complaint (Civil Party)
              </a>
            </li>
            <li>
              <a
                href="#"
                className="group inline-flex items-center gap-2 transition-colors hover:text-blue-400"
              >
                <FileArchive
                  size={16}
                  className="text-slate-500 group-hover:text-blue-500"
                />{" "}
                Motion / Petition
              </a>
            </li>
            <li>
              <a
                href="#"
                className="group inline-flex items-center gap-2 transition-colors hover:text-blue-400"
              >
                <Landmark
                  size={16}
                  className="text-slate-500 group-hover:text-blue-500"
                />{" "}
                Administrative Petition
              </a>
            </li>
          </ul>
        </div>

        <div className="md:col-span-4 lg:col-span-3">
          <h4 className="mb-5 font-medium text-white">Legal Documents</h4>
          <ul className="flex flex-col space-y-3 text-sm">
            {/* <li>
              <a
                href="#"
                className="group inline-flex items-center gap-2 transition-colors hover:text-blue-400"
              >
                <FileText
                  size={16}
                  className="text-slate-500 group-hover:text-blue-500"
                />{" "}
                Assignation
              </a>
            </li> */}
            <li>
              <a
                href="#"
                className="group inline-flex items-center gap-2 transition-colors hover:text-blue-400"
              >
                <Scale
                  size={16}
                  className="text-slate-500 group-hover:text-blue-500"
                />{" "}
                Direct Citation
              </a>
            </li>

            <li>
              <a
                href="#"
                className="group inline-flex items-center gap-2 transition-colors hover:text-blue-400"
              >
                <Send
                  size={16}
                  className="text-slate-500 group-hover:text-blue-500"
                />{" "}
                Writ of Summons
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-12 flex max-w-7xl flex-col items-center justify-between gap-4 border-t border-slate-800 pt-8 text-sm sm:flex-row">
        <p className="text-slate-500">
          &copy; {new Date().getFullYear()} JuriScribe. All rights reserved.
        </p>
        <div className="flex items-center gap-6 text-slate-500">
          <a href="#" className="transition-colors hover:text-white">
            Privacy Policy
          </a>
          <a href="#" className="transition-colors hover:text-white">
            Terms of Service
          </a>
          <a href="#" className="transition-colors hover:text-white">
            Contact
          </a>
        </div>
      </div>
    </footer>
  )
}

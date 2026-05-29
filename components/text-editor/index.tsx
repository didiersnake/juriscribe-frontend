"use client"

import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import React from "react"
import MenuBar from "./menu-bar"
import TextAlign from "@tiptap/extension-text-align"
import Highlight from "@tiptap/extension-highlight"
import { ChevronLeft, Download, Save } from "lucide-react"
export default function TextEditor({ onBack }: { onBack: () => void }) {
  const [fileName, setFileName] = React.useState("Untitled Document")

  const debounceTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null)
  const isSaving = React.useRef(false)

  const STORAGE_KEY = "editor_draft"
  const DEBOUNCE_DELAY = 1000 // ms — waits 1s after user stops typing

  function getSavedContent(): string {
    if (typeof window === "undefined") return "<p>Hello World!2</p>" // SSR guard
    return localStorage.getItem(STORAGE_KEY) ?? "<p>Hello World!!!!!!!!!!!!</p>"
  }

  // Stable save function — doesn't change between renders
  const saveToStorage = React.useCallback((html: string) => {
    isSaving.current = true
    localStorage.setItem(STORAGE_KEY, html)
    isSaving.current = false
  }, [])

  // Debounced version — resets the timer on every keystroke
  const debouncedSave = React.useCallback(
    (html: string) => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current)
      }
      debounceTimer.current = setTimeout(() => {
        saveToStorage(html)
      }, DEBOUNCE_DELAY)
    },
    [saveToStorage]
  )

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: {
          HTMLAttributes: {
            class: "ml-4 list-disc",
          },
        },
        orderedList: {
          HTMLAttributes: {
            class: "ml-4 list-decimal",
          },
        },
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Highlight,
    ],
    content: getSavedContent(),
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: "min-h-[350px] -mx-8 outline-none",
      },
    },
    //Reset timer countdown on every keystroke
    onUpdate({ editor }) {
      debouncedSave(editor.getHTML())
    },
  })

  // ── Cleanup: flush any pending save when component unmounts
  React.useEffect(() => {
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current)
        //Save immediately on unmount so no edit is lost
        if (editor) {
          saveToStorage(editor.getHTML())
        }
      }
    }
  }, [editor, saveToStorage])

  // ── Save on tab/window close
  React.useEffect(() => {
    const handleBeforeUnload = () => {
      if (editor) {
        saveToStorage(editor.getHTML())
      }
    }
    window.addEventListener("beforeunload", handleBeforeUnload)
    return () => window.removeEventListener("beforeunload", handleBeforeUnload)
  }, [editor, saveToStorage])

  const clearDraft = React.useCallback(() => {
    localStorage.removeItem(STORAGE_KEY)
    editor?.commands.setContent("<p></p>")
  }, [editor])

  const Header = (
    <div className="sticky top-0 z-40">
      <div className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3 shadow-sm">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="rounded-full p-2 text-slate-500 transition-colors hover:bg-slate-200 active:scale-95"
            title="Back to Dashboard"
          >
            <ChevronLeft size={20} />
          </button>

          <div className="flex flex-col">
            <input
              type="text"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              className="-ml-2 w-64 rounded border-none bg-transparent px-2 py-0.5 text-lg font-medium text-slate-800 transition-all placeholder:text-slate-400 hover:bg-slate-50 focus:bg-slate-100 focus:outline-none sm:w-96"
              placeholder="Name your document"
            />
            <div className="mt-0.5 flex items-center gap-1.5 px-0.5 text-xs text-slate-500">
              <Save size={12} className="text-emerald-500" />
              <span>Saved to cloud</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              alert("Exporting " + fileName + "...")
            }}
            className="hidden items-center justify-center gap-2 rounded-md bg-transparent px-4 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-200 sm:flex"
          >
            Share
          </button>
          <button
            onClick={() => {
              alert("Exporting " + fileName + "...")
            }}
            className="flex items-center justify-center gap-2 rounded-md bg-blue-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-all hover:bg-blue-700 hover:shadow-md active:scale-95"
          >
            <Download size={16} />{" "}
            <span className="hidden sm:inline">Export PDF</span>
          </button>
        </div>
      </div>
      {/*       Text Menu Bar  */}
      <MenuBar editor={editor} />
    </div>
  )

  const Editor = (
    <div className="flex flex-1 justify-center overflow-y-auto p-3 sm:p-8">
      <div className="mb-16 h-fit w-full max-w-[650px] shrink-0 rounded-sm border border-slate-200 bg-white px-12 py-16 shadow-sm sm:px-20 md:px-24">
        <EditorContent editor={editor} />
      </div>
    </div>
  )
  return (
    <div className="relative flex h-full min-h-[calc(100vh-64px)] flex-col">
      {Header}
      {Editor}
    </div>
  )
}

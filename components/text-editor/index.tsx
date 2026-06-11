"use client"

import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import React from "react"
import MenuBar from "./menu-bar"
import TextAlign from "@tiptap/extension-text-align"
import Highlight from "@tiptap/extension-highlight"
import { TextStyle } from "@tiptap/extension-text-style"
import { ChevronLeft, Download, Save } from "lucide-react"
import { useAuth } from "@/lib/authContext"
import { axiosInstance } from "@/lib/services/api"
import { useTranslations } from "next-intl"
import { PreserveIndent } from "./preserve-indent"
import {
  addDocumentChangesToDraft,
  getDocumentFromDraft,
} from "@/lib/services/indexedDBService"
export default function TextEditor({
  onBack,
  content,
  name,
  id,
}: {
  onBack: () => void
  content: string
  name: string
  id: number
}) {
  const [fileName, setFileName] = React.useState(name.split(".")[0])
  const { documentId, setDocumentId } = useAuth()
  const debounceTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null)
  const isSaving = React.useRef(false)

  const t = useTranslations("text_editor")
  const STORAGE_KEY = "editor_draft"
  const DEBOUNCE_DELAY = 1000 // ms — waits 1s after user stops typing

  function getSavedContent(content: string): string {
    if (typeof window === "undefined") return "<p>Hello World!</p>" // SSR guard
    // const saved = localStorage.getItem(STORAGE_KEY)
    const saved = getDocumentFromDraft(id)
    if (documentId !== 0) {
      return sanitizeForTipTap(content)
    }
    setDocumentId(0) // Reset after loading to prevent re-fetching on every editor mount
    return "<p>Hello World!!!!</p>"
  }

  // Stable save function — doesn't change between renders
  const saveToStorage = React.useCallback((html: string) => {
    isSaving.current = true
    // localStorage.setItem(STORAGE_KEY, html)
    addDocumentChangesToDraft({ id: id, fileName: fileName, content: html })
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

  const handleExportPDF = async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const response: any = await axiosInstance.post(
      "/api/documents/export-pdf",
      JSON.stringify(editor?.getHTML()),
      {
        responseType: "blob", // Important for handling binary data
      }
    )
    if (response) {
      console.log("Export response:", response)
    }
    const blob = response.data
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${fileName}.pdf`
    a.click()
    URL.revokeObjectURL(url)
  }

  function sanitizeForTipTap(html: string): string {
    const parser = new DOMParser()
    const doc = parser.parseFromString(html, "text/html")

    doc.querySelectorAll("p, li").forEach((el) => {
      const htmlEl = el as HTMLElement

      // Convert leading &nbsp; chains to margin-left
      const match = htmlEl.innerHTML.match(/^(&nbsp;)+/)
      if (match) {
        const count = match[0].split("&nbsp;").length - 1
        htmlEl.style.marginLeft = `${count * 10}px`
        htmlEl.innerHTML = htmlEl.innerHTML.replace(/^(&nbsp;)+/, "")
      }
    })

    return doc.body.innerHTML
  }

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
      TextStyle,
      PreserveIndent,
    ],
    content: getSavedContent(content),
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
              <span>{t("save")}</span>
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
            {t("share")}
          </button>
          <button
            onClick={() => {
              handleExportPDF()
            }}
            className="flex items-center justify-center gap-2 rounded-md bg-blue-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-all hover:bg-blue-700 hover:shadow-md active:scale-95"
          >
            <Download size={16} />{" "}
            <span className="hidden sm:inline">{t("export_pdf")}</span>
          </button>
        </div>
      </div>
      {/*       Text Menu Bar  */}
      <MenuBar editor={editor} />
    </div>
  )

  const Editor = (
    <div className="flex flex-1 justify-center overflow-y-auto p-3 sm:p-8">
      <div className="mb-16 h-fit w-full max-w-[760px] shrink-0 rounded-sm border border-slate-200 bg-white px-12 py-16 shadow-sm sm:px-20 md:px-16">
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

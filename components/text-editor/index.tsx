"use client"

import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import React from "react"
import MenuBar from "./menu-bar"
import TextAlign from "@tiptap/extension-text-align"
import Highlight from "@tiptap/extension-highlight"
import { Download } from "lucide-react"
export default function TextEditor() {
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
    content: "<p>Hello World!</p>",
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          "min-h-[360px] rounded-md border py-2 px-3 focus:outline-none bg-slate-50",
      },
    },
  })
  return (
    <div className="m-2">
      <div className="m-3 flex items-center justify-between">
        <h4 className="py-2">File Name</h4>
        <button
          onClick={() => {
            alert("Exporting...")
          }}
          className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-8 py-2.5 text-lg font-medium text-white shadow-sm transition-all hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-200/50 active:scale-95"
        >
          Export <Download className="size-4" />
        </button>
      </div>
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  )
}

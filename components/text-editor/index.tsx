"use client"

import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import React from "react"
import MenuBar from "./menu-bar"
import TextAlign from "@tiptap/extension-text-align"
import Highlight from "@tiptap/extension-highlight"
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
        class: "min-h-[360px] rounded-md border py-2 px-3 focus:outline-none ",
      },
    },
  })
  return (
    <div className="m-2">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  )
}

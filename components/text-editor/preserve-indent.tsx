import { Extension } from "@tiptap/core"

// Custom extension to preserve inline styles on paragraphs
export const PreserveIndent = Extension.create({
  name: "preserveIndent",
  addGlobalAttributes() {
    return [
      {
        types: [
          "paragraph",
          "heading",
          "bulletList",
          "orderedList",
          "listItem",
        ],
        attributes: {
          style: {
            default: null,
            parseHTML: (element) => element.getAttribute("style") || null,
            renderHTML: (attributes) => {
              if (!attributes.style) return {}
              return { style: attributes.style }
            },
          },
          class: {
            default: null,
            parseHTML: (element) => element.getAttribute("class") || null,
            renderHTML: (attributes) => {
              if (!attributes.class) return {}
              return { class: attributes.class }
            },
          },
        },
      },
    ]
  },
})

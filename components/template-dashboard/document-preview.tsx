import { FileText } from "lucide-react"

export default function DocumentPreview({
  htmlContent,
  fallbackType = "grid",
  buttonText,
  onButtonClick,
}: {
  htmlContent?: string
  fallbackType?: "grid" | "preview" | "guest"
  buttonText?: string
  onButtonClick?: () => void
}) {
  if (htmlContent) {
    return (
      <div className="absolute inset-0 overflow-hidden rounded-[inherit] bg-white p-4">
        <iframe
          srcDoc={htmlContent}
          className="pointer-events-none h-[300%] w-[300%] origin-top-left scale-[0.3333] border-none"
          tabIndex={-1}
          style={{ background: "white" }}
        />
        {/* Overlay to prevent interactions but still allow pointer events for the parent to detect click/hover */}
        <div className="absolute inset-0 z-10 bg-transparent" />

        {fallbackType === "preview" && (
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-slate-900/5 opacity-0 backdrop-blur-[1px] transition-opacity duration-300 group-hover:opacity-100">
            <span className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-md">
              {buttonText}
            </span>
          </div>
        )}
        {fallbackType === "guest" && (
          <>
            <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-b from-transparent to-white/90"></div>
            <div
              className="absolute right-4 bottom-4 left-4 z-20 flex items-center justify-center rounded bg-slate-900 p-2 text-xs font-semibold text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              onClick={onButtonClick}
            >
              {buttonText}
            </div>
          </>
        )}
      </div>
    )
  }

  if (fallbackType === "preview") {
    return (
      <>
        {/* Simulated docx content styling */}
        <div className="relative z-10 mb-2 flex h-10 w-10 items-center justify-center rounded border border-slate-200 bg-white shadow-sm">
          <FileText size={20} className="text-blue-600" />
        </div>
        <div className="relative z-10 mb-2 h-3 w-3/4 rounded bg-slate-300"></div>
        <div className="relative z-10 h-1.5 w-full rounded bg-slate-200"></div>
        <div className="relative z-10 h-1.5 w-full rounded bg-slate-200"></div>
        <div className="relative z-10 h-1.5 w-5/6 rounded bg-slate-200"></div>
        <div className="relative z-10 mt-3 h-1.5 w-full rounded bg-slate-200"></div>
        <div className="relative z-10 h-1.5 w-full rounded bg-slate-200"></div>
        <div className="relative z-10 h-1.5 w-4/6 rounded bg-slate-200"></div>

        {/* Overlay Action */}
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-slate-900/5 opacity-0 backdrop-blur-[1px] transition-opacity duration-300 group-hover:opacity-100">
          <span className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-md">
            Open Document
          </span>
        </div>
      </>
    )
  }

  if (fallbackType === "guest") {
    return (
      <>
        <div className="relative z-10 mb-2 h-8 w-full rounded bg-slate-100 transition-colors group-hover:bg-blue-50"></div>
        <div className="relative z-10 mb-2 h-3 w-3/4 rounded bg-slate-100 transition-colors group-hover:bg-blue-50"></div>
        <div className="relative z-10 mb-2 h-3 w-5/6 rounded bg-slate-100"></div>
        <div className="relative z-10 mb-2 h-3 w-full rounded bg-slate-100"></div>
        <div className="relative z-10 mb-2 h-3 w-2/3 rounded bg-slate-100"></div>
        <div className="relative z-10 flex-1"></div>
        <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-b from-transparent to-white/90"></div>
        <div className="absolute right-4 bottom-4 left-4 z-20 flex items-center justify-center rounded bg-slate-900 p-2 text-xs font-semibold text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          Sign in to view
        </div>
      </>
    )
  }

  // default 'grid'
  return (
    <>
      {/* Simulated document lines */}
      <div className="relative z-10 mt-2 space-y-3">
        <div className="h-2.5 w-2/3 rounded bg-slate-200 transition-colors duration-300 group-hover:bg-blue-100"></div>
        <div className="space-y-1.5 pt-2">
          <div className="h-1.5 w-full rounded bg-slate-100"></div>
          <div className="h-1.5 w-5/6 rounded bg-slate-100"></div>
          <div className="h-1.5 w-full rounded bg-slate-100"></div>
          <div className="h-1.5 w-4/5 rounded bg-slate-100"></div>
        </div>
      </div>

      {/* Bottom decorative logo/icon */}
      <div className="absolute -right-4 -bottom-4 z-0 opacity-10 transition-all duration-500 group-hover:rotate-12 group-hover:text-blue-600 group-hover:opacity-20">
        <FileText size={100} />
      </div>
    </>
  )
}

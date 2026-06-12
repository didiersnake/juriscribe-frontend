import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getCookie = async (name: string) => {
  return document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${name}=`))
    ?.split("=")[1]
}

export function formatDate(date: Date, locale: string) {
  const now = new Date()
  const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60)
  const diffInMinutes = (now.getTime() - date.getTime()) / (1000 * 60)
  const minutesAgo =
    locale === "en"
      ? `${Math.floor(diffInMinutes)} minutes ago`
      : `il y a ${Math.floor(diffInMinutes)} minutes`
  const hoursAgo =
    locale === "en"
      ? `${Math.floor(diffInHours)} hours ago`
      : ` il y a ${Math.floor(diffInHours)} heures`

  if (locale === "en") {
    const dayOfWeek = date.toLocaleString("en-US", { weekday: "short" })
    const formattedDate =
      dayOfWeek === "Sunday"
        ? "Sunday"
        : `${dayOfWeek}, ${date.toLocaleString("en-US", { month: "short", day: "numeric", year: "numeric" })}`

    return diffInMinutes < 60
      ? minutesAgo
      : diffInHours < 24
        ? hoursAgo
        : formattedDate
  }
  if (locale === "fr") {
    const dayOfWeek = date.toLocaleString("fr-FR", { weekday: "short" })
    const formattedDate =
      dayOfWeek === "Sunday"
        ? "Sunday"
        : `${dayOfWeek}, ${date.toLocaleString("fr-FR", { month: "short", day: "numeric", year: "numeric" })}`

    return diffInMinutes < 60
      ? minutesAgo
      : diffInHours < 24
        ? hoursAgo
        : formattedDate
  }
}

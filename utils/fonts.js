import { theme } from "theme"

export const getTextAligned = (textAlign = "left") => {
  const textAlignMap = {
    "left": "text-left",
    "right": "text-right",
    "center": "text-center",
  }
  return `${textAlignMap[textAlign] || ""}`
}

export const getFontsizeForHeading = (level) => {
  const fontSizeMap = {
    1: "text-6xl",
    2: "text-5xl",
    3: "text-4xl",
    4: "text-3xl",
    5: "text-2xl",
    6: "text-xl",
  }
  return `${fontSizeMap[level] || ""}`
}

export const getFontColorForParagraph = (color, textColor) => {
  return theme[textColor] || color?.text || "#440000"
}
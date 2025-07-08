"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Palette, X } from "lucide-react"

const pageBackgrounds = [
  {
    name: "Dark Black",
    value: "bg-black",
    preview: "bg-black",
  },
  {
    name: "Dark Purple",
    value: "bg-purple-950",
    preview: "bg-purple-950",
  },
  {
    name: "Dark Blue",
    value: "bg-blue-950",
    preview: "bg-blue-950",
  },
  {
    name: "Dark Green",
    value: "bg-green-950",
    preview: "bg-green-950",
  },
  {
    name: "Dark Red",
    value: "bg-red-950",
    preview: "bg-red-950",
  },
  {
    name: "Dark Indigo",
    value: "bg-indigo-950",
    preview: "bg-indigo-950",
  },
  {
    name: "Dark Slate",
    value: "bg-slate-950",
    preview: "bg-slate-950",
  },
  {
    name: "Dark Gray",
    value: "bg-gray-950",
    preview: "bg-gray-950",
  },
  {
    name: "Purple Gradient",
    value: "bg-gradient-to-br from-purple-950 via-purple-900 to-black",
    preview: "bg-gradient-to-br from-purple-950 via-purple-900 to-black",
  },
  {
    name: "Blue Gradient",
    value: "bg-gradient-to-br from-blue-950 via-blue-900 to-black",
    preview: "bg-gradient-to-br from-blue-950 via-blue-900 to-black",
  },
  {
    name: "Rainbow Gradient",
    value: "bg-gradient-to-br from-purple-950 via-blue-950 via-green-950 to-pink-950",
    preview: "bg-gradient-to-br from-purple-950 via-blue-950 via-green-950 to-pink-950",
  },
  {
    name: "Sunset Gradient",
    value: "bg-gradient-to-br from-orange-950 via-red-950 to-purple-950",
    preview: "bg-gradient-to-br from-orange-950 via-red-950 to-purple-950",
  },
]

export function PageBackgroundSelector() {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedBackground, setSelectedBackground] = useState(pageBackgrounds[0])

  useEffect(() => {
    // Load saved background preference
    const savedBackground = localStorage.getItem("page-background")
    if (savedBackground) {
      const found = pageBackgrounds.find((bg) => bg.name === savedBackground)
      if (found) setSelectedBackground(found)
    }
  }, [])

  useEffect(() => {
    // Apply background to the main page container
    const mainContent = document.getElementById("main-content")
    const body = document.body

    if (mainContent && body) {
      // Remove all existing background classes from body and main content
      const allBackgroundClasses = [
        "bg-black",
        "bg-purple-950",
        "bg-blue-950",
        "bg-green-950",
        "bg-red-950",
        "bg-indigo-950",
        "bg-slate-950",
        "bg-gray-950",
        "bg-gradient-to-br",
        "from-purple-950",
        "via-purple-900",
        "to-black",
        "from-blue-950",
        "via-blue-900",
        "from-purple-950",
        "via-blue-950",
        "via-green-950",
        "to-pink-950",
        "from-orange-950",
        "via-red-950",
        "to-purple-950",
      ]

      allBackgroundClasses.forEach((className) => {
        body.classList.remove(className)
        mainContent.classList.remove(className)
      })

      // Apply selected background classes
      const backgroundClasses = selectedBackground.value.split(" ")
      backgroundClasses.forEach((className) => {
        body.classList.add(className)
        mainContent.classList.add(className)
      })

      // Save preference
      localStorage.setItem("page-background", selectedBackground.name)
    }
  }, [selectedBackground])

  const handleBackgroundSelect = (background) => {
    setSelectedBackground(background)
    setIsOpen(false)
  }

  return (
    <div className="fixed top-20 right-8 z-50">
      {/* Background Selector Panel */}
      {isOpen && (
        <div className="mb-4 bg-black/95 backdrop-blur-sm border border-gray-700 rounded-lg p-4 w-80 max-h-96 overflow-y-auto">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-white font-semibold">Page Background</h3>
            <Button
              onClick={() => setIsOpen(false)}
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0 text-gray-400 hover:text-white"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {pageBackgrounds.map((background) => (
              <button
                key={background.name}
                onClick={() => handleBackgroundSelect(background)}
                className={`relative p-3 rounded-lg border-2 transition-all duration-200 ${
                  selectedBackground.name === background.name
                    ? "border-purple-400 scale-105 shadow-lg shadow-purple-400/20"
                    : "border-gray-600 hover:border-gray-400"
                }`}
              >
                <div className={`w-full h-12 rounded mb-2 ${background.preview} border border-gray-600`} />
                <span className="text-white text-xs font-medium">{background.name}</span>
                {selectedBackground.name === background.name && (
                  <div className="absolute top-1 right-1 w-3 h-3 bg-purple-400 rounded-full animate-pulse" />
                )}
              </button>
            ))}
          </div>

          <div className="mt-4 p-2 bg-gray-800/50 rounded text-xs text-gray-300">
            💡 Tip: Choose a background that complements your content and provides good contrast for readability.
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="rounded-full w-12 h-12 bg-gray-800/80 hover:bg-gray-700/80 backdrop-blur-sm border border-gray-600 animate-jump shadow-lg"
        size="icon"
        aria-label="Background color selector"
      >
        <Palette className="w-5 h-5 text-purple-400" />
      </Button>

      {/* Current Background Indicator */}
      {/* {!isOpen && (
        <div className="mt-2 text-center">
          <div className="text-xs text-gray-400 bg-black/80 px-2 py-1 rounded backdrop-blur-sm">
           
          </div>
        </div>
      )} */}
    </div>
  )
}

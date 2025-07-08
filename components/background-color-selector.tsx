"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Palette, X } from "lucide-react"

const backgroundColors = [
  { name: "Dark", value: "bg-black" },
  { name: "Purple", value: "bg-purple-900" },
  { name: "Blue", value: "bg-blue-900" },
  { name: "Green", value: "bg-green-900" },
  { name: "Red", value: "bg-red-900" },
  { name: "Indigo", value: "bg-indigo-900" },
  { name: "Pink", value: "bg-pink-900" },
  { name: "Teal", value: "bg-teal-900" },
  { name: "Orange", value: "bg-orange-900" },
  { name: "Gradient", value: "bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900" },
]

export function BackgroundColorSelector() {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedColor, setSelectedColor] = useState(backgroundColors[0])

  useEffect(() => {
    // Load saved color preference
    const savedColor = localStorage.getItem("background-color")
    if (savedColor) {
      const found = backgroundColors.find((color) => color.name === savedColor)
      if (found) setSelectedColor(found)
    }
  }, [])

  useEffect(() => {
    // Apply background color to body
    const body = document.body

    // Remove all existing background classes
    const allClasses = [
      "bg-black",
      "bg-purple-900",
      "bg-blue-900",
      "bg-green-900",
      "bg-red-900",
      "bg-indigo-900",
      "bg-pink-900",
      "bg-teal-900",
      "bg-orange-900",
      "bg-gradient-to-br",
      "from-purple-900",
      "via-blue-900",
      "to-indigo-900",
    ]

    allClasses.forEach((className) => {
      body.classList.remove(className)
    })

    // Apply selected background
    if (selectedColor.name === "Gradient") {
      body.classList.add("bg-gradient-to-br", "from-purple-900", "via-blue-900", "to-indigo-900")
    } else {
      body.classList.add(selectedColor.value)
    }

    // Save preference
    localStorage.setItem("background-color", selectedColor.name)
  }, [selectedColor])

  const handleColorSelect = (color: (typeof backgroundColors)[0]) => {
    setSelectedColor(color)
    setIsOpen(false)
  }

  const getPreviewStyle = (color: (typeof backgroundColors)[0]) => {
    if (color.name === "Gradient") {
      return "bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900"
    }
    return color.value
  }

  return (
    <div className="fixed top-20 right-8 z-50">
      {/* Color Selector Panel */}
      {isOpen && (
        <div className="mb-4 bg-black/90 backdrop-blur-sm border border-gray-700 rounded-lg p-4 w-64">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-white font-semibold">Background Color</h3>
            <Button
              onClick={() => setIsOpen(false)}
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0 text-gray-400 hover:text-white"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {backgroundColors.map((color) => (
              <button
                key={color.name}
                onClick={() => handleColorSelect(color)}
                className={`relative p-3 rounded-lg border-2 transition-all duration-200 ${
                  selectedColor.name === color.name
                    ? "border-purple-400 scale-105"
                    : "border-gray-600 hover:border-gray-400"
                }`}
              >
                <div className={`w-full h-8 rounded mb-2 ${getPreviewStyle(color)}`} />
                <span className="text-white text-xs">{color.name}</span>
                {selectedColor.name === color.name && (
                  <div className="absolute top-1 right-1 w-3 h-3 bg-purple-400 rounded-full" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="rounded-full w-12 h-12 bg-gray-800/80 hover:bg-gray-700/80 backdrop-blur-sm border border-gray-600"
        size="icon"
        aria-label="Background color selector"
      >
        <Palette className="w-5 h-5 text-purple-400" />
      </Button>
    </div>
  )
}

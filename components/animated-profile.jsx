"use client"

import { useState } from "react"
import Image from "next/image"

export function AnimatedProfile() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div className="flex justify-center lg:justify-end">
      <div className="relative animate-profile-bounce">
        {/* Animated Background Circles */}
        <div className="absolute inset-0 animate-spin-slow">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl"></div>
        </div>

        <div className="absolute inset-0 animate-pulse">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-2xl"></div>
        </div>

        {/* Floating Particles */}
        <div className="absolute inset-0 overflow-hidden rounded-full">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-purple-400 rounded-full animate-float-1"></div>
          <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-pink-400 rounded-full animate-float-2"></div>
          <div className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 bg-blue-400 rounded-full animate-float-3"></div>
          <div className="absolute bottom-1/4 right-1/3 w-1 h-1 bg-purple-300 rounded-full animate-float-4"></div>
          <div className="absolute top-1/2 left-1/6 w-1 h-1 bg-pink-300 rounded-full animate-float-5"></div>
        </div>

        {/* Main Profile Container */}
        <div
          className={`relative w-80 h-80 rounded-full overflow-hidden border-4 border-gradient-to-r from-purple-500 to-pink-500 p-1 transition-all duration-500 ${
            isHovered ? "scale-110 rotate-3" : "scale-100 rotate-0"
          }`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Animated Border */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 animate-gradient-rotate"></div>

          {/* Profile Image Container */}
          <div className="relative w-full h-full rounded-full overflow-hidden bg-gradient-to-br from-purple-900/50 to-pink-900/50 z-10">
            <Image
              src="/profile-image.png"
              alt="Profile"
              width={400}
              height={400}
              className={`w-full h-full object-cover transition-all duration-500 ${
                isHovered ? "scale-110 brightness-110" : "scale-100 brightness-100"
              }`}
            />

            {/* Hover Overlay */}
            <div
              className={`absolute inset-0 bg-gradient-to-t from-purple-500/20 to-transparent transition-opacity duration-500 ${
                isHovered ? "opacity-100" : "opacity-0"
              }`}
            />
          </div>

          {/* Glowing Ring Effect */}
          <div
            className={`absolute inset-0 rounded-full border-2 border-purple-400/50 transition-all duration-500 ${
              isHovered ? "scale-125 opacity-100" : "scale-100 opacity-0"
            }`}
          />
        </div>

        {/* Status Indicator */}
        <div className="absolute bottom-8 right-8 w-6 h-6 bg-green-500 rounded-full border-4 border-white animate-pulse shadow-lg">
          <div className="absolute inset-0 bg-green-500 rounded-full animate-ping"></div>
        </div>
      </div>
    </div>
  )
}

"use client"

import { useState, useEffect, useRef } from "react"

export function AnimatedProgressBar({ skill, percentage, delay = 0 }) {
  const [currentPercentage, setCurrentPercentage] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const progressRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (progressRef.current) {
      observer.observe(progressRef.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isVisible) return

    const timer = setTimeout(() => {
      let startTime
      const animate = (currentTime) => {
        if (!startTime) startTime = currentTime
        const progress = Math.min((currentTime - startTime) / 1500, 1) // 1.5 second animation

        setCurrentPercentage(Math.floor(progress * percentage))

        if (progress < 1) {
          requestAnimationFrame(animate)
        }
      }

      requestAnimationFrame(animate)
    }, delay)

    return () => clearTimeout(timer)
  }, [isVisible, percentage, delay])

  return (
    <div ref={progressRef} className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <span className="text-white font-medium">{skill}</span>
        <span className="text-purple-400 font-semibold">{currentPercentage}%</span>
      </div>
      <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-1500 ease-out"
          style={{ width: `${currentPercentage}%` }}
          role="progressbar"
          aria-valuenow={currentPercentage}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
    </div>
  )
}

"use client"

import { useState, useEffect, useRef } from "react"
import { Mic, MicOff, HelpCircle, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useMediaQuery } from "@/hooks/use-mobile"

const FEEDBACK_DURATION = 8000
const LISTEN_DURATION = 60000

export function VoiceCommand() {
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState("")
  const [feedback, setFeedback] = useState("")
  const [recognition, setRecognition] = useState(null)
  const [timeRemaining, setTimeRemaining] = useState(0)
  const [showHelp, setShowHelp] = useState(false)
  const [hasUsedBefore, setHasUsedBefore] = useState(false)
  const [isMobileDevice, setIsMobileDevice] = useState(false)
  const [zoomLevel, setZoomLevel] = useState(1)
  const [isSupported, setIsSupported] = useState(false)

  const timerRef = useRef(null)
  const countdownRef = useRef(null)
  const restartTimeoutRef = useRef(null)

  const isMobile = useMediaQuery("(max-width: 768px)")

  useEffect(() => {
    const hasUsed = localStorage.getItem("voice-commands-used")
    setHasUsedBefore(!!hasUsed)

    setIsMobileDevice(
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    )

    const speechRecognitionSupported =
      typeof window !== "undefined" &&
      ("SpeechRecognition" in window || "webkitSpeechRecognition" in window)

    setIsSupported(speechRecognitionSupported)

    if (speechRecognitionSupported) {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition
      const recognitionInstance = new SpeechRecognition()

      recognitionInstance.continuous = true
      recognitionInstance.interimResults = false
      recognitionInstance.lang = "en-US"
      recognitionInstance.maxAlternatives = 1

      recognitionInstance.onstart = () => {
        setFeedback("Listening... Speak now!")
      }

      recognitionInstance.onresult = (event) => {
        if (event.results && event.results.length > 0) {
          const lastResult = event.results[event.results.length - 1]
          if (lastResult.isFinal) {
            const command = lastResult[0].transcript.toLowerCase().trim()
            setTranscript(command)
            processCommand(command)
          }
        }
      }

      recognitionInstance.onspeechstart = () => {
        setFeedback("Speech detected...")
      }

      recognitionInstance.onspeechend = () => {
        setFeedback("Processing...")
      }

      recognitionInstance.onend = () => {
        if (timeRemaining > 5 && isListening) {
          restartTimeoutRef.current = setTimeout(() => {
            if (timeRemaining > 0 && isListening) {
              try {
                recognitionInstance.start()
              } catch {
                setFeedback("Recognition restarted")
              }
            }
          }, 500)
        } else {
          setIsListening(false)
          setTimeRemaining(0)
        }
      }

      recognitionInstance.onerror = (event) => {
        handleRecognitionError(event.error)
      }

      setRecognition(recognitionInstance)
    } else {
      setFeedback("Speech recognition not supported")
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
      if (countdownRef.current) clearInterval(countdownRef.current)
      if (restartTimeoutRef.current) clearTimeout(restartTimeoutRef.current)
      if (recognition) recognition.stop()
    }
  }, [])

  useEffect(() => {
    if (typeof document !== "undefined") {
      const mainContent = document.getElementById("main-content")
      if (mainContent) {
        mainContent.style.transform = `scale(${zoomLevel})`
        mainContent.style.transformOrigin = "center top"
        mainContent.style.transition = "transform 0.3s ease"
      }
    }
  }, [zoomLevel])

  const handleRecognitionError = (error) => {
    switch (error) {
      case "no-speech":
        setFeedback("No speech detected - try speaking louder")
        setTimeout(() => {
          if (isListening) setFeedback("Listening...")
        }, 2000)
        break
      case "audio-capture":
        setFeedback("Microphone not accessible")
        stopListening()
        break
      case "not-allowed":
        setFeedback("Microphone permission denied")
        stopListening()
        break
      case "network":
        setFeedback("Network error - check connection")
        stopListening()
        break
      case "aborted":
        setFeedback("Recognition aborted")
        break
      case "language-not-supported":
        setFeedback("Language not supported")
        stopListening()
        break
      default:
        setFeedback(`Error: ${error} - trying again`)
        break
    }

    setTimeout(() => {
      if (feedback && !["Processing...", "Listening..."].includes(feedback)) {
        if (isListening) {
          setFeedback("Listening...")
        } else {
          setFeedback("")
        }
      }
    }, FEEDBACK_DURATION)
  }

  const processCommand = (command) => {
    if (command.includes("home")) {
      scrollToSection("home")
      setFeedback("Navigating to Home")
    } else if (command.includes("about")) {
      scrollToSection("about")
      setFeedback("Navigating to About")
    } else if (command.includes("resume")) {
      scrollToSection("resume")
      setFeedback("Navigating to Resume")
    } else if (command.includes("project")) {
      scrollToSection("projects")
      setFeedback("Navigating to Projects")
    } else if (command.includes("contact")) {
      scrollToSection("contact")
      setFeedback("Navigating to Contact")
    } else if (command.includes("scroll up")) {
      window.scrollBy({ top: -500, behavior: "smooth" })
      setFeedback("Scrolling up")
    } else if (command.includes("scroll down")) {
      window.scrollBy({ top: 500, behavior: "smooth" })
      setFeedback("Scrolling down")
    } else if (command.includes("zoom in")) {
      zoomIn()
      setFeedback("Zooming in")
    } else if (command.includes("zoom out")) {
      zoomOut()
      setFeedback("Zooming out")
    } else if (command.includes("reset zoom")) {
      resetZoom()
      setFeedback("Resetting zoom")
    } else if (command.includes("stop") || command.includes("stop listening")) {
      stopListening()
      setFeedback("Voice commands stopped")
    } else {
      setFeedback(`Command not recognized: "${command}"`)
    }

    setTimeout(() => setFeedback(""), FEEDBACK_DURATION)
  }

  const scrollToSection = (sectionId) => {
    if (typeof document !== "undefined") {
      const section = document.getElementById(sectionId)
      if (section) {
        section.scrollIntoView({ behavior: "smooth" })
      }
    }
  }

  const zoomIn = () => {
    setZoomLevel((prevZoom) => Math.min(prevZoom + 0.1, 2.0))
  }

  const zoomOut = () => {
    setZoomLevel((prevZoom) => Math.max(prevZoom - 0.1, 0.5))
  }

  const resetZoom = () => {
    setZoomLevel(1)
  }

  const startListening = async () => {
    if (!recognition || !isSupported) {
      setFeedback("Speech recognition not available")
      setTimeout(() => setFeedback(""), FEEDBACK_DURATION)
      return
    }

    try {
      await navigator.mediaDevices.getUserMedia({ audio: true })
    } catch {
      setFeedback("Microphone permission denied")
      setTimeout(() => setFeedback(""), FEEDBACK_DURATION)
      return
    }

    try {
      if (isListening) {
        recognition.stop()
      }

      if (restartTimeoutRef.current) {
        clearTimeout(restartTimeoutRef.current)
        restartTimeoutRef.current = null
      }
      if (timerRef.current) {
        clearTimeout(timerRef.current)
        timerRef.current = null
      }
      if (countdownRef.current) {
        clearInterval(countdownRef.current)
        countdownRef.current = null
      }

      localStorage.setItem("voice-commands-used", "true")
      setHasUsedBefore(true)

      setIsListening(true)
      setTimeRemaining(LISTEN_DURATION / 1000)
      setFeedback("Click to speak now...")
      setShowHelp(false)

      recognition.start()

      timerRef.current = setTimeout(() => {
        stopListening()
        setFeedback("Voice command session ended")
        setTimeout(() => setFeedback(""), 2000)
      }, LISTEN_DURATION)

      countdownRef.current = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            if (countdownRef.current) clearInterval(countdownRef.current)
            return 0
          }
          return prev - 1
        })
      }, 1000)
    } catch {
      setFeedback("Failed to start - try again")
      setIsListening(false)
      setTimeout(() => setFeedback(""), FEEDBACK_DURATION)
    }
  }

  const stopListening = () => {
    if (recognition) {
      try {
        recognition.stop()
      } catch {
        // ignore error on stopping
      }
    }

    setIsListening(false)
    setTimeRemaining(0)

    if (timerRef.current) {
      clearTimeout(timerRef.current)
      timerRef.current = null
    }
    if (countdownRef.current) {
      clearInterval(countdownRef.current)
      countdownRef.current = null
    }
    if (restartTimeoutRef.current) {
      clearTimeout(restartTimeoutRef.current)
      restartTimeoutRef.current = null
    }
  }

  if (!isSupported) {
    return (
      <div className="p-4 text-red-600">
        Speech Recognition is not supported in this browser.
      </div>
    )
  }

  return (
    <div className="voice-command-container p-4 fixed bottom-1 left-12 bg-transparent rounded shadow-lg z-50">

      <div className="flex items-center space-x-3">
        <Button
          onClick={isListening ? stopListening : startListening}
          aria-label={isListening ? "Stop voice command" : "Start voice command"}
          className={`p-3 rounded-full ${
            isListening ? "bg-red-500 text-white" : "bg-green-500 text-white"
          }`}
        >
          {isListening ? <MicOff size={24} /> : <Mic size={24} />}
        </Button>

        <Button
          variant="ghost"
          onClick={() => setShowHelp((prev) => !prev)}
          aria-label="Toggle voice command help"
          className="p-2 rounded-full"
        >
          {showHelp ? <X size={20} /> : <HelpCircle size={20} />}
        </Button>
      </div>

      {feedback && (
        <p className="mt-2 text-sm text-gray-700 min-w-[200px]">{feedback}</p>
      )}

      {isListening && (
        <p className="mt-1 text-xs text-gray-500">
          Time remaining: {timeRemaining}s
        </p>
      )}

      {showHelp && (
        <div className="mt-4 p-3 bg-gray-100 rounded max-w-xs text-xs text-gray-700">
          <h4 className="font-semibold mb-2">Voice Command Help</h4>
          <ul className="list-disc pl-5 space-y-1">
            <li>Say "Home", "About", "Resume", "Projects", or "Contact" to navigate.</li>
            <li>Say "Scroll up" or "Scroll down" to move the page.</li>
            <li>Say "Zoom in", "Zoom out", or "Reset zoom" to adjust page zoom.</li>
            <li>Say "Stop" or "Stop listening" to end the session.</li>
          </ul>
        </div>
      )}
    </div>
  )
}

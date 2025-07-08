"use client"
import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Linkedin, MapPin, Download, Github } from "lucide-react"
import { ScrollToTop } from "@/components/scroll-to-top"
import { VoiceCommand } from "@/components/voice-command"
import { PageBackgroundSelector } from "@/components/page-background-selector"
import { AnimatedProfile } from "@/components/animated-profile"

function TypingAnimation() {
  const [displayText, setDisplayText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  const typingTexts = [
    "Frontend Developer ",
    "Backend Developer ",
    "Problem Solver  ",
  
    
  ]

  useEffect(() => {
    const currentText = typingTexts[currentIndex]
    const shouldDelete = isDeleting

    const timeout = setTimeout(
      () => {
        if (!shouldDelete) {
          // Typing
          if (displayText.length < currentText.length) {
            setDisplayText(currentText.slice(0, displayText.length + 1))
          } else {
            // Start deleting after a pause
            setTimeout(() => setIsDeleting(true), 1500)
          }
        } else {
          // Deleting
          if (displayText.length > 0) {
            setDisplayText(displayText.slice(0, -1))
          } else {
            // Move to next text
            setIsDeleting(false)
            setCurrentIndex((prevIndex) => (prevIndex + 1) % typingTexts.length)
          }
        }
      },
      shouldDelete ? 50 : 100,
    )

    return () => clearTimeout(timeout)
  }, [displayText, currentIndex, isDeleting])

  return (
    <span className="relative">
      {displayText}
      <span className="animate-pulse">|</span>
    </span>
  )
}

export default function Portfolio() {
  return (
    <div className="min-h-screen text-white">
      {/* Voice Command Component */}
      <VoiceCommand />

      {/* Page Background Selector */}
      <PageBackgroundSelector />

      {/* Main Content - Add id for zoom functionality */}
      <div id="main-content" className="min-h-screen bg-black">
        {/* Header */}
        <header className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-sm border-b border-gray-800">
          <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
            <Link href="/" className="text-xl font-bold">
              Sandeep Vishwakarma
            </Link>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="#home" className="text-purple-400 hover:text-purple-300 transition-colors">
                Home
              </Link>
              <Link href="#about" className="hover:text-purple-400 transition-colors">
                About
              </Link>
              <Link href="#resume" className="hover:text-purple-400 transition-colors">
                Resume
              </Link>
              <Link href="#projects" className="hover:text-purple-400 transition-colors">
                Projects
              </Link>
              <Link href="#contact" className="hover:text-purple-400 transition-colors">
                Contact
              </Link>
            </div>
          </nav>
        </header>

        {/* Hero Section */}
        <section id="home" className="pt-20 min-h-screen flex items-center relative overflow-hidden">
          {/* Background Text */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="text-gray-800 text-[8rem] md:text-[12rem] lg:text-[16rem] font-bold opacity-5 select-none">
              Home
            </span>
          </div>
          <div className="container mx-auto px-6 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="text-purple-400 text-sm font-medium tracking-wider uppercase">HELLO!</div>
                <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                  {"I'm "}
                  <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    Sandeep Vishwakarma
                  </span>
                </h1>
                <h2 className="text-2xl lg:text-3xl font-semibold text-gray-300">
                  <TypingAnimation />
                </h2>
                <p className="text-xl text-gray-400">A passionate developer creating amazing digital experiences</p>
                <div className="flex flex-wrap gap-4">
                  <Button
                    className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-3 rounded-full"
                    onClick={() => window.open("https://www.linkedin.com/in/sandy108/", "_blank")}
                  >
                    <Linkedin className="w-4 h-4 mr-2" />
                    LINKEDIN
                  </Button>
                  <Button
                    variant="outline"
                    className="border-gray-600 text-white hover:bg-gray-800 px-8 py-3 rounded-full bg-transparent"
                    onClick={() => window.open("https://github.com/Sandeepji-5", "_blank")}
                  >
                    MY WORKS
                  </Button>
                </div>
              </div>

              <AnimatedProfile />
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-12 relative overflow-hidden">
          {/* Background Text */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="text-gray-800 text-[12rem] md:text-[16rem] lg:text-[20rem] font-bold opacity-10 select-none">
              About
            </span>
          </div>
          <div className="container mx-auto px-6 relative z-10">
            <div className="grid lg:grid-cols-2 gap-8 items-start">
              {/* Left Side - Tech Icons and Skills */}
              <div className="space-y-8">
                {/* Tech Icons Vertical Layout */}
                <div>
                  <h3 className="text-xl font-bold text-white mb-4">Technologies</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center text-white font-bold text-xs">
                        C++
                      </div>
                      <span className="text-white text-sm">C++</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-red-500 rounded flex items-center justify-center text-white font-bold text-xs">
                        H
                      </div>
                      <span className="text-white text-sm">HTML</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-orange-500 rounded flex items-center justify-center text-white font-bold text-xs">
                      C
                      </div>
                      <span className="text-white text-sm">CSS</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white font-bold text-xs">
                        JS
                      </div>
                      <span className="text-white text-sm">Javascript</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-green-500 rounded flex items-center justify-center text-white font-bold text-xs">
                        R
                      </div>
                      <span className="text-white text-sm">React</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-purple-500 rounded flex items-center justify-center text-white font-bold text-xs">
                        Ex
                      </div>
                      <span className="text-white text-sm">Express.js</span>
                    </div>
 <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-purple-500 rounded flex items-center justify-center text-white font-bold text-xs">
                        N
                      </div>
                      <span className="text-white text-sm">Node.js</span>
                    </div>

                    
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gray-600 rounded flex items-center justify-center text-white font-bold text-xs">
                        <Github className="w-4 h-4" />
                      </div>
                      <span className="text-white text-sm">GitHub</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-indigo-500 rounded flex items-center justify-center text-white font-bold text-xs">
                        SQL
                      </div>
                      <span className="text-white text-sm">SQL</span>
                    </div>
                  </div>
                </div>

                {/* Skills Section
                <h3 className="text-xl font-bold text-white mb-4">Skills</h3> */}
                {/* Skills Section
<h3 className="text-xl font-bold text-white mb-4">Skills</h3>
<div className="space-y-6"> */}

{/* Skills Section */}
<h3 className="text-xl font-bold text-white mb-4">Skills</h3>
<div className="space-y-6">

  {/* C++ */}
  <div className="group">
    <div className="mb-1">
      <span className="text-white text-sm font-medium">C++</span>
    </div>
    <div className="relative w-full bg-gray-700 rounded-full h-3 overflow-hidden">
      <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full 
                      transition-all duration-700 w-[20%] group-hover:w-[80%] animate-pulse relative">
        <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-white font-semibold">
          80%
        </span>
      </div>
    </div>
  </div>

  {/* HTML */}
  <div className="group">
    <div className="mb-1">
      <span className="text-white text-sm font-medium">HTML</span>
    </div>
    <div className="relative w-full bg-gray-700 rounded-full h-3 overflow-hidden">
      <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full 
                      transition-all duration-700 w-[20%] group-hover:w-[80%] animate-pulse relative">
        <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-white font-semibold">
          80%
        </span>
      </div>
    </div>
  </div>
  </div>

  {/* CSS */}
  <div className="group">
    <div className="mb-1">
      <span className="text-white text-sm font-medium">CSS</span>
    </div>
    <div className="relative w-full bg-gray-700 rounded-full h-3 overflow-hidden">
      <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full 
                      transition-all duration-700 w-[20%] group-hover:w-[80%] animate-pulse relative">
        <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-white font-semibold">
          80%
        </span>
      </div>
    </div>
  </div>

  {/* JavaScript */}
  <div className="group">
    <div className="mb-1">
      <span className="text-white text-sm font-medium">JavaScript</span>
    </div>
    <div className="relative w-full bg-gray-700 rounded-full h-3 overflow-hidden">
      <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full 
                      transition-all duration-700 w-[20%] group-hover:w-[90%] animate-pulse relative">
        <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-white font-semibold">
          90%
        </span>
      </div>
    </div>
  </div>

  {/* React.js */}
  <div className="group">
    <div className="mb-1">
      <span className="text-white text-sm font-medium">React.js</span>
    </div>
    <div className="relative w-full bg-gray-700 rounded-full h-3 overflow-hidden">
      <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full 
                      transition-all duration-700 w-[20%] group-hover:w-[85%] animate-pulse relative">
        <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-white font-semibold">
          85%
        </span>
      </div>
    </div>
  </div>

  {/* Node.js */}
  <div className="group">
    <div className="mb-1">
      <span className="text-white text-sm font-medium">Node.js</span>
    </div>
    <div className="relative w-full bg-gray-700 rounded-full h-3 overflow-hidden">
      <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full 
                      transition-all duration-700 w-[20%] group-hover:w-[70%] animate-pulse relative">
        <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-white font-semibold">
          70%
        </span>
      </div>
    </div>
  </div>

</div>


              {/* Right Side - About Me Content */}



              <div className="space-y-6">
                <div>
                  <h2 className="text-4xl font-bold mb-4 relative z-10">About Me</h2>
                  <p className="text-gray-300 text-base leading-relaxed">
                    I am a passionate MERN Stack Developer with a keen interest in building dynamic web applications. 
                    I have a strong foundation in JavaScript, React, Node.js, and MongoDB.
                    I love to solve problems and create efficient solutions. My goal is to leverage my skills in web
                    development to create impactful applications that enhance user experiences.
                  </p>
                </div>

                {/* Profile Details in a more compact grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="text-gray-400 font-semibold">Name:</span>
                    <span className="ml-2 text-white">Sandeep Vishwakarma</span>
                  </div>
                  <div>
                    <span className="text-gray-400 font-semibold">Job Role:</span>
                    <span className="ml-2 text-white">Software Developer</span>
                  </div>
                  <div>
                    <span className="text-gray-400 font-semibold">Experience:</span>
                    <span className="ml-2 text-white">Fresher</span>
                  </div>
                  <div>
                    <span className="text-gray-400 font-semibold">Address:</span>
                    <span className="ml-2 text-white">Gorakhpur, India</span>
                  </div>
                  <div>
                    <span className="text-gray-400 font-semibold">Profile:</span>
                    <span className="ml-2 text-white"> Full Stack Web Developer | MERN Stack Enthusiast</span>
                  </div>
                  <div>
                    <span className="text-gray-400 font-semibold">Education:</span>
                    <span className="ml-2 text-white">B.Tech [ IT ]</span>
                  </div>
                  <div className="md:col-span-2">
                    <span className="text-gray-400 font-semibold">Language:</span>
                    <span className="ml-2 text-white">English, Hindi</span>
                  </div>
                </div>

                {/* Tools and Skills in compact format */}
                <div className="space-y-3">
                  <div>
                    <span className="text-gray-400 font-semibold text-sm">Tools:</span>
                    <p className="text-white text-sm mt-1">
                      Jupyter Notebook, VS Code, GitHub,  Postman
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-400 font-semibold text-sm">Other Skills:</span>
                    <p className="text-white text-sm mt-1">
                      .............................................
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-400 font-semibold text-sm">Interest:</span>
                    <p className="text-white text-sm mt-1">Traveling, Book Reading ,Singing </p>
                  </div>
                </div>

                {/* Projects and LinkedIn in vertical layout */}
                <div className="pt-4 space-y-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold text-purple-400">20+</span>
                    <span className="text-white text-sm">Projects completed</span>
                  </div>
                  <Button
                    className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-full text-sm font-semibold"
                    onClick={() => window.open("https://www.linkedin.com/in/sandy108/", "_blank")}
                  >
                    LINKEDIN
                  </Button>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Resume Section */}
        <section id="resume" className="py-20 relative overflow-hidden">
          {/* Background Text */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="text-gray-800 text-[12rem] md:text-[16rem] lg:text-[20rem] font-bold opacity-10 select-none">
              Resume
            </span>
          </div>
          <div className="container mx-auto px-6 relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4 relative z-10">Resume</h2>
              <p className="text-gray-400 text-lg max-w-3xl mx-auto">
Junior Web Developer with 6+ months of experience building responsive and 
user-friendly web applications. Skilled in front-end and back-end development, with hands-on expertise in technologies like HTML, CSS, JavaScript, React, Node.js, and MongoDB. Passionate about creating clean, efficient code and 
delivering seamless user experiences.
              </p>
            </div>

            {/* Job Simulation Section */}
            {/* <div className="mb-16">
              <h3 className="text-3xl font-bold mb-8 text-center">Job Simulation</h3>
              <div className="grid md:grid-cols-2 gap-8">
                <Card className="bg-gray-900/50 border-gray-800 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="mb-4">
                      <span className="text-purple-400 text-sm font-medium">March-2024</span>
                      <h4 className="text-xl font-bold text-white mt-1">Jr. Data Scientist</h4>
                      <p className="text-gray-400 text-sm">JOB SIMULATION AT FORAGE</p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-start space-x-2">
                        <span className="text-purple-400 mt-1">•</span>
                        <p className="text-gray-300 text-sm">Completed a job simulation focused on AI for good</p>
                      </div>
                      <div className="flex items-start space-x-2">
                        <span className="text-purple-400 mt-1">•</span>
                        <p className="text-gray-300 text-sm">
                          Analyzed a dataset to predict energy efficiency of buildings
                        </p>
                      </div>
                      <div className="flex items-start space-x-2">
                        <span className="text-purple-400 mt-1">•</span>
                        <p className="text-gray-300 text-sm">
                          Developed and analyzed customer review data to improve building
                        </p>
                      </div>
                      <div className="flex items-start space-x-2">
                        <span className="text-purple-400 mt-1">•</span>
                        <p className="text-gray-300 text-sm">
                          Presented a Python notebook that contains code to train a machine learning algorithm and
                          development
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gray-900/50 border-gray-800 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="mb-4">
                      <span className="text-purple-400 text-sm font-medium">March-2024</span>
                      <h4 className="text-xl font-bold text-white mt-1">Jr. Data Scientist</h4>
                      <p className="text-gray-400 text-sm">BRITISH AIRWAYS</p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-start space-x-2">
                        <span className="text-purple-400 mt-1">•</span>
                        <p className="text-gray-300 text-sm">
                          Completed a simulation focused on how data science is a critical component of British Airways
                          success
                        </p>
                      </div>
                      <div className="flex items-start space-x-2">
                        <span className="text-purple-400 mt-1">•</span>
                        <p className="text-gray-300 text-sm">
                          Scraped and analyzed customer review data to uncover findings
                        </p>
                      </div>
                      <div className="flex items-start space-x-2">
                        <span className="text-purple-400 mt-1">•</span>
                        <p className="text-gray-300 text-sm">
                          Built a predictive model to understand factors that influence buying behaviour
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div> */}

            {/* Education Section */}
            <div className="mb-12">
              <h3 className="text-3xl font-bold mb-8 text-center">Education</h3>
              <div className="grid md:grid-cols-2 gap-8">
                <Card className="bg-gray-900/50 border-gray-800 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="mb-4">
                      <span className="text-purple-400 text-sm font-medium">2021-2025</span>
                      <h4 className="text-xl font-bold text-white mt-1">Bachelor of Technology</h4>
                      <p className="text-gray-400 text-sm">INFORMATION TECHNOLOGY</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-gray-300 text-sm">College: DR. AMBEDKAR INSTITUTE OF TECHNOLOGY FOR DIVYANGJAN, KANPUR</p>
                      <p className="text-gray-300 text-sm">Grade: 8 GPA</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gray-900/50 border-gray-800 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="mb-4">
                      <span className="text-purple-400 text-sm font-medium">2019-2020</span>
                      <h4 className="text-xl font-bold text-white mt-1">Higher Secondary School</h4>
                      <p className="text-gray-400 text-sm">SCIENCE STREAM</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-gray-300 text-sm">School: D.B. INTER COLLEGE, Gorakhpur</p>
                      <p className="text-gray-300 text-sm">Grade: </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Download CV Button */}
            <div className="text-center">
               <a
                  href="https://drive.google.com/file/d/1GtgfcayqQoXCIQDMDCqZP4x_1KfxzRxR/view?usp=sharing"
                  target="_blank"
                   rel="noopener noreferrer"
              >
                <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-3 rounded-full text-lg font-semibold">
                  <Download className="w-5 h-5 mr-2" />
                  DOWNLOAD CV
                </Button>
              </a>
              </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-20 relative overflow-hidden">
          {/* Background Text */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="text-gray-800 text-[12rem] md:text-[16rem] lg:text-[20rem] font-bold opacity-10 select-none">
              Projects
            </span>
          </div>
          <div className="container mx-auto px-6 relative z-10">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4 relative z-10">Projects</h2>
              <p className="text-gray-400 text-lg max-w-3xl mx-auto">
                Here are some of the projects I have worked on, showcasing my skills in web development.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Project 1 */}
             <div className="group cursor-pointer">
  <div className="relative overflow-hidden rounded-lg">
    <a
      href="https://sandeepji-5.github.io/Covid-19-Upcoming/"
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70 z-10"></div>
      <Image
        src="/placeholder.svg.png?height=300&width=400"
        alt="COVID-19 Awareness Website"
        width={400}
        height={300}
        className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
      />
    </a>
    <div className="absolute bottom-0 left-0 right-0 p-4 z-20"></div>
  </div>

  <div className="mt-4">
    <a
      href="https://sandeepji-5.github.io/Covid-19-Upcoming/"
      target="_blank"
      rel="noopener noreferrer"
    >
      <h3 className="text-xl font-bold text-white hover:underline">
        COVID-19 & Upcoming Awareness
      </h3>
    </a>
    <div className="flex items-center space-x-2 mt-2 mb-3">
      <div className="w-4 h-4 rounded-full bg-purple-500"></div>
      <div className="w-4 h-4 rounded-full bg-green-500"></div>
    </div>
    <p className="text-gray-400 text-sm">
      ‣ A web-based COVID-19 platform that provides real-time case data and detailed reports.
      <br />
      ‣ It also spreads awareness through safety guidelines, symptoms, and prevention tips.
    </p>
  </div>
</div>


              {/* Project 2 */}
              <div className="group cursor-pointer">
  <a
    href="https://realtime-chat-app-0pir.onrender.com/"
    target="_blank"
    rel="noopener noreferrer"
  >
    <div className="relative overflow-hidden rounded-lg">
      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70 z-10"></div>
      <Image
        src="/chat2.png?height=300&width=400"
        alt="Real-Time Chat Application"
        width={400}
        height={300}
        className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
      />
    </div>
  </a>

  <div className="mt-4">
    <a
      href="https://realtime-chat-app-0pir.onrender.com/"
      target="_blank"
      rel="noopener noreferrer"
    >
      <h3 className="text-xl text-white hover:underline">
        Real-Time Chat Application
      </h3>
    </a>
    <div className="flex items-center space-x-2 mt-2 mb-3">
      <div className="w-4 h-4 rounded-full bg-purple-500"></div>
      <div className="w-4 h-4 rounded-full bg-blue-500"></div>
    </div>
    <p className="text-gray-400 text-sm">
      ‣ Built a real-time chat app using Socket.io and Node.js for instant messaging.
      <br />
      ‣ Chat with anyone, anywhere — messages delivered instantly with real-time updates.
    </p>
  </div>
</div>


              {/* Project 3 */}
<div className="group">
  <a 
    href="https://sandeep-password-generator.netlify.app/" 
    target="_blank" 
    rel="noopener noreferrer"
    className="block"
  >
    <div className="relative overflow-hidden rounded-lg">
      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70 z-10"></div>
      <Image
        src="/password_gen.png?height=300&width=400"
        alt="Password Generator"
        width={400}
        height={300}
        className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
      />
    </div>
    <div className="mt-4">
      <h3 className="text-xl text-white hover:underline">Password Generator</h3>
    </div>
  </a>

  <div className="flex items-center space-x-2 mt-2 mb-3">
    <div className="w-4 h-4 rounded-full bg-purple-500"></div>
    <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
  </div>

  <p className="text-gray-400 text-sm">
    ‣ A lightweight password generator that creates secure and random passwords with a single click.
    <br />
    ‣ Built using JavaScript and HTML/CSS, it supports custom password lengths and includes uppercase, lowercase, numbers, and special characters.
  </p>
</div>


              {/* Project 4 */}
              <div className="group">
                <div className="relative overflow-hidden rounded-lg">
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70 z-10"></div>
                  <Image
                    src="/portfolio.png?height=300&width=400"
                    alt="Image Filter App Using CV"
                    width={400}
                    height={300}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <div className="mt-4">
                  <h3 className="text-xl font-bold text-white">My Responsive Portfolio</h3>
                  <div className="flex items-center space-x-2 mt-2 mb-3">
                    <div className="w-4 h-4 rounded-full bg-purple-500"></div>
                    <div className="w-4 h-4 rounded-full bg-green-500"></div>
                  </div>
                  <p className="text-gray-400 text-sm">
                   ‣ With a strong foundation in web development, I create intuitive and efficient digital products. <br/>
                    ‣ Each project reflects a step forward in my journey as a developer
                  </p>
                </div>
              </div>

              {/* Project 5 */}
              <div className="group">
                <div className="relative overflow-hidden rounded-lg">
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70 z-10"></div>
                  <Image
                    src="/place-holder.jpg?height=300&width=400"
                    alt=""
                    width={400}
                    height={300}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <div className="mt-4">
                  <h3 className="text-xl font-bold text-white">building........</h3>
                  <div className="flex items-center space-x-2 mt-2 mb-3">
                    <div className="w-4 h-4 rounded-full bg-purple-500"></div>
                    <div className="w-4 h-4 rounded-full bg-blue-500"></div>
                  </div>
                  <p className="text-gray-400 text-sm">
                    .....................................................................
                  </p>
                </div>
              </div>
            </div>

            {/* More Projects on GitHub */}
            <div className="mt-20 text-center">
              <h3 className="text-3xl font-bold mb-4">
                More projects on <span className="text-purple-400">Github</span>
              </h3>
              <p className="text-gray-300 text-lg mb-8">I love to Build Responsive Web Application </p>
              <Button
                className="bg-purple-500 hover:bg-purple-600 text-white px-8 py-3 rounded-md text-lg font-semibold"
                onClick={() => window.open("https://github.com/Sandeepji-5", "_blank")}
              >
                <Github className="w-5 h-5 mr-2" />
                GITHUB
              </Button>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 relative overflow-hidden">
          {/* Background Text */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="text-gray-800 text-[12rem] md:text-[16rem] lg:text-[20rem] font-bold opacity-10 select-none">
              Contact
            </span>
          </div>

          <div className="container mx-auto px-6 relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">Contact Me</h2>
              <p className="text-gray-400 text-lg">Below are the details to reach out to me!</p>
            </div>

            {/* Contact Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              {/* Address */}
              <div className="text-center">
                <div className="w-20 h-20 bg-gray-800/50 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4 hover:bg-purple-600 transition-colors duration-300">
                  <MapPin className="w-8 h-8 text-purple-400" />
                </div>
                <h3 className="text-white font-semibold mb-2 uppercase tracking-wider text-sm">ADDRESS</h3>
                <p className="text-gray-400   hover:text-purple-400 transition-colors cursor-pointer">Gorakhpur, India</p>
              </div>

              {/* Contact Number */}
              <div className="text-center">
                <div className="w-20 h-20 bg-gray-800/50 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4 hover:bg-purple-600 transition-colors duration-300">
                  <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <h3 className="text-white font-semibold mb-2 uppercase tracking-wider text-sm">CONTACT NUMBER</h3>
                <p className="text-gray-400  hover:text-purple-400 transition-colors cursor-pointer">+91-7390839748</p>
              </div>

              {/* Email Address */}
          <div className="text-center">
  <a
    href="mailto:sandeepvishwakarmaglp5@gmail.com"
    className="inline-block"
  >
    <div className="w-20 h-20 bg-gray-800/50 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4 hover:bg-purple-600 transition-colors duration-300 cursor-pointer">
      <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
        />
      </svg>
    </div>
  </a>

  <h3 className="text-white font-semibold mb-2 uppercase tracking-wider text-sm">EMAIL ADDRESS</h3>

  <a
    href="mailto:sandeepvishwakarmaglp5@gmail.com"
    className="text-gray-400 hover:text-purple-400 transition-colors cursor-pointer"
  >
    sandeepvishwakarmaglp5@gmail.com
  </a>
</div>


              {/* Resume */}
          <div className="text-center">
  <a
    href="https://drive.google.com/file/d/1GtgfcayqQoXCIQDMDCqZP4x_1KfxzRxR/view?usp=sharing"
    target="_blank"
    rel="noopener noreferrer"
  >
    <div className="w-20 h-20 bg-gray-800/50 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4 hover:bg-purple-600 transition-colors duration-300 cursor-pointer">
      <Download className="w-8 h-8 text-purple-400" />
    </div>
    <h3 className="text-white font-semibold mb-2 uppercase tracking-wider text-sm">RESUME</h3>
    <p className="text-gray-400 hover:text-purple-400 transition-colors">Download</p>
  </a>
</div>

            </div>

            {/* Have a Question Section */}
            <div className="text-center mb-12">
              <h3 className="text-2xl font-bold text-white mb-6">Have a Question?</h3>
              <Button
                className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-full text-lg font-semibold"
                onClick={() => window.open("https://forms.gle/Q2q51kx9w4oRTkSAA", "_blank")}
              >
                CLICK HERE
              </Button>
            </div>

            {/* Social Media Links */}
            <div className="text-center">
              <p className="text-gray-400 mb-6">Find me on</p>
              <div className="flex justify-center space-x-4">
                {/* Telegram */}
                <div className="w-12 h-12 bg-gray-800/50 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-purple-600 transition-colors duration-300 cursor-pointer">
                  <svg className="w-6 h-6 text-purple-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                  </svg>
                </div>

                {/* LinkedIn */}
                <div
                  className="w-12 h-12 bg-gray-800/50 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-purple-600 transition-colors duration-300 cursor-pointer"
                  onClick={() => window.open("https://www.linkedin.com/in/sandy108/", "_blank")}
                >
                  <Linkedin className="w-6 h-6 text-purple-400" />
                </div>

                {/* Facebook */}
                <div className="w-12 h-12 bg-gray-800/50 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-purple-600 transition-colors duration-300 cursor-pointer">
                  <svg className="w-6 h-6 text-purple-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </div>

                {/* Instagram */}
                <div className="w-12 h-12 bg-gray-800/50 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-purple-600 transition-colors duration-300 cursor-pointer">
                  <svg className="w-6 h-6 text-purple-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.689-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </div>

                {/* GitHub */}
                <div
                  className="w-12 h-12 bg-gray-800/50 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-purple-600 transition-colors duration-300 cursor-pointer"
                  onClick={() => window.open("https://github.com/Sandeepji-5", "_blank")}
                >
                  <Github className="w-6 h-6 text-purple-400" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 border-t border-gray-800/50 backdrop-blur-sm">
          <p className="text-gray-400 right-20 text-center ">
  ©️ 2025 <span className="transition-colors duration-300 hover:text-white font-semibold">Sandeep Vishwakarma</span>. All rights reserved.
</p>

        </footer>

        {/* Scroll To Top Button */}
        <ScrollToTop />
      </div>
    </div>
  )
}

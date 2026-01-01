'use client'
import { motion, AnimatePresence } from 'motion/react'
import { Magnetic } from '@/components/ui/magnetic'
import { useState, useEffect, useRef } from 'react'
import { 
  Globe, 
  Sparkles, 
  Rocket, 
  Users, 
  Target,
  Heart,
  TrendingUp,
  Lightbulb,
  Code,
  Award,
  Zap,
  BarChart3,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  Maximize,
  Minimize
} from 'lucide-react'


const goals = [
  {
    icon: Globe,
    title: 'Global Impact',
    description: 'Making stuff that actually matters, not just another app that gets deleted after 5 minutes',
    bgColor: 'bg-white',
    textColor: 'text-black',
  },
  {
    icon: Sparkles,
    title: 'Innovation First',
    description: 'Trying weird things that might fail spectacularly, but sometimes they work and change everything',
    bgColor: 'bg-black',
    textColor: 'text-white',
  },
  {
    icon: Users,
    title: 'Human-Centered',
    description: 'Building for real people with real problems, not imaginary users who love every feature',
    bgColor: 'bg-white',
    textColor: 'text-black',
  },
  {
    icon: Rocket,
    title: 'Scale & Growth',
    description: 'Helping companies grow without turning into the corporate monster from your nightmares',
    bgColor: 'bg-black',
    textColor: 'text-white',
  },
  {
    icon: Target,
    title: 'Product Design Excellence',
    description: 'Making things that don\'t make you want to throw your laptop out the window',
    bgColor: 'bg-white',
    textColor: 'text-black',
  },
  {
    icon: Heart,
    title: 'Customer Satisfaction',
    description: 'Actually caring if people like what we built, not just shipping and hoping for the best',
    bgColor: 'bg-black',
    textColor: 'text-white',
  },
  {
    icon: TrendingUp,
    title: 'Company Scaling',
    description: 'Growing from "three people in a garage" to "actual business" without losing your soul',
    bgColor: 'bg-white',
    textColor: 'text-black',
  },
  {
    icon: Lightbulb,
    title: 'Innovation',
    description: 'Stealing good ideas, making them better, and pretending we thought of them first',
    bgColor: 'bg-black',
    textColor: 'text-white',
  },
  {
    icon: Code,
    title: 'Technical Excellence',
    description: 'Writing code that future you won\'t hate past you for writing',
    bgColor: 'bg-white',
    textColor: 'text-black',
  },
  {
    icon: Award,
    title: 'Quality First',
    description: 'Not shipping broken stuff just because the deadline said so (most of the time)',
    bgColor: 'bg-black',
    textColor: 'text-white',
  },
  {
    icon: Zap,
    title: 'Speed & Performance',
    description: 'Making things fast enough that people don\'t have time to get distracted and leave',
    bgColor: 'bg-white',
    textColor: 'text-black',
  },
  {
    icon: BarChart3,
    title: 'Data-Driven Decisions',
    description: 'Using numbers to make choices instead of guessing and hoping we\'re right',
    bgColor: 'bg-black',
    textColor: 'text-white',
  },
]


// Slideshow component
function Slideshow({ items }: { items: typeof goals }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [direction, setDirection] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isPlaying) return

    const interval = setInterval(() => {
      setDirection(1)
      setCurrentIndex((prev) => (prev + 1) % items.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isPlaying, items.length])

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    document.addEventListener('fullscreenchange', handleFullscreenChange)
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange)
  }, [])

  const toggleFullscreen = async () => {
    if (!containerRef.current) return

    try {
      if (!document.fullscreenElement) {
        await containerRef.current.requestFullscreen()
        setIsFullscreen(true)
      } else {
        await document.exitFullscreen()
        setIsFullscreen(false)
      }
    } catch (error) {
      console.error('Error toggling fullscreen:', error)
    }
  }

  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1)
    setCurrentIndex(index)
  }

  const goToPrevious = () => {
    setDirection(-1)
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length)
  }

  const goToNext = () => {
    setDirection(1)
    setCurrentIndex((prev) => (prev + 1) % items.length)
  }

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
    }),
  }

  return (
    <div ref={containerRef} className="relative h-screen w-full">
      {/* Slideshow Container */}
      <div className="relative h-full w-full overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'spring', stiffness: 300, damping: 30 },
              opacity: { duration: 0.3 },
              scale: { duration: 0.3 },
            }}
            className="absolute inset-0"
          >
            {(() => {
              const item = items[currentIndex]
              return (
                <div
                  className={`relative h-full w-full ${item.bgColor} ${item.textColor}`}
                >
                  <div className="relative z-10 flex h-full flex-col justify-center px-8 md:px-16 lg:px-24">
                    <motion.h3
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="mb-4 text-4xl font-bold md:text-5xl lg:text-7xl"
                    >
                      {item.title}
                    </motion.h3>
                    <motion.p
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="max-w-3xl text-lg md:text-2xl lg:text-3xl"
                    >
                      {item.description}
                    </motion.p>
                  </div>
                </div>
              )
            })()}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Controls */}
      <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 items-center gap-4">
        <Magnetic springOptions={{ bounce: 0.2 }} intensity={0.3}>
          <button
            onClick={goToPrevious}
            className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-black bg-white text-black transition-colors hover:bg-black hover:text-white dark:border-white dark:bg-black dark:text-white dark:hover:bg-white dark:hover:text-black"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
        </Magnetic>

        <Magnetic springOptions={{ bounce: 0.2 }} intensity={0.3}>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-black bg-white text-black transition-colors hover:bg-black hover:text-white dark:border-white dark:bg-black dark:text-white dark:hover:bg-white dark:hover:text-black"
            aria-label={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
          >
            {isPlaying ? (
              <Pause className="h-5 w-5" />
            ) : (
              <Play className="h-5 w-5" />
            )}
          </button>
        </Magnetic>

        <Magnetic springOptions={{ bounce: 0.2 }} intensity={0.3}>
          <button
            onClick={goToNext}
            className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-black bg-white text-black transition-colors hover:bg-black hover:text-white dark:border-white dark:bg-black dark:text-white dark:hover:bg-white dark:hover:text-black"
            aria-label="Next slide"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </Magnetic>

        <Magnetic springOptions={{ bounce: 0.2 }} intensity={0.3}>
          <button
            onClick={toggleFullscreen}
            className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-black bg-white text-black transition-colors hover:bg-black hover:text-white dark:border-white dark:bg-black dark:text-white dark:hover:bg-white dark:hover:text-black"
            aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
          >
            {isFullscreen ? (
              <Minimize className="h-5 w-5" />
            ) : (
              <Maximize className="h-5 w-5" />
            )}
          </button>
        </Magnetic>
      </div>

      {/* Dots Indicator */}
      <div className="absolute bottom-24 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2">
        {items.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className="group relative"
            aria-label={`Go to slide ${index + 1}`}
          >
            <motion.div
              className={`h-2 rounded-full transition-all ${
                index === currentIndex
                  ? 'w-8 bg-black dark:bg-white'
                  : 'w-2 bg-black/30 dark:bg-white/30 group-hover:bg-black/60 dark:group-hover:bg-white/60'
              }`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            />
          </button>
        ))}
      </div>
    </div>
  )
}

export default function FutureWrapped2026() {
  return (
    <main className="h-screen w-full overflow-hidden">
      <Slideshow items={goals} />
    </main>
  )
}


// src/pages/misc/Landing.jsx
import { Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';

// Typing Animation Component
const TypingAnimation = ({ text, speed = 100 }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!isDeleting && currentIndex < text.length) {
      // Typing
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);
      return () => clearTimeout(timeout);
    } else if (!isDeleting && currentIndex === text.length) {
      // Pause at the end, then start deleting
      const timeout = setTimeout(() => {
        setIsDeleting(true);
      }, 2000); // Wait 2 seconds before deleting
      return () => clearTimeout(timeout);
    } else if (isDeleting && displayText.length > 0) {
      // Deleting
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev.slice(0, -1));
      }, speed / 2); // Delete faster than typing
      return () => clearTimeout(timeout);
    } else if (isDeleting && displayText.length === 0) {
      // Reset for next cycle
      setIsDeleting(false);
      setCurrentIndex(0);
    }
  }, [currentIndex, text, speed, isDeleting, displayText]);

  return (
    <span className="inline-block">
      {displayText}
      <span className="animate-pulse">|</span>
    </span>
  );
};

// Animated Counter Component
const AnimatedCounter = ({ end, duration = 2000, suffix = "", prefix = "", decimals = 0 }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const counterRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTime = null;
    const startValue = 0;

    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentCount = startValue + (end - startValue) * easeOutQuart;
      
      setCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible, end, duration]);

  const formatNumber = (num) => {
    if (decimals > 0) {
      return num.toFixed(decimals);
    }
    return Math.floor(num).toLocaleString();
  };

  return (
    <span ref={counterRef} className="inline-block">
      {prefix}{formatNumber(count)}{suffix}
    </span>
  );
};

// Smooth Parallax Component with optimized performance
const ParallaxElement = ({ children, speed = 0.5, className = "", direction = "vertical" }) => {
  const [offset, setOffset] = useState(0);
  const elementRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    let ticking = false;

    const updateTransform = () => {
      if (elementRef.current) {
        const scrollY = window.pageYOffset;
        const newOffset = scrollY * speed;
        setOffset(newOffset);
      }
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        rafRef.current = requestAnimationFrame(updateTransform);
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [speed]);

  const getTransform = () => {
    if (direction === "horizontal") {
      return `translateX(${offset}px)`;
    } else if (direction === "both") {
      return `translate(${offset * 0.5}px, ${offset}px)`;
    } else {
      return `translateY(${offset}px)`;
    }
  };

  return (
    <div 
      ref={elementRef}
      className={`${className} will-change-transform`}
      style={{ 
        transform: getTransform(),
        transition: 'transform 0.1s ease-out'
      }}
    >
      {children}
    </div>
  );
};

// Custom ExamVolt Logo with text and icon
const Logo = () => (
  <div className="flex items-center gap-3">
    <div className="relative">
      <span className="text-2xl">⚡</span>
      <div className="absolute -inset-1 bg-gradient-to-r from-orange-400 to-blue-500 rounded-full blur opacity-30"></div>
    </div>
    <div className="flex items-center">
      <span className="text-2xl font-bold text-white">Exam</span>
      <span className="text-2xl font-bold text-orange-500">Volt</span>
    </div>
  </div>
);

function Navbar() {
  return (
    <header className="sticky top-0 z-30 bg-gradient-to-r from-[#1E88E5] to-[#7B1FA2] shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity duration-200">
            <Logo />
            {/* <span className="text-lg font-semibold text-white tracking-wide ml-2">ExammVolt</span> */}
          </Link>
        </div>
        <ul className="hidden md:flex gap-8 text-base font-medium">
          <li><a href="#" className="hover:text-[#2DD4BF] text-white transition-colors duration-200">Solutions</a></li>
          <li><a href="#" className="hover:text-[#2DD4BF] text-white transition-colors duration-200">Success Stories</a></li>
          <li><a href="#" className="hover:text-[#2DD4BF] text-white transition-colors duration-200">Blog</a></li>
          <li><a href="#" className="hover:text-[#2DD4BF] text-white transition-colors duration-200">About Us</a></li>
          <li><a href="#" className="hover:text-[#2DD4BF] text-white transition-colors duration-200">Contact Us</a></li>
        </ul>
        <div className="flex gap-3 ml-6">
          <Link to="/register" className="px-6 py-2 rounded-lg bg-white text-[#1E88E5] font-semibold shadow-md hover:bg-[#2DD4BF] hover:text-white transition-all duration-200">Register</Link>
          <Link to="/login" className="px-6 py-2 rounded-lg bg-[#2DD4BF] text-white font-semibold shadow-md hover:bg-white hover:text-[#1E88E5] transition-all duration-200">Login</Link>
        </div>
      </div>
    </header>
  );
}

function Hero() {

  return (
    <section className="relative min-h-screen flex justify-center text-center pt-48 overflow-hidden">
      {/* Smooth Parallax Background Layers */}
      <ParallaxElement speed={0.6} className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=1500&q=80"
          alt="Hero background"
          className="w-full h-full object-cover scale-110"
        />
      </ParallaxElement>
      
      <ParallaxElement speed={0.2} className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1E88E5]/90 to-[#7B1FA2]/80 animate-gradient-x" />
      </ParallaxElement>

      {/* Smooth Parallax Floating Elements */}
      <ParallaxElement speed={0.8} className="absolute inset-0 z-1 pointer-events-none">
        <div className="absolute top-20 left-20 w-8 h-8 bg-white/30 rounded-full animate-pulse hover:scale-200 transition-transform duration-300" style={{ animationDuration: '4s' }}></div>
        <div className="absolute top-40 right-32 w-6 h-6 bg-orange-400/40 rounded-full animate-pulse hover:scale-250 transition-transform duration-300" style={{ animationDuration: '6s' }}></div>
        <div className="absolute bottom-40 left-32 w-6 h-6 bg-blue-400/35 rounded-full animate-pulse hover:scale-200 transition-transform duration-300" style={{ animationDuration: '5s' }}></div>
        <div className="absolute top-1/2 left-1/3 w-4 h-4 bg-purple-400/35 rounded-full animate-pulse hover:scale-250 transition-transform duration-300" style={{ animationDuration: '7s' }}></div>
        <div className="absolute top-1/4 right-1/4 w-10 h-10 bg-yellow-400/30 rounded-full animate-pulse hover:scale-200 transition-transform duration-300" style={{ animationDuration: '3s' }}></div>
        <div className="absolute bottom-1/3 right-1/3 w-4 h-4 bg-cyan-400/30 rounded-full animate-pulse hover:scale-250 transition-transform duration-300" style={{ animationDuration: '8s' }}></div>
      </ParallaxElement>

      {/* Smooth Parallax Background Shapes */}
      <ParallaxElement speed={1.0} className="absolute inset-0 z-1 pointer-events-none">
        <div className="absolute top-10 left-10 w-60 h-60 bg-gradient-to-br from-blue-400/15 to-purple-500/15 rounded-full animate-spin hover:scale-150 transition-transform duration-500" style={{ animationDuration: '30s' }}></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-gradient-to-br from-orange-400/15 to-blue-500/15 rounded-full animate-spin hover:scale-150 transition-transform duration-500" style={{ animationDuration: '25s', animationDirection: 'reverse' }}></div>
        <div className="absolute top-1/3 right-1/4 w-36 h-36 bg-gradient-to-br from-purple-400/15 to-orange-500/15 rounded-full animate-spin hover:scale-175 transition-transform duration-500" style={{ animationDuration: '35s' }}></div>
        <div className="absolute bottom-1/4 left-1/4 w-42 h-42 bg-gradient-to-br from-green-400/12 to-blue-500/12 rounded-full animate-spin hover:scale-150 transition-transform duration-500" style={{ animationDuration: '40s', animationDirection: 'reverse' }}></div>
      </ParallaxElement>

      {/* Smooth Parallax Animated Lines */}
      <ParallaxElement speed={1.2} className="absolute inset-0 z-1 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-48 h-1 bg-gradient-to-r from-transparent via-orange-400/40 to-transparent animate-pulse" style={{ animationDuration: '4s' }}></div>
        <div className="absolute bottom-1/3 right-0 w-36 h-1 bg-gradient-to-l from-transparent via-blue-400/40 to-transparent animate-pulse" style={{ animationDuration: '6s' }}></div>
        <div className="absolute top-1/2 left-1/4 w-32 h-1 bg-gradient-to-r from-transparent via-purple-400/35 to-transparent animate-pulse" style={{ animationDuration: '5s' }}></div>
        <div className="absolute top-1/3 right-1/3 w-40 h-1 bg-gradient-to-l from-transparent via-yellow-400/30 to-transparent animate-pulse" style={{ animationDuration: '7s' }}></div>
      </ParallaxElement>

      {/* Smooth Parallax Floating Icons */}
      <ParallaxElement speed={1.4} className="absolute inset-0 z-1 pointer-events-none">
        <div className="absolute top-1/3 left-1/8 text-3xl opacity-25 animate-bounce" style={{ animationDuration: '5s', animationDelay: '2s' }}>⚡</div>
        <div className="absolute bottom-1/3 right-1/8 text-3xl opacity-25 animate-bounce" style={{ animationDuration: '3.5s', animationDelay: '0.5s' }}>🔒</div>
        <div className="absolute top-1/2 left-1/2 text-3xl opacity-20 animate-bounce" style={{ animationDuration: '6s', animationDelay: '1.5s' }}>📈</div>
        <div className="absolute bottom-1/2 right-1/2 text-3xl opacity-20 animate-bounce" style={{ animationDuration: '4.5s', animationDelay: '0.8s' }}>🛡️</div>
      </ParallaxElement>

      {/* Smooth Parallax Geometric Shapes */}
      <ParallaxElement speed={0.9} direction="both" className="absolute inset-0 z-1 pointer-events-none">
        <div className="absolute top-20 right-20 w-16 h-16 bg-gradient-to-br from-orange-400/20 to-red-500/20 transform rotate-45 animate-pulse" style={{ animationDuration: '8s' }}></div>
        <div className="absolute bottom-32 left-40 w-12 h-12 bg-gradient-to-br from-blue-400/20 to-cyan-500/20 transform rotate-12 animate-pulse" style={{ animationDuration: '10s' }}></div>
        <div className="absolute top-1/2 right-1/3 w-20 h-20 bg-gradient-to-br from-purple-400/20 to-pink-500/20 transform rotate-30 animate-pulse" style={{ animationDuration: '12s' }}></div>
      </ParallaxElement>



      <div className="relative z-10 max-w-6xl mx-auto px-4 py-24 flex flex-col items-center">
        {/* Logo - No Interactions */}
        <div className="mb-12 -mt-16 w-full max-w-5xl">
          <div className="flex items-center gap-8 mb-8">
            <div className="relative">
              <span className="text-8xl">⚡</span>
              <div className="absolute -inset-4 bg-gradient-to-r from-orange-400 to-blue-500 rounded-full blur opacity-50"></div>
            </div>
            <div className="flex items-center">
              <span className="text-8xl font-bold text-white">Exam</span>
              <span className="text-8xl font-bold text-orange-400">Volt</span>
            </div>
          </div>
        </div>
        
        {/* Tagline with Subtle Effects - Centered */}
        <div className="relative group text-center mb-8">
          <h1 className="text-2xl sm:text-2xl lg:text-2xl font-bold text-white mb-6 drop-shadow-lg min-h-[2rem] transform transition-all duration-500 group-hover:scale-102 group-hover:translate-y-[-2px] cursor-pointer">
            <TypingAnimation text="Your Gateway to Smarter Assessments" speed={80} />
          </h1>
          {/* Subtle glow effect on hover */}
          <div className="absolute -inset-4 bg-gradient-to-r from-orange-400/10 to-blue-500/10 rounded-lg blur opacity-0 group-hover:opacity-100 transition-all duration-700 group-hover:scale-110"></div>
        </div>

        {/* Professional Action Buttons - Centered */}
        <div className="flex gap-6 mt-8 animate-fade-in-up">
          <Link to="/register" className="group relative px-8 py-4 bg-gradient-to-r from-orange-400 to-blue-500 text-white font-bold rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl overflow-hidden">
            <span className="relative z-10">Get Started</span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-orange-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </Link>
          <button className="group relative px-8 py-4 bg-white/20 backdrop-blur-sm border border-white/30 text-white font-bold rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl overflow-hidden">
            <span className="relative z-10">Learn More</span>
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        </div>

        {/* Subtle Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 group cursor-pointer">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center group-hover:border-white/60 transition-colors duration-300">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse group-hover:bg-white/80 transition-colors duration-300" style={{ animationDuration: '2s' }}></div>
          </div>
        </div>
      </div>

      {/* CSS for enhanced animations */}
      <style jsx>{`
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 20s ease infinite;
        }
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 1.5s ease-out;
        }
        .scale-102 {
          transform: scale(1.02);
        }
        .scale-150 {
          transform: scale(1.5);
        }
        .scale-175 {
          transform: scale(1.75);
        }
        .scale-200 {
          transform: scale(2);
        }
        .scale-250 {
          transform: scale(2.5);
        }
        .will-change-transform {
          will-change: transform;
        }
      `}</style>
    </section>
  );
}

function WhyCustomSolution() {
  return (
    <section className="py-20 bg-gradient-to-br from-[#F8FAFC] to-[#F1F5F9] relative overflow-hidden">
      {/* Smooth Parallax Background Elements */}
      <ParallaxElement speed={0.5} className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 right-10 w-48 h-48 bg-gradient-to-br from-blue-400/8 to-purple-500/8 rounded-full"></div>
        <div className="absolute bottom-20 left-20 w-36 h-36 bg-gradient-to-br from-orange-400/8 to-blue-500/8 rounded-full"></div>
        <div className="absolute top-1/3 left-1/3 w-32 h-32 bg-gradient-to-br from-purple-400/6 to-orange-500/6 rounded-full"></div>
        <div className="absolute bottom-1/3 right-1/3 w-40 h-40 bg-gradient-to-br from-green-400/5 to-blue-500/5 rounded-full"></div>
      </ParallaxElement>

      {/* Smooth Parallax Floating Elements */}
      <ParallaxElement speed={0.8} className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-6 h-6 bg-blue-400/20 rounded-full animate-pulse" style={{ animationDuration: '4s' }}></div>
        <div className="absolute bottom-1/4 left-1/4 w-4 h-4 bg-orange-400/25 rounded-full animate-pulse" style={{ animationDuration: '6s' }}></div>
        <div className="absolute top-1/2 right-1/6 w-5 h-5 bg-purple-400/20 rounded-full animate-pulse" style={{ animationDuration: '5s' }}></div>
      </ParallaxElement>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-[#1F2937] mb-6">
            Why Choose ExamVolt?
          </h2>
          <p className="text-xl text-[#6B7280] max-w-3xl mx-auto">
            Experience a comprehensive examination system designed for modern education and corporate training needs
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Features */}
          <div className="space-y-8">
            <div className="flex items-start gap-6 p-6 rounded-xl bg-white/60 backdrop-blur-sm border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-[#1E88E5] to-[#7B1FA2] rounded-lg flex items-center justify-center">
                <span className="text-2xl">📊</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#1E88E5] mb-2">Advanced Analytics & Reporting</h3>
                <p className="text-[#6B7280] leading-relaxed">
                  Get detailed insights into student performance, question analysis, and comprehensive reports to improve your examination strategies.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-6 p-6 rounded-xl bg-white/60 backdrop-blur-sm border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-[#2DD4BF] to-[#1E88E5] rounded-lg flex items-center justify-center">
                <span className="text-2xl">🔒</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#2DD4BF] mb-2">Secure & Anti-Cheating Features</h3>
                <p className="text-[#6B7280] leading-relaxed">
                  Browser lockdown, screen monitoring, and AI-powered proctoring ensure exam integrity and prevent malpractice.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-6 p-6 rounded-xl bg-white/60 backdrop-blur-sm border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-[#7B1FA2] to-[#2DD4BF] rounded-lg flex items-center justify-center">
                <span className="text-2xl">⚡</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#7B1FA2] mb-2">Real-time Assessment</h3>
                <p className="text-[#6B7280] leading-relaxed">
                  Instant grading, immediate feedback, and automated result generation for efficient examination management.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-6 p-6 rounded-xl bg-white/60 backdrop-blur-sm border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-[#1E88E5] to-[#2DD4BF] rounded-lg flex items-center justify-center">
                <span className="text-2xl">🎯</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#1E88E5] mb-2">Customizable Question Types</h3>
                <p className="text-[#6B7280] leading-relaxed">
                  Support for MCQs, essays, coding challenges, and multimedia questions to create comprehensive assessments.
                </p>
              </div>
            </div>

            <button className="w-full mt-8 px-8 py-4 rounded-xl bg-gradient-to-r from-[#1E88E5] to-[#7B1FA2] text-white font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
              Explore ExamVolt Features
            </button>
          </div>

          {/* Right: Stats & Integration */}
          <div className="space-y-8">
            {/* Stats */}
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="text-center p-6 rounded-xl bg-white/80 backdrop-blur-sm border border-white/20 shadow-lg">
                <div className="text-3xl font-bold text-[#1E88E5] mb-2">
                  <AnimatedCounter end={10000} suffix="+" duration={2500} />
                </div>
                <div className="text-[#6B7280] font-medium">Active Students</div>
              </div>
              <div className="text-center p-6 rounded-xl bg-white/80 backdrop-blur-sm border border-white/20 shadow-lg">
                <div className="text-3xl font-bold text-[#2DD4BF] mb-2">
                  <AnimatedCounter end={500} suffix="+" duration={2000} />
                </div>
                <div className="text-[#6B7280] font-medium">Exams Conducted</div>
              </div>
              <div className="text-center p-6 rounded-xl bg-white/80 backdrop-blur-sm border border-white/20 shadow-lg">
                <div className="text-3xl font-bold text-[#7B1FA2] mb-2">
                  <AnimatedCounter end={99.9} suffix="%" decimals={1} duration={3000} />
                </div>
                <div className="text-[#6B7280] font-medium">Uptime</div>
              </div>
              <div className="text-center p-6 rounded-xl bg-white/80 backdrop-blur-sm border border-white/20 shadow-lg">
                <div className="text-3xl font-bold text-[#1E88E5] mb-2">
                  <AnimatedCounter end={24} prefix="" suffix="/7" duration={1500} />
                </div>
                <div className="text-[#6B7280] font-medium">Support</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Offerings() {
  return (
    <section className="py-20 bg-gradient-to-br from-[#1E88E5]/95 to-[#7B1FA2]/90 relative overflow-hidden">
      {/* Smooth Parallax Background Pattern */}
      <ParallaxElement speed={0.4} className="absolute inset-0 opacity-15">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </ParallaxElement>

      {/* Smooth Parallax Floating Elements */}
      <ParallaxElement speed={0.7} className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 w-16 h-16 bg-white/10 rounded-full animate-pulse" style={{ animationDuration: '5s' }}></div>
        <div className="absolute bottom-40 right-40 w-12 h-12 bg-orange-400/15 rounded-full animate-pulse" style={{ animationDuration: '7s' }}></div>
        <div className="absolute top-1/2 left-1/3 w-8 h-8 bg-blue-400/12 rounded-full animate-pulse" style={{ animationDuration: '6s' }}></div>
        <div className="absolute bottom-1/3 right-1/4 w-10 h-10 bg-purple-400/10 rounded-full animate-pulse" style={{ animationDuration: '8s' }}></div>
      </ParallaxElement>

      {/* Smooth Parallax Geometric Shapes */}
      <ParallaxElement speed={0.9} direction="both" className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 right-1/4 w-20 h-20 bg-gradient-to-br from-orange-400/8 to-red-500/8 transform rotate-45"></div>
        <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-gradient-to-br from-blue-400/8 to-cyan-500/8 transform rotate-12"></div>
        <div className="absolute top-1/3 right-1/6 w-24 h-24 bg-gradient-to-br from-purple-400/6 to-pink-500/6 transform rotate-30"></div>
      </ParallaxElement>
      
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6 drop-shadow-lg">
            ExamVolt Assessment Platform
          </h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            Advanced online examination system with AI-powered proctoring and comprehensive analytics
          </p>
        </div>

        {/* Features in Left-Right Layout */}
        <div className="space-y-12">
          {/* Row 1: AI-Powered Proctoring & Instant Auto-Grading */}
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#2DD4BF] to-[#1E88E5] rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-500"></div>
              <div className="relative bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-[#2DD4BF] to-[#1E88E5] rounded-xl flex items-center justify-center">
                    <span className="text-3xl">🔒</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-[#1F2937] mb-3">AI-Powered Proctoring</h3>
                    <p className="text-[#6B7280] leading-relaxed text-lg">
                      Advanced monitoring and detection systems ensure exam integrity with real-time AI analysis.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#1E88E5] to-[#7B1FA2] rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-500"></div>
              <div className="relative bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-[#1E88E5] to-[#7B1FA2] rounded-xl flex items-center justify-center">
                    <span className="text-3xl">⚡</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-[#1F2937] mb-3">Instant Auto-Grading</h3>
                    <p className="text-[#6B7280] leading-relaxed text-lg">
                      Immediate results and feedback with automated grading for efficient assessment management.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Row 2: Performance Analytics & Smart Notifications */}
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#7B1FA2] to-[#2DD4BF] rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-500"></div>
              <div className="relative bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-[#7B1FA2] to-[#2DD4BF] rounded-xl flex items-center justify-center">
                    <span className="text-3xl">📈</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-[#1F2937] mb-3">Performance Analytics</h3>
                    <p className="text-[#6B7280] leading-relaxed text-lg">
                      Detailed insights and comprehensive reports to track student progress and exam performance.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#2DD4BF] to-[#7B1FA2] rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-500"></div>
              <div className="relative bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-[#2DD4BF] to-[#7B1FA2] rounded-xl flex items-center justify-center">
                    <span className="text-3xl">🔔</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-[#1F2937] mb-3">Smart Notifications</h3>
                    <p className="text-[#6B7280] leading-relaxed text-lg">
                      Automated alerts and reminders to keep students and administrators informed in real-time.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Row 3: Browser Lockdown & Comprehensive Reports */}
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#1E88E5] to-[#2DD4BF] rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-500"></div>
              <div className="relative bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-[#1E88E5] to-[#2DD4BF] rounded-xl flex items-center justify-center">
                    <span className="text-3xl">🛡️</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-[#1F2937] mb-3">Browser Lockdown</h3>
                    <p className="text-[#6B7280] leading-relaxed text-lg">
                      Secure exam environment with browser restrictions to prevent cheating and maintain integrity.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#7B1FA2] to-[#1E88E5] rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-500"></div>
              <div className="relative bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-[#7B1FA2] to-[#1E88E5] rounded-xl flex items-center justify-center">
                    <span className="text-3xl">📊</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-[#1F2937] mb-3">Comprehensive Reports</h3>
                    <p className="text-[#6B7280] leading-relaxed text-lg">
                      Detailed performance metrics and analytics to help improve examination strategies.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Button - Centered */}
        <div className="text-center mt-16">
          <button className="px-12 py-4 rounded-xl bg-gradient-to-r from-[#2DD4BF] to-[#1E88E5] text-white font-bold text-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 hover:from-[#1E88E5] hover:to-[#2DD4BF]">
            Get Started with ExamVolt
          </button>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <p className="text-white/80 mb-4 text-lg">Need a custom solution?</p>
          <button className="px-8 py-3 rounded-xl bg-white/20 backdrop-blur-sm border border-white/30 text-white font-semibold hover:bg-white/30 transition-all duration-300">
            Contact Our Team
          </button>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-[#1E88E4] text-white py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Logo />
          <span className="text-lg font-semibold tracking-wide ml-2">ExamVolt</span>
        </div>
        <div className="flex gap-6 text-white text-base">
          <a href="#" className="hover:underline">Solutions</a>
          <a href="#" className="hover:underline">Success Stories</a>
          <a href="#" className="hover:underline">Blog</a>
          <a href="#" className="hover:underline">About Us</a>
          <a href="#" className="hover:underline">Contact Us</a>
        </div>
      </div>
      <div className="text-center text-white text-sm mt-6 opacity-80">© 2025 ExamVolt.com. All rights reserved.</div>
    </footer>
  );
}

export default function Landing() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Mouse tracking for interactive effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="font-['Inter',system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif] bg-[#F9FAFB] min-h-screen flex flex-col relative overflow-hidden">
      {/* Global Parallax Elements - Available throughout the page */}
      <ParallaxElement speed={0.6} className="absolute top-20 left-20 w-8 h-8 bg-gradient-to-br from-blue-400/40 to-purple-500/40 rounded-full animate-pulse z-50" />
      <ParallaxElement speed={0.2} className="absolute top-40 right-32 w-6 h-6 bg-gradient-to-br from-purple-400/35 to-pink-500/35 rounded-full animate-pulse z-50" />
      <ParallaxElement speed={0.8} className="absolute bottom-40 left-32 w-7 h-7 bg-gradient-to-br from-cyan-400/30 to-blue-500/30 rounded-full animate-pulse z-50" />
      <ParallaxElement speed={1.0} className="absolute bottom-20 right-20 w-5 h-5 bg-gradient-to-br from-green-400/35 to-blue-500/35 rounded-full animate-pulse z-50" />
      <ParallaxElement speed={1.2} className="absolute top-1/3 left-1/4 w-4 h-4 bg-gradient-to-br from-yellow-400/30 to-orange-500/30 rounded-full animate-pulse z-50" />
      <ParallaxElement speed={1.4} className="absolute top-1/2 right-1/4 w-6 h-6 bg-gradient-to-br from-red-400/35 to-purple-500/35 rounded-full animate-pulse z-50" />
      <ParallaxElement speed={0.9} className="absolute bottom-1/3 right-1/3 w-5 h-5 bg-gradient-to-br from-indigo-400/30 to-cyan-500/30 rounded-full animate-pulse z-50" />
      <ParallaxElement speed={1.3} className="absolute top-1/4 right-1/6 w-3 h-3 bg-gradient-to-br from-pink-400/35 to-red-500/35 rounded-full animate-pulse z-50" />
      <ParallaxElement speed={1.1} className="absolute bottom-1/4 left-1/6 w-3 h-3 bg-gradient-to-br from-teal-400/30 to-green-500/30 rounded-full animate-pulse z-50" />
      <ParallaxElement speed={0.7} className="absolute top-2/3 left-1/3 w-4 h-4 bg-gradient-to-br from-orange-400/35 to-yellow-500/35 rounded-full animate-pulse z-50" />
      
      {/* Additional floating elements for more visual interest */}
      <ParallaxElement speed={0.5} className="absolute top-1/6 left-1/3 w-6 h-6 bg-gradient-to-br from-blue-300/40 to-indigo-500/40 rounded-lg animate-pulse z-50" />
      <ParallaxElement speed={1.5} className="absolute top-3/4 right-1/6 w-5 h-5 bg-gradient-to-br from-purple-300/35 to-pink-500/35 rounded-lg animate-pulse z-50" />
      <ParallaxElement speed={0.8} className="absolute bottom-1/6 right-1/3 w-4 h-4 bg-gradient-to-br from-green-300/30 to-teal-500/30 rounded-lg animate-pulse z-50" />
      <ParallaxElement speed={1.0} className="absolute top-1/2 left-1/6 w-7 h-7 bg-gradient-to-br from-red-300/35 to-orange-500/35 rounded-lg animate-pulse z-50" />
      
      {/* More visible elements with higher opacity */}
      <ParallaxElement speed={0.4} className="absolute top-32 left-1/2 w-10 h-10 bg-gradient-to-br from-blue-500/50 to-purple-600/50 rounded-full animate-pulse z-50" />
      <ParallaxElement speed={1.6} className="absolute top-96 right-1/3 w-8 h-8 bg-gradient-to-br from-orange-500/45 to-red-600/45 rounded-full animate-pulse z-50" />
      <ParallaxElement speed={0.3} className="absolute bottom-32 left-1/4 w-12 h-12 bg-gradient-to-br from-green-500/40 to-teal-600/40 rounded-full animate-pulse z-50" />
      <ParallaxElement speed={1.7} className="absolute bottom-96 right-1/4 w-9 h-9 bg-gradient-to-br from-purple-500/45 to-pink-600/45 rounded-full animate-pulse z-50" />
      
      {/* Mouse Follow Effect */}
      <div 
        className="absolute w-[600px] h-[600px] bg-gradient-to-r from-white/5 to-transparent rounded-full blur-3xl pointer-events-none transition-all duration-1000 ease-out z-10"
        style={{
          left: mousePosition.x - 300,
          top: mousePosition.y - 300,
          transform: 'translate(-50%, -50%)',
        }}
      />

      <Navbar />
      <Hero />
      <WhyCustomSolution />
      <Offerings />
      <Footer />
    </div>
  );
}
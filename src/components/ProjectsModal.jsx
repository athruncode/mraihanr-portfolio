import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const projects = [
  { 
    id: 1, category: "FRONT-END & UI/UX", name: "NCAGE Service Portal", 
    desc: ["Led the UI/UX design and front-end development.", "Digitized manual bureaucratic workflows into a structured portal.", "Translated high-fidelity Figma designs into responsive UI using Bootstrap 5."], 
    tech: "Bootstrap 5, Laravel Blade, Figma", 
    link: "https://www.figma.com/design/b0MVdQkuOh0cZ75x78wYMC/Website-Pelayanan-Kode-NCAGE?node-id=0-1&t=u8moP0g77l7cuufR-1", 
    images: ["/Projects - PUSKOD 1.svg", "/Projects - PUSKOD 2.svg"],
    mockupType: "desktop"
  },
  { 
    id: 2, category: "FRONT-END DEVELOPER", name: "Clinical Practice Monitoring", 
    desc: ["Developed a web-based information system for the Physiotherapy Study Program.", "Supported the management, monitoring, and documentation of clinical practice activities.", "Implemented UI, supported feature validation, and ensured workflow alignment."], 
    tech: "Web Development", 
    link: "https://www.figma.com/design/tciaz24akTfzrUZIxSdEj8/Aplikasi-Monitoring-Perkuliahan-Fisioterapi-UPNVJ?node-id=3013-22437&t=hSLOis8QQbX9Symi-1", 
    images: ["/Clininal Monitoring 1.svg", "/Clininal Monitoring 2.svg"],
    mockupType: "desktop"
  },
  { 
    id: 3, category: "UI/UX DESIGN", name: "CityList", 
    desc: ["Designed UI/UX for an AI-powered smart city web application.", "Created the design system, landing page, and responsive mockups.", "Awarded 3rd Place in IN-FEST 2025 National Web Dev Competition."], 
    tech: "Figma, Design System", 
    link: "https://www.figma.com/design/n8jGX5iqkAHNsEElk5KGVN/CityList?node-id=0-1&t=IviKscNmaPxscuGr-1", 
    images: ["/citylist 1.svg", "/citylist 2.svg"],
    mockupType: "desktop"
  },
  { 
    id: 4, category: "UI/UX DESIGN", name: "UniFind", 
    desc: ["Designed the visual identity and interactive prototypes.", "Created an app and IoT-based lost-and-found platform for campus environments."], 
    tech: "Figma, Interactive Prototyping", 
    link: "https://www.figma.com/design/ONnS3GJv8EzEXrnh9IHSL4/UniFind?node-id=0-1&t=XOvvRxPcaYttutGA-1", 
    images: ["/unifind.svg"],
    mockupType: "mobile"
  },
  { 
    id: 5, category: "UI/UX DESIGN", name: "Filancer", 
    desc: ["Led the end-to-end design process from user research to high-fidelity prototyping.", "Conducted usability testing to solve financial challenges for freelancers."], 
    tech: "Figma, User Research", 
    link: "https://medium.com/@mraihanramadhani/designing-smart-finance-solutions-for-freelancers-filancer-case-study-0b2f85171b1f", 
    images: ["/filancer.svg"],
    mockupType: "mobile"
  },
  { 
    id: 6, category: "UI/UX DESIGN", name: "PMI Bogor Hospital", 
    desc: ["Designed the user interface for a hospital information system.", "Collaborated as part of a final team project for System Analysis course."], 
    tech: "Figma, System Analysis", 
    link: "https://www.figma.com/design/bumvCjBxDSg9l1c0uoSSXH/Project_M.-Raihan-Ramadhani?node-id=1-8543&t=50sxFQkjkA6Lc4j2-1", 
    images: ["/PMI BOGOR REDESIGN 1.svg", "/PMI BOGOR REDESIGN 2.svg"],
    mockupType: "desktop"
  }
];

const modalVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.2 } }
};

export default function ProjectsModal({ isOpen, onClose }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState(null);

  const handleClose = () => {
    onClose();
    setTimeout(() => setCurrentIndex(0), 300);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      if (e.key === 'Escape') handleClose();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleNext = () => setCurrentIndex((prev) => (prev + 1) % projects.length);
  const handlePrev = () => setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);

  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;

    if (diff > 50) {
      handleNext(); // Swiped left -> Next
    } else if (diff < -50) {
      handlePrev(); // Swiped right -> Prev
    }
    setTouchStartX(null);
  };

  if (!isOpen) return null;
  const project = projects[currentIndex];

  return (
    <AnimatePresence>
      <motion.div
        key="projects-modal"
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="fixed inset-0 w-screen h-screen z-50 bg-[#050b1a] select-none overflow-hidden font-oswald"
      >
        {/* ── BACKGROUND ────────────────────────────────────────── */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute inset-0 bg-[#000820] opacity-80 mix-blend-multiply pointer-events-none" />
          <img 
              src="/Home Background.png" 
              alt="Background Texture" 
              className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-screen pointer-events-none"
          />
          {/* Floating glass triangles */}
          <motion.div 
            animate={{ y: [-20, 20, -20], rotate: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
            className="absolute top-[20%] left-[60%] w-32 h-32 bg-pink-500/10"
            style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}
          />
          <motion.div 
            animate={{ y: [20, -20, 20], rotate: [0, -15, 0] }}
            transition={{ repeat: Infinity, duration: 12, ease: "easeInOut" }}
            className="absolute top-[60%] left-[20%] w-48 h-48 bg-cyan-500/10"
            style={{ clipPath: 'polygon(0 40%, 100% 0, 80% 100%)' }}
          />
        </div>

        {/* ── TOP BANNER (z-20) ─────────────────────────────────── */}
        <div 
          className="absolute -top-[80px] md:-top-[150px] -left-[10vw] w-[120vw] h-[220px] md:h-[320px] bg-white -rotate-[4deg] z-20 shadow-[0_15px_35px_rgba(0,0,0,0.5)] border-b-[6px] border-[#ff0050] flex items-end justify-between pb-6 md:pb-10 px-[12vw] overflow-hidden"
        >
          {/* PREV Button */}
          <button 
            onClick={handlePrev} 
            className="text-2xl md:text-4xl font-black italic text-transparent [-webkit-text-stroke:1px_black] md:[-webkit-text-stroke:2px_black] hover:text-[#ff0050] transition-colors cursor-pointer shrink-0"
          >
            &lt; <span className="md:hidden">PREV</span><span className="hidden md:inline">PREVIOUS</span>
          </button>

          {/* Central Title Details */}
          <div className="flex flex-col items-center md:items-start justify-center flex-1 mx-4 md:mx-12 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div 
                key={project.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col items-center md:items-start text-center md:text-left w-full"
              >
                <span className="text-gray-400 font-semibold uppercase text-xs md:text-sm tracking-widest">
                  {project.category}
                </span>
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-black italic text-black leading-none whitespace-nowrap overflow-hidden text-ellipsis w-full">
                  {project.name}
                </h1>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* NEXT Button */}
          <button 
            onClick={handleNext} 
            className="text-2xl md:text-4xl font-black italic text-transparent [-webkit-text-stroke:1px_black] md:[-webkit-text-stroke:2px_black] hover:text-[#ff0050] transition-colors cursor-pointer shrink-0"
          >
            NEXT &gt;
          </button>
        </div>

        {/* ── MAIN CONTENT AREA (Scrollable on mobile if needed) ── */}
        <div className="absolute inset-0 w-full h-full overflow-y-auto overflow-x-hidden md:overflow-hidden z-10 flex flex-col md:flex-row">
          
          {/* BOTTOM LEFT DETAILS */}
          <div className="w-full md:w-[45%] h-full flex flex-col justify-end pb-24 md:pb-32 px-8 md:pl-24 pt-[30vh] md:pt-0 z-20">
            <h2 
              className="text-customCyan-400 font-bold italic text-3xl md:text-5xl mb-4 md:mb-6 tracking-wide drop-shadow-[0_0_15px_rgba(18,105,204,0.8)]"
            >
              PROJECT DETAILS
            </h2>
            
            <AnimatePresence mode="wait">
              <motion.div 
                key={project.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-black/20 backdrop-blur-sm p-4 md:p-6 rounded-lg border-l-4 border-customCyan-500 shadow-xl"
              >
                <ul className="text-white font-sans text-base md:text-xl leading-relaxed mb-4 md:mb-6 list-disc list-outside pl-5 marker:text-customCyan-400 space-y-2">
                  {project.desc.map((point, i) => (
                    <li key={i}>
                      <span className="opacity-90">{point}</span>
                    </li>
                  ))}
                </ul>
                <div className="text-white font-sans text-sm md:text-lg bg-customBlue-900/50 p-3 rounded border border-customBlue-500/30 inline-block mb-4">
                  <span className="font-bold text-customCyan-300 mr-2 uppercase tracking-wider">Tech Stack:</span> 
                  <span className="opacity-90">{project.tech}</span>
                </div>
                <div>
                  <a 
                    href={project.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-customCyan-500 text-darkBlack-900 font-bold font-oswald italic tracking-widest px-6 py-2 md:mt-2 inline-block skew-x-[-10deg] hover:bg-white hover:scale-105 transition-all drop-shadow-lg"
                  >
                    <span className="inline-block skew-x-[10deg]">VIEW PROJECT</span>
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* RIGHT SIDE VISUALS (Floating Mockups) */}
          <div className="w-full md:w-[55%] md:absolute md:top-1/4 md:right-0 h-[40vh] md:h-[60vh] z-10 flex items-center justify-center pointer-events-none mt-8 md:mt-0 mb-32 md:mb-0">
            <AnimatePresence mode="wait">
              <motion.div 
                key={project.id}
                initial={{ opacity: 0, scale: 0.9, filter: 'blur(5px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, scale: 0.9, filter: 'blur(5px)' }}
                transition={{ duration: 0.4 }}
                className="w-full h-full relative flex items-center justify-center"
              >
                {/* Continuous floating animation wrapper */}
                <motion.div 
                  animate={{ y: [-15, 15, -15] }} 
                  transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                  className="relative w-full h-full flex items-center justify-center px-4 md:px-0 scale-110 md:scale-125 origin-center"
                >
                  {project.images.length === 1 ? (
                    <img 
                      src={project.images[0]} 
                      alt={project.name}
                      className="w-[90%] md:w-[75%] max-h-full object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)]" 
                    />
                  ) : (
                    <>
                      <img 
                        src={project.images[0]} 
                        alt={`${project.name} 1`}
                        className="absolute w-[70%] md:w-[60%] object-contain -rotate-[8deg] -translate-x-8 md:-translate-x-20 drop-shadow-[0_15px_30px_rgba(0,0,0,0.5)] z-0 scale-95" 
                      />
                      <img 
                        src={project.images[1]} 
                        alt={`${project.name} 2`}
                        className="absolute w-[75%] md:w-[65%] object-contain rotate-[4deg] translate-x-4 md:translate-x-12 translate-y-6 md:translate-y-12 drop-shadow-[0_25px_50px_rgba(0,0,0,0.8)] z-10" 
                      />
                    </>
                  )}
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* ── ESC BACK BUTTON (top-left) ────────────────────── */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, type: 'spring', stiffness: 400, damping: 25 }}
          className="absolute top-6 left-6 md:top-8 md:left-10 z-50 bg-black/20 md:bg-transparent backdrop-blur-md md:backdrop-blur-none px-3 py-1.5 md:p-0 rounded-full md:rounded-none border border-white/10 md:border-transparent transition-all"
        >
          <div
            onClick={handleClose}
            className="flex items-center gap-2 md:gap-3 group cursor-pointer"
          >
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-white/30 flex items-center justify-center
                            group-hover:border-[#ff0050] group-hover:bg-[#ff0050] transition-colors bg-black/40 md:bg-black/20">
              <span className="text-white font-bold text-[10px] md:text-xs group-hover:text-white transition-colors">
                ESC
              </span>
            </div>
            <span className="text-white font-bold italic tracking-widest text-sm md:text-base group-hover:text-[#ff0050] transition-colors drop-shadow-md uppercase">
              BACK
            </span>
          </div>
        </motion.div>

      </motion.div>
    </AnimatePresence>
  );
}

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const experiences = [
  {
    id: 0,
    role: "UI/UX Designer Intern",
    company: "Pusat Kodifikasi Kemhan",
    date: "Jul 2025 - Aug 2025",
    type: "Work Experience",
    details: [
      "Led the UI/UX design and front-end development for the NCAGE Service Portal.",
      "Gained deep domain knowledge of the manual bureaucratic workflow by assisting with document validation.",
      "Translated high-fidelity Figma designs into a responsive web interface using Bootstrap 5 and Laravel Blade."
    ],
    images: ["/PUSKOD 1.png", "/PUSKOD 2.png"]
  },
  {
    id: 1,
    role: "UI/UX Design Student",
    company: "PT Impactbyte",
    date: "Sep 2024 - Dec 2024",
    type: "Bootcamp Experience",
    details: [
      "Conducted in-depth research to identify key pain points for freelancers.",
      "Led the end-to-end design process, from ideation to final high-fidelity design.",
      "Developed interactive prototypes for usability testing to validate and refine the design solution."
    ],
    images: ["/UI UX Design Student 1.png", "/UI UX Design Student 2.png"]
  },
  {
    id: 2,
    role: "Staff of UI/UX Division",
    company: "KSM Multimedia UPNVJ",
    date: "Feb 2025 - Jan 2026",
    type: "Organizational",
    details: [
      "Designed and developed a structured UI/UX learning syllabus and training materials.",
      "Created presentation slides, learning modules, and practical case studies.",
      "Mentored students by providing feedback, guidance, and project evaluation."
    ],
    images: ["/KSM 1.png", "/KSM 2.png"]
  },
  {
    id: 3,
    role: "Player of Valorant Division",
    company: "UKM Esports",
    date: "Feb 2024 - Feb 2025",
    type: "Organizational",
    details: [
      "Participated in scheduled tournaments.",
      "Took part in full team training sessions (mapping, scrims, & ranked).",
      "Prioritized maintaining a positive attitude at all times."
    ],
    images: ["/UKM ESPORT.jpg"]
  }
];

const modalVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.25 } },
  exit: { opacity: 0, transition: { duration: 0.2, delay: 0.1 } }
};

const listVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } }
};

const slotVariants = {
  hidden: { x: 80, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { type: 'spring', stiffness: 350, damping: 25 } }
};

export default function ExperienceModal({ isOpen, onClose }) {
  const [expandedId, setExpandedId] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  // Close when reopening
  const handleClose = () => {
    onClose();
    setTimeout(() => setExpandedId(null), 300);
  };

  // Listen for ESC key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="experience-modal"
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed inset-0 w-screen h-screen z-50 bg-[#051336] select-none overflow-hidden"
        >
          {/* ── BACKGROUND LAYER (z-0) ────────────────────────── */}
          <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            <img 
              src="/Home Background.png" 
              alt="Background"
              className="absolute inset-0 w-full h-full object-cover opacity-10 md:opacity-40 mix-blend-normal md:mix-blend-screen"
              draggable={false}
            />
            {/* Floating glass triangles */}
            <motion.div 
              animate={{ y: [-20, 20, -20], rotate: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
              className="absolute top-[20%] left-[60%] w-32 h-32 bg-pink-500/10 will-change-transform"
              style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}
            />
            <motion.div 
              animate={{ y: [20, -20, 20], rotate: [0, -15, 0] }}
              transition={{ repeat: Infinity, duration: 12, ease: "easeInOut" }}
              className="absolute top-[60%] left-[20%] w-48 h-48 bg-cyan-500/10 will-change-transform"
              style={{ clipPath: 'polygon(0 40%, 100% 0, 80% 100%)' }}
            />
          </div>

          {/* ── WATERMARK TEXT ────────────────────────────────── */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 flex justify-end items-start opacity-40">
            <span className="text-transparent [-webkit-text-stroke:2px_rgba(255,255,255,0.2)] text-[6rem] md:text-[10rem] lg:text-[13rem] -rotate-12 font-black italic font-oswald whitespace-nowrap select-none drop-shadow-md mt-16 mr-4 md:mt-24 md:mr-16">
              EXPERIENCES
            </span>
          </div>

          {/* ── SCROLLABLE CONTENT AREA ──────────────────────────── */}
          <div className="absolute inset-0 w-full h-full overflow-y-auto overflow-x-hidden">
            <div className="min-h-full flex flex-col justify-center items-center py-20 relative">

              {/* ── SLOTS CONTAINER (z-10) ────────────────────────── */}
              <motion.div
                variants={listVariants}
                initial="hidden"
                animate="visible"
                className="w-[85vw] max-w-5xl flex flex-col gap-1 z-10 relative mt-12"
              >
                {experiences.map((exp) => {
                  const isExpanded = expandedId === exp.id;

                  return (
                    <motion.div
                      key={exp.id}
                      variants={slotVariants}
                      onClick={() => setExpandedId(isExpanded ? null : exp.id)}
                      className={`
                    w-full flex flex-col relative overflow-hidden transition-all duration-300 font-oswald cursor-pointer group
                    ${isExpanded
                          ? 'bg-customBlue-500 shadow-[0_10px_30px_rgba(0,0,0,0.5)] z-20'
                          : 'bg-[#101b4d] hover:bg-customBlue-500 hover:-translate-x-2 z-10'}
                  `}
                      style={{
                        transform: isExpanded ? 'translateX(-16px)' : '',
                      }}
                    >

                      {/* Slot Header Area */}
                      <div className={`w-full flex relative transition-all duration-300 min-h-[5rem] md:min-h-0 ${isExpanded ? 'md:h-32 py-3 md:py-0' : 'md:h-24 py-3 md:py-0'}`}>
                        {/* Expanded State Decorators */}
                        {isExpanded && (
                          <>
                            {/* Pink accent line at the top */}
                            <div className="absolute top-0 left-0 w-full h-[6px] bg-pink-400 z-10" />
                            {/* White angled wedge top-left */}
                            <div
                              className="absolute top-0 left-0 w-16 h-16 bg-white z-20"
                              style={{ clipPath: 'polygon(0 0, 100% 0, 0 100%)' }}
                            />
                            {/* The number inside the wedge */}
                            <span className="absolute top-1 left-2 z-30 font-bold italic text-customBlue-600 text-2xl leading-none">
                              {exp.id + 1}
                            </span>
                          </>
                        )}

                        {/* Content Container */}
                        <div className="flex-1 flex flex-col md:flex-row md:items-center justify-center md:justify-between px-4 md:px-6 z-30 relative w-full h-full gap-2 md:gap-0">

                          {/* Top Row on Mobile / Left+Middle on Desktop */}
                          <div className="flex items-start md:items-center w-full md:w-auto">
                            {/* Left: Number (Inactive) */}
                            {!isExpanded && (
                              <div className="w-8 md:w-12 text-2xl md:text-4xl font-bold italic text-customBlue-200 opacity-50 group-hover:text-white group-hover:opacity-100 transition-colors mt-0 md:mt-0">
                                {exp.id + 1}
                              </div>
                            )}
                            {isExpanded && (
                              <div className="w-8 md:w-12" /> // spacer for the active wedge number
                            )}

                            {/* Middle: Role & Company */}
                            <div className={`flex-1 flex flex-col justify-center ml-2 md:ml-6 transition-colors ${isExpanded ? 'text-white' : 'text-customBlue-100 group-hover:text-white'}`}>
                              {isExpanded ? (
                                <div className="flex flex-col items-start gap-1">
                                  <div className="bg-darkBlack-900 text-white px-2 py-1 md:px-3 md:py-1 font-bold tracking-widest uppercase text-[0.65rem] md:text-sm inline-block shadow-md">
                                    {exp.company}
                                  </div>
                                  <h3 className="text-xl md:text-4xl font-bold tracking-wide italic leading-tight md:leading-none mt-1">
                                    {exp.role}
                                  </h3>
                                </div>
                              ) : (
                                <div className="flex flex-col justify-center">
                                  <h3 className="text-lg md:text-2xl font-bold tracking-wide italic leading-tight md:leading-none">
                                    {exp.role}
                                  </h3>
                                  <p className="text-[0.7rem] md:text-sm tracking-widest uppercase text-customBlue-300 font-medium group-hover:text-white/80 transition-colors mt-0 md:mt-0">
                                    {exp.company}
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Right: Date & Type */}
                          <div className={`flex flex-col items-start md:items-end text-left md:text-right ml-10 md:ml-0 transition-colors ${isExpanded ? 'text-white' : 'text-customBlue-200 group-hover:text-white'}`}>
                            <p className={`${isExpanded ? 'text-lg md:text-3xl drop-shadow-md' : 'text-base md:text-xl'} font-bold tracking-wider italic`}>
                              {exp.date}
                            </p>
                            <p className={`text-[0.65rem] md:text-sm tracking-widest uppercase mt-0 md:mt-1 transition-colors ${isExpanded ? 'text-white/90 font-medium' : 'text-customBlue-400 group-hover:text-white/80'}`}>
                              {exp.type}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Accordion Content Area (Details) */}
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                            className="overflow-hidden bg-[#0a1130] w-full"
                          >
                            <div className="px-16 py-6 md:px-24 md:py-8">
                              <ul className="border-l-2 border-pink-500 pl-6 space-y-3">
                                {exp.details.map((point, idx) => (
                                  <li key={idx} className="text-white/90 text-sm md:text-base font-sans tracking-wide leading-relaxed list-disc list-inside marker:text-customBlue-400">
                                    <span className="-ml-2">{point}</span>
                                  </li>
                                ))}
                              </ul>

                              {/* Image Gallery */}
                              {exp.images && exp.images.length > 0 && (
                                <div className="mt-6 pt-6 border-t border-white/10">
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {exp.images.map((imgSrc, imgIdx) => (
                                      <img
                                        key={imgIdx}
                                        src={imgSrc}
                                        alt={`${exp.company} Documentation ${imgIdx + 1}`}
                                        className="w-full aspect-video object-cover rounded-sm border border-white/20 grayscale-0 md:grayscale md:hover:grayscale-0 hover:border-customCyan-400 transition-all duration-300 shadow-md cursor-pointer"
                                        draggable={false}
                                        onClick={() => setSelectedImage(imgSrc)}
                                      />
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                    </motion.div>
                  );
                })}
              </motion.div>
            </div>
          </div>

          {/* ── BACK BUTTON (top-left) ──────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, type: 'spring', stiffness: 400, damping: 25 }}
            className="absolute top-6 left-6 md:top-8 md:left-10 z-50 bg-black/20 md:bg-transparent backdrop-blur-none md:backdrop-blur-none px-3 py-1.5 md:p-0 rounded-full md:rounded-none border border-white/10 md:border-transparent transition-all"
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
          {/* ── IMAGE LIGHTBOX OVERLAY ──────────────────────────── */}
          <AnimatePresence>
            {selectedImage && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedImage(null)}
                className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 cursor-pointer"
              >
                <motion.img
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  src={selectedImage}
                  alt="Enlarged documentation"
                  className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
                  onClick={(e) => e.stopPropagation()}
                />
                
                {/* Close Button */}
                <button
                  onClick={() => setSelectedImage(null)}
                  className="absolute top-6 right-6 md:top-10 md:right-10 w-10 h-10 bg-white/10 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-colors border border-white/20"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </motion.div>
            )}
          </AnimatePresence>

        </motion.div>
      )}
    </AnimatePresence>
  );
}

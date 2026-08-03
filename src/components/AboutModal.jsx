import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ───────────────────────── ANIMATION VARIANTS ───────────────────────── */
const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.25 } },
  exit: { opacity: 0, transition: { duration: 0.2, delay: 0.1 } },
};

const boxVariants = {
  hidden: { scale: 0.8, opacity: 0, y: 50 },
  visible: {
    scale: 1,
    opacity: 1,
    y: 0,
    transition: { type: 'spring', damping: 20, stiffness: 300 },
  },
  exit: {
    scale: 0.85,
    opacity: 0,
    y: 30,
    transition: { duration: 0.2 },
  },
};

const textLineVariants = {
  hidden: { x: 40, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { type: 'spring', stiffness: 400, damping: 25 },
  },
};

const titleVariants = {
  hidden: { x: -80, opacity: 0, skewX: 5 },
  visible: {
    x: 0,
    opacity: 1,
    skewX: 0,
    transition: { type: 'spring', stiffness: 350, damping: 22, delay: 0.15 },
  },
};

/* Page transition variants */
const pageVariants = {
  enter: { opacity: 0, x: 30 },
  center: {
    opacity: 1,
    x: 0,
    transition: { type: 'spring', stiffness: 400, damping: 28, staggerChildren: 0.06, delayChildren: 0.05 },
  },
  exit: { opacity: 0, x: -20, transition: { duration: 0.15 } },
};

/* ═══════════════════════════════════════════════════════════════
   ABOUT MODAL — Persona 3 Reload "Shuffle Time" dialog style
   ═══════════════════════════════════════════════════════════════ */
export default function AboutModal({ isOpen, onClose }) {
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = 2;

  const handleClose = () => {
    onClose();
    setTimeout(() => setCurrentPage(0), 300);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        /* ── OVERLAY ─────────────────────────────────────────────── */
        <motion.div
          key="about-overlay"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={handleClose}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#020617]/95 md:bg-[#020617]/80 backdrop-blur-none md:backdrop-blur-md overflow-hidden p-4 gap-4"
        >
          {/* ── TEXTURE OVERLAY ────────────────────────────────────── */}
          <div 
            className="absolute inset-0 pointer-events-none mix-blend-normal md:mix-blend-overlay opacity-10 md:opacity-40" 
            style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '4px 4px' }}
          ></div>

          {/* ── MAIN BOX ─────────────────────────────────────────── */}
          <motion.div
            variants={boxVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-5xl h-[85vh] md:h-[450px] relative z-10 flex flex-col md:block shadow-2xl overflow-hidden select-none"
            style={{
              background: '#020b24',
            }}
          >

            {/* ── LEFT ACCENT BLOCK (blue skewed) ────────────────── */}
            <div
              className="absolute md:absolute top-0 left-0 w-full md:w-[38%] h-[35%] md:h-full bg-customBlue-500 z-0"
              style={{
                clipPath: window.innerWidth < 768 ? 'polygon(0 0, 100% 0, 100% 85%, 0 100%)' : 'polygon(0 0, 100% 0, 82% 100%, 0 100%)',
              }}
            />

            {/* ── REHAN BIRU SILHOUETTE (behind photo frame) ─────── */}
            <motion.img
              src="/rehan biru.svg"
              alt="Character silhouette"
              draggable={false}
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 250, damping: 20, delay: 0.15 }}
              className="absolute top-0 md:bottom-0 left-2 md:left-2 h-[35%] md:h-[95%] w-auto object-contain
                         drop-shadow-xl z-[5] pointer-events-none opacity-50 md:opacity-100"
              style={{
                filter: 'drop-shadow(0 0 20px rgba(18, 105, 204, 0.4))',
              }}
            />

            {/* ── PHOTO inside white geometric frame ──────────── */}
            <div
              className="absolute top-0 left-0 w-full md:w-[38%] h-[35%] md:h-full z-[15] pointer-events-none flex justify-center md:block"
            >
              <div
                className="absolute inset-0 md:inset-0 w-[60%] md:w-full mx-auto md:mx-0 h-full"
                style={{
                  clipPath: window.innerWidth < 768 ? 'polygon(4% 8%, 96% 4%, 93% 92%, 8% 97%)' : 'polygon(8% 4%, 85% 2%, 78% 97%, 3% 95%)',
                  background: 'white',
                  padding: '3px',
                }}
              >
                <motion.img
                  src="/raihan-about.jpg"
                  alt="M. Raihan Photo"
                  draggable={false}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="w-full h-full object-cover"
                  style={{
                    clipPath: window.innerWidth < 768 ? 'polygon(4% 8%, 96% 4%, 93% 92%, 8% 97%)' : 'polygon(8% 4%, 85% 2%, 78% 97%, 3% 95%)',
                  }}
                />
              </div>
            </div>

            {/* ── "ABOUT" TITLE (top-left) ─────────────────────── */}
            <motion.div
              variants={titleVariants}
              initial="hidden"
              animate="visible"
              className="absolute z-20 pointer-events-none"
              style={{
                left: '16px',
                top: '16px',
                transform: 'skewX(-12deg) rotate(-2deg)',
              }}
            >
              {/* Outline layer (behind) */}
              <span
                className="absolute font-oswald font-bold italic leading-none select-none"
                style={{
                  fontSize: 'clamp(48px, 6vw, 80px)',
                  color: 'transparent',
                  WebkitTextStroke: '2px rgba(255, 255, 255, 0.6)',
                  left: '3px',
                  top: '3px',
                }}
              >
                ABOUT
              </span>
              {/* Solid layer (front) */}
              <span
                className="relative font-oswald font-bold italic leading-none select-none text-white"
                style={{
                  fontSize: 'clamp(48px, 6vw, 80px)',
                  textShadow: '3px 3px 0px rgba(0,0,0,0.4), 0 0 30px rgba(18, 105, 204, 0.3)',
                }}
              >
                ABOUT
              </span>
            </motion.div>

            {/* ── CONTENT AREA (right side, paginated) ─────────── */}
            <div
              className="relative md:absolute md:right-0 mt-[35vh] md:mt-0 h-[65%] md:h-full flex flex-col justify-start md:justify-center z-20 overflow-y-auto overflow-x-hidden md:overflow-visible pb-16 md:pb-0 scrollbar-hide"
              style={{
                width: window.innerWidth < 768 ? '100%' : '55%',
                paddingLeft: window.innerWidth < 768 ? '20px' : '40px',
                paddingRight: window.innerWidth < 768 ? '20px' : '48px',
                paddingTop: window.innerWidth < 768 ? '20px' : '0px',
              }}
            >
              <AnimatePresence mode="wait">
                {/* ── PAGE 0: Profile Summary ──────────────────────── */}
                {currentPage === 0 && (
                  <motion.div
                    key="page-0"
                    variants={pageVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                  >
                    <motion.h2
                      variants={textLineVariants}
                      className="font-oswald font-bold italic text-3xl md:text-4xl tracking-wide text-white mb-3"
                    >
                      M. Raihan Ramadhani
                    </motion.h2>

                    <motion.p
                      variants={textLineVariants}
                      className="text-white text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide font-oswald font-normal"
                    >
                      A recent Information Systems graduate with a strong focus on{' '}
                      <span className="text-customCyan-400 font-semibold">UI/UX Design</span> and{' '}
                      <span className="text-customCyan-400 font-semibold">digital product development</span>.
                    </motion.p>

                    <motion.p
                      variants={textLineVariants}
                      className="text-white/80 text-base md:text-lg lg:text-xl leading-relaxed tracking-wide font-oswald font-light mt-4"
                    >
                      Passionate about creating digital solutions that are intuitive, visually consistent,
                      and aligned with user needs.
                    </motion.p>

                    {/* Decorative tags */}
                    <motion.div variants={textLineVariants} className="flex gap-2 mt-5">
                      {['UI/UX', 'Frontend', 'Design Systems'].map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 text-xs font-oswald font-medium tracking-widest uppercase
                                     border border-customCyan-500/40 text-customCyan-400 rounded-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </motion.div>
                  </motion.div>
                )}

                {/* ── PAGE 1: Education ──────────────────────────── */}
                {currentPage === 1 && (
                  <motion.div
                    key="page-1"
                    variants={pageVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                  >
                    <motion.h2
                      variants={textLineVariants}
                      className="font-oswald font-bold italic text-2xl md:text-3xl tracking-wide text-white mb-1"
                    >
                      Universitas Pembangunan Nasional Veteran Jakarta
                    </motion.h2>

                    <motion.p
                      variants={textLineVariants}
                      className="text-customCyan-400 text-sm md:text-base font-oswald font-medium tracking-widest uppercase mb-5"
                    >
                      Bachelor of Information Systems &bull; Faculty of Computer Science
                    </motion.p>

                    {/* GPA highlight */}
                    <motion.div variants={textLineVariants} className="flex items-center gap-3 mb-5">
                      <span className="font-oswald font-bold text-customCyan-400 text-3xl md:text-4xl tracking-wide">
                        3.89
                      </span>
                      <span className="font-oswald text-white/50 text-sm tracking-widest uppercase">
                        / 4.00 CGPA
                      </span>
                    </motion.div>

                    <motion.p
                      variants={textLineVariants}
                      className="text-white/80 text-base md:text-lg leading-relaxed tracking-wide font-oswald font-light"
                    >
                      <span className="text-white/50 text-sm uppercase tracking-widest block mb-2">Relevant Coursework</span>
                      UI/UX Design, Human-Computer Interaction, Web Programming, System Analysis.
                    </motion.p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* ── CLOSE BUTTON (bottom-right, angular) ────────────── */}
            <motion.button
              initial={{ x: 30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5, type: 'spring', stiffness: 400, damping: 25 }}
              onClick={handleClose}
              className="absolute bottom-0 right-0 z-30 cursor-pointer
                         bg-customCyan-500 hover:bg-customCyan-400
                         transition-colors duration-200 group"
              style={{
                clipPath: 'polygon(20% 0, 100% 0, 100% 100%, 0 100%)',
                padding: '14px 32px 14px 48px',
              }}
            >
              <span className="font-oswald font-bold italic text-lg tracking-wider text-darkBlack-900
                              group-hover:scale-105 inline-flex items-center gap-2 transition-transform duration-150">
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                >
                  <line x1="6" y1="6" x2="18" y2="18" />
                  <line x1="18" y1="6" x2="6" y2="18" />
                </svg>
                CLOSE
              </span>
            </motion.button>

            {/* ── TOP-RIGHT DECORATIVE ACCENT ─────────────────────── */}
            <div
              className="absolute top-0 right-0 w-24 h-1 bg-customCyan-500 z-20"
            />
            <div
              className="absolute top-0 right-0 w-1 h-16 bg-customCyan-500 z-20"
            />
          </motion.div>

          {/* ── NAV BUTTON (outside box, below modal) ──────────── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, type: 'spring', stiffness: 400, damping: 25 }}
            className="w-full max-w-5xl flex justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {currentPage === 0 ? (
              <button
                onClick={() => setCurrentPage(1)}
                className="font-oswald font-bold italic text-base md:text-lg tracking-wider
                           text-darkBlack-900 cursor-pointer
                           bg-customCyan-500 hover:bg-customCyan-400
                           shadow-[0_0_20px_rgba(81,238,252,0.4)]
                           hover:shadow-[0_0_30px_rgba(81,238,252,0.6)]
                           transition-all duration-200
                           inline-flex items-center gap-3 group"
                style={{
                  clipPath: 'polygon(3% 0, 97% 0, 100% 100%, 0 100%)',
                  padding: '14px 48px',
                }}
              >
                EDUCATION
                <span className="inline-block group-hover:translate-x-1 transition-transform text-xl animate-pulse">
                  ▶
                </span>
              </button>
            ) : (
              <button
                onClick={() => setCurrentPage(0)}
                className="font-oswald font-bold italic text-base md:text-lg tracking-wider
                           text-darkBlack-900 cursor-pointer
                           bg-customCyan-500 hover:bg-customCyan-400
                           shadow-[0_0_20px_rgba(81,238,252,0.4)]
                           hover:shadow-[0_0_30px_rgba(81,238,252,0.6)]
                           transition-all duration-200
                           inline-flex items-center gap-3 group"
                style={{
                  clipPath: 'polygon(0 0, 97% 0, 100% 100%, 3% 100%)',
                  padding: '14px 48px',
                }}
              >
                <span className="inline-block group-hover:-translate-x-1 transition-transform text-xl">
                  ◀
                </span>
                PROFILE
              </button>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
